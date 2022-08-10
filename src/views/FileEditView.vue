<template>

  <div id="FileEdit">
    
    <div class="editor" v-if="editor">
      <!-- <DocCenter></DocCenter> -->
      <div class="editor__header">
        <b>{{ this.$route.query.name }}</b>
        <div class="divider"></div>
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
        <!--Link-->
        <el-tooltip class="item" effect="dark" content="添加链接" placement="bottom">
          <el-button class="menu-item" @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
            <i class="iconfont">&#xe756;</i>
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
            <i class="iconfont">&#xe7d9;</i>
          </el-button>
        </el-tooltip>
        <!--download-->
        <el-tooltip class="item" effect="dark" content="下载" placement="bottom">
          <el-button class="menu-item" @click="download_menu_visible = true">
            <i class="iconfont">&#xe7da;</i>
          </el-button>
        </el-tooltip>
      </div>
      <editor-content id="pdfDom" class="editor__content" :editor="editor" />
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
    <!--<div ref='container'></div>-->
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
import Link from '@tiptap/extension-link'
import TurndownService from 'turndown'
import JsPDF from "jspdf"//PDF
import * as html2canvas from 'html2canvas'//PDF


import * as Y from 'yjs'
import { WebsocketProvider } from "y-websocket";
//import { HocuspocusProvider } from '@hocuspocus/provider'

import qs from "qs"
// import DocCenter from '@/components/DocCenter.vue';

