<template>
  <div class="cart-page">
    <v-container class="py-6">
      <h1 class="cart-title">장바구니</h1>

      <v-alert
        v-if="cart.items.length === 0"
        type="info"
        variant="tonal"
        class="cart-empty"
        rounded="lg"
      >
        <span class="text-body-1">장바구니가 비어있습니다.</span>
        <v-btn :to="{ name: 'home' }" variant="flat" color="primary" size="small" class="mt-3" rounded="lg">
          상품 보러가기
        </v-btn>
      </v-alert>

      <template v-else>
        <div class="cart-list">
          <v-card
            v-for="it in cart.items"
            :key="it.productId"
            variant="outlined"
            class="cart-item-card"
            rounded="lg"
          >
            <div class="cart-item-inner">
              <RouterLink :to="`/product/${it.productId}`" class="cart-item-thumb">
                <v-img
                  :src="it.image"
                  :alt="it.name"
                  width="100"
                  height="100"
                  cover
                  class="rounded-lg"
                />
              </RouterLink>

              <div class="cart-item-info">
                <RouterLink :to="`/product/${it.productId}`" class="cart-item-name">
                  {{ it.name }}
                </RouterLink>
                <div class="cart-item-price text-body-2 text-medium-emphasis">
                  {{ it.price.toLocaleString() }}원
                </div>

                <div class="cart-item-actions">
                  <v-text-field
                    :model-value="it.qty"
                    type="number"
                    min="1"
                    density="compact"
                    hide-details
                    variant="outlined"
                    class="cart-item-qty"
                    @update:model-value="(v) => onQty(it.productId, v)"
                  />
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    color="error"
                    class="cart-item-remove"
                    aria-label="삭제"
                    @click="cart.remove(it.productId)"
                  >
                    <v-icon size="small">mdi-delete-outline</v-icon>
                  </v-btn>
                </div>
              </div>

              <div class="cart-item-total">
                <span class="text-subtitle-1 font-weight-bold">{{ (it.price * it.qty).toLocaleString() }}원</span>
              </div>
            </div>
          </v-card>
        </div>

        <v-card variant="outlined" class="cart-summary" rounded="lg">
          <v-card-text>
            <div class="summary-row">
              <span class="text-body-1">총 수량</span>
              <span class="text-body-1 font-weight-bold">{{ cart.totalQty }}개</span>
            </div>
            <v-divider class="my-3" />
            <div class="summary-row summary-total">
              <span class="text-subtitle-1">총 결제 금액</span>
              <span class="text-h6 font-weight-bold text-primary">{{ cart.totalPrice.toLocaleString() }}원</span>
            </div>
          </v-card-text>
          <v-card-actions class="px-4 pb-4 pt-0">
            <v-btn variant="outlined" rounded="lg" @click="cart.clear()">장바구니 비우기</v-btn>
            <v-spacer />
            <v-btn color="primary" rounded="lg" :to="{ name: 'checkout' }" size="large">
              주문하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-container>
  </div>
</template>

<script setup>
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

.cart-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.cart-empty {
  padding: 2rem;
  text-align: center;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cart-item-card {
  overflow: hidden;
}

.cart-item-inner {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.25rem;
  align-items: center;
  padding: 1rem 1.25rem;
}

.cart-item-thumb {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background: rgb(var(--v-theme-surface-variant));
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
  color: rgb(var(--v-theme-primary));
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

.cart-item-remove {
  flex-shrink: 0;
}

.cart-item-total {
  text-align: right;
  white-space: nowrap;
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

.summary-total {
  margin-top: 0.25rem;
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
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }

  .cart-item-qty {
    max-width: 72px;
  }
}
</style>
