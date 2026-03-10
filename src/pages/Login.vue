<template>
  <div class="login-page">
    <div class="login-card-wrap">
      <el-card class="login-card" shadow="hover">
        <template #header>
          <h1 class="login-title">로그인</h1>
          <p class="login-subtitle">아이디와 비밀번호를 입력해 주세요.</p>
        </template>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="login-form"
          @submit.prevent="submit"
        >
          <el-form-item label="아이디" prop="loginId">
            <el-input
              v-model="form.loginId"
              type="text"
              placeholder="아이디를 입력해 주세요."
              size="large"
              clearable
              autocomplete="username"
            />
          </el-form-item>
          <el-form-item label="비밀번호" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="4자 이상 입력"
              size="large"
              show-password
              autocomplete="current-password"
              @keyup.enter="submit"
            />
          </el-form-item>

          <el-alert
            v-if="errorMessage"
            type="error"
            :title="errorMessage"
            show-icon
            class="login-error"
            @close="errorMessage = ''"
          />

          <el-form-item class="login-actions">
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              class="submit-btn"
              @click="submit"
            >
              로그인
            </el-button>
          </el-form-item>
        </el-form>

        <p class="login-hint">테스트: 아이디 3자 이상 + 비밀번호 4자 이상 입력 시 로그인됩니다. (관리자: 아이디 admin)</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const formRef = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  loginId: '',
  password: '',
})

const rules = {
  loginId: [
    { required: true, message: '아이디를 입력해 주세요.', trigger: 'blur' },
    { min: 3, message: '아이디는 3자 이상이어야 합니다.', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '비밀번호를 입력해 주세요.', trigger: 'blur' },
    { min: 4, message: '비밀번호는 4자 이상이어야 합니다.', trigger: 'blur' },
  ],
}

async function submit() {
  errorMessage.value = ''
  const valid = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!valid) return
  loading.value = true
  try {
    const result = auth.login(form.loginId, form.password)
    if (result.ok) {
      const redirect = (route.query.redirect || '/').toString()
      await router.push(redirect)
    } else {
      errorMessage.value = result.message || '로그인에 실패했습니다.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 20px;
}

.login-card-wrap {
  width: 100%;
  max-width: 420px;
}

.login-card {
  border-radius: 16px;
  overflow: hidden;
}

.login-card :deep(.el-card__header) {
  padding: 1.75rem 1.5rem 0.5rem;
  border-bottom: none;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 0.35rem 0;
}

.login-subtitle {
  font-size: 0.9rem;
  color: var(--el-text-color-regular);
  margin: 0;
}

.login-form {
  padding-top: 0.5rem;
}

.login-error {
  margin-bottom: 1rem;
  border-radius: 10px;
}

.login-actions {
  margin-bottom: 0;
  margin-top: 1rem;
}

.submit-btn {
  width: 100%;
  border-radius: 10px;
  font-weight: 500;
  height: 44px;
}

.login-hint {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  margin: 1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
