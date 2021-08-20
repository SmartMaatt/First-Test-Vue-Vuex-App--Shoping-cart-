import shop from "../../api/shop";

export default {
  namespaced: true,

  state: {
    // {id, quantity}
    items: [],
    checkoutStatus: null
  },

  mutations: {
     PUSH_PRODUCT_TO_CART(state, productID){
      state.items.push({
        id: productID,
        quantity: 1
      })
    },

    INCREMENT_ITEM_QUANTITY(state, cartItem){
      cartItem.quantity += 1
    },

    EMPTY_CART(state) {
      state.items = []
    },

    SET_CHECKOUT_STATUS(state, status) {
      state.checkoutStatus = status
    }
  },

  actions: {
    addProductToCart({commit, getters, state, rootGetters}, product){
      if(rootGetters["products/getProductsInStock"](product)) {
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit('PUSH_PRODUCT_TO_CART', product.id)
        } else {
          commit('INCREMENT_ITEM_QUANTITY', cartItem)
        }
        commit('products/DECREMENT_PRODUCT_INVENTORY', product, {root: true})
      }
    },

    checkOut({commit, getters}) {
      shop.buyProducts(
        getters.getCartProducts,
        () => {
          commit('EMPTY_CART');
          commit('SET_CHECKOUT_STATUS', 'succes');
        },
        () => {
          commit('SET_CHECKOUT_STATUS', 'fail');
        }
      )
    }
  },

  getters: {
    getCartProducts(state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    getCartTotal(state, getters) {
      let total = 0;
      for(let i=0; i<getters.getCartProducts.length; i++) {
        total += getters.getCartProducts[i].quantity * getters.getCartProducts[i].price;
      }
      return total;
    },

    getCheckOutStatus(state) {
      return state.checkoutStatus;
    }
  }
}
