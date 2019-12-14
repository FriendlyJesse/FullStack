<template>
  <section>
    <h1>{{id ? '编辑': '新建'}}分类</h1>
    <el-form :model="form" @submit.native.prevent="save" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type	="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      form: {},
      parents: []
    }
  },
  created () {
    this.getParents()
    this.id && this.getDetails()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/categories', this.form)
      }
      if (res) {
        this.$router.push('/categories/list')
        this.$message({type: 'success', message: '保存成功'})
      }
    },
    async getDetails () {
      let res = await this.$http.get(`rest/categories/${this.id}`)
      if (res) {
        this.form = res.data
      }
    },
    async getParents () {
      let res = await this.$http.get('rest/categories', {params: {type: 'top'}})
      if (res) {
        this.parents = res.data
      }
    }
  }
}
</script>