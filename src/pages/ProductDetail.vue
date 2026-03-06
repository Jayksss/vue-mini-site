<template>
  <div v-if="product" class="product-detail-page page-container">
    <el-row :gutter="28">
      <el-col :xs="24" :md="12">
        <div class="detail-img-wrap">
          <el-image :src="product.image" :alt="product.name" fit="cover" class="detail-img" />
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <h1 class="product-detail-title">{{ product.name }}</h1>
        <div class="product-detail-price">{{ product.price.toLocaleString() }}원</div>
        <p class="product-detail-desc">{{ product.description }}</p>
        <div class="product-detail-actions">
          <el-input-number v-model="qty" :min="1" size="default" class="detail-qty" />
          <el-button type="primary" @click="addToCart">장바구니 담기</el-button>
          <RouterLink :to="{ name: 'cart' }">
            <el-button>장바구니로</el-button>
          </RouterLink>
        </div>
      </el-col>
    </el-row>
  </div>

  <div v-else class="page-container not-found-inline">
    <h1 class="text-h5 inline-title">상품을 찾을 수 없습니다.</h1>
    <RouterLink :to="{ name: 'home' }">
      <el-button>목록으로</el-button>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../mocks/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()
const qty = ref(1)

const product = computed(() => products.find((p) => p.id === route.params.id))

function addToCart() {
  if (!product.value) return
  cart.add(product.value, qty.value)
}
</script>

<style scoped>
.product-detail-page {
  padding-top: 2rem;
  padding-bottom: 2.5rem;
}

.detail-img-wrap {
  border-radius: 14px;
  overflow: hidden;
  background: var(--el-fill-color-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.detail-img {
  width: 100%;
  display: block;
}

.product-detail-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.35;
  margin-bottom: 0.75rem;
}

.product-detail-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--el-color-primary);
  margin-bottom: 1rem;
}

.product-detail-desc {
  color: var(--el-text-color-regular);
  line-height: 1.65;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.product-detail-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.detail-qty {
  max-width: 120px;
}

.detail-qty :deep(.el-input-number) {
  border-radius: 10px;
}

.product-detail-actions .el-button {
  border-radius: 10px;
  font-weight: 500;
}

.not-found-inline {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.inline-title {
  margin-bottom: 1rem;
}
</style>
