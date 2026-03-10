<template>
  <header class="app-bar">
    <div class="app-bar-inner">
      <RouterLink to="/" class="brand-link">vue-mini-site</RouterLink>

      <div class="app-bar-actions">
        <div class="theme-toggle">
          <el-icon class="theme-icon"><Moon v-if="isDark" /><Sunny v-else /></el-icon>
          <el-switch v-model="isDark" @change="toggleTheme" />
        </div>
        <RouterLink :to="{ name: 'home' }" class="nav-link">상품</RouterLink>
        <RouterLink :to="{ name: 'board' }" class="nav-link">게시판</RouterLink>
        <el-badge :value="cart.totalQty" :hidden="cart.totalQty === 0" class="cart-badge">
          <RouterLink :to="{ name: 'cart' }" class="nav-link nav-link-cart">장바구니</RouterLink>
        </el-badge>
        <template v-if="auth.isLoggedIn">
          <RouterLink :to="{ name: 'mypage' }" class="nav-link">마이페이지</RouterLink>
          <span class="user-name">{{ auth.displayName }}님</span>
          <el-button type="primary" link class="nav-link-btn" @click="logout">로그아웃</el-button>
        </template>
        <RouterLink v-else :to="{ name: 'login' }" class="nav-link">로그인</RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()
const isDark = ref(
  typeof localStorage !== 'undefined' ? localStorage.getItem('vue-mini-site.theme') === 'dark' : false
)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('vue-mini-site.theme', isDark.value ? 'dark' : 'light')
}

function logout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.app-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  backdrop-filter: saturate(180%) blur(12px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
}

html.dark .app-bar {
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
}

.app-bar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
  color: var(--el-color-primary);
  transition: opacity 0.2s ease;
}

.brand-link:hover {
  opacity: 0.85;
}

.app-bar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-right: 0.5rem;
  margin-right: 0.25rem;
  border-right: 1px solid var(--el-border-color-lighter);
}

.theme-icon {
  font-size: 1.15rem;
  color: var(--el-text-color-regular);
}

.nav-link {
  color: var(--el-text-color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: 10px;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
}

.nav-link-cart {
  display: inline-flex;
  align-items: center;
}

.cart-badge :deep(.el-badge__content) {
  font-weight: 600;
  font-size: 11px;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--el-text-color-regular);
  padding: 0 0.25rem 0 0.5rem;
}

.nav-link-btn {
  padding: 0.4rem 0.5rem;
  font-weight: 500;
}
</style>
