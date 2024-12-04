<template>
  <div>
    <Navbar />
    <Slider />
    <SupportButton />
    <ShopByPlayer />
    <ProductList />
    <Discover />
    <Review />
    <Login />
    <Footer />

  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import SupportButton from '~/components/SupportButton.vue';
import Slider from "@/components/Slider.vue";
import ShopByPlayer from '@/components/ShopByPlayer'
import Footer from "./components/Footer.vue";
import ProductList from './components/ProductList.vue';
import Discover from "./components/Discover.vue";
import Review from "./components/Review.vue";
import Login from "./components/Login.vue";






export default {
  components: {
    Navbar,
    SupportButton,
    Slider,
    ShopByPlayer,
    Footer,
    ProductList,

  },
  mounted() {
      window.addEventListener('focus', this.setActiveTitle);
      window.addEventListener('blur', this.setInactiveTitle);
    },
    methods: {
      setActiveTitle() {
        document.title = 'GS Store';
      },
      setInactiveTitle() {
        document.title = 'Göster Sevdanı!';
      },
    },
    beforeUnmount() {
      window.removeEventListener('focus', this.setActiveTitle);
      window.removeEventListener('blur', this.setInactiveTitle);
    },
  };
</script>

<style scoped>
div {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}
</style>

