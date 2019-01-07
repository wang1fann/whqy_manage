<template>
  <div class="content-manageIntrod">
    <div class="sitUp">
      <div class="l left">
        <img src="@/assets/img/content/photou.png"/>
        <p>暂无图片</p>
      </div>
      <div class="l right">
        <span>点击左图上传图片*</span><br/>
        <span class="spec">要求：</span><br/>
        <span>1.图片比例4:5</span><br/>
        <span>2.图片大小 1MB以下</span><br/>
        <span>3.图片格式 .jpg、.png、.gif等 </span><br/>
      </div>
    </div>
    <div class="sitDown">
      <label class="l">简介内容:</label>
      <div class="l">
        <textarea cols="120" rows="22">请输入简介内容...</textarea>
      </div>
    </div>
    <button @click="submitForm($event)">提交</button>
  </div>
</template>

<script>
  import API from "@/api/api_contmessage";
  export default {
    name: "situationIntroduce",
    data(){
      return{
        items:[
          {
            imgPath: '',
            content: ''
          }
        ]
      }
    },
    methods:{
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('imgPath', this.imgPath);
        formData.append('content', this.content);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        var _this = this;
        this.$axios({
          method:'post',
                url:'/syx/jingqugaikuang',
                data:{
                  "menuId":"1113",
                  "status":0
                },
        }, formData, config).then((res)=> {
          console.log(res.data.code)
          if(res){
            if(res.data.code === 20000){
              //成功请求
              console.log(res.data.message);
              // console.log(res.data.data);
              _this.items = res.data;
              console.log(res.data)
            } else {
              //请求失败
              console.log(res.data.message);
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
 .content-manageIntrod .l{
    float: left;
  }
 .content-manageIntrod .r{float: right}
  .content-manageIntrod{
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    overflow: hidden;
  }
 .content-manageIntrod .sitUp{
    overflow: hidden;
    margin:0 auto;
    margin-left: 86px;
  }
 .content-manageIntrod .sitUp .left{
    width: 170px;
    height: 210px;
    background: #f0f4f7;
  }
 .content-manageIntrod .sitUp .left img{
    margin: 0 auto;
    margin-top: 80px;
  }
  *{margin: 0 ;padding: 0}
 .content-manageIntrod .sitUp .left p{
    font-size: 13px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
 .content-manageIntrod .sitUp .right {
    text-align: left;
    margin-left: 30px;
    margin-top: 50px;
    font-size: 12px;
  }
 .content-manageIntrod .sitUp .right  span{
    display: block;
    line-height: .5;
    color: #65707b;
  }
 .content-manageIntrod .sitUp .right  span.spec{
    font-weight: bold;
  }
 .content-manageIntrod .sitDown{
    overflow: hidden;
    margin: 0 auto;
    margin-top: 35px;

  }
 .content-manageIntrod .sitDown label{
    margin-right: 24px;
    color: #7f8891;
  }
 .content-manageIntrod  .sitDown textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
  }
 .content-manageIntrod  button{
    padding: 12px 40px;
    background: #e24142;
    text-align: center;
    color: #fff;
    margin-top: 40px;
    border-radius: 4px;
    outline: 0;
    border: 0;
  }
</style>

