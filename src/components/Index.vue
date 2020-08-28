<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <span class="head">宿舍管理系统</span>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <header-nav-bar/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <side-bar/>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import HeaderNavBar from '../pages/HeaderNavBar'
import SideBar from '../pages/SideBar'

export default {
  name: 'Index',
  components: {
    HeaderNavBar,
    'SideBar': SideBar
  }
}
</script>

<style>
  .logo{
    width:60px;
    margin-left:10px;
    margin-top: 10px;
  }
  .head{
    margin-left: 100px;
    margin-top: -40px;
    text-align: center;
    float: left;
  }
  .avatar_box{
    height: 60px;
    width: 60px;
    border:1px solid rgb(150, 189, 247);
    border-radius: 50%;
    padding: 3px;
    box-shadow: 0 0 3px rgb(66, 83, 235);
    position: relative;
    left: 20px;
  }
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
</style>
