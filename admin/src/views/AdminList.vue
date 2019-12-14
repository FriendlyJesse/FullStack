<template>
  <section>
    <h1>管理员列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row._id)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteItem(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let res = await this.$http.get('rest/admins')
      if (res) {
        this.tableData = res.data
      }
    },
    deleteItem (item) {
      this.$confirm(`是否要删除分类 "${item.name}"?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await this.$http.delete(`rest/admins/${item._id}`)
          if (res.data.ok) {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
          }
        }).catch(() => {})
    },
    editItem (id) {
      this.$router.push(`/admins/edit/${id}`)
    }
  }
}
</script>