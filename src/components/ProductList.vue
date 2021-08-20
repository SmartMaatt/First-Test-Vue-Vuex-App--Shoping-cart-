<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}} - [{{product.inventory}}]
        <button
          :disabled="!productInStock(product)"
          @click="addProductToCart(product)"
        >Add item to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'

export default {
  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters('products', {
      products: 'getProducts',
      productInStock: 'getProductsInStock'
    }),
  },

  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    })
  },

  created() {
    this.loading = true
    this.fetchProducts().then(() => this.loading = false)
  }
}
</script>

<style scoped>
  li {
    list-style-type: none;
    margin: 10px 0;
  }

  li * {
    margin: 0 10px;
  }

  li button {
    cursor: pointer;
  }
</style>
