<template>
  <div class="util-buttons">
    <!-- 위로가기 (단독) -->
    <v-tooltip location="left">
      <template #activator="{ props: tooltipProps }">
        <v-btn
          v-bind="tooltipProps"
          icon
          size="small"
          variant="flat"
          class="util-btn util-btn-top"
          aria-label="페이지 맨 위로"
          @click="scrollToTop"
        >
          <v-icon size="small">mdi-arrow-up</v-icon>
        </v-btn>
      </template>
      <span>페이지 맨 위로</span>
    </v-tooltip>

    <!-- 모음 버튼: 클릭 시 펼쳐짐 -->
    <div class="util-collection">
      <transition name="util-expand">
        <div v-show="expanded" class="util-expanded">
          <v-tooltip location="left">
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-bind="tooltipProps"
                icon
                size="small"
                variant="flat"
                class="util-btn"
                aria-label="통합검색"
                @click="openSearchModal = true"
              >
                <v-icon size="small">mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>통합검색</span>
          </v-tooltip>
          <v-tooltip location="left">
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-bind="tooltipProps"
                icon
                size="small"
                variant="flat"
                class="util-btn"
                aria-label="인쇄"
                @click="printPage"
              >
                <v-icon size="small">mdi-printer</v-icon>
              </v-btn>
            </template>
            <span>인쇄</span>
          </v-tooltip>
          <v-tooltip location="left">
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-bind="tooltipProps"
                icon
                size="small"
                variant="flat"
                class="util-btn"
                aria-label="링크 복사"
                @click="openLinkModal = true"
              >
                <v-icon size="small">mdi-link-variant</v-icon>
              </v-btn>
            </template>
            <span>링크 복사</span>
          </v-tooltip>
        </div>
      </transition>
      <v-tooltip location="left">
        <template #activator="{ props: tooltipProps }">
          <v-btn
            v-bind="tooltipProps"
            icon
            size="small"
            variant="flat"
            class="util-btn util-btn-main"
            aria-label="더보기"
            @click="expanded = !expanded"
          >
            <v-icon size="small">{{ expanded ? 'mdi-close' : 'mdi-dots-horizontal' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ expanded ? '접기' : '더보기' }}</span>
      </v-tooltip>
    </div>

    <!-- 통합검색 모달 -->
    <v-dialog v-model="openSearchModal" max-width="520" persistent class="search-modal-dialog">
      <v-card class="search-modal-card">
        <v-card-title class="text-subtitle-1 font-weight-bold">통합검색</v-card-title>
        <v-card-text>
          <SearchForm @search="onSearchSubmit" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="openSearchModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 링크 복사 모달 -->
    <v-dialog v-model="openLinkModal" max-width="420" persistent>
      <v-card>
        <v-card-title class="text-subtitle-1">현재 페이지 링크</v-card-title>
        <v-card-text>
          <v-text-field
            :model-value="currentUrl"
            readonly
            variant="outlined"
            density="compact"
            hide-details
            class="mb-2"
          />
          <p class="text-caption text-medium-emphasis">위 링크를 복사하여 공유할 수 있습니다.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="openLinkModal = false">닫기</v-btn>
          <v-btn color="primary" variant="flat" @click="copyLink">
            {{ copySuccess ? '복사됨' : '복사' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
  right: 1.25rem;
  bottom: 1.5rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.util-btn {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.util-btn-top {
  border-radius: 50%;
}

.util-collection {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.util-expanded {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.util-btn-main {
  border-radius: 50%;
}

.util-expand-enter-active,
.util-expand-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.util-expand-enter-from,
.util-expand-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.search-modal-card {
  border-radius: 16px;
}

@media print {
  .util-buttons {
    display: none;
  }
}
</style>
