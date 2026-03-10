import { defineStore } from 'pinia'

/** 게시판 답글 저장 (관리자 답글용). postId -> [{ id, author, content, createdAt }] */
export const useBoardStore = defineStore('board', {
  state: () => ({
    repliesByPostId: {}, // { 'b-1001': [{ id, author, content, createdAt }], ... }
  }),
  getters: {
    getReplies: (state) => (postId) => state.repliesByPostId[postId] ?? [],
  },
  actions: {
    addReply(postId, { author, content }) {
      if (!postId || !content?.trim()) return
      const list = this.repliesByPostId[postId] ?? []
      const reply = {
        id: 'r-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        author: author || '관리자',
        content: content.trim(),
        createdAt: new Date().toISOString(),
      }
      this.repliesByPostId[postId] = [...list, reply]
    },
  },
})
