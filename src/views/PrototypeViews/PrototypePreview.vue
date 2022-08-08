<template>
  <div></div>
</template>

<script>
  export default {
    name: 'PrototypePreview',

    data() {
      return {

      };
    },

    methods: {

    },



    watch: {
      $route(to, from) {
        if (to.query.id !== from.query.id) {
          this.id = to.query.id;
          this.get_proj_info();
        }
      },
    },
  };
</script>

<style scoped>

</style>
