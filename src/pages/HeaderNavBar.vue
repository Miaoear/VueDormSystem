<template>
  <div class="d1">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/main">首页</el-menu-item>
      <el-submenu index="/event">
        <template slot="title">按学生ID查询</template>
        <el-menu-item index="/event/create">创建</el-menu-item>
        <el-menu-item index="/event/list">管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/xsgl">
        <template slot="title">按学生name查询</template>
        <el-menu-item index="/xsgl/xslb">账户充值</el-menu-item>
        <el-menu-item index="2-2">账户信息</el-menu-item>
      </el-submenu>
      <el-button type="primary" @click="logout" style="float:right">退出</el-button>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.el-menu-demo{
  height: 60px;
  background: 
  url("../assets/bg-top.png") no-repeat;  
  margin-bottom: 5px;
}
img{
  border-radius: 0%;
}
</style>