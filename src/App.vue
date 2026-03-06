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
  background: var(--el-bg-color-page);
}

.app-main {
  flex: 1;
  overflow-x: hidden;
  max-width: 100%;
  background: linear-gradient(
    180deg,
    var(--el-bg-color-page) 0%,
    var(--el-bg-color) 12rem,
    var(--el-bg-color-page) 100%
  );
}
</style>
