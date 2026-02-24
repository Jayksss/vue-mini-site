import { defineStore } from 'pinia'
import { loadJSON, saveJSON } from '../utils/storage'

const STORAGE_KEY = 'vue-mini-site.cart'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: loadJSON(STORAGE_KEY, []), // [{ productId, name, price, qty, image }]
    }),
    getters: {
        totalQty: (state) => state.items.reduce((sum, it) => sum + it.qty, 0),
        totalPrice: (state) => state.items.reduce((sum, it) => sum + it.price * it.qty, 0),
    },
    actions: {
        persist() {
            saveJSON(STORAGE_KEY, this.items)
        },
        add(product, qty = 1) {
            const found = this.items.find((it) => it.productId === product.id)
            if (found) found.qty += qty
            else {
                this.items.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    qty,
                })
            }
            this.persist()
        },
        remove(productId) {
            this.items = this.items.filter((it) => it.productId !== productId)
            this.persist()
        },
        setQty(productId, qty) {
            const found = this.items.find((it) => it.productId === productId)
            if (!found) return
            const next = Number(qty)
            if (Number.isNaN(next) || next <= 0) {
                this.remove(productId)
                return
            }
            found.qty = next
            this.persist()
        },
        clear() {
            this.items = []
            this.persist()
        },
    },
})