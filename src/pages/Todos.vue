<script setup>
import { computed, ref, watch } from 'vue'
import { loadJson, saveJson } from '../utils/storage'

const STORAGE_KEY = 'vue-mini-site.todos'

const todos = ref(loadJson(STORAGE_KEY, []))
const text = ref('')

function addTodo() {
  const v = text.value.trim()
  if (!v) return

  todos.value.unshift({
    id: Date.now(),
    text: v,
    done: false,
    createdAt: new Date().toISOString(),
  })
  text.value = ''
}

function toggleDone(id) {
  const t = todos.value.find(x => x.id === id)
  if (t) t.done = !t.done
}

function removeTodo(id) {
  todos.value = todos.value.filter(x => x.id !== id)
}

const doneCount = computed(() => todos.value.filter(t => t.done).length)
const totalCount = computed(() => todos.value.length)

watch(todos, (v) => saveJson(STORAGE_KEY, v), { deep: true })
</script>

<template>
  <section>
    <h2>Todos</h2>
    <p class="sub">총 {{ totalCount }}개 / 완료 {{ doneCount }}개</p>

    <div class="row">
      <input
          v-model="text"
          class="input"
          placeholder="할 일을 입력하고 Enter"
          @keyup.enter="addTodo"
      />
      <button class="btn" @click="addTodo">추가</button>
    </div>

    <ul class="list" v-if="todos.length">
      <li v-for="t in todos" :key="t.id" class="item">
        <label class="label">
          <input type="checkbox" :checked="t.done" @change="toggleDone(t.id)" />
          <span :class="{ done: t.done }">{{ t.text }}</span>
        </label>
        <button class="ghost" @click="removeTodo(t.id)">삭제</button>
      </li>
    </ul>

    <p v-else class="empty">할 일이 없습니다. 하나 추가해보자.</p>
  </section>
</template>

<style scoped>
.sub { color: var(--muted); margin-top: -6px; }

.row { display: flex; gap: 10px; margin: 14px 0; }

.input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  background: var(--card);
  color: var(--text);
}

.btn {
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #111;
  color: #fff;
}

.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid var(--border);
  background: var(--card);
  border-radius: 12px;
}

.label { display: flex; align-items: center; gap: 10px; }

.done { text-decoration: line-through; color: var(--muted); }

.ghost {
  border: 1px solid var(--border-2);
  background: transparent;
  color: var(--text);
  border-radius: 10px;
  padding: 6px 10px;
}

.empty { color: var(--muted); padding: 10px 0; }
</style>