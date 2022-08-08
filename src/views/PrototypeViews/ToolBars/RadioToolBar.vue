<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div style="text-align: left">
    <div>
      <span>选项：</span>
      <span>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          placeholder="请输入所有选项，一行一个，不同选项间是互斥的"
          v-model="text"
          @change="change_items"
          style="width: 200px"
        >
        </el-input>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RadioToolBar',
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
          options.push({ label: lines[i].trim() });
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.ActiveElement.child_props = options;
      },
    },
  };
</script>
