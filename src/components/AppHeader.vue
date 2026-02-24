<template>
  <header class="header">
    <div class="inner">
      <RouterLink class="brand" to="/">vue-mini-site</RouterLink>

      <nav class="nav">
        <RouterLink class="link" to="/">상품</RouterLink>
        <RouterLink class="link" to="/cart">
          장바구니 <span class="badge">{{ cart.totalQty }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 800;
  text-decoration: none;
  color: #111;
}

.nav {
  display: flex;
  gap: 12px;
}

.link {
  text-decoration: none;
  color: #333;
}

.badge {
  display: inline-block;
  min-width: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 12px;
  text-align: center;
  margin-left: 6px;
}
</style>