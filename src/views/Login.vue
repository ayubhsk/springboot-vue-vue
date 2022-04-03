<template>
    <div class="wrapper">
        <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
            <el-form :model="user" :rules="rules" ref="userForm">
                <el-form-item prop="username">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user"
                              v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                              v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    username: "admin",
                    password: "admin"
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            login() {
/*                this.$refs['userForm'].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.$axios({
                            method: "post", //请求方式
                            url: "/user/login",  //请求路径
                            params: this.user,
                        }).then(res => {
                            var result = res.data
                            console.log(JSON.stringify(result.data))
                            localStorage.setItem("user",JSON.stringify(result.data))
                            if (result.code=="200") {
                                this.$router.push("/user")
                            } else {
                                this.$message.error(result.msg)
                            }
                        })
                    } else {
                        return false;
                    }
                });*/

                this.$refs['userForm'].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.request({
                            method: "post", //请求方式
                            url: "/user/login",  //请求路径
                            params: this.user,
                        }).then(res => {
                            var result = res
                            console.log(JSON.stringify(result.data))
                            localStorage.setItem("user",JSON.stringify(result.data))
                            if (result.code=="200") {
                                this.$router.push("/user")
                            } else {
                                this.$message.error(result.msg)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .wrapper {
        height: 100vh;
        background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
        overflow: hidden;
    }
</style>
