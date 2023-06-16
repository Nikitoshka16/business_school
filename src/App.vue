<template>
    <navbar> </navbar>
    <div class="app">
      <router-view>

      </router-view>
  </div>
</template>

<script>
import Navbar from "@/components/MyNavbar.vue";

export default {
  name: 'App',
    components: {Navbar},
  data() {
      return{

      }
  }
}
</script>

<style>
*{

    font-family: 'Nunito', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app{
    padding: 20px;
}
</style>
