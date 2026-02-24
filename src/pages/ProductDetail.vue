<template>
  <section class="wrap" v-if="product">
    <div class="layout">
      <img class="img" :src="product.image" :alt="product.name" />
      <div class="info">
        <h1 class="name">{{ product.name }}</h1>
        <div class="price">{{ product.price.toLocaleString() }}원</div>
        <p class="desc">{{ product.description }}</p>

        <div class="actions">
          <input class="qty" type="number" min="1" v-model.number="qty" />
          <button class="btn" @click="addToCart">장바구니 담기</button>
          <RouterLink class="link" to="/cart">장바구니로</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap" v-else>
    <h1 class="name">상품을 찾을 수 없습니다.</h1>
    <RouterLink to="/">목록으로</RouterLink>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../mocks/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()

const qty = ref(1)

const product = computed(() => {
  return products.find((p) => p.id === route.params.id)
})

function addToCart() {
  if (!product.value) return
  cart.add(product.value, qty.value)
}
</script>

<style scoped>
.wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 16px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.img {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #eee;
}

.name {
  margin: 0 0 10px;
}

.price {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
}

.desc {
  color: #444;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 14px;
}

.qty {
  width: 80px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.btn {
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: #111;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>