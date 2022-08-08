<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <div>
      {{ ActiveElement.name }}
      ({{ ActiveElement.x }}, {{ ActiveElement.y }})
    </div>
    <el-button type="danger" icon="el-icon-delete" @click="delete_activated()" circle></el-button>
    <el-button type="primary" icon="el-icon-top" @click="ActiveElement.z++" circle></el-button>
    <el-button type="primary" icon="el-icon-bottom" @click="ActiveElement.z--" circle></el-button>
    <div>
      <span>显示文字：</span>
      <span><el-input style="width: 200px" v-model="ActiveElement.text"></el-input></span>
    </div>
    <div>
      <span>字体大小：</span>
      <span
        ><el-input-number
          style="width: 200px"
          v-model="ActiveElement.font_size"
          :min="12"
          :max="64"
        ></el-input-number
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GeneralToolBar',
    props: ['ActiveElement'],
    methods: {
      delete_activated() {
        this.$emit('delete-clicked');
      }
    }
  };
</script>
