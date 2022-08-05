<template>
    <div id="file">
        <div id="title">文档标题标题标题</div>

        <div id="files">
            <el-card class="one-file box-card" shadow="hover" v-for="item in file_list" :key="item.file_id">
                <div style="text-align: right">
                    <el-dropdown>
                        <i class="el-icon-more" style="font-size: 18px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="edit_file(item.file_id)">编辑文档</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="file_rename_dialog_visible = true; file_rename_id = item.file_id;">重命名</div>
                            </el-dropdown-item>
                            <el-dropdown-item style="color: red">
                                <div @click="delete_file(item.file_id)">删除文档</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <div>文档名:{{item.file_name}}<br>
                    文档ID:{{item.file_id}}<br>
                    文档创建者:{{item.file_creator}}<br>
                    文档创建时间:{{item.create_time}}<br>
                </div>
            </el-card>

            <el-card class="new-file box-card" shadow="hover">
                <div @click="new_file_dialog_visible = true">
                    <i class="el-icon-plus" style="font-size: 50px"></i>
                    <div style="font-size: 18px; color: gray">新建文档</div>
                </div>
            </el-card>

            <!-- new proj prompt dialog -->
            <el-dialog title="新建文档" :visible.sync="new_file_dialog_visible" width="40%">
                <div style="margin-left:10%;margin-right:10%;">

                    <el-input placeholder="请输入新建文档名" prefix-icon="el-icon-notebook-2" v-model="new_file_name">
                    </el-input>
                </div>
                <div slot="footer">
                    <el-button @click="new_file_dialog_visible = false">取消</el-button>
                    <el-button type="primary" @click="create_file">确定</el-button>
                </div>
            </el-dialog>

            <!--rename file prompt dialog -->
            <el-dialog title="重命名文档" :visible.sync="file_rename_dialog_visible" width="40%">
                <div style="margin-left:10%;margin-right:10%;">

                    <el-input placeholder="请输入新名字" prefix-icon="el-icon-notebook-2" v-model="file_rename">
                    </el-input>
                </div>
                <div slot="footer">
                    <el-button @click="file_rename_dialog_visible = false">取消</el-button>
                    <el-button type="primary" @click="rename_file">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    name: 'FileView',
    data() {
        return {
            new_file_dialog_visible: false, //控制新建文档对话框的显示
            new_file_name: '', //新建文档名
            file_rename_dialog_visible: false, //控制重命名文档对话框的显示
            file_rename_id: 0, //重命名文档的id
            file_rename: '',
            file_list: [], //文档列表
        }
    },
    methods: {
        edit_file(file_id) {
            console.log(file_id);
            this.$router.push({ path: '/fileedit' , query: {id: file_id} }); //跳转到该文档的编辑界面
        },
        rename_file() {
            console.log(this.file_rename_id);
            if (this.file_rename === '') {
                this.$message.error('文档名不能为空');
            } else {
                this.$axios.post('/project/renameFile', qs.stringify({ proj_id: this.$route.query.id, file_id: this.file_rename_id, file_name: this.file_rename }), {
                    headers: {
                        userid: this.$store.state.userid,
                        token: this.$store.state.token,
                    }
                })
                    .then(res => {
                        if (res.data.errno === 0) {
                            console.log(res.data);//测试一下
                            this.$message.success('重命名成功');
                            this.file_rename_dialog_visible = false;
                            for(var item of this.file_list){
                                if(item.file_id === this.file_rename_id){
                                    item.file_name = this.file_rename;
                                }
                            }
                            //console.log(this.file_list);
                            this.file_rename = ''; //争取把源数据(文档名)也修改了
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
        },
        delete_file(file_id) {
            this.$confirm('是否删除文档？', '删除文档', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.$axios.post('/project/deleteFile', qs.stringify({ file_id: file_id }), {
                    headers: {
                        userid: this.$store.state.userid,
                        token: this.$store.state.token,
                    }
                })
                    .then(res => {
                        if (res.data.errno === 0) {
                            console.log(res.data);//测试一下
                            //this.$message.success('重命名成功' + this.file_rename_id);
                            var i = 0;
                            for(var item of this.file_list){
                                if(item.file_id === file_id){
                                    break;
                                }else{
                                    i++;
                                }
                            }
                            this.file_list.splice(i, 1);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
                //this.$message.success('成功删除文档' + file_id);
            });
        },
        create_file() {
            if (this.new_file_name === '') {
                this.$message.error('文档名不能为空');
            } else {
                let date = new Date();
                let time = date.toLocaleString();
                this.$axios.post('/project/createFile', qs.stringify({ file_name: this.new_file_name, create_time: time, proj_id: this.$route.query.id }), {
                    headers: {
                        userid: this.$store.state.userid,
                        token: this.$store.state.token,
                    }
                })
                    .then(res => {
                        if (res.data.errno === 0) {
                            console.log(res.data);//测试一下
                            this.$message.success('新建文档成功');
                            let fid = res.data.file_id;
                            let item = {
                                file_id: fid,
                                file_name: this.new_file_name,
                                file_creator: this.$store.state.username,
                                create_time: time,
                                last_modify_time: time,
                                last_modify_user_id: this.$store.state.userid,
                                last_modify_user_name: this.$store.state.username,
                            };
                            this.file_list.push(item);
                            this.new_file_dialog_visible = false;
                            this.new_file_name = ''; //争取把源数据(文档名)也修改了
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
        },
    },
    mounted() {
        this.$axios.post('/project/getFileList', qs.stringify({  proj_id: this.$route.query.id }), {
            headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
            }
        })
            .then(res => {
                if (res.data.errno === 0) {
                    console.log(res.data);//测试一下
                    //this.$message.success('重命名成功' + this.file_rename_id);
                    this.file_list = res.data.data; //争取把源数据(文档名)也修改了
                } else {
                    this.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                this.$message.error(err);
            });
    },
};
</script>

<style scoped>
#file {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

#title {
    width: 100%;
    padding-top: 10px;
    text-align: left;
    font-size: 30px;
}

#files {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
    min-height: 200px;
}

.one-file {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 10px;
}

.new-file {
    width: 40px;
    height: 200px;
    padding: 20px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>