<template>
  <div>
    <Navbar />
    <SupportButton /> 
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import SupportButton from '~/components/SupportButton.vue';


export default {
  components: {
    Navbar,
    SupportButton,
  },
};
</script>

<style scoped>
div {
  font-family: Arial, sans-serif;
  line-height: 1.5;
}
</style>
