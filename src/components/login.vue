<template>
  <div class="login-page">
    <el-form ref="form" :model="form" :rules="rules" class="login-box">
      <!-- 头部 -->
      <div class="login-head">
        <img class="login-logo" src="../assets/TongJiLogo.png" alt="tjlogo" />
        <br />
        <br />
        <h3 class="login-title">同济大学课程实验中心</h3>
        <!-- <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fit"></el-image> -->
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 表单项 -->
      <el-form-item label="账号" prop="name">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-radio-group v-model="form.identity">
          <el-radio label="学生"></el-radio>
          <el-radio label="教师"></el-radio>
          <el-radio label="管理员"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 提交按钮 -->
      <div class="login-submit">
        <el-button type="primary" round @click="submitForm('form')"
          >登录</el-button
        >
        <el-button round @click="resetForm('form')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
        identity: "",
        type: -1,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        identity: [
          {
            required: true,
            message: "请选择登陆身份",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://139.224.65.105:9090/api/user/login", {
              id: this.form.name,
              password: this.form.password,
              type: this.form.identity,
            })
            .then((response) => {
              console.log(response.data);
              localStorage.removeItem('id');
              localStorage.removeItem('token');
              localStorage.removeItem('startTime');
              localStorage.removeItem('type');
              localStorage.setItem('id',response.data.data.Info.id);
              localStorage.setItem('type',this.form.identity);
              localStorage.setItem('token',response.data.data.token);
              localStorage.setItem('startTime',new Date().getTime());
              localStorage.setItem('expire',3600000);
              console.log(localStorage.getItem('id'))
              console.log(localStorage.getItem('token'))
              console.log(localStorage.getItem('startTime'))
              if (response.data.code == 200) {
                this.$message({
                  message: response.data.message,
                  type: "success",
                });
                this.$router.push("/Home");
                return true;
              } 
              else {
                this.$message({
                  message: response.data.message,
                  type: "error",
                });
                return false;
              }
            })
            .catch(() => {
              this.$message({
                  message: "密码错误！",
                  type: "error",
                });
            });
        } 
        else {
          this.$message({
            message: "请填写完整信息",
            type: "warning",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
.login-page {
  padding: 20px;
  margin: 0px;
  background-size: 100%;
  /* background-color: #409EFF; */
  /* background-image: url('../assets/bush.png'); */
  background-repeat: repeat;
}
.login-box {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
  /* background-color: #9dbbda; */
}
.login-head {
  text-align: center;
}
.login-title {
  font-size: 25px;
  color: #303133;
}
.login-logo {
  max-width: 50%;
  height: auto;
}
.login-submit {
  text-align: center;
}
</style>