<template>
<div>
 <el-table
    :data="Data.slice((currentPage-1)*PageSize,currentPage*PageSize)" 

    border
    style="width: 100%"
    >
   <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="dorNo"
      label="宿舍号"
      width="180">
      </el-table-column>
    <el-table-column
      prop="dorManage"
      label="管理员"
      width="180">
    </el-table-column>
    <el-table-column
      prop="bedNum"
      label="床位数">
    </el-table-column>
    <el-table-column>
       <template slot="header" slot-scope="scope">
        <el-input type="text" v-model="scope.search" size="mini" placeholder="输入关键字搜索"/>
      </template>
    <template slot-scope="scope">
    <el-button  @click="editDorm(scope.$index,scope.row)">编 辑 宿 舍</el-button > 
    <el-button  @click="Ddelete(scope.$index,scope.row)" type="danger">删 除 宿 舍（谨慎操作）</el-button >
     </template>
    </el-table-column>
  </el-table>
  
<div class="tabListPage">
    <el-pagination @size-change="handleSizeChange" 
                  @current-change="handleCurrentChange" 
                  :current-page="currentPage" 
                  :page-size="PageSize" layout="total,prev, pager, next, jumper" 
                  :total="totalCount">
      </el-pagination>  
  </div>
  <el-button  @click="saveDorm">添 加 宿 舍</el-button >
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
      <el-form :inline="true" :model="dorminfo" class="demo-form-inline">
        <el-form-item label="宿舍号">
          <el-input v-model="dorminfo.dorNo" placeholder="宿舍号" ></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="dorminfo.dorManage" placeholder="管理员"></el-input>
        </el-form-item>
        <el-form-item label="床位">
          <el-input v-model="dorminfo.bedNum" placeholder="床位"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="iconFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser()">提 交</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
  data () {
    return {
      Data: [],
      iconFormVisible: false,
      dorminfo: {},
      dialogTitle: '增 加',
      rowIndex: null,
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5
    }
  },
  mounted: function () {
    const _that = this
    /* 端口号需要改变  */
    this.$axios.post('http://localhost:8080/DormSystem/Dorm/showDorm').then(res => {
      /* 模拟服务器响应 */
      if (res.data.code === 200) {
        console.log(res.data.data)
        _that.Data = res.data.data
        this.totalCount = res.data.data.length
      } else {
        console.log(res.data.msg)
      }
    })
  },
  methods: { 
    Ddelete (index, row) {
      this.$confirm(`确定删除${row.dorNo}吗?`, '提 示', {
        confirmButtonText: '提 交',
        cancelButtonText: '取 消',
        type: 'error'
      }).then(() => {
        console.log(row.dorNo)
        this.$axios.post('http://localhost:8080/DormSystem/Dorm/deleteDorm?dorNo=' + row.dorNo).then(res => {
        /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.data)
            this.Data.splice(index, 1)
          } else {
            console.log(res.data.msg)
          }
        })
      })
    },
    saveDorm () {
      this.dialogTitle = '增 加'
      this.dorminfo = {}
      this.iconFormVisible = true
    },
    editDorm (index, row) {
      this.dialogTitle = '编 辑'
      this.dorminfo = row
      this.iconFormVisible = true
      this.rowIndex = index
    },
    async submitUser () {
      if (this.dialogTitle === '编 辑') {
        this.Data.splice(this.rowIndex, 1, this.dorminfo)
        this.iconFormVisible = false
        console.log(this.dorminfo)
        let res = await axios.post('http://localhost:8080/DormSystem/Dorm/updateDorm', 
          qs.stringify({
            dorNo: this.dorminfo.dorNo,
            dorManage: this.dorminfo.dorManage,
            bedNum: this.dorminfo.bedNum
          })).then(res => {
          /* 模拟服务器响应 */
          if (res.data.code === 200) {
            console.log(res.data.data)
          } else {
            console.log(res.data.msg)
          }
        })
        return
      } 
      console.log(this.dorminfo)
      let res = await axios.post('http://localhost:8080/DormSystem/Dorm/saveDorm', 
        qs.stringify({
          dorNo: this.dorminfo.dorNo,
          dorManage: this.dorminfo.dorManage,
          bedNum: this.dorminfo.bedNum
        })).then(res => {
      /* 模拟服务器响应 */
        if (res.data.code === 200) {
          console.log(res.data.data)
        } else {
          console.log(res.data.msg)
        }
      })
      
      this.Data.splice(0, 0, this.dorminfo)
      this.iconFormVisible = false
    },
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
    }
  }
}
</script>
<style scoped>

</style>