<template>
  <div class="search-form">
    <v-select
      v-model="condition"
      :items="searchConditionItems"
      item-title="title"
      item-value="value"
      density="comfortable"
      variant="outlined"
      hide-details
      class="search-condition"
      menu-icon=""
    />
    <v-text-field
      v-model="keyword"
      placeholder="상품명, 브랜드, 카테고리 등 검색"
      variant="outlined"
      density="comfortable"
      hide-details
      clearable
      class="search-input"
      @keydown.enter.prevent="submit"
    >
      <template #append-inner>
        <v-btn
          icon
          variant="text"
          size="small"
          aria-label="검색"
          @click="submit"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchConditions } from '../mocks/searchConditions'

const condition = ref('all')
const keyword = ref('')
const searchConditionItems = searchConditions

const emit = defineEmits(['search'])

function submit() {
  emit('search', {
    keyword: (keyword.value || '').trim(),
    condition: condition.value,
  })
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.search-condition {
  flex: 0 0 140px;
}

.search-input {
  flex: 1;
  min-width: 0;
}
</style>
