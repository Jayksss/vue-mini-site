<template>
  <div class="board-page page-container">
    <h1 class="page-title">게시판</h1>
    <p class="page-desc">공지사항 및 문의 게시판입니다.</p>

    <el-card class="board-card" shadow="hover">
      <el-table
        :data="pagePosts"
        style="width: 100%"
        class="board-table"
        :row-class-name="getRowClassName"
        @row-click="goDetail"
      >
        <el-table-column type="index" label="번호" width="72" align="center">
          <template #default="{ $index }">
            {{ rowNumber($index) }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="제목" min-width="240">
          <template #default="{ row }">
            <span class="title-cell">
              <el-icon v-if="row.isPinned" class="pin-icon" title="상단고정"><Rank /></el-icon>
              <el-icon v-if="row.isPrivate && !canViewPrivate(row)" class="lock-icon"><Lock /></el-icon>
              {{ row.isPrivate && !canViewPrivate(row) ? '비밀글' : row.title }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="작성자" width="120" align="center" />
        <el-table-column prop="createdAt" label="작성일" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="views" label="조회" width="80" align="center" />
      </el-table>
      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="sortedPosts.length"
          layout="prev, pager, next, total"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Lock, Rank } from '@element-plus/icons-vue'
import { boardPosts } from '../mocks/board'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const currentPage = ref(1)
const pageSize = 10

const sortedPosts = computed(() => {
  const list = [...boardPosts]
  const pinned = list
    .filter((p) => p.isPinned)
    .sort((a, b) => (a.pinOrder ?? 999) - (b.pinOrder ?? 999))
  const rest = list.filter((p) => !p.isPinned).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return [...pinned, ...rest]
})

const pagePosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedPosts.value.slice(start, start + pageSize)
})

function getRowClassName({ row }) {
  return row.isPinned ? 'pinned-row' : ''
}

function rowNumber(index) {
  const total = sortedPosts.value.length
  const start = (currentPage.value - 1) * pageSize
  return total - start - index
}

function canViewPrivate(post) {
  if (!post.isPrivate) return true
  if (!auth.isLoggedIn) return false
  return auth.isAdmin || post.author === auth.displayName
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

function goDetail(row) {
  if (row.isPrivate && !canViewPrivate(row)) {
    ElMessage.info('비밀글은 작성자와 관리자만 볼 수 있습니다.')
    return
  }
  router.push({ name: 'boardDetail', params: { id: row.id } })
}
</script>

<style scoped>
.board-page {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.35rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--el-color-primary);
  display: inline-block;
}

.page-desc {
  color: var(--el-text-color-regular);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.board-card {
  border-radius: var(--app-radius);
  overflow: hidden;
}

.board-table {
  cursor: pointer;
}

.board-table :deep(.el-table__row:hover) {
  background: var(--el-fill-color-light);
}

.board-table :deep(.el-table__row.pinned-row) {
  background: var(--el-color-primary-light-9);
}
html.dark .board-table :deep(.el-table__row.pinned-row) {
  background: color-mix(in srgb, var(--el-color-primary) 18%, var(--el-bg-color));
}
.board-table :deep(.el-table__row.pinned-row:hover) {
  background: var(--el-color-primary-light-8);
}
html.dark .board-table :deep(.el-table__row.pinned-row:hover) {
  background: color-mix(in srgb, var(--el-color-primary) 25%, var(--el-bg-color));
}

.pagination-wrap {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.title-cell {
  font-weight: 500;
  color: var(--el-text-color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.pin-icon {
  font-size: 1rem;
  color: var(--el-color-primary);
  margin-right: 0.25rem;
}
.lock-icon {
  font-size: 1rem;
  color: var(--el-text-color-secondary);
}
</style>
