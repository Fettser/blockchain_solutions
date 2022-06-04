<template>
  <div class="container">
    <div class="logo">CWallet</div>
    <div class="burger" @click="onOpenMenu">
      <span class="burger__lay"></span>
      <span class="burger__lay"></span>
      <span class="burger__lay"></span>
    </div>
    <transition name="fade">
      <ul v-if="menuOpen">
        <li @click="$router.push('/briefcase')">Briefcase</li>
        <li @click="$router.push('/converter')">Converter</li>
      </ul>
    </transition>
  </div>
</template>


<script>
export default {
  name: "MenuBar",
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    onOpenMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<style scoped>

div {
  font-size: 30px;
  font-family: Arial, sans-serif;
  color: white;
}

.container {
  height: 60px;
  position: fixed;
  z-index: 50;
  width: 100%;
  background-color: #1b0037;
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
}

.logo {
  margin: 0 10px;
}

.burger {
  display: block;
  position: relative;
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.burger span {
  position: absolute;
  background-color: white;
  left: 0;
  width: 22px;
  height: 2px;
  transition: transform .2s ease-in;
}

.burger span:nth-child(1) {
  top: 0;
  transform-origin: top left;
}

.burger span:nth-child(2) {
  top: 10px;
}

.burger span:last-child {
  bottom: 0;
  transform-origin: bottom left;
}

ul {
  position: fixed;
  height: calc(100% - 60px);
  width: 300px;
  max-width: 50%;
  top: 60px;
  right: 0;
  background-color: #1b0037;
  list-style-type: none;
}

li {
  margin: 10px;
}

li:hover {
  cursor: pointer;
  color: #57a48c;
}

.fade-enter-active,
.fade-leave-active {
  transition: right 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  right: -300px;
}
</style>