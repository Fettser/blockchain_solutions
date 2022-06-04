<template>
  <div id="app">
    <menu-bar/>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
export default {
  name: 'App',
  components: {
    MenuBar
  },
  mounted() {
    this.$store.dispatch("rateModule/initialRates")
    this.$store.dispatch("rateModule/fetchRates")
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
