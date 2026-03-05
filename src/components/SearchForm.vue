<template>
  <div class="search-form search-form-inline">
    <div class="search-form-bar">
      <el-select
        v-model="condition"
        placeholder="검색조건"
        class="search-condition"
        size="large"
      >
        <el-option
          v-for="item in searchConditionItems"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="keyword"
        placeholder="상품명, 브랜드, 카테고리 등 검색"
        clearable
        size="large"
        class="search-input"
        @keyup.enter="submit"
      >
        <template #append>
          <el-button type="primary" :icon="Search" @click="submit">검색</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
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
  align-items: stretch;
}

.search-form-inline {
  width: 100%;
}

.search-form-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  overflow: hidden;
  background: var(--el-fill-color-blank);
}

.search-condition {
  flex: 0 0 130px;
}

.search-condition :deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: none;
  border-right: 1px solid var(--el-border-color);
}

.search-input {
  flex: 1;
  min-width: 0;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: none;
}

.search-input :deep(.el-input-group__append) {
  padding: 0;
  box-shadow: none;
  background: var(--el-color-primary);
}

.search-input :deep(.el-input-group__append .el-button) {
  margin: 0;
  border-radius: 0;
  height: 100%;
  padding: 0 18px;
  color: #fff;
}
</style>
