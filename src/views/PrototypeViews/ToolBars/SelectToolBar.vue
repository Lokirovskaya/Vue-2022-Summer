<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <div>
      <span>选项：</span>
      <span>
        <el-select v-model="ActiveElement.props.type" placeholder="选择颜色" style="width: 200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :style="'color:' + item.color + ';font-weight:bold;'"
          >
          </el-option>
        </el-select>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          placeholder="请输入下拉框的所有选项，一行一个"
          v-model="text"
          @change="change_items"
        >
        </el-input>
      </span>
    </div>

    <div>
      <span>提示文本：</span>
      <span>
        <el-input style="width: 200px" v-model="ActiveElement.props.placeholder"></el-input>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ButtonToolBar',
    props: ['ActiveElement'],
    data() {
      return {
        text: '',
      };
    },

    methods: {
      change_items() {},
    },
  };
</script>
