<template>
  <div v-if="post" class="board-detail-page page-container">
    <el-card class="detail-card" shadow="hover">
      <template v-if="post.isPrivate && !canViewPrivate">
        <div class="private-guard">
          <el-icon class="private-icon"><Lock /></el-icon>
          <p>비밀글은 작성자와 관리자만 볼 수 있습니다.</p>
          <RouterLink :to="{ name: 'board' }">
            <el-button>목록으로</el-button>
          </RouterLink>
        </div>
      </template>
      <template v-else>
        <h1 class="detail-title">
          <el-icon v-if="post.isPrivate" class="title-lock"><Lock /></el-icon>
          {{ post.title }}
        </h1>
        <div class="detail-meta">
          <span class="meta-item">
            <el-icon><User /></el-icon>
            {{ post.author }}
          </span>
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(post.createdAt) }}
          </span>
          <span class="meta-item">
            <el-icon><View /></el-icon>
            {{ post.views }}회
          </span>
        </div>
        <div class="detail-content">{{ post.content }}</div>

        <!-- 답글 목록 -->
        <div v-if="replies.length" class="replies-section">
          <h3 class="replies-title">답글 ({{ replies.length }})</h3>
          <div v-for="r in replies" :key="r.id" class="reply-item">
            <div class="reply-meta">
              <span class="reply-author">{{ r.author }}</span>
              <span class="reply-date">{{ formatDate(r.createdAt) }}</span>
            </div>
            <div class="reply-content">{{ r.content }}</div>
          </div>
        </div>

        <!-- 관리자 답글 작성 -->
        <div v-if="auth.isAdmin" class="reply-form-section">
          <h3 class="replies-title">답글 작성</h3>
          <el-input
            v-model="replyContent"
            type="textarea"
            :rows="4"
            placeholder="답글을 입력하세요."
            maxlength="1000"
            show-word-limit
            class="reply-textarea"
          />
          <el-button type="primary" :disabled="!replyContent.trim()" @click="submitReply">
            답글 등록
          </el-button>
        </div>

        <div class="detail-actions">
          <RouterLink :to="{ name: 'board' }">
            <el-button>목록으로</el-button>
          </RouterLink>
        </div>
      </template>
    </el-card>
  </div>

  <div v-else class="page-container not-found-inline">
    <h1 class="text-h5 inline-title">글을 찾을 수 없습니다.</h1>
    <RouterLink :to="{ name: 'board' }">
      <el-button>목록으로</el-button>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { User, Calendar, View, Lock } from '@element-plus/icons-vue'
import { getPostById } from '../mocks/board'
import { useAuthStore } from '../stores/auth'
import { useBoardStore } from '../stores/board'

const route = useRoute()
const auth = useAuthStore()
const boardStore = useBoardStore()
const replyContent = ref('')

const post = computed(() => getPostById(route.params.id))

const canViewPrivate = computed(() => {
  if (!post.value?.isPrivate) return true
  if (!auth.isLoggedIn) return false
  return auth.isAdmin || post.value.author === auth.displayName
})

const replies = computed(() => boardStore.getReplies(post.value?.id ?? ''))

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function submitReply() {
  const content = replyContent.value.trim()
  if (!content || !post.value) return
  boardStore.addReply(post.value.id, { author: auth.displayName, content })
  replyContent.value = ''
}
</script>

<style scoped>
.board-detail-page {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.detail-card {
  border-radius: var(--app-radius);
  overflow: hidden;
}

.private-guard {
  text-align: center;
  padding: 3rem 1.5rem;
  color: var(--el-text-color-secondary);
}
.private-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}
.private-guard p {
  margin-bottom: 1.25rem;
  font-size: 1rem;
}

.detail-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.4;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.title-lock {
  font-size: 1.2rem;
  color: var(--el-text-color-secondary);
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-item .el-icon {
  font-size: 1rem;
}

.detail-content {
  white-space: pre-wrap;
  line-height: 1.7;
  color: var(--el-text-color-primary);
  min-height: 120px;
  margin-bottom: 1.5rem;
}

.replies-section {
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--el-border-color-lighter);
}
.replies-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.reply-item {
  padding: 0.75rem 1rem;
  background: var(--el-fill-color-lighter);
  border-radius: var(--app-radius-sm);
  margin-bottom: 0.5rem;
}
.reply-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
  font-size: 0.85rem;
  color: var(--el-text-color-secondary);
}
.reply-author {
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.reply-content {
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 0.95rem;
}

.reply-form-section {
  margin-bottom: 1.5rem;
}
.reply-form-section .replies-title {
  margin-bottom: 0.5rem;
}
.reply-textarea {
  margin-bottom: 0.75rem;
}
.reply-textarea :deep(textarea) {
  border-radius: var(--app-radius-sm);
}

.detail-actions .el-button {
  border-radius: 10px;
  font-weight: 500;
}

.not-found-inline {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.inline-title {
  margin-bottom: 1rem;
}
</style>
