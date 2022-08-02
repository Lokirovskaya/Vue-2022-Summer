<template>
    <div class="Project">

        <!--项目内容描述-->
        <el-descriptions class="margin-top" title="项目信息" :column="2" border>

            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-collection"></i>
                    项目名
                </template>
                VueProj
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    项目创建人
                </template>
                李田所
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-promotion"></i>
                    项目所属团队
                </template>
                啊对对队
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-s-custom"></i>
                    参与成员
                </template>
                德川,我修院,李田所,周撅伦,淳平
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    项目描述
                </template>
                兄啊，这么臭的项目有存在的必要吗(恼)
            </el-descriptions-item>
        </el-descriptions>
        <br>
        <!--项目功能模块跳转-->
        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
            <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
            <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
export default {
    data() {
        return {

        };
    },
    methods: {
        toPD (){ //Prototype design
            this.$router.push({ path: '/'});
        },
        toPE (){//Photo Edit
            this.$router.push({ path: '/'});
        },
        toFE (){//File edit
            this.$router.push({ path: '/'});
        },
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