<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left; display: flex;">
    <span>卡片颜色：</span>
    <span>
      <el-color-picker @active-change="change_card_color"></el-color-picker>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'CardToolBar',
    props: ['ActiveElement'],
    data() {
      return {
        color: '',
      };
    },
    methods: {
      change_card_color(color) {
        // eslint-disable-next-line vue/no-mutating-props
        this.ActiveElement.advanced_style = 'background-color:' + color + ';';     
      },
    },
  };
</script>
