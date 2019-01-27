<template>
  <div class="login">
    <div class="container">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="16" :md="10" :lg="5" :xl="3">
          <el-form ref="loginForm" :model="loginForm" label-width="0px" :rules="rules">
            <el-form-item label="" prop="userId">
              <el-input
                placeholder="用户名"
                prefix-icon="fc-icon-user"
                v-model="loginForm.userId">
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                :type="passwordType"
                placeholder="密码"
                prefix-icon="fc-icon-lock"
                v-model="loginForm.password">
              </el-input>
              <span class="show-password el-input__suffix" @click="showPassword">
                <span class="el-input__suffix-inner">
                  <i class="el-input__icon el-icon-view"></i>
                </span>
              </span>
            </el-form-item>
            <el-button type="primary" size="medium" @click="login" :loading="loading">登录</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      isCapsLook: false,
      loginForm: {
        userId: 'admin',
        password: '123456'
      },
      rules: {
        userId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, message: '用户名最少5位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最少6位', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPassword () {
      if (this.passwordType) {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          setToken('xxx')
          this.$router.push({ path: this.redirect || '/' })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login{
  .el-input{
    input{
      background-color: transparent;
      border-color: #B0BEC5;
    }
  }
}
</style>
<style lang="scss" scoped>
.login{
  height: 100%;
  width: 100%;
  background-color: #37474F;
  display: flex;
  align-items: center;
  .container{
    margin: 10px;
    width: 100%;
    position: relative;
    top: -10%;
    .el-form-item{
      &:hover .show-password{
        display: initial;
      }
      .show-password{
        display: none;
        cursor: pointer;
      }
    }
  }
  .el-button{
    width: 100%;
  }
}
</style>
