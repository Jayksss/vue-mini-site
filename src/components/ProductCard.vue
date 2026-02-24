<template>
  <article class="card">
    <RouterLink class="thumb" :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.name" />
    </RouterLink>

    <div class="body">
      <RouterLink class="name" :to="`/product/${product.id}`">
        {{ product.name }}
      </RouterLink>
      <div class="price">{{ product.price.toLocaleString() }}원</div>

      <button class="btn" @click="cart.add(product, 1)">
        장바구니 담기
      </button>
    </div>
  </article>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const props = defineProps({
  product: { type: Object, required: true },
})
const cart = useCartStore()
</script>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
}

.thumb {
  display: block;
  aspect-ratio: 3/2;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name {
  text-decoration: none;
  color: #111;
  font-weight: 700;
}

.price {
  color: #444;
}

.btn {
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}
</style>