<template>
  <div class="mypage-page">
    <div class="page-container">
      <!-- 비로그인 시 로그인 페이지로 -->
      <template v-if="!auth.isLoggedIn">
        <div class="mypage-gate-card">
          <el-alert type="warning" :closable="false" show-icon>
            로그인한 회원만 이용할 수 있습니다.
            <RouterLink :to="{ name: 'login', query: { redirect: '/mypage' } }">
              <el-button type="primary" size="small" class="mt-2">로그인하기</el-button>
            </RouterLink>
          </el-alert>
        </div>
      </template>

      <!-- 진입 비밀번호 확인 -->
      <template v-else-if="!unlocked">
        <div class="mypage-gate-card">
          <el-card class="gate-card" shadow="hover">
            <template #header>
              <h2 class="gate-title">마이페이지 진입</h2>
              <p class="gate-desc">비밀번호를 입력해 주세요.</p>
            </template>
            <el-form ref="gateFormRef" :model="gateForm" :rules="gateRules" @submit.prevent="submitGate">
              <el-form-item prop="password">
                <el-input
                  v-model="gateForm.password"
                  type="password"
                  placeholder="현재 비밀번호"
                  size="large"
                  show-password
                  clearable
                  autocomplete="current-password"
                  @keyup.enter="submitGate"
                />
              </el-form-item>
              <el-alert v-if="gateError" type="error" :title="gateError" show-icon class="mb-3" @close="gateError = ''" />
              <el-button type="primary" size="large" :loading="gateLoading" class="gate-btn" @click="submitGate">
                확인
              </el-button>
            </el-form>
          </el-card>
        </div>
      </template>

      <!-- 마이페이지 본문: 정보 변경 / 비밀번호 변경 분리 -->
      <template v-else>
        <div class="mypage-content">
          <h1 class="mypage-heading">마이페이지</h1>

          <el-tabs v-model="activeTab" class="mypage-tabs">
          <el-tab-pane label="정보 변경" name="profile">
            <el-card class="section-card" shadow="never">
              <template #header>
                <span class="section-title">회원 정보 수정</span>
              </template>
              <el-form
                ref="profileFormRef"
                :model="profileForm"
                :rules="profileRules"
                label-position="top"
                class="mypage-form"
              >
                <el-form-item label="이름" prop="name">
                  <el-input v-model="profileForm.name" placeholder="이름" size="large" clearable />
                </el-form-item>
                <el-form-item label="이메일" prop="email">
                  <el-input v-model="profileForm.email" type="email" placeholder="example@email.com" size="large" clearable />
                </el-form-item>
                <el-alert v-if="profileMessage" :type="profileSuccess ? 'success' : 'error'" :title="profileMessage" show-icon class="mb-3" @close="profileMessage = ''" />
                <el-form-item>
                  <el-button type="primary" size="large" :loading="profileLoading" @click="submitProfile">
                    정보 저장
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>

          <el-tab-pane label="비밀번호 변경" name="password">
            <el-card class="section-card" shadow="never">
              <template #header>
                <span class="section-title">비밀번호 변경</span>
              </template>
              <el-form
                ref="passwordFormRef"
                :model="passwordForm"
                :rules="passwordRules"
                label-position="top"
                class="mypage-form"
              >
                <el-form-item label="현재 비밀번호" prop="currentPassword">
                  <el-input
                    v-model="passwordForm.currentPassword"
                    type="password"
                    placeholder="현재 비밀번호"
                    size="large"
                    show-password
                    clearable
                  />
                </el-form-item>
                <el-form-item label="새 비밀번호" prop="newPassword">
                  <el-input
                    v-model="passwordForm.newPassword"
                    type="password"
                    placeholder="4자 이상"
                    size="large"
                    show-password
                    clearable
                  />
                </el-form-item>
                <el-form-item label="새 비밀번호 확인" prop="confirmPassword">
                  <el-input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    placeholder="다시 입력"
                    size="large"
                    show-password
                    clearable
                  />
                </el-form-item>
                <el-alert v-if="passwordMessage" :type="passwordSuccess ? 'success' : 'error'" :title="passwordMessage" show-icon class="mb-3" @close="passwordMessage = ''" />
                <el-form-item>
                  <el-button type="primary" size="large" :loading="passwordLoading" @click="submitPassword">
                    비밀번호 변경
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const unlocked = ref(false)

