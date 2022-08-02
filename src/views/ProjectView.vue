<template>
    <div class="Project">

        <!--项目内容描述-->
        <el-descriptions class="margin-top" title="项目信息" :column="2" border>

            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-collection"></i>
                    项目名
                </template>
                {{proj_name}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    项目创建人
                </template>
                {{proj_creator}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="fa-solid fa-people-group"></i>
                    项目所属团队
                </template>
                {{proj_team}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    参与成员
                </template>
                <span v-for="item in members1" :key="item.userid" @click="toPC">
                <el-tooltip class="item" effect="light" :content="item.truename" placement="bottom">
                    <el-avatar size="15" :src="item.photo"></el-avatar>
                </el-tooltip>
                </span>
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-date"></i>
                    项目开始时间
                </template>
                {{proj_start}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-date"></i>
                    项目结束时间
                </template>
                {{proj_end}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    项目描述
                </template>
                {{proj_info}}
            </el-descriptions-item>
        </el-descriptions>
        <br>
        <!--项目功能模块跳转-->
        <el-col :span="6">
            <el-card :body-style="{ padding: '5px' }" shadow="hover">
                <img src="https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                    class="image">
                <div style="padding: 14px;">
                    <span>原型设计</span>
                    <div class="bottom clearfix">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="toPD" circle></el-button>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="6" :offset="3">
            <el-card :body-style="{ padding: '5px' }" shadow="hover">
                <img src="https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                    class="image">
                <div style="padding: 14px;">
                    <span>绘制图</span>
                    <div class="bottom clearfix">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="toPE" circle></el-button>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="6" :offset="3">
            <el-card :body-style="{ padding: '5px' }" shadow="hover">
                <img src="https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                    class="image">
                <div style="padding: 14px;">
                    <span>编辑文档</span>
                    <div class="bottom clearfix">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="toFE" circle></el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
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
            members: [], //用户列表
            members1: [
                {
                    userid: 1,
                    truename: "张三",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                },{
                    userid: 2,
                    truename: "李四",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                },{
                    userid: 3,
                    truename: "王五",
                    photo: "https://s2.loli.net/2022/05/06/f2Jx6BkcSLEnRtU.jpg"
                },{
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
            this.$router.push({ path: '/' });
        },
        toPE() {//Photo Edit
            this.$router.push({ path: '/' });
        },
        toFE() {//File edit
            this.$router.push({ path: '/' });
        },
        toPC() {//Personal Center
            this.$router.push({ path: '/personcenter' });
        }
    },
    mounted (){//获取项目相关信息
            this.$axios.post('/project/detail', qs.stringify({ proj_id: this.$route.query.id }), {
                headers: {
                    userid: this.$store.state.userid,
                    token: this.$store.state.token,
                }
            })
                .then(res => {
                    if (res.data.errno === 0) {
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
</style>