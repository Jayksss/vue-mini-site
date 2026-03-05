<template>
  <div class="main-page">
    <div class="search-bar">
      <div class="page-container">
        <div class="search-wrap">
          <SearchForm @search="runSearch" />
        </div>
      </div>
    </div>

    <section class="banner-slider">
      <div ref="sliderEl" class="slider-track" @scroll="onSliderScroll">
        <div
          v-for="(banner, i) in mainBanners"
          :key="banner.id"
          class="slide"
          :style="{ width: slideWidth }"
        >
          <div class="slide-img-wrap">
            <img :src="banner.image" :alt="banner.title" class="slide-img" />
            <div class="slide-caption">
              <div class="slide-title">{{ banner.title }}</div>
              <div class="slide-subtitle">{{ banner.subtitle }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-controls">
        <el-button circle class="slider-btn prev" @click="goSlide(currentSlide - 1)">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <el-button circle class="slider-btn next" @click="goSlide(currentSlide + 1)">
          <el-icon><ArrowRight /></el-icon>
        </el-button>
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

    <section
      ref="sectionProducts"
      class="section section-products"
      :class="{ visible: sectionProductsVisible }"
    >
      <div class="page-container">
        <h2 class="section-title">오늘의 주요 상품</h2>
        <el-row :gutter="16">
          <el-col v-for="p in products" :key="p.id" :xs="24" :sm="12" :md="8">
            <ProductCard :product="p" />
          </el-col>
        </el-row>
      </div>
    </section>

    <section
      ref="sectionEvents"
      class="section section-events"
      :class="{ visible: sectionEventsVisible }"
    >
      <div class="page-container">
        <h2 class="section-title">이벤트</h2>
        <el-row :gutter="16">
          <el-col v-for="event in events" :key="event.id" :xs="24" :sm="12" :md="8">
            <el-card class="event-card" shadow="hover">
              <el-image :src="event.image" :alt="event.title" fit="cover" style="height: 140px; width: 100%; border-radius: 8px;" />
              <div style="padding-top: 12px;">
                <el-tag size="small" type="primary" class="mb-2">{{ event.tag }}</el-tag>
                <div class="event-title">{{ event.title }}</div>
                <div class="event-desc">{{ event.description }}</div>
                <div class="event-period">{{ event.period }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
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

.slide-img-wrap {
  position: relative;
  height: 50vw;
  min-height: 280px;
  max-height: 420px;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
}

.slide-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.slide-subtitle {
  font-size: 0.875rem;
  opacity: 0.9;
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
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.event-card {
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
}

.event-title {
  font-weight: 600;
  font-size: 1rem;
}

.event-desc {
  font-size: 0.875rem;
  color: var(--el-text-color-regular);
  margin-top: 0.25rem;
}

.event-period {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
