<template>
  <div class="content-manage">
    <div class="sitUp">
      <div class="l left">
        <img src="../../assets/img/content/photou.png"/>
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
        <textarea cols="112" rows="22">请输入简介内容...</textarea>
      </div>
      <button>提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "situationIntroduce"
  }
</script>

<style scoped>
  .l{
    float: left;
  }
  .r{float: right}
  .content-manage{
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    overflow: hidden;
  }
  .sitUp{
    overflow: hidden;
    margin-left: 86px;
  }
  .sitUp .left{
    width: 170px;
    height: 210px;
    background: #f0f4f7;
  }
  .sitUp .left img{
    margin: 0 auto;
    margin-top: 80px;
  }
  *{margin: 0 ;padding: 0}
  .sitUp .left p{
    font-size: 13px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .sitUp .right {
    text-align: left;
    margin-left: 30px;
    margin-top: 50px;
    font-size: 12px;
  }
  .sitUp .right  span{
    display: block;
    line-height: .5;
    color: #65707b;
  }
  .sitUp .right  span.spec{
    font-weight: bold;
  }
  .sitDown{
    overflow: hidden;
    margin-top: 35px;
  }
  .sitDown label{
    margin-right: 24px;
    color: #7f8891;
  }
  .sitDown textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
  }
  .sitDown button{
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

