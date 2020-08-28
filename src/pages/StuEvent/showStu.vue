<template>
<div>
  <el-card class="box-card">
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
          <el-button type="primary" @click="editStu(scope.row)" icon="el-icon-edit" ></el-button>
          <el-button type="danger" @click="deleteStu(scope.$index, scope.row)" icon="el-icon-delete" ></el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  <div class="d1">
    <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline" size="mini">添加</el-button>
  </div>
  <div class="tabListPage">
    <el-pagination @size-change="handleSizeChange" 
                  @current-change="handleCurrentChange" 
                  :current-page="currentPage" 
                  :page-sizes="pageSizes" 
                  :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
                  :total="totalCount">
      </el-pagination>
  </div>

  <el-dialog
    :title="addFlag?'新增学生列表':'修改学生列表'"
    style="text-align:left !important"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    >
      <el-form ref="form" :model="datalist" label-width="80px">
        <el-form-item label="学生ID" style="width:300px">
          <el-input v-model="datalist.userId" :disabled="true" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" style="width:280px">
          <el-input v-model="datalist.username" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width:230px">
          <el-input v-model="datalist.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="width:190px">
          <el-input v-model="datalist.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" style="width:190px">
          <el-input v-model="datalist.dorno" placeholder="请输入宿舍号"></el-input>
        </el-form-item>
        <el-form-item label="电话" style="width:190px">
          <el-input v-model="datalist.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateStu ()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      input: '',
      Data: [],
      datalist: {},
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [3, 4, 5],
      // 默认每页显示的条数（可修改）
      PageSize: 3,

      dialogVisible: false,
      addFlag: true

    }
  },
  mounted: function () {
    this.showStu()
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


    showStu () {
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

    
    handleClose (done) {
      done()
    },
    editStu (row) {
      this.datalist = row
      this.dialogVisible = true
      this.addFlag = false
    },


    /* 修改操作 */
    async updateStu () {
      try {
        let res = await axios.post(
          'http://localhost:8080/DormSystem/user/updateStu',
          qs.stringify({
            userId: this.datalist.userId,
            username: this.datalist.username,
            password: this.datalist.password,
            sex: this.datalist.sex,
            dorno: this.datalist.dorno,
            phone: this.datalist.phone
          })
        )
        this.dialogVisible = false
        this.Data = []
        this.$message({
          message: '修改成功!',
          type: 'success'
        })
        this.showStu()
      } catch (e) {
        console.log(e)
      }
    },
    
    /* 添加操作 */
    add (row) {
      this.datalist = row
      this.dialogVisible = true
      this.addFlag = true
    },
    // 弹窗确定
    async submitUser (datalist) {
      if (this.addFlag === 'flase') {
        
      } else if (this.addFlag === 'true') {
        this.Data.splice(0, 0, this.datalist)
        this.iconFormVisible = false
        let res = await axios.post(
          'http://localhost:8080/DormSystem/user/saveUser',
          qs.stringify({
            userId: this.datalist.userId,
            username: this.datalist.username,
            password: this.datalist.password,
            sex: this.datalist.sex,
            dorno: this.datalist.dorno,
            phone: this.datalist.phone
          })
        )
        this.dialogVisible = false
        this.userInfo = {}
        this.$message({
          message: res.data.Msg,
          type: 'success'
        })
      }
    },

    /* 删除操作 */
    deleteStu (index, row) {
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
.tabListPage{
  margin-top: 20px;
  margin-left: 300px;
}
.d1{
  margin-top: 20px;
  margin-left: 1110px;
}
</style>
