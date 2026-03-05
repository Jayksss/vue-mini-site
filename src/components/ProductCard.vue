<template>
  <v-card variant="outlined" class="product-card fill-height d-flex flex-column">
    <RouterLink :to="`/product/${product.id}`" class="text-decoration-none card-link">
      <v-img
        :src="product.image"
        :alt="product.name"
        aspect-ratio="1.25"
        cover
        class="product-card-img"
      />
    </RouterLink>

    <v-card-text class="flex-grow-1 pt-3 pb-1">
      <RouterLink :to="`/product/${product.id}`" class="text-decoration-none text-medium-emphasis card-link">
        <span class="font-weight-bold text-body-1 product-name">{{ product.name }}</span>
      </RouterLink>
      <div class="text-body-2 mt-1 text-high-emphasis">{{ product.price.toLocaleString() }}원</div>
    </v-card-text>

    <v-card-actions class="pt-0 pb-3 px-3">
      <v-btn
        variant="flat"
        color="primary"
        block
        rounded="lg"
        size="small"
        @click="cart.add(product, 1)"
      >
        장바구니 담기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: { type: Object, required: true },
})
const cart = useCartStore()
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  overflow: hidden;
}

.card-link:hover .product-name {
  text-decoration: underline;
}

.product-card-img {
  background: rgb(var(--v-theme-surface-variant));
}
</style>
