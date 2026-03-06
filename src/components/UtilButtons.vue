<template>
  <div class="util-buttons">
    <el-tooltip content="페이지 맨 위로" placement="left">
      <el-button circle class="util-btn" aria-label="페이지 맨 위로" @click.prevent="scrollToTop">
        <el-icon><ArrowUp /></el-icon>
      </el-button>
    </el-tooltip>

    <div class="util-collection">
      <transition name="util-expand">
        <div v-show="expanded" class="util-expanded">
          <el-tooltip content="통합검색" placement="left">
            <el-button circle class="util-btn util-btn-search" type="primary" @click="openSearchModal = true">
              <el-icon><Search /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="인쇄" placement="left">
            <el-button circle class="util-btn" @click="printPage">
              <el-icon><Printer /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="링크 복사" placement="left">
            <el-button circle class="util-btn" @click="openLinkModal = true">
              <el-icon><Link /></el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </transition>
      <el-tooltip :content="expanded ? '접기' : '더보기'" placement="left">
        <el-button circle class="util-btn util-btn-main" @click="expanded = !expanded">
          <el-icon><Close v-if="expanded" /><MoreFilled v-else /></el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <el-dialog
      v-model="openSearchModal"
      title="통합검색"
      width="560px"
      class="search-modal-dialog"
      align-center
    >
      <div class="search-modal-body">
        <SearchForm @search="onSearchSubmit" />
      </div>
      <template #footer>
        <el-button @click="openSearchModal = false">닫기</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="openLinkModal" title="현재 페이지 링크" width="420px">
      <el-input :model-value="currentUrl" readonly class="mb-2" />
      <p class="text-caption">위 링크를 복사하여 공유할 수 있습니다.</p>
      <template #footer>
        <el-button @click="openLinkModal = false">닫기</el-button>
        <el-button type="primary" @click="copyLink">{{ copySuccess ? '복사됨' : '복사' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowUp, Search, Printer, Link, Close, MoreFilled } from '@element-plus/icons-vue'
import SearchForm from './SearchForm.vue'

const route = useRoute()
const router = useRouter()
const expanded = ref(false)
const openSearchModal = ref(false)
const openLinkModal = ref(false)
const copySuccess = ref(false)

const currentUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  return window.location.origin + route.fullPath
})

function scrollToTop() {
  const el = document.scrollingElement || document.documentElement || document.body
  if (el) {
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function printPage() {
  window.print()
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copySuccess.value = true
    setTimeout(() => { copySuccess.value = false }, 2000)
  } catch {
    copySuccess.value = false
  }
}

function onSearchSubmit({ keyword, condition }) {
  openSearchModal.value = false
  expanded.value = false
  router.push({
    name: 'search',
    query: { keyword: keyword || undefined, condition: condition || 'all' },
  })
}
</script>

<style scoped>
.util-buttons {
  position: fixed;
  right: 1.5rem;
  bottom: 1.75rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.util-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  padding: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.util-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.util-btn :deep(.el-icon) {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.util-btn-main {
  background: var(--el-bg-color) !important;
  border: 1px solid var(--el-border-color-lighter) !important;
}

.util-btn-search {
  background: var(--el-color-primary) !important;
  border-color: var(--el-color-primary) !important;
}

.util-btn-search :deep(.el-icon) {
  color: #fff;
}

.util-collection {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.util-expanded {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.util-expanded .el-tooltip__trigger {
  display: flex;
  justify-content: flex-end;
}

.util-expand-enter-active,
.util-expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.util-expand-enter-from,
.util-expand-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.text-caption {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.search-modal-body {
  padding: 0.5rem 0;
}

.search-modal-dialog :deep(.el-dialog__body) {
  padding-top: 0;
  padding-bottom: 12px;
}

.search-modal-dialog :deep(.el-dialog) {
  border-radius: 16px;
}

@media print {
  .util-buttons {
    display: none;
  }
}
</style>