// ----- Gate (진입 비밀번호) -----
const gateFormRef = ref(null)
const gateForm = reactive({ password: '' })
const gateError = ref('')
const gateLoading = ref(false)
const gateRules = {
  password: [{ required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur' }],
}

async function submitGate() {
  gateError.value = ''
  const valid = await gateFormRef.value?.validate().then(() => true).catch(() => false)
  if (!valid) return
  gateLoading.value = true
  try {
    const result = auth.verifyPassword(gateForm.password)
    if (result.ok) {
      unlocked.value = true
      gateForm.password = ''
    } else {
      gateError.value = result.message || '비밀번호가 일치하지 않습니다.'
    }
  } finally {
    gateLoading.value = false
  }
}

// ----- 탭 -----
const activeTab = ref('profile')

// ----- 정보 변경 (별도 로직) -----
const profileFormRef = ref(null)
const profileForm = reactive({
  name: auth.user?.name ?? '',
  email: auth.user?.email ?? '',
})
const profileMessage = ref('')
const profileSuccess = ref(false)
const profileLoading = ref(false)
const profileRules = {
  email: [
    { required: true, message: '이메일을 입력해 주세요.', trigger: 'blur' },
    { type: 'email', message: '올바른 이메일 형식이 아닙니다.', trigger: 'blur' },
  ],
}

watch(
  () => auth.user,
  (u) => {
    if (u) {
      profileForm.name = u.name ?? ''
      profileForm.email = u.email ?? ''
    }
  },
  { immediate: true }
)

async function submitProfile() {
  profileMessage.value = ''
  const valid = await profileFormRef.value?.validate().then(() => true).catch(() => false)
  if (!valid) return
  profileLoading.value = true
  try {
    const result = auth.updateProfile({ name: profileForm.name, email: profileForm.email })
    if (result.ok) {
      profileMessage.value = '정보가 저장되었습니다.'
      profileSuccess.value = true
    } else {
      profileMessage.value = result.message || '저장에 실패했습니다.'
      profileSuccess.value = false
    }
  } finally {
    profileLoading.value = false
  }
}

// ----- 비밀번호 변경 (별도 로직) -----
const passwordFormRef = ref(null)
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordMessage = ref('')
const passwordSuccess = ref(false)
const passwordLoading = ref(false)

const validateConfirm = (_rule, value, callback) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('새 비밀번호와 일치하지 않습니다.'))
  } else {
    callback()
  }
}
const passwordRules = {
  currentPassword: [{ required: true, message: '현재 비밀번호를 입력해 주세요.', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '새 비밀번호를 입력해 주세요.', trigger: 'blur' },
    { min: 4, message: '4자 이상 입력해 주세요.', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '새 비밀번호를 다시 입력해 주세요.', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' },
  ],
}

async function submitPassword() {
  passwordMessage.value = ''
  const valid = await passwordFormRef.value?.validate().then(() => true).catch(() => false)
  if (!valid) return
  passwordLoading.value = true
  try {
    const result = auth.updatePassword(passwordForm.currentPassword, passwordForm.newPassword)
    if (result.ok) {
      passwordMessage.value = '비밀번호가 변경되었습니다.'
      passwordSuccess.value = true
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } else {
      passwordMessage.value = result.message || '변경에 실패했습니다.'
      passwordSuccess.value = false
    }
  } finally {
    passwordLoading.value = false
  }
}
</script>

<style scoped>
.mypage-page {
  min-height: 70vh;
  padding: 2rem 0 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mypage-page .page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mypage-gate-card {
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
}

.gate-card {
  border-radius: 16px;
}

.gate-card :deep(.el-card__header) {
  padding-bottom: 0.5rem;
}

.gate-title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem 0;
}

.gate-desc {
  font-size: 0.9rem;
  color: var(--el-text-color-regular);
  margin: 0;
}

.gate-btn {
  width: 100%;
  border-radius: 10px;
  font-weight: 500;
  height: 44px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mypage-content {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
}

.mypage-heading {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--el-color-primary);
  text-align: center;
}

.mypage-tabs {
  width: 100%;
}

.mypage-tabs :deep(.el-tabs__header) {
  margin-bottom: 1rem;
}

.mypage-tabs :deep(.el-tabs__item) {
  font-weight: 500;
}

.section-card {
  border-radius: 14px;
}

.section-card :deep(.el-card__header) {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.mypage-form .el-form-item {
  margin-bottom: 1.1rem;
}

.mypage-form .el-button {
  border-radius: 10px;
  font-weight: 500;
}
</style>
