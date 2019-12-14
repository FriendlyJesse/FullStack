<template>
  <section class="login">
    <el-card header="请先登录" class="login__card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<style scoped>

.login__card {
  width: 30rem;
  margin: 10rem auto;
}

</style>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    async login () {
      let res = await this.$http.post('login', this.form)
      if (res) {
        localStorage.setItem('admin', JSON.stringify(res.data.admin))
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
        this.$message.success('登录成功！')
      }
    }
  }
}
</script>