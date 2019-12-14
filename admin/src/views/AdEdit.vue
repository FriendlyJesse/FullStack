<template>
  <section>
    <h1>{{id ? '编辑': '新建'}}广告位</h1>
    <el-form :model="form" @submit.native.prevent="save" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="form.items.push({})" type="text"><i class="el-icon-plus"></i> 添加技能</el-button>
        <el-row type="flex" style="flex-wrap: wrap" :gutter="20">
          <el-col :md="12" v-for="(item, i) in form.items" :key="i">
            <el-form-item label="链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="操作">
              <el-button @click="form.items.splice(i, 1)" size="small" type="danger">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      form: {
        items: []
      }
    }
  },
  created () {
    this.id && this.getDetails()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/ads', this.form)
      }
      if (res) {
        this.$router.push('/ads/list')
        this.$message({type: 'success', message: '保存成功'})
      }
    },
    async getDetails () {
      let res = await this.$http.get(`rest/ads/${this.id}`)
      if (res) {
        this.form = Object.assign({}, this.form, res.data)
      }
    },
    handleAvatarSuccess (res) {
      this.$set(this.form, 'icon', res.url)
    }
  }
}
</script>