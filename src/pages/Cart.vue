<template>
  <div class="cart-page">
    <div class="page-container cart-container">
      <h1 class="cart-title">장바구니</h1>

      <el-alert
        v-if="cart.items.length === 0"
        type="info"
        :closable="false"
        class="cart-empty"
        show-icon
      >
        <span>장바구니가 비어있습니다.</span>
        <RouterLink :to="{ name: 'home' }">
          <el-button type="primary" size="small" class="mt-3">상품 보러가기</el-button>
        </RouterLink>
      </el-alert>

      <template v-else>
        <div class="cart-list">
          <el-card v-for="it in cart.items" :key="it.productId" class="cart-item-card" shadow="never">
            <div class="cart-item-inner">
              <RouterLink :to="`/product/${it.productId}`" class="cart-item-thumb">
                <el-image :src="it.image" :alt="it.name" fit="cover" class="thumb-img" />
              </RouterLink>

              <div class="cart-item-info">
                <RouterLink :to="`/product/${it.productId}`" class="cart-item-name">{{ it.name }}</RouterLink>
                <div class="cart-item-price">{{ it.price.toLocaleString() }}원</div>
                <div class="cart-item-actions">
                  <el-input-number
                    :model-value="it.qty"
                    :min="1"
                    size="small"
                    class="cart-item-qty"
                    @update:model-value="(v) => onQty(it.productId, v)"
                  />
                  <el-button type="danger" link size="small" class="cart-item-remove" @click="cart.remove(it.productId)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>

              <div class="cart-item-total">
                <span class="total-text">{{ (it.price * it.qty).toLocaleString() }}원</span>
              </div>
            </div>
          </el-card>
        </div>

        <el-card class="cart-summary" shadow="never">
          <div class="summary-row">
            <span>총 수량</span>
            <span class="font-bold">{{ cart.totalQty }}개</span>
          </div>
          <el-divider />
          <div class="summary-row summary-total">
            <span>총 결제 금액</span>
            <span class="summary-price">{{ cart.totalPrice.toLocaleString() }}원</span>
          </div>
          <div class="summary-actions">
            <el-button @click="cart.clear()">장바구니 비우기</el-button>
            <RouterLink :to="{ name: 'checkout' }">
              <el-button type="primary" size="large">주문하기</el-button>
            </RouterLink>
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

function onQty(productId, value) {
  cart.setQty(productId, value)
}
</script>

<style scoped>
.cart-page {
  min-height: 60vh;
}

.cart-container {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.cart-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.cart-empty {
  padding: 1.5rem;
  text-align: center;
}

.mt-3 {
  margin-top: 0.75rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cart-item-card :deep(.el-card__body) {
  padding: 1rem 1.25rem;
}

.cart-item-inner {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.25rem;
  align-items: center;
}

.cart-item-thumb {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background: var(--el-fill-color-light);
}

.thumb-img {
  width: 100px;
  height: 100px;
  border-radius: 12px;
}

.cart-item-thumb:hover {
  opacity: 0.9;
}

.cart-item-info {
  min-width: 0;
}

.cart-item-name {
  display: block;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  color: inherit;
  margin-bottom: 0.25rem;
}

.cart-item-name:hover {
  text-decoration: underline;
  color: var(--el-color-primary);
}

.cart-item-price {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
}

.cart-item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cart-item-qty {
  max-width: 88px;
}

.cart-item-total {
  text-align: right;
  white-space: nowrap;
}

.total-text {
  font-weight: 600;
  font-size: 1rem;
}

.cart-summary {
  max-width: 480px;
  margin-left: auto;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.font-bold {
  font-weight: 600;
}

.summary-total {
  margin-top: 0.25rem;
}

.summary-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--el-color-primary);
}

.summary-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .cart-item-inner {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
  }

  .cart-item-total {
    grid-column: 2;
    text-align: left;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--el-border-color-lighter);
  }

  .cart-item-qty {
    max-width: 72px;
  }

  .thumb-img {
    width: 80px;
    height: 80px;
  }
}
</style>
