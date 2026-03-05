<template>
  <v-app>
    <AppHeader />
    <v-main class="app-main">
      <RouterView />
    </v-main>
    <UtilButtons />
  </v-app>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import UtilButtons from './components/UtilButtons.vue'
</script>

<style>
.app-main {
  background: rgb(var(--v-theme-surface));
  overflow-x: hidden;
  max-width: 100%;
}

.v-container {
  max-width: 100%;
}
</style>
