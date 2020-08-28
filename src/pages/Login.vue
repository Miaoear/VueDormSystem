/* eslint-disable eqeqeq */
<template>
  <div class="wrap">
    <div class="container">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" />
        <span></span>
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userId">
            <el-input v-model="ruleForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

  <!-- 气泡li -->
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        userId: 'G112233401',
        password: 'gly12301'
      },
      rules: {
        userId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _that = this
          /* this.$axios.post('http://localhost:8080/DormSystem/user/login', {'userId': this.ruleForm.userId, 'password': this.ruleForm.password}, {headers: {
            'Content-Type': 'application/json;charset=UTF-8'}}).then(res => {  */
          this.$axios.post('http://localhost:8080/DormSystem/user/login', this.$qs.stringify(this.ruleForm)).then(res => {
            /* 模拟服务器响应 */
            if (res.data.code === 200) {
              console.log(res.data.data)
              sessionStorage.setItem('userId', res.data.data.userId)
              _that.$router.push('/index')
            } else {
              console.log(res.data.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
img {
  height: 100%;
}
.demo-ruleForm {
  width: 300px;
  margin: 0 auto;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
/*
 .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
} 

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}*/





        /* 气泡样式 */
        * {

            box-sizing: border-box;
        }
        body {
            margin: 0;
            padding: 0;
            font: 16px/20px microsft yahei;
         }
        .wrap {
            width: 100%;
            height: 100%;

            position: fixed;
            opacity: 0.8;
            background: linear-gradient(to bottom right,#000000, #656565);
            background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);
        }
        .wrap ul {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -20;
        }
        .wrap ul li {
            list-style-type: none;
            display: block;
            position: absolute;
            bottom: -120px;
            width: 15px;
            height: 15px;
            z-index: -8;
            border-radius: 50%;
            box-shadow: inset -30px -30px 75px rgba(0, 0, 0, .2),
            inset 0px 0px 5px rgba(0, 0, 0, .5),
            inset -3px -3px 5px rgba(0, 0, 0, .5),
            0 0 20px rgba(255, 255, 255, .75);
            background-color:rgba(255, 255, 255, 0.15);
            animation: square 25s infinite;
            -webkit-animation: square 25s infinite;
        }
        .wrap ul li:nth-child(1) {
            left: 1%;
            animation-duration: 10s;
            -moz-animation-duration: 10s;
            -o-animation-duration: 10s;
            -webkit-animation-duration: 10s;
        }
        .wrap ul li:nth-child(2) {
            width: 40px;
            height: 40px;
            left: 10%;
            animation-duration: 15s;
            -moz-animation-duration: 15s;
            -o-animation-duration: 15s;
            -webkit-animation-duration: 11s;
        }
        .wrap ul li:nth-child(3) {
            left: 20%;
            width: 25px;
            height: 25px;
            animation-duration: 12s;
            -moz-animation-duration: 12s;
            -o-animation-duration: 12s;
            -webkit-animation-duration: 12s;
        }
        .wrap ul li:nth-child(4) {
            width: 50px;
            height: 50px;
            left: 30%;
            -webkit-animation-delay: 3s;
            -moz-animation-delay: 3s;
            -o-animation-delay: 3s;
            animation-delay: 3s;
            animation-duration: 12s;
            -moz-animation-duration: 12s;
            -o-animation-duration: 12s;
            -webkit-animation-duration: 12s;
        }
        .wrap ul li:nth-child(5) {
            width: 60px;
            height: 60px;
            left: 40%;
            animation-duration: 10s;
            -moz-animation-duration: 10s;
            -o-animation-duration: 10s;
            -webkit-animation-duration: 10s;
        }
        .wrap ul li:nth-child(6) {
            width: 75px;
            height: 75px;
            left: 50%;
            -webkit-animation-delay: 7s;
            -moz-animation-delay: 7s;
            -o-animation-delay: 7s;
            animation-delay: 7s;
        }
        .wrap ul li:nth-child(7) {
            left: 60%;
            width: 30px;
            height: 30px;
            animation-duration: 8s;
            -moz-animation-duration: 8s;
            -o-animation-duration: 8s;
            -webkit-animation-duration: 8s;
        }
        .wrap ul li:nth-child(8) {
            width: 90px;
            height: 90px;
            left: 70%;
            -webkit-animation-delay: 4s;
            -moz-animation-delay: 4s;
            -o-animation-delay: 4s;
            animation-delay: 4s;
        }
        .wrap ul li:nth-child(9) {
            width: 50px;
            height: 50px;
            left: 80%;
            animation-duration: 20s;
            -moz-animation-duration: 20s;
            -o-animation-duration: 20s;
            -webkit-animation-duration: 20s;
        }
        .wrap ul li:nth-child(10) {
            width: 75px;
            height: 75px;
            left: 90%;
            -webkit-animation-delay: 6s;
            -moz-animation-delay: 6s;
            -o-animation-delay: 6s;
            animation-delay: 6s;
            animation-duration: 30s;
            -moz-animation-duration: 30s;
            -o-animation-duration: 30s;
            -webkit-animation-duration: 30s;
        }
        @keyframes square {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }
            100% {
                bottom: 870px;
                -webkit-transform: translateY(-500);
                transform: translateY(-500)
            }
        }
        @-webkit-keyframes square {
            0% {
                -webkit-transform: translateY(0);
                transform: translateY(0)
            }
            100% {
                bottom: 400px;
                -webkit-transform: translateY(-500);
                transform: translateY(-500)
            }
        }
  
</style>