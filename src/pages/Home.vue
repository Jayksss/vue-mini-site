<script setup>
import { computed } from 'vue'
import { loadJson } from '../utils/storage'

const todos = loadJson('vue-mini-site.todos', [])
const notes = loadJson('vue-mini-site.notes', [])

const todoCount = computed(() => todos.length)
const doneCount = computed(() => todos.filter(t => t.done).length)
const noteCount = computed(() => notes.length)
</script>

<template>
  <section>
    <h2>Home</h2>
    <p class="desc">
      간단한 업무 대시보드 예제. 상단 메뉴로 이동하면서 “URL ↔ 화면”이 어떻게 연결되는지 확인.
    </p>

    <div class="cards">
      <div class="card">
        <h3>Todos</h3>
        <p>총 {{ todoCount }}개</p>
        <p>완료 {{ doneCount }}개</p>
        <router-link to="/todos">할 일 보러가기 →</router-link>
      </div>

      <div class="card">
        <h3>Notes</h3>
        <p>총 {{ noteCount }}개</p>
        <router-link to="/notes">메모 보러가기 →</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.desc { color: var(--muted); }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.card {
  border: 1px solid var(--border);
  background: var(--card);
  border-radius: var(--radius);
  padding: 14px;
}

.card h3 { margin: 0 0 8px; }
.card a { text-decoration: none; }
</style>