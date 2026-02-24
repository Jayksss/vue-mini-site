<template>
  <AppHeader />
  <main class="main">
    <RouterView />
  </main>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style scoped>
.main {
  min-height: calc(100vh - 56px);
  background: #fafafa;
}
</style>