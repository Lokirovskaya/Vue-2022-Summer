<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <span>提示文本：</span>
    <span>
      <el-input style="width: 200px" v-model="ActiveElement.props.placeholder"></el-input>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'InputToolBar',
    props: ['ActiveElement'],
  };
</script>
