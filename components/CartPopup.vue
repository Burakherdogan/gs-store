<template>
    <div v-if="visible" class="cart-popup">
      <div class="cart-popup-content">
        <h5>Sepetiniz</h5>
        <ul class="cart-items">
          <li v-for="(item, index) in cartItems" :key="index">
            <div class="cart-item">
              <img :src="item.image" alt="Product" class="cart-item-image" />
              <div class="cart-item-details">
                <span class="cart-item-name">{{ item.name }}</span>
                <span class="cart-item-price">{{ item.price }}₺</span>
              </div>
              <button @click="removeFromCart(index)" class="remove-item">X</button>
            </div>
          </li>
        </ul>
        <div class="cart-total">
          <span><strong>Toplam:</strong> {{ total }}₺</span>
        </div>
        <button class="checkout-btn">Ödeme</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      cartItems: Array
    },
    computed: {
      total() {
        return this.cartItems.reduce((sum, item) => sum + item.price, 0);
      }
    },
    methods: {
      removeFromCart(index) {
        this.$emit("remove-item", index);
      }
    }
  }
  </script>
  
  <style scoped>
  .cart-popup {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    padding: 20px;
    z-index: 1000;
  }
  
  .cart-popup-content {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .cart-items {
    list-style-type: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .cart-item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  
  .cart-item-details {
    flex-grow: 1;
    margin-left: 10px;
  }
  
  .cart-item-name {
    display: block;
    font-size: 14px;
  }
  
  .cart-item-price {
    font-size: 12px;
    color: gray;
  }
  
  .remove-item {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
  }
  
  .cart-total {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
  }
  </style>
  
