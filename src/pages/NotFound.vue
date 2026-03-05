<template>
  <v-container class="py-12 text-center">
    <h1 class="text-h2 mb-2">404</h1>
    <p class="text-body-1 text-medium-emphasis mb-4">페이지를 찾을 수 없습니다.</p>
    <v-btn color="primary" :to="{ name: 'home' }">홈으로</v-btn>
  </v-container>
</template>
