<template>
    <div class="lg-from">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="ruleForm.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登陆</el-button>
                <el-button @click="resetForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { requestLogin } from '../api/api'
export default {
  name: 'Login',
  data () {
    return {
      ruleForm: {
        user: '喻波',
        pwd: '123'
      },
      rules: {
        user: [
          { required: true, message: '请输入您的登陆账号', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入您的登陆密码', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm (formName) {
      var userInfo = {user: this.ruleForm.user, pwd: this.ruleForm.pwd}
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          requestLogin(userInfo).then(res => {
            this.loading = false
            var { msg, code, data } = res
            if (code === 200) {
              sessionStorage.setItem('userInfoStorage', JSON.stringify(data.user))
              this.$router.push({ path: '/' })
            } else {
              this.$message({
                message: msg,
                type: 'warning'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.lg-from{
    position: fixed;
    width: 400px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
}
</style>
