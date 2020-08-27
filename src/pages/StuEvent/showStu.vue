<template>
<div>
  <el-table
    :data="Data.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    border
    style="width: 100%">
    <el-table-column
      label="学生ID"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="密码"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.password }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="性别"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sex }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="宿舍号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.dorno }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button-group>
          <el-button type="primary" @click="updataIcon(scope.$index, scope.row)" icon="el-icon-edit" ></el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" ></el-button>
          <el-button type="danger" @click="deleteIcon(scope.$index, scope.row)" icon="el-icon-delete" ></el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <div class="tabListPage">
    <el-pagination @size-change="handleSizeChange" 
                  @current-change="handleCurrentChange" 
                  :current-page="currentPage" 
                  :page-sizes="pageSizes" 
                  :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                  :total="totalCount">
      </el-pagination>    
  </div>




  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      Data: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [3, 4, 5],
      // 默认每页显示的条数（可修改）
      PageSize: 3
    }
  },
  mounted: function () {
    const _that = this
    /* 端口号需要改变 */
    this.$axios.post('http://localhost:8080/DormSystem/user/showStu', this.$qs.stringify(this.ruleForm)).then(res => {
      /* 模拟服务器响应 */
      if (res.data.code === 200) {
        console.log(res.data.data)
        this.Data = res.data.data 
        this.totalCount = res.data.data.length
      } else {
        console.log(res.data.msg)
      }
    })
  },
  methods: {
    // 分页
    // 每页显示的条数
    handleSizeChange (val) {
    // 改变每页显示的条数 
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
    // 改变默认的页数
      this.currentPage = val
    },


    /* 修改操作 */
    updataIcon (index, row) {
      console.log(row)
      this.$confirm('', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _that = this
        /* 端口号需要改变  */
        this.$axios.post('http://localhost:8080/DormSystem/user/updateStu' + row.userId).then(res => {
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.data)
            this.Data.splice(index, 1)
          } else {
            console.log(res.data.msg)
          }
        })

        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    /* 删除操作 */
    deleteIcon (index, row) {
      console.log(row.userId)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _that = this
        /* 端口号需要改变  */
        this.$axios.post('http://localhost:8080/DormSystem/user/deleteStu?userId=' + row.userId).then(res => {
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.data)
            this.Data.splice(index, 1)
          } else {
            console.log(res.data.msg)
          }
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }


  }
}
</script>
<style scoped>
</style>
