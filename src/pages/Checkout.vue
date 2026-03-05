<template>
  <div class="page-container" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
    <h1 style="font-size: 1.5rem; margin-bottom: 0.5rem;">주문서 (Checkout)</h1>
    <p style="color: var(--el-text-color-regular); margin-bottom: 1rem;">다음 단계에서 배송지 입력/결제 Mock을 붙입니다.</p>
    <RouterLink :to="{ name: 'cart' }">
      <el-button>장바구니로 돌아가기</el-button>
    </RouterLink>
  </div>
</template>
