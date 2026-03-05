<template>
  <div class="app-root">
    <AppHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <UtilButtons />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import UtilButtons from './components/UtilButtons.vue'
</script>

<style>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  overflow-x: hidden;
  max-width: 100%;
  background: var(--el-bg-color-page);
}
</style>
