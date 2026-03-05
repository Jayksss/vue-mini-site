<template>
  <header class="app-bar">
    <div class="app-bar-inner">
      <RouterLink to="/" class="brand-link">vue-mini-site</RouterLink>

      <div class="app-bar-actions">
        <div class="theme-toggle">
          <el-icon class="theme-icon"><Moon v-if="isDark" /><Sunny v-else /></el-icon>
          <el-switch v-model="isDark" @change="toggleTheme" />
        </div>
        <RouterLink :to="{ name: 'home' }" class="nav-link">상품</RouterLink>
        <el-badge :value="cart.totalQty" :hidden="cart.totalQty === 0">
          <RouterLink :to="{ name: 'cart' }" class="nav-link">장바구니</RouterLink>
        </el-badge>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const isDark = ref(
  typeof localStorage !== 'undefined' ? localStorage.getItem('vue-mini-site.theme') === 'dark' : true
)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('vue-mini-site.theme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
.app-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.app-bar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
  color: var(--el-color-primary);
}

.brand-link:hover {
  opacity: 0.88;
}

.app-bar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-right: 0.25rem;
}

.theme-icon {
  font-size: 1.125rem;
}

.nav-link {
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.nav-link:hover {
  background: var(--el-fill-color-light);
}
</style>
