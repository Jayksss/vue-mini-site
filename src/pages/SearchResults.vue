<template>
  <div class="search-results-page">
    <v-container class="py-6">
      <!-- 검색 결과 안내 -->
      <div class="result-header mb-6">
        <h1 class="text-h5 font-weight-bold mb-2">
          <template v-if="keyword">
            <span class="condition-label">{{ conditionLabel }}</span>
            <span class="keyword">"{{ keyword }}"</span>
            <span> 로 검색한 결과입니다.</span>
          </template>
          <template v-else>
            검색어를 입력해 주세요.
          </template>
        </h1>
        <p v-if="keyword" class="text-body-2 text-medium-emphasis">
          검색 결과 <strong>{{ filteredProducts.length }}</strong>건
        </p>
      </div>

      <!-- 검색 결과 없음 -->
      <v-alert
        v-if="keyword && filteredProducts.length === 0"
        type="info"
        variant="tonal"
        class="mb-4"
      >
        검색 결과가 없습니다. 다른 검색어나 검색 조건을 이용해 보세요.
        <v-btn :to="{ name: 'home' }" variant="text" size="small" class="mt-2">메인으로</v-btn>
      </v-alert>

      <!-- 상품 목록 -->
      <v-row v-else-if="filteredProducts.length" dense>
        <v-col
          v-for="p in filteredProducts"
          :key="p.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProductCard :product="p" />
        </v-col>
      </v-row>

      <!-- 검색어 없을 때 메인 유도 -->
      <div v-else class="empty-search text-center py-12">
        <v-icon size="64" color="grey" class="mb-3">mdi-magnify</v-icon>
        <p class="text-body-1 text-medium-emphasis mb-3">상품명, 브랜드, 카테고리 등으로 검색해 보세요.</p>
        <v-btn color="primary" rounded="lg" :to="{ name: 'home' }">메인으로 이동</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}

.result-header h1 {
  letter-spacing: -0.02em;
}

.condition-label {
  color: rgb(var(--v-theme-primary));
}

.keyword {
  font-weight: 700;
}

.empty-search {
  border-radius: 16px;
  background: rgb(var(--v-theme-surface-bright));
}
</style>
