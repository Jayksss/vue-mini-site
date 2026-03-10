import { defineStore } from 'pinia'
import { loadJSON, saveJSON } from '../utils/storage'

const STORAGE_KEY = 'vue-mini-site.auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loadJSON(STORAGE_KEY, null), // { id, email, name, password } or null (mock: password 저장)
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    displayName: (state) => state.user?.name || state.user?.email || '회원',
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    persist() {
      saveJSON(STORAGE_KEY, this.user)
    },
    login(email, password) {
      const emailTrim = (email || '').trim()
      const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)
      const hasValidPassword = (password || '').length >= 4

      if (!hasValidEmail || !hasValidPassword) {
        return { ok: false, message: '이메일 형식과 비밀번호(4자 이상)를 확인해 주세요.' }
      }

      const isAdmin = emailTrim === 'admin@vue-mini-site.com' || emailTrim === 'admin@test.com'
      this.user = {
        id: 'user-' + Date.now(),
        email: emailTrim,
        name: isAdmin ? '관리자' : emailTrim.split('@')[0],
        password: password, // mock: 마이페이지 진입·비밀번호 변경 검증용
        role: isAdmin ? 'admin' : 'user',
      }
      this.persist()
      return { ok: true }
    },
    logout() {
      this.user = null
      this.persist()
    },
    /** 마이페이지 진입 시 비밀번호 확인 (기존 회원에 비밀번호 없으면 첫 입력값을 비밀번호로 저장) */
    verifyPassword(password) {
      if (!this.user) return { ok: false, message: '로그인이 필요합니다.' }
      const pwd = (password || '').trim()
      if (!pwd) return { ok: false, message: '비밀번호를 입력해 주세요.' }
      if (!this.user.password) {
        this.user.password = pwd
        this.persist()
        return { ok: true }
      }
      if (this.user.password !== pwd) {
        return { ok: false, message: '비밀번호가 일치하지 않습니다.' }
      }
      return { ok: true }
    },
    /** 비밀번호 변경 (정보 변경과 별도) */
    updatePassword(currentPassword, newPassword) {
      if (!this.user) return { ok: false, message: '로그인이 필요합니다.' }
      if (this.user.password !== currentPassword) {
        return { ok: false, message: '현재 비밀번호가 일치하지 않습니다.' }
      }
      if ((newPassword || '').length < 4) {
        return { ok: false, message: '새 비밀번호는 4자 이상이어야 합니다.' }
      }
      this.user.password = newPassword
      this.persist()
      return { ok: true }
    },
    /** 회원정보 변경 (비밀번호 변경과 별도) */
    updateProfile({ name, email }) {
      if (!this.user) return { ok: false, message: '로그인이 필요합니다.' }
      const emailTrim = (email !== undefined && email !== null ? email : (this.user && this.user.email) || '').trim()
      if (emailTrim && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
        return { ok: false, message: '올바른 이메일 형식이 아닙니다.' }
      }
      if (emailTrim) this.user.email = emailTrim
      if (name != null && String(name).trim()) this.user.name = String(name).trim()
      this.persist()
      return { ok: true }
    },
  },
})
