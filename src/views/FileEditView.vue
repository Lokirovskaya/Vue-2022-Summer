<template>
  <div id="FileEdit">
    <div class="editor" v-if="editor">
      <div class="editor__header">
        <!--粗体-->
        <el-tooltip class="item" effect="dark" content="粗体" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }">
            <i class="iconfont">&#xe7f7;</i>
          </el-button>
        </el-tooltip>
        <!--斜体-->
        <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            <i class="iconfont">&#xe7fb;</i>
          </el-button>
        </el-tooltip>
        <!--Strike-->
        <el-tooltip class="item" effect="dark" content="划掉" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            <i class="iconfont">&#xe7f9;</i>
          </el-button>
        </el-tooltip>
        <!--code-->
        <el-tooltip class="item" effect="dark" content="代码" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }">
            <i class="iconfont">&#xe638;</i>
          </el-button>
        </el-tooltip>
        <!--Highlight-->
        <el-tooltip class="item" effect="dark" content="高亮" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }">
            <i class="iconfont">&#xe68c;</i>
          </el-button>
        </el-tooltip>
        <div class="divider"></div>
        <!--H1-->
        <el-tooltip class="item" effect="dark" content="标题1" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <i class="iconfont">&#xe61a;</i>
          </el-button>
        </el-tooltip>
        <!--H2-->
        <el-tooltip class="item" effect="dark" content="标题2" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <i class="iconfont">&#xe61d;</i>
          </el-button>
        </el-tooltip>
        <!--Bulletlist-->
        <el-tooltip class="item" effect="dark" content="无序列表" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            <i class="iconfont">&#xe62a;</i>
          </el-button>
        </el-tooltip>
        <!--OrderdList-->
        <el-tooltip class="item" effect="dark" content="有序列表" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            <i class="iconfont">&#xebcd;</i>
          </el-button>
        </el-tooltip>
        <!--TaskList-->
        <!--codeblock-->
        <el-tooltip class="item" effect="dark" content="代码块" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }">
            <i class="iconfont">&#xe636;</i>
          </el-button>
        </el-tooltip>
        <div class="divider"></div>
        <!--blockquote-->
        <el-tooltip class="item" effect="dark" content="引用" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }">
            <i class="iconfont">&#xe608;</i>
          </el-button>
        </el-tooltip>
        <!--HorizontalRule-->
        <el-tooltip class="item" effect="dark" content="分割线" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().setHorizontalRule().run()">
            <i class="iconfont">&#xe61b;</i>
          </el-button>
        </el-tooltip>
        <!--Image-->
        <el-tooltip class="item" effect="dark" content="插入图片" placement="bottom">
          <el-upload class="menu-item" style="position:relative; bottom:-5px" action="" :http-request="uploadImage"
            :on-success="handleImageSuccess" :before-upload="beforeImageUpload" :auto-upload="true"
            :showFileList="false">
            <i class="iconfont">&#xe67c;</i>
          </el-upload>
        </el-tooltip>
        <div class="divider"></div>
        <!--CreateTable-->
        <el-tooltip class="item" effect="dark" content="插入表格" placement="bottom">
          <el-button class="menu-item"
            @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
            <i class="iconfont">&#xe83c;</i>
          </el-button>
        </el-tooltip>
        <!--Deletetable-->
        <el-tooltip class="item" effect="dark" content="删除表格" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().deleteTable().run()">
            <i class="iconfont">&#xe600;</i>
          </el-button>
        </el-tooltip>
        <!--InsertColumn-->
        <el-tooltip class="item" effect="dark" content="插入列" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().addColumnAfter().run()">
            <i class="iconfont">&#xe938;</i>
          </el-button>
        </el-tooltip>
        <!--DeleteColumn-->
        <el-tooltip class="item" effect="dark" content="删除列" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().deleteColumn().run()">
            <i class="iconfont">&#xe6f2;</i>
          </el-button>
        </el-tooltip>
        <!--InsertRow-->
        <el-tooltip class="item" effect="dark" content="插入行" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().addRowAfter().run()">
            <i class="iconfont">&#xe940;</i>
          </el-button>
        </el-tooltip>
        <!--DeleteRow-->
        <el-tooltip class="item" effect="dark" content="删除行" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().deleteRow().run()">
            <i class="iconfont">&#xe770;</i>
          </el-button>
        </el-tooltip>
        <div class="divider"></div>
        <!--undo-->
        <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
            <i class="iconfont">&#xe739;</i>
          </el-button>
        </el-tooltip>
        <!--redo-->
        <el-tooltip class="item" effect="dark" content="重做" placement="bottom">
          <el-button class="menu-item" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
            <i class="iconfont">&#xe652;</i>
          </el-button>
        </el-tooltip>
        <!--save-->
        <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
          <el-button class="menu-item" @click="Save">
            <i class="iconfont">&#xe762;</i>
          </el-button>
        </el-tooltip>
        <!--download-->
        <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
          <el-button class="menu-item" @click="download_menu_visible = true">
            <i class="iconfont">&#xe6cf;</i>
          </el-button>
        </el-tooltip>
      </div>
      <editor-content class="editor__content" :editor="editor" />
      <div class="editor__foot">
      </div>
      <!--Download Select -->
      <el-dialog title="选择下载格式" :visible.sync="download_menu_visible" width="40%">
        <div style="margin-left:10%;margin-right:10%;">
          <el-select v-model="value" clearable placeholder="请选择下载格式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div slot="footer">
          <el-button @click="download_menu_visible = false">取消</el-button>
          <el-button type="primary" @click="Download">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TurndownService from 'turndown'

