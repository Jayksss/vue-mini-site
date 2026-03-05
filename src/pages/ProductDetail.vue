<template>
  <div v-if="product" class="page-container" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
    <el-row :gutter="24">
      <el-col :xs="24" :md="12">
        <el-image :src="product.image" :alt="product.name" fit="cover" style="width: 100%; border-radius: 12px;" />
      </el-col>
      <el-col :xs="24" :md="12">
        <h1 class="product-detail-title">{{ product.name }}</h1>
        <div class="product-detail-price">{{ product.price.toLocaleString() }}원</div>
        <p class="product-detail-desc">{{ product.description }}</p>
        <div class="product-detail-actions">
          <el-input-number v-model="qty" :min="1" size="default" style="max-width: 120px;" />
          <el-button type="primary" @click="addToCart">장바구니 담기</el-button>
          <RouterLink :to="{ name: 'cart' }">
            <el-button>장바구니로</el-button>
          </RouterLink>
        </div>
      </el-col>
    </el-row>
  </div>

  <div v-else class="page-container" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
    <h1 class="text-h5" style="margin-bottom: 0.75rem;">상품을 찾을 수 없습니다.</h1>
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
.product-detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-detail-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--el-color-primary);
  margin-bottom: 0.75rem;
}

.product-detail-desc {
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.product-detail-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
