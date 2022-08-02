<template>
    <div>

      <div v-if="this.$store.state.login_state == 0" class="login">
        <h1>请登录</h1>

      </div>


    </div>

</template>

<script>
  export default {
    name: 'PersonCenter',
    data() {
      return {
        
      }
    },
    methods:
    {
      
    },
  };
</script>

<style>
  
</style>