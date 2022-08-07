<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">主页</router-link> |
      <router-link to="/teammanagement">团队管理</router-link> |
      <router-link to="/login">登录</router-link> |
      <router-link to="/project">项目</router-link> |
      <router-link to="/team">团队主页</router-link> |
      <router-link to="/personcenter">个人中心</router-link> |
      <router-link to="/prototype">原型设计</router-link> |
      <router-link to="/fileedit">文档编辑</router-link>
    </nav> -->
    <MenuTop />

    <MenuLeft v-if="this.$store.state.login_state !== 0">
      <router-view />
    </MenuLeft>
    <router-view v-else />
  </div>
</template>

<script>
  import MenuTop from '@/components/MenuTop.vue';
  import MenuLeft from '@/components/MenuLeft.vue';
  export default {
    components: { MenuTop, MenuLeft },
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

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
