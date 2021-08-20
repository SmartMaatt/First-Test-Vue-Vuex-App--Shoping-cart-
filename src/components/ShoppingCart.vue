<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}} - [{{product.quantity}}]
      </li>
      <li>{{total | currency}}</li>
    </ul>
    <button
      @click="checkOut">
      Check Out
    </button>
    <p v-if="checkOutStatus">{{checkOutStatus}}</p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'

export default {
  computed: {
    ...mapGetters('cart', {
      products: 'getCartProducts',
      total: 'getCartTotal',
      checkOutStatus: 'getCheckOutStatus'
    })
  },

  methods: {
    ...mapActions('cart',{
      checkOut: 'checkOut'
    })
  }
}
</script>

<style scoped>
ul {
  padding: 0;
}

li {
    list-style-type: none;
    margin: 10px 0;
}

button {
  cursor: pointer
}
</style>
