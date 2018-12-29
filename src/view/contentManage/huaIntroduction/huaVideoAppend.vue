<template>
  <div class="content-manageappend">
    <div class="sitUp">
      <div class="l left">
        <img src="@/assets/img/content/photou.png"/>
        <p>暂无图片</p>
      </div>
      <div class="l right">
        <span>点击左图上传图片*</span><br/>
        <span class="spec">要求：</span><br/>
        <span>1.图片比例3:1</span><br/>
        <span>2.图片大小 1MB以下</span><br/>
        <span>3.图片格式 .jpg、.png、.gif等 </span><br/>
      </div>
    </div>
    <div class="sitDown">
      <label class="l">上传作品:</label>
      <div class="l">
        <textarea cols="112" rows="2">请输入简介内容...</textarea>
      </div>
    </div>
      <div class="sitDowns">
        <label class="l">作品名称:</label>
        <div class="l">
          <textarea cols="112" rows="2">请输入简介内容...</textarea>
        </div>
      <button>提交</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "huaVideoAppend"
    }
</script>

<style scoped>
  .l{
    float: left;
  }
  .r{float: right}
  .content-manageappend{
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    overflow: hidden;
  }
  .content-manageappend  .sitUp{
    overflow: hidden;
    margin-left: 86px;
  }
  .content-manageappend .sitUp .left{
    width: 240px;
    height: 140px;
    background: #f0f4f7;
  }
  .content-manageappend .sitUp .left img{
    margin: 0 auto;
    margin-top: 45px;
  }
  *{margin: 0 ;padding: 0}
  .content-manageappend .sitUp .left p{
    font-size: 13px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manageappend .sitUp .right {
    text-align: left;
    margin-left: 30px;
    margin-top: 28px;
    font-size: 12px;
  }
  .content-manageappend .sitUp .right  span{
    display: block;
    line-height: .5;
    color: #65707b;
  }
  .content-manageappend .sitUp .right  span.spec{
    font-weight: bold;
  }
  .content-manageappend .sitDown{
    overflow: hidden;
    margin-top: 35px;
  }
  .content-manageappend .sitDown label{
    margin-right: 24px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageappend .sitDown textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
  }
  .content-manageappend .sitDown button{
    padding: 12px 40px;
    background: #e24142;
    text-align: center;
    color: #fff;
    margin-top: 40px;
    border-radius: 4px;
    outline: 0;
    border: 0;
  }
  .content-manageappend .sitDowns{
    overflow: hidden;
    margin-top: 20px;

  }
  .content-manageappend .sitDowns label{
    margin-right: 24px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageappend .sitDowns textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: 160px;
  }
  .content-manageappend .sitDowns button{
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
