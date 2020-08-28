<template>
  <div>
    <img src="" alt="">
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
    </el-menu>
    <div class="d1">
      <img src="../assets/guidian.png" alt="">
    </div>
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
    }
  }
}
</script>
<style scoped>
.d1{
  background: url("../assets/bg-top.png");
  margin-bottom: 5px;
}
</style>