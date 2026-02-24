<template>
  <section class="wrap">
    <h1 class="title">상품 목록</h1>

    <div class="grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import { products } from '../mocks/products'
</script>

<style scoped>
.wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 16px;
}

.title {
  font-size: 22px;
  margin: 0 0 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>