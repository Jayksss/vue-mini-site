<template>
  <div class="search-results-page">
    <div class="page-container" style="padding-top: 1.5rem; padding-bottom: 1.5rem;">
      <div class="result-header">
        <h1 class="result-title">
          <template v-if="keyword">
            <span class="condition-label">{{ conditionLabel }}</span>
            <span class="keyword">"{{ keyword }}"</span>
            <span> 로 검색한 결과입니다.</span>
          </template>
          <template v-else>
            검색어를 입력해 주세요.
          </template>
        </h1>
        <p v-if="keyword" class="result-count">
          검색 결과 <strong>{{ filteredProducts.length }}</strong>건
        </p>
      </div>

      <el-alert
        v-if="keyword && filteredProducts.length === 0"
        type="info"
        :closable="false"
        show-icon
        class="mb-4"
      >
        검색 결과가 없습니다. 다른 검색어나 검색 조건을 이용해 보세요.
        <RouterLink :to="{ name: 'home' }">
          <el-button link type="primary" size="small" class="mt-2">메인으로</el-button>
        </RouterLink>
      </el-alert>

      <el-row v-else-if="filteredProducts.length" :gutter="16">
        <el-col v-for="p in filteredProducts" :key="p.id" :xs="24" :sm="12" :md="8" :lg="6">
          <ProductCard :product="p" />
        </el-col>
      </el-row>

      <div v-else class="empty-search">
        <el-icon :size="64" color="var(--el-text-color-placeholder)" class="empty-icon"><Search /></el-icon>
        <p class="empty-text">상품명, 브랜드, 카테고리 등으로 검색해 보세요.</p>
        <RouterLink :to="{ name: 'home' }">
          <el-button type="primary">메인으로 이동</el-button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../mocks/products'
import { searchConditions } from '../mocks/searchConditions'

const props = defineProps({
  keyword: { type: String, default: '' },
  condition: { type: String, default: 'all' },
})

const conditionLabel = computed(() => {
  const item = searchConditions.find((c) => c.value === props.condition)
  return item ? item.title : '통합검색'
})

const filteredProducts = computed(() => {
  const q = (props.keyword || '').trim().toLowerCase()
  if (!q) return []
  const cond = props.condition || 'all'
  const fields = {
    all: ['name', 'brand', 'categoryName', 'productNo', 'manufacturer'],
    name: ['name'],
    brand: ['brand'],
    category: ['categoryName'],
    productNo: ['productNo'],
    manufacturer: ['manufacturer'],
  }
  const targetFields = fields[cond] || fields.all
  return products.filter((p) => {
    return targetFields.some((field) => {
      const val = p[field]
      return val != null && String(val).toLowerCase().includes(q)
    })
  })
})
</script>

<style scoped>
.search-results-page {
  min-height: 60vh;
}

.result-header {
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.result-title {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.condition-label {
  color: var(--el-color-primary);
}

.keyword {
  font-weight: 700;
}

.result-count {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.empty-search {
  text-align: center;
  padding: 3rem 1rem;
  border-radius: 16px;
  background: var(--el-fill-color-light);
}

.empty-icon {
  margin-bottom: 0.75rem;
}

.empty-text {
  font-size: 1rem;
  color: var(--el-text-color-regular);
  margin-bottom: 0.75rem;
}
</style>
