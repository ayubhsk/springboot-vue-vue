<template>
    <div style="min-height: 100%;background-color: rgb(48,65,86);overflow-x: hidden">
        <el-menu :default-openeds="['1', '2']" style="min-height: 100%;overflow-x: hidden"
                 background-color="rgb(48, 65, 86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
                 router
                 @select="handleSelect"
        >
            <div style="height: 60px; line-height: 60px; text-align: center">
                <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
                <b style="color: white" v-show="logoTextShow">后台管理系统</b>
            </div>
            <el-menu-item index="/home" >
                <template slot="title">
                    <i class="el-icon-house"></i>
                    <span slot="title">主页</span>
                </template>
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">系统管理</span>
                </template>
                <el-menu-item index="/user">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </el-submenu>
            <a href="/use">点击试试</a>
        </el-menu>
    </div>

</template>

<script>
    export default {
        name: "Aside",
        props: {
            isCollapse: Boolean,
            logoTextShow: Boolean
        },
        methods:{
            handleSelect(index,indexPath){
                console.log(index)
                console.log(indexPath)
                console.log(this.index)
            }
        },

    }
</script>

<style scoped>

</style>