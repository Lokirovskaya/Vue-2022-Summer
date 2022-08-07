<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <span>按钮颜色：</span>
    <span >
      <el-select v-model="ActiveElement.props.type" placeholder="选择颜色" style="width: 200px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :style="'color:' + item.color + ';font-weight:bold;'"
        >
        </el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'ButtonToolBar',
    props: ['ActiveElement'],
    data() {
      return {
        options: [
          { value: '', label: '白色', color: '#000000' },
          { value: 'primary', label: '蓝色', color: '#409EFF' },
          { value: 'success', label: '绿色', color: '#67C23A' },
          { value: 'info', label: '灰色', color: '#909399' },
          { value: 'warning', label: '橙色', color: '#E6A23C' },
          { value: 'danger', label: '红色', color: '#F56C6C' },
        ],
      };
    },
  };
</script>
