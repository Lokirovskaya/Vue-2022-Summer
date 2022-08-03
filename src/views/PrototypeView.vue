<template>
  <div id="main">
    <div id="toolbar">
      <div class="title">工具栏</div>
      <el-button
        v-for="item in toolbar_items"
        :key="item.tag"
        @click="add_element(item)"
        class="toolbar-item"
      >
        {{ item.name }}
      </el-button>
    </div>

    <div style="width: 500px">
      <div id="drag-area">
        <VueDragResize
          v-for="(element, i) in drag_elements"
          :parentLimitation="true"
          :key="i"
          :x="element.x"
          :y="element.y"
          :w="element.width"
          :h="element.height"
          :minw="20"
          :minh="20"
          :snapToGrid="true"
          :gridX="10"
          :gridY="10"
          @activated="show_activated_info(i)"
        >
          <component v-bind:is="element.tag" class="drag-element">
            {{ element.inner_html }}
          </component>
        </VueDragResize>
      </div>
    </div>

    <div id="info-area" v-if="activated_index >= 0">
      <div class="title">详细信息</div>
      <div style="text-align: left">
        <el-input v-model="activated_inner_html" @change="change_activated_inner_html()"></el-input>
        <el-button type="danger" @click="delete_activated()">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueDragResize from 'vue-drag-resize';
  //   import Vue from 'vue/dist/vue.esm.js'
  export default {
    name: 'PrototypeView',
    components: { VueDragResize },

    data() {
      return {
        activated_index: -1,
        activated_inner_html: '',

        toolbar_items: [
          { name: '按钮', tag: 'el-button', width: 90, height: 40, inner_html: '按钮', resizable: true },
          { name: '文本', tag: 'div', width: 70, height: 20, inner_html: '文本', resizable: false },
        ],

        drag_elements: [
          /* { tag, x, y, width, height, inner_html } */
        ],
      };
    },

    methods: {
      add_element(item) {
        let element = {
          tag: item.tag,
          x: 10,
          y: 10,
          width: item.width,
          height: item.height,
          inner_html: item.inner_html,
        };
        this.drag_elements.push(element);
      },

      show_activated_info(i) {
        this.activated_index = i;
        this.activated_inner_html = this.drag_elements[i].inner_html;
      },

      change_activated_inner_html() {
        this.drag_elements[this.activated_index].inner_html = this.activated_inner_html;
      },

      //   hide_activated_info(i)

      delete_activated() {
        this.drag_elements.splice(this.activated_index, 1);
        this.activated_index = -1;
      }
    },
  };
</script>

<style scoped>
  #main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .title {
    text-align: center;
    font-size: 18px;
    height: 40px;
    margin-top: 10px;
  }

  #toolbar {
    width: 150px;
    height: 100%;
  }

  .toolbar-item {
    width: 100%;
    height: 40px;
    border-radius: 0px;
    text-align: left;
    font-size: 16px;
    margin: 0px;
  }

  #drag-area {
    position: absolute;
    width: 500px;
    height: 100%;
    background-color: #eee;
  }

  .drag-element {
    width: 100%;
    height: 100%;
  }

  #info-area {
    width: 200px;
    margin-left: 20px;
    line-height: 60px;
  }
</style>
