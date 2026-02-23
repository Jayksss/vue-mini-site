<script setup>
import { ref, watch } from 'vue'
import { loadJson, saveJson } from '../utils/storage'

const STORAGE_KEY = 'vue-mini-site.notes'

const notes = ref(loadJson(STORAGE_KEY, []))
const title = ref('')
const body = ref('')

function addNote() {
  const t = title.value.trim()
  const b = body.value.trim()
  if (!t && !b) return

  notes.value.unshift({
    id: Date.now(),
    title: t || '(제목 없음)',
    body: b,
    createdAt: new Date().toISOString(),
  })

  title.value = ''
  body.value = ''
}

function removeNote(id) {
  notes.value = notes.value.filter(n => n.id !== id)
}

watch(notes, (v) => saveJson(STORAGE_KEY, v), { deep: true })
</script>

<template>
  <section>
    <h2>Notes</h2>

    <div class="card">
      <input v-model="title" class="input" placeholder="제목" />
      <textarea v-model="body" class="textarea" placeholder="내용"></textarea>
      <button class="btn" @click="addNote">저장</button>
    </div>

    <div class="grid" v-if="notes.length">
      <article v-for="n in notes" :key="n.id" class="note">
        <div class="note-head">
          <h3 class="note-title">{{ n.title }}</h3>
          <button class="ghost" @click="removeNote(n.id)">삭제</button>
        </div>
        <p class="note-body" v-if="n.body">{{ n.body }}</p>
        <p class="note-empty" v-else>내용 없음</p>
      </article>
    </div>

    <p v-else class="empty">메모가 없습니다. 하나 저장해보자.</p>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid var(--border);
  background: var(--card);
  border-radius: var(--radius);
  padding: 14px;
  display: grid;
  gap: 10px;
  margin: 14px 0;
}

.input {
  padding: 10px 12px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  background: var(--card-2);
  color: var(--text);
}

.textarea {
  min-height: 90px;
  padding: 10px 12px;
  border: 1px solid var(--border-2);
  border-radius: 10px;
  background: var(--card-2);
  color: var(--text);
  resize: vertical;
}

.btn {
  justify-self: start;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #111;
  color: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.note {
  border: 1px solid var(--border);
  background: var(--card);
  border-radius: var(--radius);
  padding: 12px;
}

.note-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; }

.note-title { margin: 0; font-size: 16px; }

.note-body {
  white-space: pre-wrap;
  margin: 10px 0 0;
  color: var(--text);
}

.note-empty { margin: 10px 0 0; color: var(--muted); }

.ghost {
  border: 1px solid var(--border-2);
  background: transparent;
  color: var(--text);
  border-radius: 10px;
  padding: 6px 10px;
}

.empty { color: var(--muted); padding: 10px 0; }
</style>