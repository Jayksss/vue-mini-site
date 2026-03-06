<template>
  <div class="checkout-page page-container">
    <h1 class="page-title">주문서 (Checkout)</h1>
    <p class="page-desc">다음 단계에서 배송지 입력/결제 Mock을 붙입니다.</p>
    <RouterLink :to="{ name: 'cart' }">
      <el-button size="large" class="back-btn">장바구니로 돌아가기</el-button>
    </RouterLink>
  </div>
</template>

<style scoped>
.checkout-page {
  padding-top: 2rem;
  padding-bottom: 2.5rem;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--el-color-primary);
  display: inline-block;
}

.page-desc {
  color: var(--el-text-color-regular);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.back-btn {
  border-radius: 10px;
  font-weight: 500;
}
</style>
