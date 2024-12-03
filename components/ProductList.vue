<template>
    <div class="product-list-container">
    <h2 class="text-center mb-4">YENİ ÜRÜNLERİ KEŞFET</h2>
      <div class="product-list">

        <div
          v-for="(product, index) in products"
          :key="index"
          class="product-item"
          @mouseover="showSizePopup(index)"
          @mouseleave="hideSizePopup"
        >
          <div class="image-container">
            <img :src="product.image" :alt="product.name" />
            
            <!-- Beden Seçimi Pop-up -->
            <div v-if="sizePopupVisible === index" class="size-popup">
              <div class="size-options">
                <button v-for="size in product.sizes" :key="size" class="size-button">{{ size }}</button>
              </div>
            </div>
          </div>
  
          <h4>{{ product.name }}</h4>
          <p>{{ product.price }}₺</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sizePopupVisible: null,
        products: [
          { 
            name: 'Galatasaray We Are Gala T-Shirt E242231', 
            price: 100, 
            image: '/1.webp',
            sizes: ['S', 'M', 'L', 'XL']
          },
          { 
            name: 'Galatasaray Erkek Sweatshirt Y242215', 
            price: 200, 
            image: '/2.webp',
            sizes: ['M', 'L', 'XL']
          },
          { 
            name: 'Galatasaray Çocuk Rüzgarlık C242093', 
            price: 300, 
            image: '/3.webp',
            sizes: ['S', 'M']
          },
          { 
            name: 'Galatasaray Erkek Sweatshirt E242133', 
            price: 400, 
            image: '/4.webp',
            sizes: ['M', 'L']
          },
          { 
            name: 'Galatasaray Çocuk Polo T-Shirt C242063', 
            price: 500, 
            image: '/5.webp',
            sizes: ['S', 'L']
          },
        ],
      };
    },
    methods: {
      addToCart(product) {
        this.$emit('add-to-cart', product);
      },
      showSizePopup(index) {
        this.sizePopupVisible = index;
      },
      hideSizePopup() {
        this.sizePopupVisible = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .product-list-container {
    width: 100%;
    overflow: hidden;
    padding: 20px;
  }
  
  .product-list {
    display: flex;
    gap: 20px;
    overflow-x: auto;
  }
  
  .product-item {
    position: relative;
    width: 220px;
    text-align: center;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .image-container {
    position: relative;
    width: 100%;
  }
  
  .product-item img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .product-item h4 {
    font-size: 1.1rem;
    margin: 10px 0;
  }
  
  .product-item p {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .product-item button {
    padding: 8px 12px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .product-item button:hover {
    background-color: #0056b3;
  }
  
  /* Beden Seçimi Pop-up */
  .size-popup {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 10;
  }
  
  .size-options {
    display: flex;
    gap: 10px;
  }
  
  .size-button {
    padding: 6px 12px;
    background-color: #d3d3d3; /* Gri tonlarında */
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .size-button:hover {
    background-color: #999; /* Hover efekti için koyu gri */
  }
  </style>
  
