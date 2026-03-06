<template>
  <div class="not-found-page page-container">
    <div class="not-found-inner">
      <span class="not-found-code">404</span>
      <h1 class="not-found-title">페이지를 찾을 수 없습니다</h1>
      <p class="not-found-desc">요청하신 주소가 없거나 이동되었을 수 있습니다.</p>
      <RouterLink :to="{ name: 'home' }">
        <el-button type="primary" size="large" class="home-btn">홈으로</el-button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 20px;
  text-align: center;
}

.not-found-inner {
  max-width: 420px;
}

.not-found-code {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--el-color-primary);
  margin-bottom: 0.5rem;
}

.not-found-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.not-found-desc {
  color: var(--el-text-color-regular);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.home-btn {
  border-radius: 12px;
  font-weight: 500;
  padding: 0.6rem 1.5rem;
}
</style>
