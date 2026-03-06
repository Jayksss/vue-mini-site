<template>
  <el-card class="product-card" shadow="hover">
    <RouterLink :to="`/product/${product.id}`" class="card-link">
      <div class="product-card-img-wrap">
        <el-image
          :src="product.image"
          :alt="product.name"
          fit="cover"
          class="product-card-img"
        />
      </div>
    </RouterLink>

    <div class="product-card-body">
      <RouterLink :to="`/product/${product.id}`" class="card-link">
        <span class="product-name">{{ product.name }}</span>
      </RouterLink>
      <div class="product-price">{{ product.price.toLocaleString() }}원</div>
    </div>

    <div class="product-card-actions">
      <el-button type="primary" size="small" class="add-btn" @click="cart.add(product, 1)">
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
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-link:hover .product-name {
  color: var(--el-color-primary);
}

.product-card-img-wrap {
  width: 100%;
  aspect-ratio: 1.25;
  border-radius: 10px;
  overflow: hidden;
  background: var(--el-fill-color-light);
}

.product-card-img {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.35s ease;
}

.product-card:hover .product-card-img {
  transform: scale(1.04);
}

.product-card-body {
  flex: 1;
  padding-top: 0.75rem;
}

.product-name {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.product-price {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--el-color-primary);
  margin-top: 0.35rem;
}

.product-card-actions {
  padding-top: 0.85rem;
}

.add-btn {
  width: 100%;
  border-radius: 10px;
  font-weight: 500;
}
</style>
