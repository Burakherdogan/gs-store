export default defineNuxtConfig({
  css: [
    "bootstrap/dist/css/bootstrap.min.css", 
    "bootstrap-icons/font/bootstrap-icons.css", 
  ],
  plugins: [
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],
  build: {
    transpile: [],
  },
});
