<template>
    <div>
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width:200px;margin-right:5px"></el-input>
                <!-- 跨域请求验证码图片，看vue.config.js -->
                <img :src="captureUrl" @click="updateCapture">
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemeber">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button> 
        </el-form>
        
    </div>
</template>

<script>
import { trigger } from '@vue/reactivity'

    export default {
        name: "Login",
        data() {
            return {
                captureUrl: '/captcha?time='+new Date(),
                loginForm: {
                    username: 'admin',
                    password: '123',
                    code: ''
                },
                checked: true,
                rules: {
                    username: [{required:true,message:'请输入用户名',trigger:'blur'}],
                    password: [{required:true,message:'请输入密码',trigger:'blur'}],
                    code: [{required:true,message:'请输入验证码',trigger:'blur'}]
                }
            }
        },
        methods: {
            updateCapture(){
                this.captureUrl = '/captcha?time'+new Date();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if(valid){
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                        })
                    } else {
                        this.$message.error('请输入正确的账号或密码！')
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 300px;
        padding: 15px 35px 15px 35px;
        background: white;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 0px auto 20px auto;
        text-align: center;
    }
    .loginRemeber{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .el-form-item__content{
        display: flex;
        align-items: center;
    }
</style>