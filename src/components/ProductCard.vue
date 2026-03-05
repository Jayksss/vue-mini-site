<template>
  <el-card class="product-card" shadow="hover">
    <RouterLink :to="`/product/${product.id}`" class="card-link">
      <el-image
        :src="product.image"
        :alt="product.name"
        fit="cover"
        class="product-card-img"
      />
    </RouterLink>

    <div class="product-card-body">
      <RouterLink :to="`/product/${product.id}`" class="card-link">
        <span class="product-name">{{ product.name }}</span>
      </RouterLink>
      <div class="product-price">{{ product.price.toLocaleString() }}원</div>
    </div>

    <div class="product-card-actions">
      <el-button type="primary" size="small" style="width: 100%;" @click="cart.add(product, 1)">
        장바구니 담기
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

defineProps({
  product: { type: Object, required: true },
})
const cart = useCartStore()
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-link:hover .product-name {
  text-decoration: underline;
  color: var(--el-color-primary);
}

.product-card-img {
  width: 100%;
  aspect-ratio: 1.25;
  display: block;
  background: var(--el-fill-color-light);
}

.product-card-body {
  flex: 1;
  padding-top: 0.5rem;
}

.product-name {
  font-weight: 600;
  font-size: 1rem;
}

.product-price {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
  margin-top: 0.25rem;
}

.product-card-actions {
  padding-top: 0.75rem;
}
</style>
