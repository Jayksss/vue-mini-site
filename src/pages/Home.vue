<template>
  <div class="main-page">
    <!-- 통합검색 -->
    <div class="search-bar">
      <v-container>
        <div class="search-wrap">
          <SearchForm @search="runSearch" />
        </div>
      </v-container>
    </div>

    <!-- 가로 슬라이드 배너 -->
    <section class="banner-slider">
      <div
        ref="sliderEl"
        class="slider-track"
        @scroll="onSliderScroll"
      >
        <div
          v-for="(banner, i) in mainBanners"
          :key="banner.id"
          class="slide"
          :style="{ width: slideWidth }"
        >
          <v-img
            :src="banner.image"
            :alt="banner.title"
            cover
            class="slide-img"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          >
            <div class="slide-caption pa-4">
              <div class="text-h5 font-weight-bold">{{ banner.title }}</div>
              <div class="text-body-1 opacity-90">{{ banner.subtitle }}</div>
            </div>
          </v-img>
        </div>
      </div>
      <div class="slider-controls">
        <v-btn
          icon
          variant="flat"
          color="surface"
          class="slider-btn prev"
          @click="goSlide(currentSlide - 1)"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="flat"
          color="surface"
          class="slider-btn next"
          @click="goSlide(currentSlide + 1)"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <div class="slider-dots">
        <button
          v-for="(_, i) in mainBanners"
          :key="i"
          type="button"
          class="dot"
          :class="{ active: currentSlide === i }"
          :aria-label="`슬라이드 ${i + 1}`"
          @click="goSlide(i)"
        />
      </div>
    </section>

    <!-- 오늘의 주요 상품 (스크롤 시 등장) -->
    <section
      ref="sectionProducts"
      class="section section-products"
      :class="{ visible: sectionProductsVisible }"
    >
      <v-container>
        <h2 class="section-title text-h4 mb-4">오늘의 주요 상품</h2>
        <v-row dense>
          <v-col
            v-for="p in products"
            :key="p.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ProductCard :product="p" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 이벤트 영역 (스크롤 시 등장) -->
    <section
      ref="sectionEvents"
      class="section section-events"
      :class="{ visible: sectionEventsVisible }"
    >
      <v-container>
        <h2 class="section-title text-h4 mb-4">이벤트</h2>
        <v-row dense>
          <v-col
            v-for="event in events"
            :key="event.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card variant="outlined" class="event-card fill-height">
              <v-img
                :src="event.image"
                :alt="event.title"
                height="140"
                cover
                class="bg-grey-lighten-2"
              />
              <v-card-text>
                <v-chip size="small" color="primary" class="mb-2">{{ event.tag }}</v-chip>
                <div class="text-subtitle-1 font-weight-bold">{{ event.title }}</div>
                <div class="text-body-2 text-medium-emphasis mt-1">{{ event.description }}</div>
                <div class="text-caption text-medium-emphasis mt-2">{{ event.period }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import SearchForm from '../components/SearchForm.vue'
import { products } from '../mocks/products'
import { mainBanners, events } from '../mocks/banners'

const router = useRouter()
const sliderEl = ref(null)
const currentSlide = ref(0)
const slideWidth = ref('100%')
const sectionProducts = ref(null)
const sectionEvents = ref(null)
const sectionProductsVisible = ref(false)
const sectionEventsVisible = ref(false)
let observer = null
let autoSlideTimer = null
const AUTO_SLIDE_MS = 5000

function setSlideWidth() {
  if (typeof window === 'undefined') return
  slideWidth.value = `${window.innerWidth}px`
}

function runSearch({ keyword, condition }) {
  router.push({
    name: 'search',
    query: { keyword: keyword || undefined, condition: condition || 'all' },
  })
}

function goSlide(index) {
  if (!sliderEl.value) return
  const len = mainBanners.length
  const i = ((index % len) + len) % len
  currentSlide.value = i
  sliderEl.value.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' })
  startAutoSlide()
}

function onSliderScroll() {
  if (!sliderEl.value) return
  const w = window.innerWidth
  const len = mainBanners.length
  const i = Math.round(sliderEl.value.scrollLeft / w)
  currentSlide.value = Math.max(0, Math.min(i, len - 1))
}

function setupIntersectionObserver() {
  if (typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === sectionProducts.value) sectionProductsVisible.value = entry.isIntersecting
        if (entry.target === sectionEvents.value) sectionEventsVisible.value = entry.isIntersecting
      })
    },
    { rootMargin: '-50px 0px -50px 0px', threshold: 0.1 }
  )
  if (sectionProducts.value) observer.observe(sectionProducts.value)
  if (sectionEvents.value) observer.observe(sectionEvents.value)
}

function startAutoSlide() {
  stopAutoSlide()
  autoSlideTimer = setInterval(() => {
    goSlide(currentSlide.value + 1)
  }, AUTO_SLIDE_MS)
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

onMounted(() => {
  setSlideWidth()
  window.addEventListener('resize', setSlideWidth)
  setupIntersectionObserver()
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
  window.removeEventListener('resize', setSlideWidth)
  if (observer) {
    if (sectionProducts.value) observer.unobserve(sectionProducts.value)
    if (sectionEvents.value) observer.unobserve(sectionEvents.value)
  }
})
</script>

<style scoped>
.main-page {
  padding-bottom: 3rem;
  overflow-x: hidden;
  max-width: 100%;
}

.search-bar {
  padding: 0.75rem 0;
}

.search-wrap {
  max-width: 720px;
  margin: 0 auto;
}

.banner-slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-track {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.slider-track::-webkit-scrollbar {
  display: none;
}

.slider-track {
  scrollbar-width: none;
}

.slide {
  flex: 0 0 auto;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.slide-img {
  height: 50vw;
  min-height: 280px;
  max-height: 420px;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.slider-controls {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}

.slider-btn {
  pointer-events: auto;
}

.slider-dots {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.dot:hover,
.dot.active {
  background: rgba(255, 255, 255, 1);
}

.dot.active {
  transform: scale(1.2);
}

.section {
  padding: 3rem 0;
  opacity: 0.4;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-weight: 700;
  letter-spacing: -0.02em;
}

.event-card {
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
</style>
