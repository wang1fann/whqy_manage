<template>
    <div class="register">
        <el-form ref="registerForm" :model="registerInfo" status-icon :rules="rules" label-width="100px" label-position="right" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="registerInfo.username" placeholder="请输入用户名" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
        <el-input type="password"  v-model="registerInfo.pwd" placeholder="请输入密码" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpwd">
        <el-input type="password"  v-model="registerInfo.checkpwd" placeholder="请输入确认密码" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="年龄" prop="age">
        <el-input type="text"  v-model.number="registerInfo.age" placeholder="请输入年龄" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click.native.prevent="handleRegister('registerForm')" :loading="loading">注册</el-button>
            <el-button type="primary" style="width:48%;" @click="resetForm('registerForm')" :loading="loading">重置</el-button>
    </el-form-item>
    </el-form>
    </div>
</template>
<script>
    import API from '../../api/api_user';

    export default {
      name: 'Register',
      data(){
          var checkAge=(rule,value,callback)=>{
            setTimeout(()=>{
                if(value === ''){
                    callback(new Error("请输入年龄"));
                }else if (!Number.isInteger(value)){
                    callback(new Error("请输入数字值"));
                }else if(value>150){
                    callback(new Error("年龄不能超过150"));
                }else{
                    callback();
                }
            },10)
          };
          var pass=(rule,value,callback)=>{//上面的(rule,value,callback)分别是表单验证规则，输入框的value值，校验结果的回调函数。
            if(value === ''){
                callback(new Error("请输入密码"));
            }else{
                if (this.registerInfo.pwd != ""){
                    this.$refs.registerForm.validateField("checkpwd");
                }
                callback();
            }
          };
          var checkPass=(rule,value,callback) =>{
            if(value === ''){
                callback(new Error("请再次输入密码"));
            }else if(value !== this.registerInfo.pwd){
                callback("两次输入密码不一致");
            }else{
                callback();
            }
          }
          return {
                loading:false,
                registerInfo:{
                    username:'123',
                    pwd:'',
                    checkpwd:'',
                    age:''
                },
                rules:{
                    username:[
                         {required:true,message:'请输入账号',trigger:'blur'}
                    ],
                    pwd:[
                        {validator:pass,trigger:'blur'}
                    ],
                    checkpwd:[
                        {validator:checkPass,trigger:'blur'}
                    ],
                    age:[
                        // 自定义验证规则
                        {validator:checkAge,trigger:'blur'}
                    ]
                }
            };
        },
        methods:{
            handleRegister(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.$message.success(
                            {showClose:true,
                            dangerouslyUseHTMLString: true,//消息提示内容支持html片段
                            message:"注册成功，请登录",
                            // message:'<h3><i class="el-icon-info"></i>注册成功，请登录</h3>',
                            // center:true
                            });
                            this.$router.push({path:'/login'})
                    }else{
                        this.$confirm('存在验证错误，是否继续提交？','提示',{
                            confirmButtonText:'确认',
                            cancelButtonText:'取消',
                            type:'warning',
                        }).then(()=>{
                                this.$message.error({showClose:true,message:"注册失败"});                        
                        }).catch(()=>{
                                this.$message.success({showClose:true,message:"取消成功"});                                                    
                        })
                    }
                })
            },
            resetForm(formName){
                this.$refs[formName].resetFields();//不能写为：this.$refs.formName.resetFields();
            }
        }
    }
</script>

<style lang="scss">
  body {
    background: #fff;
  }
</style>