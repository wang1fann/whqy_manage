<template>
  <div class="content-manageHallappend">
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
      <label class="l">标题:</label>
      <div class="l biao">

      </div>
    </div>
    <div class="sitDowns">
      <label class="l">上传:</label>
      <div class="l biao">
        http://localhost:8088/#/contentManage/huaHall
      </div>
    </div>
    <div class="sitDowns">
      <label class="l">内容:</label>
      <div class="l">
        <textarea cols="112" rows="22">请输入简介内容...</textarea>
      </div>
    </div>
    <div class="sitDowns">
      <label class="l">格式:</label>
      <div class="l biao">
        .mp4
      </div>
      <button>提交</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "huaHallAppend"
    }
</script>

<style scoped>
  .l{
    float: left;
  }
  .r{float: right}
  .content-manageHallappend{
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    overflow: hidden;
  }
  .content-manageHallappend  .sitUp{
    overflow: hidden;
    margin-left: 86px;
  }
  .content-manageHallappend .sitUp .left{
    width: 240px;
    height: 140px;
    background: #f0f4f7;
  }
  .content-manageHallappend .sitUp .left img{
    margin: 0 auto;
    margin-top: 45px;
  }
  *{margin: 0 ;padding: 0}
  .content-manageHallappend .sitUp .left p{
    font-size: 13px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manageHallappend .sitUp .right {
    text-align: left;
    margin-left: 30px;
    margin-top: 28px;
    font-size: 12px;
  }
  .content-manageHallappend .sitUp .right  span{
    display: block;
    line-height: .5;
    color: #65707b;
  }
  .content-manageHallappend .sitUp .right  span.spec{
    font-weight: bold;
  }
  .content-manageHallappend .sitDown{
    overflow: hidden;
    margin-top: 35px;
  }
  .content-manageHallappend .sitDown label{
    margin-right: 24px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageHallappend .sitDown div.biao{
    width: 88%;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    text-align: left;
    border: 1px solid #ccc;
  }
  .content-manageHallappend .sitDown button{
    padding: 12px 40px;
    background: #e24142;
    text-align: center;
    color: #fff;
    margin-top: 40px;
    border-radius: 4px;
    outline: 0;
    border: 0;
  }
  .content-manageHallappend  .sitDowns textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
  }
  .content-manageHallappend .sitDowns{
    overflow: hidden;
    margin-top: 20px;

  }
  .content-manageHallappend .sitDowns label{
    margin-right: 24px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageHallappend .sitDowns div.biao{
    width: 88%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 10px;
    border: 1px solid #ccc;
  }
  .content-manageHallappend .sitDowns button{
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
