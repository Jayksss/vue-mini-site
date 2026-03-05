<template>
  <v-container v-if="product" class="py-6">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="product.image"
          :alt="product.name"
          aspect-ratio="1"
          cover
          class="rounded-lg"
        />
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="text-h4 mb-2">{{ product.name }}</h1>
        <div class="text-h6 text-primary mb-3">{{ product.price.toLocaleString() }}원</div>
        <p class="text-body-1 text-medium-emphasis mb-4">{{ product.description }}</p>

        <div class="d-flex align-center flex-wrap gap-2">
          <v-text-field
            v-model.number="qty"
            type="number"
            min="1"
            density="compact"
            hide-details
            style="max-width: 100px;"
            variant="outlined"
            rounded="lg"
          />
          <v-btn color="primary" rounded="lg" @click="addToCart">장바구니 담기</v-btn>
          <v-btn variant="outlined" rounded="lg" :to="{ name: 'cart' }">장바구니로</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-else class="py-6">
    <h1 class="text-h5 mb-3">상품을 찾을 수 없습니다.</h1>
    <v-btn rounded="lg" :to="{ name: 'home' }">목록으로</v-btn>
  </v-container>
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
