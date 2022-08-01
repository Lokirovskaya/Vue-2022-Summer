<template>
  <div id="app">
    <nav>
      <router-link to="/">主页</router-link> |
      <router-link to="/teammanagement">团队管理</router-link> |
      <router-link to="/login">登录</router-link>
    </nav>
    <PageMenu>
      <router-view />
    </PageMenu>
    
  </div>
</template>
<script>
  import PageMenu from '@/components/PageMenu.vue';
  export default{
    components: { PageMenu }
  }
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
