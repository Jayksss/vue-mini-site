<template>
  <v-app-bar flat class="app-bar px-4" height="56">
    <v-app-bar-title class="py-2">
      <RouterLink to="/" class="brand-link">
        vue-mini-site
      </RouterLink>
    </v-app-bar-title>

    <v-spacer />

    <div class="d-flex align-center" style="gap: 0.5rem;">
      <div class="d-flex align-center theme-toggle">
        <v-icon size="small" :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'" />
        <v-switch
          :model-value="isDark"
          hide-details
          density="compact"
          color="primary"
          class="ms-1"
          @update:model-value="toggleTheme"
        />
      </div>

      <v-btn variant="text" rounded="lg" :to="{ name: 'home' }">상품</v-btn>
      <v-badge :content="cart.totalQty" color="primary" :model-value="cart.totalQty > 0">
        <v-btn variant="text" rounded="lg" :to="{ name: 'cart' }">장바구니</v-btn>
      </v-badge>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useCartStore } from '../stores/cart'

const theme = useTheme()
const cart = useCartStore()

const isDark = computed(() => theme.global.name.value === 'dark')

function toggleTheme() {
  const next = theme.global.name.value === 'dark' ? 'light' : 'dark'
  theme.global.name.value = next
  localStorage.setItem('vue-mini-site.theme', next)
}
</script>

<style scoped>
.app-bar {
  border-bottom: 1px solid rgba(128, 128, 128, 0.12);
}

.brand-link {
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: rgb(var(--v-theme-primary));
}

.brand-link:hover {
  opacity: 0.88;
}

.theme-toggle {
  padding-right: 0.25rem;
}
</style>
