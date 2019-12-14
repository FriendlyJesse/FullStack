<template>
  <section>
    <h1>{{id ? '编辑': '新建'}}文章</h1>
    <el-form :model="form" @submit.native.prevent="save" label-width="80px">
      <el-form-item label="所属分类">
        <el-select v-model="form.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="form.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type	="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>

import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data () {
    return {
      form: {},
      categories: []
    }
  },
  created () {
    this.getCategories()
    this.id && this.getDetails()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/article/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/article', this.form)
      }
      if (res) {
        this.$router.push('/articles/list')
        this.$message({type: 'success', message: '保存成功'})
      }
    },
    async getDetails () {
      let res = await this.$http.get(`rest/article/${this.id}`)
      if (res) {
        this.form = res.data
      }
    },
    async getCategories () {
      let res = await this.$http.get('rest/categories', {params: {type: '新闻'}})
      if (res) {
        this.categories = res.data
      }
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {

      const formData = new FormData()
      formData.append('file', file)
 
      let res = await this.$http.post('upload', formData)
      if (res) {
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      }
    }
  }
}
</script>