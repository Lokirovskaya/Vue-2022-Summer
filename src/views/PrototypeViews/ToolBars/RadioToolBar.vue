<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <span>分组：</span>
    <span style="float: right">
      <el-input
        placeholder="组相同的单选框只能被选中一个"
        style="width: 200px"
        v-model="ActiveElement.props['v-model']"
      ></el-input>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'RadioToolBar',
    props: ['ActiveElement'],
  };
</script>
