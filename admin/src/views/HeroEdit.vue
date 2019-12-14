<template>
  <section>
    <h1>{{id ? '编辑': '新建'}}英雄</h1>
    
    <el-form :model="form" @submit.native.prevent="save" label-width="80px">

      <el-tabs type="border-card">

        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(form, 'banner', res.url)">
              <img v-if="form.banner" :src="form.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="form.scores.difficult" :max="9" show-score style="line-height: 2.5"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="form.scores.skills" :max="9" show-score style="line-height: 2.5"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="form.scores.attack" :max="9" show-score style="line-height: 2.5"></el-rate>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="form.scores.survive" :max="9" show-score style="line-height: 2.5"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="form.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="form.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textareea" v-model="form.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textareea" v-model="form.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textareea" v-model="form.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        
        <el-tab-pane label="技能">
          <el-button @click="form.skills.push({})" type="text"><i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="20">
            <el-col :md="12" v-for="(item, i) in form.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="form.skills.splice(i, 1)" size="small" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-form-item>
          <el-button type="primary" native-type	="submit">保存</el-button>
        </el-form-item>
      </el-tabs>

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
    width: 5rem;
    /* height: 5rem; */
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    /* width: 5rem; */
    height: 5rem;
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
        name: '',
        avatar: '',
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: []
      },
      categories: [],
      items: []
    }
  },
  created () {
    this.getCategories()
    this.getItems()
    this.id && this.getDetails()
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/heroes', this.form)
      }
      if (res) {
        this.$router.push('/heroes/list')
        this.$message({type: 'success', message: '保存成功'})
      }
    },
    async getDetails () {
      let res = await this.$http.get(`rest/heroes/${this.id}`)
      if (res) {
        this.form = Object.assign({}, this.form, res.data)
      }
    },
    async getCategories () {
      let res = await this.$http.get('rest/categories')
      if (res) {
        this.categories = res.data
      }
    },
    async getItems () {
      let res = await this.$http.get('rest/items')
      if (res) {
        this.items = res.data
      }
    },
    handleAvatarSuccess (res) {
      this.form.avatar = res.url
    }
  }
}
</script>