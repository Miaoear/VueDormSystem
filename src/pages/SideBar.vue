<template>
<div
:width="isCollapse ? '64px' : '200px'"
      :default-active="$route.path"
      Props:defaultProps
      router
    >
      <el-menu class="sidebar-el-menu" background-color="#324157"
      text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
        <!-- <el-button @click="getMenu()">lianjie</el-button> -->

        <template v-for="item in Data">
            <el-submenu v-if="item.childMenus && item.childMenus.length > 0" :index="item.menuid" :key="item.menuid">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>  
              </template> 

              <template v-for="subItem in item.childMenus">

                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">{{ subItem.name }}</template>
                </el-submenu>
                
                <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                  <i :class="subItem.icon"></i>
                  {{ subItem.name }}
                </el-menu-item>

              </template> 
            </el-submenu>
            <el-menu-item v-else :index="item.url" :key="item.url">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>  
              </template> 
            </el-menu-item>


          </template>


      </el-menu>
    </div>
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
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  /* mounted() { */
  mounted: function () {                
    const _this = this
    /* 端口号需要改变  */
    /* this.$axios.get('http://localhost:8080/DormSystem/menu/getRoleMenu?userId=' + sessionStorage.getItem('userId')).then(res => { */
    /* this.$axios.post('http://localhost:8080/DormSystem/menu/showAllMenu', this.$qs.stringify(this.ruleForm)).then(res => { */
    this.$axios.post('http://localhost:8080/DormSystem/menu/getRoleMenu?userId=' + sessionStorage.getItem('userId')).then(res => {
      /* 模拟服务器响应 */
      if (res.data.code === 200) {
        console.log(res.data.data)
        this.Data = res.data.data 
      } else {
        console.log(res.data.msg)
      }
    })
  }
}
</script>
<style scoped>
</style>