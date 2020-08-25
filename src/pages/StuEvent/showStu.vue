<template>
  <el-table
    :data="Data"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="学生ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dorno"
      label="宿舍号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column>
      <el-button type="primary" icon="el-icon-edit">修改</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-button type="primary" icon="el-icon-delete">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      Data: [],
      isCollapse: false,
      activePath: ''
    }
  },
  mounted: function () {
    const _that = this
    /* 端口号需要改变  */
    this.$axios.post('http://localhost:8080/DormSystem/user/showStu', this.$qs.stringify(this.ruleForm)).then(res => {
      /* 模拟服务器响应 */
      if (res.data.code === 200) {
        console.log(res.data.data)
        this.Data = res.data.data 
      } else {
        console.log(res.data.msg)
      }
    })
  },
  methods: {
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style scoped>
</style>