import * as Y from 'yjs'
import { WebsocketProvider } from "y-websocket";
//import { HocuspocusProvider } from '@hocuspocus/provider'

import qs from "qs"

export default {
  name: "FileEditView",
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      provider: null,
      download_menu_visible: false,
      file: 0, //文件ID作为聊天室的名字
      color: ['#f783ac', '#BAF093', '#FBF499', '#F98281', '#FBBC8B', '#95F9DC', '#938fEE', '#B7E260', '#FA8C5F', '#67B1EA'],//颜色列表
      value: '',
      options: [{
        value: '1',
        label: 'PDF'
      }, {
        value: '2',
        label: 'Markdown'
      }, {
        value: '3',
        label: 'Docx'
      }],
    };
  },

  methods: {
    test() {
      console.log(this.editor.getText());
      console.log(this.editor.getHTML());
    },
    setColor() {
      var i = Math.floor(Math.random() * 10);
      return this.color[i];
    },
    beforeImageUpload(file) { //检查格式和大小
      console.log('before');
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadImage(e) {
      //上传文件接受url
      let formData = new FormData();
      formData.append('in_file', e.file);
      let my_axios = this.$axios.create({
        withCredentials: true,
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
          'Content-Type': 'multipart/form-data'
        }
      });
      my_axios.post('/project/upload_file_image', { file_id: this.$route.query.id, image: e.file })
        .then(res => {
          if (res.data.errno === 0) {
            this.$message.success('上传图片成功成功！');
            var url = null;
            url = 'http://stcmp.shlprn.cn' + res.data.url;
            if (url) {
              this.editor.chain().focus().setImage({ src: url }).run();
            }
          }
          else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
      //上传图片并且获取其url

    },
    handleImageSuccess(res, file) {
      console.log('success');
      // alert('imageurl:' + this.imageUrl);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.url_upload = this.imageUrl;
    },
    Save() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      second = second < 10 ? '0' + second : second;
      var time_str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      this.$axios.post('/project/modifyFile', qs.stringify({ file_id: this.$route.query.id, content: this.editor.getHTML(), modify_time: time_str }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        }
      })
        .then(res => {
          if (res.data.errno === 0) {
            console.log(res.data);//测试一下
            //console.log('修改文档内容成功');
            this.$message.success('文档已保存!');
            //this.$message.success('重命名成功' + this.file_rename_id);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    Download() {
      //value值1为PDF,2为Markdown,3为Docx
      if (this.value === '') {
        this.$message.error('请选择导出格式')
      } else if (this.value === '2') {
        console.log('download success!' + this.value);
        const turndown = new TurndownService({
          emDelimiter: '_',
          linkStyle: 'inlined',
          headingStyle: 'atx',
        })
        turndown.addRule('td', {
          filter: ['td'],
          replacement: function (content) {
            content = content.trim();
            content = content.replace(/\|/g, '/');
            content = content.replace(/\n+/g, ' <br> ');
            content = '|' + content
            // console.log('td:'+content);
            return content
          }
        })
        turndown.addRule('th', {
          filter: ['th'],
          replacement: function (content, node) {
            content = content.trim();
            content = content.replace(/\|/g, '/');
            content = content.replace(/\n+/g, ' <br> ');
            content = '|#$&%th$#%&' + content
            if (node.getAttribute('colspan') != null) { //如果表头存在合并单元格，对其进行处理
              //repeatStringNumTimes
              let repeatStr = '';
              for (let i = 0; i < node.getAttribute('colspan'); i++) {
                repeatStr += '|';
              }
              content = content + repeatStr;
            }
            // console.log('th:'+content);
            return content
          }
        })
        turndown.addRule('tr', {
          filter: ['tr'],
          replacement: function (content) {
            content = '|\n' + content.trim();
            // console.log('tr:'+content);
            return content
          }
        })
        turndown.addRule('table', {
          filter: ['table'],
          replacement: function (content) {
            // 删首尾空，删除最前面多余的|，并在最后补全|
            //console.log('table1:'+content);
            content = content.trim();
            content = content.replace(/\n+/g, '\n');
            content = content.replace(/\n\|\n/g, '|\n');
            if (content.indexOf('|\n') === 0) {
              content = content.substring(1, content.length) + '|';
            }
            content = content.trim();
            // 如果表最前端包含<caption>表名标签的，通过下面代码优化让<caption>变成独立一行
            //console.log('table2:'+content);
            var captionLine = '';
            if (content.slice(0, 1) != '|' && (content.slice(-1) != '|')) {
              captionLine = content.slice(0, content.indexOf('|\n'));//captionn那行
              content = content.slice(content.indexOf('|\n') + 2);
              content = content + '|'
            }
            // 检查表格包含几个|，数字减1就是列数，模拟出markdown表格中间的---：
            var verticalLineCount = 0;
            var strs = new Array();
            //var thExist = false;
            strs = content.split('\n');
            for (let i = 0; i < strs.length; i++) { // 计算最多列数
              if (strs[i].indexOf('|') >= 0) {
                let tempnum = strs[i].match(/\|/ig).length;
                if (tempnum > verticalLineCount) {
                  verticalLineCount = tempnum;
                }
              }
            }
            let repeatStr = '';
            for (let i = 0; i < verticalLineCount; i++) {
              repeatStr += '|';
            }
            var buildTh = repeatStr.trim(); // 构造没有表头时候，markdown需要的表头 比如：| | | |
            let repeatStr1 = '';
            for (let i = 0; i < verticalLineCount - 1; i++) {
              repeatStr1 += '---|';
            }
            var tableMDLine = '|' + repeatStr1; // 构造markdown表中间的横线 比如：|---|---|---|
            // 检查是否包含表头
            //console.log('table3:'+content);
            if (content.indexOf('|#$&%th$#%&') >= 0) {
              content = content.replace(/\|#\$&%th\$#%&/g, '|');
              content = content.replace('\n', '\n' + tableMDLine + '\n');
            }
            else {
              content = buildTh + '\n' + tableMDLine + '\n' + content;
            }
            content = '\n' + captionLine + '\n\n' + content + '\n\n';
            //console.log('table4:'+content);
            return content
          }
        })
        turndown.addRule('pre', {
          filter: ['pre'],
          replacement: function (content) {
            return content
          }
        })
        turndown.addRule('code', {
          filter: ['code'],
          replacement: function (content) {
            content = '```\n' + content + '\n```'
            return content
          }
        })
        turndown.addRule('s', {
          filter: ['s'],
          replacement: function (content) {
            return '~~' + content + '~~'
          }
        })
        turndown.addRule('mark', {
          filter: ['mark'],
          replacement: function (content) {
            return '==' + content + '=='
          }
        })
        //console.log(this.editor.getHTML());
        const file_name = this.$route.query.name + '.md';
        console.log(this.editor.getText()); // todo
        const data = turndown.turndown(this.editor.getHTML());
        const blob = new Blob([data], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file_name; // 这里填保存成的文件名
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
        this.download_menu_visible = false;
      } else if (this.value === '1') {
        console.log('download success!' + this.value);
        console.log(this.editor.getHTML());
        this.download_menu_visible = false;
      } else if (this.value === '3') {
        console.log('download success!' + this.value);
        console.log(this.editor.getHTML());
        this.download_menu_visible = false;
      }

    }
  },
  mounted() {
    //初始化协同编辑和编辑器的相关参数
    const ydoc = new Y.Doc();
    // this.provider = new WebrtcProvider('tiptap-collaboration-cursor-extension', ydoc)
    this.provider = new WebsocketProvider('wss://demos.yjs.dev', this.$route.query.id, ydoc);
    //this.provider = new HocuspocusProvider({ url: 'ws://127.0.0.1:1234', name: this.$route.query.id, ydoc})
    this.editor = new Editor({
      extensions: [
        Blockquote,
        HardBreak,
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Strike,
        Code,
        BulletList,
        ListItem,
        Heading,
        OrderedList,
        CodeBlock,
        HorizontalRule,
        Gapcursor,
        Image,
        Dropcursor,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Highlight.configure({ multicolor: true }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: {
            name: this.$store.state.user_truename,
            color: this.setColor(),
          },
        }),
      ],
    });
    //使用edit_file判断当前文档的状态:operation为0时表示有人,为2时表示此人为第一个人进入

    this.$axios.post('/project/edit_file', qs.stringify({ fileid: this.$route.query.id }), {
      headers: {
        userid: this.$store.state.userid,
        token: this.$store.state.token,
      }
    })
      .then(res => {
        if (res.data.errno === 0) {
          console.log(res.data);//测试一下
          if (res.data.new === 1) {//为新文档,应该从模板中加载内容
            console.log('为新文档,应该从模板中加载内容');
          } else if (res.data.new === 2) {//copy的新文档,从数据库加载内容
            console.log('copy的新文档,从数据库加载内容');
          }
          //其他情况不用做事
        } else {
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        this.$message.error(err);
      });
  },

  beforeDestroy() {
    //edit_file
    /*
    this.$axios.post('/project/edit_file', qs.stringify({ userid: this.$store.state.userid, fileid: this.$route.query.id, status: 0 }), {
        headers: {
            userid: this.$store.state.userid,
            token: this.$store.state.token,
        }
    })
        .then(res => {
            if (res.data.errno === 0) {
                console.log(res);//测试一下
                //this.$message.success('重命名成功' + this.file_rename_id);
                if (res.data.operation == 1) { //说明是最后一个离开的,此时要将文档内容保存到后端
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                    hour = hour < 10 ? '0' + hour : hour;
                    minute = minute < 10 ? '0' + minute : minute;
                    second = second < 10 ? '0' + second : second;
                    var time_str = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                    this.$axios.post('/project/modifyFile', qs.stringify({ file_id: this.$route.query.id, content: this.editor.getHTML(), modify_time: time_str }), {
                        headers: {
                            userid: this.$store.state.userid,
                            token: this.$store.state.token,
                        }
                    })
                        .then(res => {
                            if (res.data.errno === 0) {
                                console.log(res.data);//测试一下
                                console.log('修改文档内容成功');
                                this.provider.disconnect();
                                //this.$message.success('重命名成功' + this.file_rename_id);
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            } else {
                this.$message.error(res.data.msg);
            }
        })
        .catch(err => {
            this.$message.error(err);
        }); */
    this.editor.destroy();
    this.provider.destroy();
    console.log('all destroyed');
  },
}
</script>

<style>
@font-face {
  font-family: "iconfont";
  /* Project id 3570869 */
  src: url('../font/iconfont.woff2') format('woff2'),
    url('../font/iconfont.woff') format('woff'),
    url('../font/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  fill: currentColor;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.editor {
  display: flex;
  flex-direction: column;
  max-height: 45.2rem;
  color: #0d0d0d;
  background-color: #fff;
  border: 3px solid #0D0D0D;
  border-top-color: rgb(13, 13, 13);
  border-top-style: solid;
  border-top-width: 3px;
  border-right-color: rgb(13, 13, 13);
  border-right-style: solid;
  border-right-width: 3px;
  border-bottom-color: rgb(13, 13, 13);
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-left-color: rgb(13, 13, 13);
  border-left-style: solid;
  border-left-width: 3px;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  border-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}

.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  padding-top: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  border-bottom: 3px solid #0D0D0D;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-bottom-color: rgb(13, 13, 13);
}

.editor__content {
  padding: 1.25rem 1rem;
  padding-top: 1.25rem;
  padding-right: 1rem;
  padding-bottom: 1.25rem;
  padding-left: 1rem;
  text-align: left;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.editor__footer {
  display: flex;
  flex: 0 0 auto;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 3px solid #0D0D0D;
  border-top-width: 3px;
  border-top-style: solid;
  border-top-color: rgb(13, 13, 13);
  font-size: 12px;
  font-weight: 600;
  color: #0d0d0d;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
  padding-top: 0.25rem;
  padding-right: 0.75rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
}

.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  padding-top: 0.1rem;
  padding-right: 0.3rem;
  padding-bottom: 0.1rem;
  padding-left: 0.3rem;
  border-radius: 3px 3px 3px 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 0px;
  white-space: nowrap;
}

.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: rgb(13, 13, 13);
  border-right: 1px solid #0D0D0D;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: rgb(13, 13, 13);
  word-break: normal;
  pointer-events: none;
}

.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  border-top-color: initial;
  border-top-style: none;
  border-top-width: initial;
  border-right-color: initial;
  border-right-style: none;
  border-right-width: initial;
  border-bottom-color: initial;
  border-bottom-style: none;
  border-bottom-width: initial;
  border-left-color: initial;
  border-left-style: none;
  border-left-width: initial;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  background-color: transparent;
  border-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  padding: 0.25rem;
  padding-top: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.25rem;
  margin-right: 0.25rem;
}

.menu-item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.divider {
  width: 2px;
  height: 1.25rem;
  background-color: #0000001a;
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}

.ProseMirror code {
  font-size: .9rem;
  padding: 0.25em;
  padding-top: 0.25em;
  padding-right: 0.25em;
  padding-bottom: 0.25em;
  padding-left: 0.25em;
  border-radius: 0.25em;
  border-top-left-radius: 0.25em;
  border-top-right-radius: 0.25em;
  border-bottom-right-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
  background-color: #6161611a;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 3px solid rgba(13, 13, 13, .1);
  border-left-width: 3px;
  border-left-style: solid;
  border-left-color: rgba(13, 13, 13, 0.1);
  background-color: whitesmoke;
}

.ProseMirror pre {
  background: #0D0D0D;
  color: #fff;
  padding: 0.75rem 1rem;
  padding-top: 0.75rem;
  padding-right: 1rem;
  padding-bottom: 0.75rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.tableWrapper {
  padding: 1rem 0;
  padding-top: 1rem;
  padding-right: 0px;
  padding-bottom: 1rem;
  padding-left: 0px;
  overflow-x: auto;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  border-top-color: inherit;
  border-right-color: inherit;
  border-bottom-color: inherit;
  border-left-color: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  border-top-color: inherit;
  border-right-color: inherit;
  border-bottom-color: inherit;
  border-left-color: inherit;
}

.ProseMirror table th {
  font-weight: 700;
  text-align: left;
  background-color: #f1f3f5;
}

.ProseMirror table td,
.ProseMirror table th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative;
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}

:focus-visible {
  outline: 0cm;
}
</style>