import shop from "../../api/shop";

export default {
  namespaced: true,

  state: {
    items: []
  },

  mutations: {
     SET_PRODUCTS(state, items){
      state.items = items
    },

     DECREMENT_PRODUCT_INVENTORY(state, product){
      product.inventory -= 1
    }
  },

  actions: {
    fetchProducts({commit}){
      return new Promise((resolve, reject) => {
        shop.getProducts(items => {
          commit('SET_PRODUCTS', items)
          resolve()
        })
      })
    }
  },

  getters: {
    getProducts(state) {
      return state.items
    },

    getProductsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  }
}
