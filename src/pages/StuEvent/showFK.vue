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
      prop="fkid"
      label="访客ID"
      width="180">
      </el-table-column>
    <el-table-column
      prop="lFName"
      label="访客"
      width="180">
      </el-table-column>
    <el-table-column
      prop="sFName"
      label="受访人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="relation"
      label="关系">
    </el-table-column>
     <el-table-column
      prop="startTime"
      label="来访时间">
    </el-table-column>
     <el-table-column
      prop="endTime"
      label="离开时间">
    </el-table-column>
    <el-table-column>
    <template slot-scope="scope">
    <el-button  @click="editFK(scope.$index,scope.row)">编 辑</el-button > 
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
  <el-button  @click="saveDorm">添 加 访 客</el-button >
    <el-dialog :title="dialogTitle" width="50%" :visible.sync="iconFormVisible">
      <el-form :inline="true" :model="FKinfo" class="demo-form-inline">
        <el-form-item label="访客ID">
          <el-input v-model="FKinfo.fkid" placeholder="访客ID" ></el-input>
        </el-form-item>
        <el-form-item label="访客">
          <el-input v-model="FKinfo.lFName" placeholder="访客" ></el-input>
        </el-form-item>
        <el-form-item label="受访人">
          <el-input v-model="FKinfo.sFName" placeholder="受访人"></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="FKinfo.relation" placeholder="关系"></el-input>
        </el-form-item>
         <el-form-item label="来访时间">
          <el-input v-model="FKinfo.startTime" placeholder="来访时间"></el-input>
        </el-form-item>
            <el-form-item label="离开时间">
          <el-input v-model="FKinfo.endTime" placeholder="离开时间"></el-input>
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
      FKinfo: {},
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
    this.$axios.post('http://localhost:8080/DormSystem/fangke/chaxun').then(res => {
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
    saveDorm () {
      this.dialogTitle = '增 加'
      this.FKinfo = {}
      this.iconFormVisible = true
    },
    editFK (index, row) {
      this.dialogTitle = '编 辑'
      this.FKinfo = row
      this.iconFormVisible = true
      this.rowIndex = index
    },
    async submitUser () {
      if (this.dialogTitle === '编 辑') {
        this.Data.splice(this.rowIndex, 1, this.FKinfo)
        this.iconFormVisible = false
        console.log(this.FKinfo)
        let res = await axios.post('http://localhost:8080/DormSystem/fangke/bianji', 
          qs.stringify({
            fkid: this.FKinfo.fkid,
            lFName: this.FKinfo.lFName,
            sFName: this.FKinfo.sFName,
            relation: this.FKinfo.relation,
            startTime: this.FKinfo.startTime,
            endTime: this.FKinfo.endTime
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
      console.log(this.FKinfo)
      let res = await axios.post('http://localhost:8080/DormSystem/fangke/laifang', 
        qs.stringify({
          fkid: this.FKinfo.fkid,
          lFName: this.FKinfo.lFName,
          sFName: this.FKinfo.sFName,
          relation: this.FKinfo.relation,
          startTime: this.FKinfo.startTime,
          endTime: this.FKinfo.endTime
        })).then(res => {
      /* 模拟服务器响应 */
        if (res.data.code === 200) {
          console.log(res.data.data)
        } else {
          console.log(res.data.msg)
        }
      })
      
      this.Data.splice(0, 0, this.FKinfo)
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