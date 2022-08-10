<template>
  <div id="app">
    <MenuLeft v-if="this.$store.state.login_state !== 0">
      <router-view />
    </MenuLeft>
    <router-view v-else />
    <!-- <DocCenter></DocCenter> -->
  </div>
</template>

<script>
  import MenuLeft from '@/components/MenuLeft.vue';
  // import DocCenter from '@/components/DocCenter.vue';
  export default {
    components: { MenuLeft},
  };
</script>
<style>
  body,
  html {
    /* 别动 */
    height: 100%;
    margin: 0px;
    padding: 0px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
</style>
