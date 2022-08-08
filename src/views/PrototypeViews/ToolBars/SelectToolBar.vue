<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <div>
      <span>下拉表项：</span>
      <span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          placeholder="请输入下拉框的所有选项，一行一个"
          v-model="text"
          @change="change_items"
          style="width: 200px"
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
    name: 'SelectToolBar',
    props: ['ActiveElement'],
    data() {
      return {
        text: '',
      };
    },

    methods: {
      change_items() {
        let lines = this.text.split('\n');
        let options = [];
        let len = lines.length;
        for (let i = 0; i < len; i++) {
          if (lines[i].trim() === '') continue;
          options.push({ value: lines[i].trim() });
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.ActiveElement.child_props = options;
      },
    },
  };
</script>
