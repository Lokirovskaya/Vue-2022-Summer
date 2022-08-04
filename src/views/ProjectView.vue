<template>
    <div id="project">
        <!--项目内容描述-->
        <div v-if="this.proj_modify === 0">
            <el-divider><i class="el-icon-info"></i>&nbsp;项目基本信息</el-divider>
            <div style="margin-left: 90%;">
            <el-button style="position:relative;bottom: 10px;" @click="
                proj_modify = 1;
            input_proj_name = proj_name;
            input_proj_info = proj_info;
            input_proj_start = proj_start;
            input_proj_end = proj_end;">修改信息</el-button>
            </div>
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-collection"></i>
                        项目名
                    </template>
                    {{ proj_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        项目创建人
                    </template>
                    {{ proj_creator }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="fa-solid fa-people-group"></i>
                        项目所属团队
                    </template>
                    {{ proj_team }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-s-custom"></i>
                        参与成员
                    </template>
                    <span v-for="item in members" :key="item.userid" @click="toPC(item.userid)">
                        <el-tooltip class="item" effect="light" :content="item.truename" placement="bottom">
                            <!-- <el-avatar size="15" :src="item.photo"></el-avatar> -->
                            <img class="avatar" :src="'http://stcmp.shlprn.cn' + item.photo" />
                        </el-tooltip>
                    </span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-date"></i>
                        项目开始时间
                    </template>
                    {{ proj_start }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-date"></i>
                        项目结束时间
                    </template>
                    {{ proj_end }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        项目描述
                    </template>
                    {{ proj_info }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <!--项目信息修改界面-->
        <div v-else>
            <el-divider><i class="el-icon-edit"></i>&nbsp;修改项目信息</el-divider>
            <div style="margin-left: 90%;">
            <el-button style="position:relative;bottom: 10px;" @click="
                proj_modify = 0;
            input_proj_name = '';
            input_proj_info = '';
            input_proj_end = '';
            input_proj_start = '';">返回</el-button>
            </div>
            <div style="margin-left:30%;margin-right:30%;">
            <span>
                <b>项目名</b><br>
                <el-input placeholder="请输入内容" prefix-icon="el-icon-collection" v-model="input_proj_name" style="position:relative; bottom:-5px">
                </el-input>
            </span><br>
            <span style="position:relative;top:10px;">
                <b>开始时间</b><br>
                <el-date-picker v-model="input_proj_start" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="position:relative; bottom:-5px">
                </el-date-picker>
                </span><br>
                <span style="position:relative;top:20px;">
                <b>结束时间</b><br>
                <el-date-picker v-model="input_proj_end" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="position:relative; bottom:-5px">
                </el-date-picker>
                </span><br>
                <span  style="position:relative;top:30px;">
                <b>项目简介</b>
                <el-input type="textarea" placeholder="请输入内容" v-model="input_proj_info" maxlength="150" show-word-limit  style="position:relative; bottom:-5px">
                </el-input>
                <el-button style="position: relative; top: 10px;" @click="EditProjInfo">修改</el-button>
                </span><br>
            </div>
        </div>
        <!--分割线-->
        <br><br>
        <el-divider><i class="fa-solid fa-gear"></i>&nbsp;功能区</el-divider>
        <br>

        <!--项目功能模块跳转-->
        <div style=" margin-left: 15%;margin-right: 15%">
            <el-col :span="6">
                <el-card :body-style="{ padding: '5px' }" shadow="hover">
                    <div @click="toPD">
                        <img src="https://s2.loli.net/2022/08/03/bNg8tkfHR7YG3vu.png" class="image">
                        <div style="padding: 14px;">
                            <span>原型设计</span>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6" :offset="3">
                <el-card :body-style="{ padding: '5px' }" shadow="hover">
                    <div @click="toPE">
                        <img src="https://s2.loli.net/2022/08/03/Fwx156ctoqUKWX7.png" class="image">
                        <div style="padding: 14px;">
                            <span>绘制图</span>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6" :offset="3">
                <el-card :body-style="{ padding: '5px' }" shadow="hover">
                    <div @click="toFE">
                        <img src="https://s2.loli.net/2022/08/03/Rs2HO48IXf5PFlu.png" class="image">
                        <div style="padding: 14px;">
                            <span>编辑文档</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </div>
    </div>
</template>

<script>
import qs from "qs";
export default {
    name: "ProjectView",
    data() {
        return {
            proj_name: '', //项目名称
            proj_creator: '', //项目创建者昵称
            proj_start: '', //项目开始时间
            proj_end: '', //项目结束时间
            proj_team: '', //所属团队名称
            proj_info: '', //项目简介
            proj_modify: 0, // 项目信息修改
            input_proj_name: '', //输入的项目名称
            input_proj_start: '', //输入的项目开始时间
            input_proj_end: '', //输入的项目结束时间
            input_proj_info: '', //输入的项目简介
            members: [], //用户列表
            members1: [
                {
                    userid: 1,
                    truename: "张三",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                }, {
                    userid: 2,
                    truename: "李四",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                }, {
                    userid: 3,
                    truename: "王五",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                }, {
                    userid: 4,
                    truename: "老六",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                }
            ], //测试用
            proj_photo: '', //项目图片
        };
    },
    methods: {
        toPD() { //Prototype design
            this.$router.push({ path: '/', query: { id: this.$route.query.id } });
        },
        toPE() {//Photo Edit
            this.$router.push({ path: '/', query: { id: this.$route.query.id } });
        },
        toFE() {//File edit
            this.$router.push({ path: '/file', query: { id: this.$route.query.id }});
        },
        toPC(userid) {//Personal Center
            this.$router.push({ path: '/personcenter' , query: { id: userid}});
        },
        EditProjInfo() {
            //修改了项目名
            if (this.proj_name !== this.input_proj_name) {
                console.log('准备修改项目名字');
                this.$axios.post('/project/rename', qs.stringify({ proj_id: this.$route.query.id, new_name: this.input_proj_name }), {
                    headers: {
                        userid: this.$store.state.userid,
                        token: this.$store.state.token,
                    }
                })
                    .then(res => {
                        if (res.data.errno === 0) {
                            console.log(res.data);//测试一下
                            this.proj_name = this.input_proj_name;
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);
                    });
            }
            //console.log(this.input_proj_end >= this.input_proj_start);
            if (this.input_proj_end <= this.input_proj_start) {
                this.$message.error('项目结束日期不得早于等于开始日期');
            } else {
                //修改了项目开始日期
                if (this.proj_start !== this.input_proj_start) {
                    console.log('准备修改项目开始日期');
                    this.$axios.post('/project/modifyProjInfo', qs.stringify({ proj_id: this.$route.query.id, judge: 2, start: this.input_proj_start }), {
                        headers: {
                            userid: this.$store.state.userid,
                            token: this.$store.state.token,
                        }
                    })
                        .then(res => {
                            if (res.data.errno === 0) {
                                console.log(res.data);//测试一下
                                this.proj_start = this.input_proj_start;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
                //修改了项目结束日期
                if (this.proj_end !== this.input_proj_end) {
                    console.log('准备修改项目结束日期');
                    this.$axios.post('/project/modifyProjInfo', qs.stringify({ proj_id: this.$route.query.id, judge: 3, end: this.input_proj_end }), {
                        headers: {
                            userid: this.$store.state.userid,
                            token: this.$store.state.token,
                        }
                    })
                        .then(res => {
                            if (res.data.errno === 0) {
                                console.log(res.data);//测试一下
                                this.proj_end = this.input_proj_end;
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            this.$message.error(err);
                        });
                }
            }
            //修改了项目简介
            if (this.proj_info !== this.input_proj_info) {
                console.log('准备修改项目简介');
                this.$axios.post('/project/modifyProjInfo', qs.stringify({ proj_id: this.$route.query.id, judge: 1, info: this.input_proj_info }), {
                    headers: {
                        userid: this.$store.state.userid,
                        token: this.$store.state.token,
                    }
                })
                    .then(res => {
                        if (res.data.errno === 0) {
                            console.log(res.data);//测试一下
                            this.proj_info = this.input_proj_info;
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
    mounted() {//获取项目相关信息
        this.$axios.post('/project/detail', qs.stringify({ proj_id: this.$route.query.id }), {
            headers: {
                userid: this.$store.state.userid,
                token: this.$store.state.token,
            }
        })
            .then(res => {
                if (res.data.errno === 0) {
                    console.log(res.data);//打印一下
                    this.proj_name = res.data.proj_name;
                    this.proj_creator = res.data.proj_creator;
                    this.proj_start = res.data.proj_start;
                    this.proj_end = res.data.proj_end;
                    this.proj_team = res.data.proj_team;
                    this.proj_info = res.data.proj_info;
                    this.members = res.data.members;
                    this.proj_photo = res.data.proj_photo;
                }
                else {
                    this.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                this.$message.error(err);
            });
    },
}
</script>

<style scoped>
.bottom {
    margin-top: 5px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.avatar {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(230,230,250);
  }
</style>