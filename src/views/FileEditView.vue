<template>
    <div id="FileEdit">
        <div id="vditor" style="text-align: left;"></div>
        <el-button @click="upload" style="margin-top:5px;">上传</el-button>
    </div>
</template>

<script>
import Vditor from 'vditor'
import "vditor/dist/index.css"
import qs from "qs"
export default {
    name: "FileEditView",
    data() {
        return {
            contentEditor: '',
            content: '',
        };
    },
    methods: {
        getFileContent() {
            this.$axios.post('/project/getFileContent', qs.stringify({ file_id: this.$route.query.id }), {
                headers: {
                    userid: this.$store.state.userid,
                    token: this.$store.state.token,
                }
            })
                .then(res => {
                    if (res.data.errno === 0) {
                        console.log(res.data);//测试一下
                        //this.$message.success('重命名成功' + this.file_rename_id);
                        this.content = res.data.content; //争取把源数据(文档名)也修改了
                        this.contentEditor.setValue(this.content);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        },
        upload() {
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
            this.$axios.post('/project/modifyFile', qs.stringify({ file_id: this.$route.query.id, content: this.content, modify_time: time_str }), {
                headers: {
                    userid: this.$store.state.userid,
                    token: this.$store.state.token,
                }
            })
                .then(res => {
                    if (res.data.errno === 0) {
                        console.log(res.data);//测试一下
                        this.$message.success('文档上传成功');
                         //争取把源数据(文档名)也修改了
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error(err);
                });
        }
    },
    mounted() {
        this.contentEditor = new Vditor('vditor', {
            height: 680,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after: () => {
                this.getFileContent();
            },
            input: (value) => {
                this.content = value;
                console.log(this.content);
            }
        })
    },
}
</script>