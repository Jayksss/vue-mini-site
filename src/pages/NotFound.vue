<template>
  <div class="page-container" style="padding-top: 3rem; padding-bottom: 3rem; text-align: center;">
    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">404</h1>
    <p style="color: var(--el-text-color-regular); margin-bottom: 1rem;">페이지를 찾을 수 없습니다.</p>
    <RouterLink :to="{ name: 'home' }">
      <el-button type="primary">홈으로</el-button>
    </RouterLink>
  </div>
</template>
