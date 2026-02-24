<template>
  <section class="wrap">
    <h1 class="title">장바구니</h1>

    <div v-if="cart.items.length === 0" class="empty">
      장바구니가 비어있습니다.
      <div style="margin-top:10px;">
        <RouterLink to="/">상품 보러가기</RouterLink>
      </div>
    </div>

    <div v-else class="list">
      <div class="row" v-for="it in cart.items" :key="it.productId">
        <img class="thumb" :src="it.image" :alt="it.name" />
        <div class="meta">
          <div class="name">{{ it.name }}</div>
          <div class="sub">{{ it.price.toLocaleString() }}원</div>
        </div>

        <input class="qty" type="number" min="1" :value="it.qty" @input="onQty(it.productId, $event)" />

        <div class="sum">{{ (it.price * it.qty).toLocaleString() }}원</div>
        <button class="del" @click="cart.remove(it.productId)">삭제</button>
      </div>

      <div class="total">
        <div>총 수량: <b>{{ cart.totalQty }}</b></div>
        <div>총 금액: <b>{{ cart.totalPrice.toLocaleString() }}원</b></div>
      </div>

      <div class="actions">
        <button class="ghost" @click="cart.clear()">비우기</button>
        <RouterLink class="btn" to="/checkout">주문하기</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()

function onQty(productId, e) {
  cart.setQty(productId, e.target.value)
}
</script>

<style scoped>
.wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 18px 16px;
}

.title {
  margin: 0 0 14px;
}

.empty {
  padding: 18px;
  border: 1px dashed #ddd;
  border-radius: 14px;
  color: #444;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: 72px 1fr 90px 120px 70px;
  gap: 10px;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 10px;
  background: #fff;
}

.thumb {
  width: 72px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
}

.meta .name {
  font-weight: 700;
}

.meta .sub {
  color: #666;
  font-size: 13px;
  margin-top: 4px;
}

.qty {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.sum {
  text-align: right;
  font-weight: 800;
}

.del {
  border: 1px solid #ddd;
  background: #fff;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.total {
  display: flex;
  justify-content: space-between;
  padding: 12px 6px;
  color: #111;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.ghost {
  border: 1px solid #111;
  background: #fff;
  color: #111;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.btn {
  text-decoration: none;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  padding: 10px 12px;
  border-radius: 10px;
}

@media (max-width: 860px) {
  .row {
    grid-template-columns: 72px 1fr 90px;
    grid-auto-rows: auto;
  }

  .sum, .del {
    grid-column: 2 / 4;
    justify-self: end;
  }
}
</style>