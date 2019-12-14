<template>
  <section>
    <h1>{{id ? '编辑': '新建'}}物品</h1>
    <el-form :model="form" @submit.native.prevent="save" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="form.icon" :src="form.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
export default {
  props: {
    id: {}
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.id && this.getDetails()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/items', this.form)
      }
      if (res) {
        this.$router.push('/items/list')
        this.$message({type: 'success', message: '保存成功'})
      }
    },
    async getDetails () {
      let res = await this.$http.get(`rest/items/${this.id}`)
      if (res) {
        this.form = res.data
      }
    },
    handleAvatarSuccess (res) {
      this.$set(this.form, 'icon', res.url)
    }
  }
}
</script>