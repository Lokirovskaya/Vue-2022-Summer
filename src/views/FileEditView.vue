<template>
    <div id="FileEdit">
        <div class="editor" v-if="editor">
            <div class="editor__header">
                <!--粗体-->
                <button class="menu-item" @click="editor.chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    <i class="iconfont">&#xe7f7;</i>
                </button>
                <!--斜体-->
                <button class="menu-item" @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    <i class="iconfont">&#xe7fb;</i>
                </button>
                <!--Strike-->
                <button class="menu-item" @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    <i class="iconfont">&#xe7f9;</i>
                </button>
                <!--code-->
                <button class="menu-item" @click="editor.chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    <i class="iconfont">&#xe638;</i>
                </button>
                <!--Highlight-->
                <button class="menu-item" @click="editor.chain().focus().toggleHighlight().run()"
                    :class="{ 'is-active': editor.isActive('highlight') }">
                    <i class="iconfont">&#xe68c;</i>
                </button>
                <div class="divider"></div>
                <!--H1-->
                <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    <i class="iconfont">&#xe61a;</i>
                </button>
                <!--H2-->
                <button class="menu-item" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    <i class="iconfont">&#xe61d;</i>
                </button>
                <!--Bulletlist-->
                <button class="menu-item" @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'is-active': editor.isActive('bulletList') }">
                    <i class="iconfont">&#xe62a;</i>
                </button>
                <!--OrderdList-->
                <button class="menu-item" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ 'is-active': editor.isActive('orderedList') }">
                    <i class="iconfont">&#xebcd;</i>
                </button>
                <!--TaskList-->
                <!--codeblock-->
                <button class="menu-item" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'is-active': editor.isActive('codeBlock') }">
                    <i class="iconfont">&#xe636;</i>
                </button>
                <div class="divider"></div>
                <!--blockquote-->
                <button class="menu-item" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'is-active': editor.isActive('blockquote') }">
                    <i class="iconfont">&#xe608;</i>
                </button>
                <!--HorizontalRule-->
                <button class="menu-item" @click="editor.chain().focus().setHorizontalRule().run()">
                    <i class="iconfont">&#xe61b;</i>
                </button>
                <!--Image-->
                <button class="menu-item" @click="uploadImage">
                    <i class="iconfont">&#xe67c;</i>
                </button>
                <div class="divider"></div>
                <!--undo-->
                <button class="menu-item" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()">
                    <i class="iconfont">&#xe739;</i>
                </button>
                <!--redo-->
                <button class="menu-item" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()">
                    <i class="iconfont">&#xe652;</i>
                </button>
            </div>
            <editor-content class="editor__content" :editor="editor" />
            <div class="editor__foot">
            </div>
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

import * as Y from 'yjs'
import { WebsocketProvider } from "y-websocket";

//import qs from "qs"

export default {
    name: "FileEditView",
    components: {
        EditorContent,
    },
    data() {
        return {
            editor: null,
            provider: null,
            file: 0, //文件ID作为聊天室的名字
        };
    },
    methods: {
        test() {
            console.log(this.editor.getText());
            console.log(this.editor.getHTML());
        },
        uploadImage() {
            //上传文件接受url
            const url = null;
            if (url) {
                this.editor.chain().focus().setImage({ src: url }).run();
            }
        },
    },
    mounted() {
        const ydoc = new Y.Doc();

        // this.provider = new WebrtcProvider('tiptap-collaboration-cursor-extension', ydoc)
        this.provider = new WebsocketProvider('wss://demos.yjs.dev', this.file, ydoc);
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
                Highlight.configure({ multicolor: true }),
                Collaboration.configure({
                    document: ydoc,
                }),
                CollaborationCursor.configure({
                    provider: this.provider,
                    user: {
                        name: 'Cyndi Lauper',
                        color: '#f783ac',
                    },
                }),
            ],
            content: 'null'
        })
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
    max-height: 50rem;
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

:focus-visible {
    outline: 0cm;
}
</style>