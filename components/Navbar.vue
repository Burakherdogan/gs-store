<template>
  <nav
    class="navbar navbar-expand-lg fixed-top navbar-light"
    :class="{ 'scrolled': isScrolled }"
  >
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="/gs-logo-white.svg" alt="Logo" class="logo me-2" style="width: 200px; height: auto;" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">MAÇ GÜNÜ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">ANTRENMAN</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">KAMP</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">GİYİM</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">AKSESUAR</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">SHOP BY PLAYER</a>
          </li>
        </ul>

        <form class="d-flex ms-3">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Ara"
            aria-label="Ara"
          />
          <button class="btn btn-outline-dark" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div class="icons ms-3" @mouseover="showCartPopup" @mouseleave="hideCartPopup">
          <i class="bi bi-person me-3"></i>
          <i class="bi bi-star me-3"></i>
          <i class="bi bi-cart" @click="toggleCartPopup"></i>
        </div>
      </div>
    </div>

    <!-- CartPopup Component -->
    <CartPopup
      :visible="cartPopupVisible"
      :cartItems="cartItems"
      @remove-item="removeItemFromCart"
    />
  </nav>
</template>

<script>
import CartPopup from './CartPopup.vue';

export default {
  components: {
    CartPopup
  },
  data() {
    return {
      isScrolled: false,
      cartPopupVisible: false,
      cartItems: [
        { name: 'Product 1', price: 100, image: '/path-to-image1.jpg' },
        { name: 'Product 2', price: 200, image: '/path-to-image2.jpg' }
      ]
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleCartPopup() {
      this.cartPopupVisible = !this.cartPopupVisible;
    },
    showCartPopup() {
      this.cartPopupVisible = true;
    },
    hideCartPopup() {
      this.cartPopupVisible = false;
    },
    removeItemFromCart(index) {
      this.cartItems.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
}
.navbar.scrolled {
  background-color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: black;
  transition: color 0.3s;
}
.navbar.scrolled .nav-link:hover {
  color: #ff0000; 
}

.logo {
  width: 40px;
  height: 40px;
}

.icons i {
  font-size: 1.5rem;
  color: black;
  transition: color 0.3s;
}
.navbar.scrolled .icons i:hover {
  color: #ff0000; 
}
</style>