export default {
  name: "FileEditView",
  components: {
    EditorContent,
    // DocCenter
  },
  data() {
    return {
      editor: null,
      provider: null,
      download_menu_visible: false,
      file: 0, //文件ID作为聊天室的名字
      html: null,
      color: ['#f783ac', '#BAF093', '#FBF499', '#F98281', '#FBBC8B', '#95F9DC', '#938fEE', '#B7E260', '#FA8C5F', '#67B1EA'],//颜色列表
      value: '',
      db_file_name: '',
      options: [{
        value: '1',
        label: 'PDF'
      }, {
        value: '2',
        label: 'Markdown'
      }, {
        value: '3',
        label: 'Word'
      }, {
        value: '4',
        label: 'HTML'
      }],
    };
  },

  methods: {
    test() {
      console.log(this.editor.getText());
      console.log(this.editor.getHTML());
    },
    init() {
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
          Link,
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
      //使用edit_file判断当前文档的状态:1为新文档,2为copy的新文档，0为旧文档
      this.$axios.post('/project/edit_file', qs.stringify({ fileid: this.$route.query.id }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        }
      })
        .then(res => {
          if (res.data.errno === 0) {
            console.log(res.data);//测试一下
            if (res.data.new === 1 && res.data.model_id !== 0) {//为新文档,应该从模板中加载内容
              console.log('为新文档,应该从模板中加载内容');//to do
              this.editor.commands.setContent(res.data.model);
            } else if (res.data.new === 2) {//copy的新文档,从数据库加载内容
              console.log('copy的新文档,从数据库加载内容');
              this.getContentFromContent();
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
    setColor() {
      var i = Math.floor(Math.random() * 10);
      return this.color[i];
    },
    beforeImageUpload(file) { //检查格式和大小
      console.log('before');
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return true;
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
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()
        return
      }
      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
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
            content = '``' + content + '``'
            return content
          }
        })
        turndown.addRule('code', {
          filter: ['code'],
          replacement: function (content) {
            content = '`\n' + content + '\n`'
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
        console.log(this.editor.getHTML()); // todo
        const data = turndown.turndown(this.editor.getHTML());
        const blob = new Blob([data], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file_name; // 这里填保存成的文件名
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
        this.download_menu_visible = false;
      } else if (this.value === '1') {//PDF
        console.log('download success!' + this.value);
        //this.html = this.editor.getHTML()
        //this.$nextTick(this.gerarPdfDoComponente)
        this.exportPDF();
        //this.testDownload();
        this.download_menu_visible = false;
      } else if (this.value === '3') {
        console.log('download success!' + this.value);
        console.log('.docx start');
        this.exportWord();
        //this.exportHTML();
        this.download_menu_visible = false;
      } else if (this.value == '4') {
        this.exportHTML();
      }
    },
    gerarPdfDoComponente() {
      //var content = document.querySelector('#pdfDom');
      /*
      var pdfDom = document.querySelector('#pdfDom')
      var width = pdfDom.offsetWidth; //dom宽
      var height = pdfDom.offsetHeight; //dom高
      var scale = 2; //放大倍数
      var opts = {
        dpi: window.devicePixelRatio * 2,
        scale: scale,//添加的scale参数
        width: width,
        height: height,
        useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
        allowTaint: true
      };
      var canvas = document.createElement("canvas")//创建一个canvas节点
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      var context = canvas.getContext("2d")
      context.scale(2, 2) // 增强图片清晰度*/
      html2canvas(document.querySelector('#pdfDom')).then(canvas => {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(this.$route.query.name + '.pdf')
      })
    },
    exportWord() {
      const name = this.$route.query.name + '.doc'
      const data = '<html>\n' +
        '    <head>\n' +
        '    <meta charset="utf-8">\n' +
        '    <title>Markdoc Preview</title>\n' +
        '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <style type="text/css">html {font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }body {margin: 0;}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary {display: block;}audio,canvas,progress,video {display: inline-block; vertical-align: baseline; }audio:not([controls]) {display: none;height: 0;}[hidden],template {display: none;}a {background: transparent;}a:active,a:hover {outline: 0;}abbr[title] {border-bottom: 1px dotted;}b,strong {font-weight: bold;}dfn {font-style: italic;}h1 {font-size: 2em;margin: 0.67em 0;}mark {background: #ff0;color: #000;}small {font-size: 80%;}sub,sup {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sup {top: -0.5em;}sub {bottom: -0.25em;}img {border: 0;}svg:not(:root) {overflow: hidden;}figure {margin: 1em 40px;}hr {-moz-box-sizing: content-box;box-sizing: content-box;height: 0;}pre {overflow: auto;}code,kbd,pre,samp {font-family: monospace, monospace;font-size: 1em;}button,input,optgroup,select,textarea {color: inherit; font: inherit; margin: 0; }button {overflow: visible;}button,select {text-transform: none;}button,html input[type="button"], input[type="reset"],input[type="submit"] {-webkit-appearance: button; cursor: pointer; }button[disabled],html input[disabled] {cursor: default;}button::-moz-focus-inner,input::-moz-focus-inner {border: 0;padding: 0;}input {line-height: normal;}input[type="checkbox"],input[type="radio"] {box-sizing: border-box; padding: 0; }input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {height: auto;}input[type="search"] {-webkit-appearance: textfield; -moz-box-sizing: content-box;-webkit-box-sizing: content-box; box-sizing: content-box;}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration {-webkit-appearance: none;}fieldset {border: 1px solid #c0c0c0;margin: 0 2px;padding: 0.35em 0.625em 0.75em;}legend {border: 0; padding: 0; }textarea {overflow: auto;}optgroup {font-weight: bold;}table {border-collapse: collapse;border-spacing: 0;}td,th {padding: 0;}* {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}*:before,*:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}html {font-size: 62.5%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}body {font-family: \'Helvetica Neue\', Helvetica, Arial, \'Microsoft Yahei\', sans-serif;font-size: 14px;line-height: 1.42857143;color: #333333;background-color: #ffffff;}input,button,select,textarea {font-family: inherit;font-size: inherit;line-height: inherit;}a {color: #428bca;text-decoration: none;}a:hover,a:focus {color: #2a6496;text-decoration: underline;}a:focus {outline: thin dotted;outline: 5px auto -webkit-focus-ring-color;outline-offset: -2px;}figure {margin: 0;}img {vertical-align: middle;}.hljs {display: block;overflow-x: auto;padding: 0.5em;background: #f0f0f0;-webkit-text-size-adjust: none;}.hljs,.hljs-subst,.hljs-tag .hljs-title,.nginx .hljs-title {color: black;}.hljs-string,.hljs-title,.hljs-constant,.hljs-parent,.hljs-tag .hljs-value,.hljs-rules .hljs-value,.hljs-preprocessor,.hljs-pragma,.haml .hljs-symbol,.ruby .hljs-symbol,.ruby .hljs-symbol .hljs-string,.hljs-template_tag,.django .hljs-variable,.smalltalk .hljs-class,.hljs-addition,.hljs-flow,.hljs-stream,.bash .hljs-variable,.apache .hljs-tag,.apache .hljs-cbracket,.tex .hljs-command,.tex .hljs-special,.erlang_repl .hljs-function_or_atom,.asciidoc .hljs-header,.markdown .hljs-header,.coffeescript .hljs-attribute {color: #800;}.smartquote,.hljs-comment,.hljs-annotation,.diff .hljs-header,.hljs-chunk,.asciidoc .hljs-blockquote,.markdown .hljs-blockquote {color: #888;}.hljs-number,.hljs-date,.hljs-regexp,.hljs-literal,.hljs-hexcolor,.smalltalk .hljs-symbol,.smalltalk .hljs-char,.go .hljs-constant,.hljs-change,.lasso .hljs-variable,.makefile .hljs-variable,.asciidoc .hljs-bullet,.markdown .hljs-bullet,.asciidoc .hljs-link_url,.markdown .hljs-link_url {color: #080;}.hljs-label,.hljs-javadoc,.ruby .hljs-string,.hljs-decorator,.hljs-filter .hljs-argument,.hljs-localvars,.hljs-array,.hljs-attr_selector,.hljs-important,.hljs-pseudo,.hljs-pi,.haml .hljs-bullet,.hljs-doctype,.hljs-deletion,.hljs-envvar,.hljs-shebang,.apache .hljs-sqbracket,.nginx .hljs-built_in,.tex .hljs-formula,.erlang_repl .hljs-reserved,.hljs-prompt,.asciidoc .hljs-link_label,.markdown .hljs-link_label,.vhdl .hljs-attribute,.clojure .hljs-attribute,.asciidoc .hljs-attribute,.lasso .hljs-attribute,.coffeescript .hljs-property,.hljs-phony {color: #88f;}.hljs-keyword,.hljs-id,.hljs-title,.hljs-built_in,.css .hljs-tag,.hljs-javadoctag,.hljs-phpdoc,.hljs-dartdoc,.hljs-yardoctag,.smalltalk .hljs-class,.hljs-winutils,.bash .hljs-variable,.apache .hljs-tag,.hljs-type,.hljs-typename,.tex .hljs-command,.asciidoc .hljs-strong,.markdown .hljs-strong,.hljs-request,.hljs-status {font-weight: bold;}.asciidoc .hljs-emphasis,.markdown .hljs-emphasis {font-style: italic;}.nginx .hljs-built_in {font-weight: normal;}.coffeescript .javascript,.javascript .xml,.lasso .markup,.tex .hljs-formula,.xml .javascript,.xml .vbscript,.xml .css,.xml .hljs-cdata {opacity: 0.5;}#container {padding: 15px;margin-left:20px;}pre {border: 1px solid #ccc;border-radius: 4px;display: block;}pre code {white-space: pre-wrap;}.hljs,code {font-family: Monaco, Menlo, Consolas, \'Courier New\', monospace;}pre{background-color: #dddddd;padding:8px 0px 8px 30px;word-wrap: break-word;}table tbody tr:nth-child(2n) {background: rgba(158,188,226,0.12); }:not(pre) > code {padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #f9f2f4;white-space: nowrap;border-radius: 4px;}th, td {border: 1px solid #ccc;padding: 6px 12px;}blockquote {border-left-width: 10px;background-color: rgba(102,128,153,0.05);border-top-right-radius: 5px;border-bottom-right-radius: 5px;padding: 1px 20px}blockquote.pull-right small:before,blockquote.pull-right .small:before {content: \'\'}blockquote.pull-right small:after,blockquote.pull-right .small:after {content: \'\\00A0 \\2014\'}blockquote:before,blockquote:after {content: ""}blockquote {margin: 0 0 1.1em}blockquote p {margin-bottom: 1.1em;font-size: 1em;line-height: 1.45}blockquote ul:last-child,blockquote ol:last-child {margin-bottom: 0}blockquote {margin: 0 0 21px;border-left: 10px solid #dddddd;}\n' +
        '    </style>\n' +
        '    </head>\n' +
        '    <body marginwidth="0" marginheight="0">\n' +
        '        <div id="container">' +
        this.editor.getHTML() +
        '        </div>\n' +
        '    </body>\n' +
        '</html>'
      const blob = new Blob([data], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name; // 这里填保存成的文件名
      a.click();
      URL.revokeObjectURL(a.href);
      a.remove();
      console.log('下载成功！')
    },
    exportPDF() {
      const name = this.$route.query.name + '.pdf';
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
      this.db_file_name = year + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + second + '_' + this.$store.state.userid + '_' + this.$route.query.id + '.pdf';
      this.$axios.post('/project/get_pdf', qs.stringify({ file_id: this.$route.query.id, file_name: this.db_file_name }), { responseType: 'blob' })
        .then((res) => {
          //正常导出流程
          console.log(res);//测试一下
          let blob = new Blob([res.data]);
          const url = window.URL || window.webkitURL || window.moxURL;
          const link = document.createElement('a');
          link.href = url.createObjectURL(blob);
          link.download = name;
          link.click();
          url.revokeObjectURL(link.href);
          link.remove();
          console.log('下载PDF成功!');
          this.removePDF();
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    exportHTML() {
      const name = this.$route.query.name + '.html'
      const data = '<html>\n' +
        '    <head>\n' +
        '    <meta charset="utf-8">\n' +
        '<title>Markdoc Preview</title>\n' +
        '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <style type="text/css">html {font-family: sans-serif; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }body {margin: 0;}article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary {display: block;}audio,canvas,progress,video {display: inline-block; vertical-align: baseline; }audio:not([controls]) {display: none;height: 0;}[hidden],template {display: none;}a {background: transparent;}a:active,a:hover {outline: 0;}abbr[title] {border-bottom: 1px dotted;}b,strong {font-weight: bold;}dfn {font-style: italic;}h1 {font-size: 2em;margin: 0.67em 0;}mark {background: #ff0;color: #000;}small {font-size: 80%;}sub,sup {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}sup {top: -0.5em;}sub {bottom: -0.25em;}img {border: 0;}svg:not(:root) {overflow: hidden;}figure {margin: 1em 40px;}hr {-moz-box-sizing: content-box;box-sizing: content-box;height: 0;}pre {overflow: auto;}code,kbd,pre,samp {font-family: monospace, monospace;font-size: 1em;}button,input,optgroup,select,textarea {color: inherit; font: inherit; margin: 0; }button {overflow: visible;}button,select {text-transform: none;}button,html input[type="button"], input[type="reset"],input[type="submit"] {-webkit-appearance: button; cursor: pointer; }button[disabled],html input[disabled] {cursor: default;}button::-moz-focus-inner,input::-moz-focus-inner {border: 0;padding: 0;}input {line-height: normal;}input[type="checkbox"],input[type="radio"] {box-sizing: border-box; padding: 0; }input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {height: auto;}input[type="search"] {-webkit-appearance: textfield; -moz-box-sizing: content-box;-webkit-box-sizing: content-box; box-sizing: content-box;}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration {-webkit-appearance: none;}fieldset {border: 1px solid #c0c0c0;margin: 0 2px;padding: 0.35em 0.625em 0.75em;}legend {border: 0; padding: 0; }textarea {overflow: auto;}optgroup {font-weight: bold;}table {border-collapse: collapse;border-spacing: 0;}td,th {padding: 0;}* {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}*:before,*:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}html {font-size: 62.5%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}body {font-family: \'Helvetica Neue\', Helvetica, Arial, \'Microsoft Yahei\', sans-serif;font-size: 14px;line-height: 1.42857143;color: #333333;background-color: #ffffff;}input,button,select,textarea {font-family: inherit;font-size: inherit;line-height: inherit;}a {color: #428bca;text-decoration: none;}a:hover,a:focus {color: #2a6496;text-decoration: underline;}a:focus {outline: thin dotted;outline: 5px auto -webkit-focus-ring-color;outline-offset: -2px;}figure {margin: 0;}img {vertical-align: middle;}.hljs {display: block;overflow-x: auto;padding: 0.5em;background: #f0f0f0;-webkit-text-size-adjust: none;}.hljs,.hljs-subst,.hljs-tag .hljs-title,.nginx .hljs-title {color: black;}.hljs-string,.hljs-title,.hljs-constant,.hljs-parent,.hljs-tag .hljs-value,.hljs-rules .hljs-value,.hljs-preprocessor,.hljs-pragma,.haml .hljs-symbol,.ruby .hljs-symbol,.ruby .hljs-symbol .hljs-string,.hljs-template_tag,.django .hljs-variable,.smalltalk .hljs-class,.hljs-addition,.hljs-flow,.hljs-stream,.bash .hljs-variable,.apache .hljs-tag,.apache .hljs-cbracket,.tex .hljs-command,.tex .hljs-special,.erlang_repl .hljs-function_or_atom,.asciidoc .hljs-header,.markdown .hljs-header,.coffeescript .hljs-attribute {color: #800;}.smartquote,.hljs-comment,.hljs-annotation,.diff .hljs-header,.hljs-chunk,.asciidoc .hljs-blockquote,.markdown .hljs-blockquote {color: #888;}.hljs-number,.hljs-date,.hljs-regexp,.hljs-literal,.hljs-hexcolor,.smalltalk .hljs-symbol,.smalltalk .hljs-char,.go .hljs-constant,.hljs-change,.lasso .hljs-variable,.makefile .hljs-variable,.asciidoc .hljs-bullet,.markdown .hljs-bullet,.asciidoc .hljs-link_url,.markdown .hljs-link_url {color: #080;}.hljs-label,.hljs-javadoc,.ruby .hljs-string,.hljs-decorator,.hljs-filter .hljs-argument,.hljs-localvars,.hljs-array,.hljs-attr_selector,.hljs-important,.hljs-pseudo,.hljs-pi,.haml .hljs-bullet,.hljs-doctype,.hljs-deletion,.hljs-envvar,.hljs-shebang,.apache .hljs-sqbracket,.nginx .hljs-built_in,.tex .hljs-formula,.erlang_repl .hljs-reserved,.hljs-prompt,.asciidoc .hljs-link_label,.markdown .hljs-link_label,.vhdl .hljs-attribute,.clojure .hljs-attribute,.asciidoc .hljs-attribute,.lasso .hljs-attribute,.coffeescript .hljs-property,.hljs-phony {color: #88f;}.hljs-keyword,.hljs-id,.hljs-title,.hljs-built_in,.css .hljs-tag,.hljs-javadoctag,.hljs-phpdoc,.hljs-dartdoc,.hljs-yardoctag,.smalltalk .hljs-class,.hljs-winutils,.bash .hljs-variable,.apache .hljs-tag,.hljs-type,.hljs-typename,.tex .hljs-command,.asciidoc .hljs-strong,.markdown .hljs-strong,.hljs-request,.hljs-status {font-weight: bold;}.asciidoc .hljs-emphasis,.markdown .hljs-emphasis {font-style: italic;}.nginx .hljs-built_in {font-weight: normal;}.coffeescript .javascript,.javascript .xml,.lasso .markup,.tex .hljs-formula,.xml .javascript,.xml .vbscript,.xml .css,.xml .hljs-cdata {opacity: 0.5;}#container {padding: 15px;margin-left:20px;}pre {border: 1px solid #ccc;border-radius: 4px;display: block;}pre code {white-space: pre-wrap;}.hljs,code {font-family: Monaco, Menlo, Consolas, \'Courier New\', monospace;}pre{background-color: #dddddd;padding:8px 0px 8px 30px;word-wrap: break-word;}table tbody tr:nth-child(2n) {background: rgba(158,188,226,0.12); }:not(pre) > code {padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #f9f2f4;white-space: nowrap;border-radius: 4px;}th, td {border: 1px solid #ccc;padding: 6px 12px;}blockquote {border-left-width: 10px;background-color: rgba(102,128,153,0.05);border-top-right-radius: 5px;border-bottom-right-radius: 5px;padding: 1px 20px}blockquote.pull-right small:before,blockquote.pull-right .small:before {content: \'\'}blockquote.pull-right small:after,blockquote.pull-right .small:after {content: \'\\00A0 \\2014\'}blockquote:before,blockquote:after {content: ""}blockquote {margin: 0 0 1.1em}blockquote p {margin-bottom: 1.1em;font-size: 1em;line-height: 1.45}blockquote ul:last-child,blockquote ol:last-child {margin-bottom: 0}blockquote {margin: 0 0 21px;border-left: 10px solid #dddddd;}\n' +
        '    </style>\n' +
        '    </head>\n' +
        '    <body marginwidth="0" marginheight="0">\n' +
        '        <div id="container" style="margin-left:11.5%;margin-right:11.5%;">\n' +//存在格式修改
        this.editor.getHTML() +
        '        </div>\n' +
        '    </body>\n' +
        '</html>'
      const blob = new Blob([data], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name; // 这里填保存成的文件名
      a.click();
      URL.revokeObjectURL(a.href);
      a.remove();
    },
    removePDF() {
      console.log('removePDF Start');
      this.$axios.post('/project/delete_pdf', qs.stringify({ file_name: this.db_file_name }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        }
      })
        .then(res => {
          if (res.data.errno === 0) {
            console.log(res.data.msg);//测试一下
            //console.log('修改文档内容成功');
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    getContentFromContent() {
      this.$axios.post('/project/getFileContent', qs.stringify({ file_id: this.$route.query.id }), {
        headers: {
          userid: this.$store.state.userid,
          token: this.$store.state.token,
        }
      })
        .then(res => {
          if (res.data.errno === 0) {
            console.log(res.data);//to do
            this.editor.setContent(res.data.content);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    testDownload() {
      this.$axios.post('/project/downloadFile', qs.stringify({ name1: '2022_08_09_10_08_26_4_38.pdf', name2: 'qianduantest.pdf' }), { responseType: 'blob' })
        .then((res) => {
          /*
          console.log(res);
          const link = document.createElement('a');
          let blob = new Blob([res.data]);
          link.style.display = 'none';
          const url = window.URL || window.webkitURL || window.moxURL;
          link.href = url.createObjectURL(blob);
          link.setAttribute('download', this.resource);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          url.revokeObjectURL(link.href);*/
          console.log(res);//测试一下
          let blob = new Blob([res.data]);
          const url = window.URL || window.webkitURL || window.moxURL;
          const link = document.createElement('a');
          link.href = url.createObjectURL(blob);
          link.download = 'qianduantest.pdf';
          link.click();
          url.revokeObjectURL(link.href);
          link.remove();
          console.log('下载PDF成功!');
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (to.query.id !== from.query.id) {
        this.editor.destroy();
        this.provider.destroy();
        console.log('all destroyed');
        this.init();
      }
    }
  },
  beforeDestroy() {
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
  /* max-height: 45.2rem;*/
  color: #0d0d0d;
  background-color: #fff;
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
  border-bottom-color: rgb(13, 13, 13);
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-bottom: 3px solid #0D0D0D;
  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-right: 3px solid #0D0D0D;
  border-right-width: 3px;
  border-right-color: rgb(13, 13, 13);
  position: fixed;
  width: fill;
  z-index: 1000;
  background-color: white;
}

.editor__content {
  padding: 1.25rem 1rem;
  padding-top: 4rem;
  padding-right: 1rem;
  padding-bottom: 1.25rem;
  padding-left: 1rem;
  min-height: 40em;
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