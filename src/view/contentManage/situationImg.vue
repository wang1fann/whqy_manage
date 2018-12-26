<template>
  <div class="content-manage">
    <div class="l left">
      <img src="@/assets/img/content/photou.png"/>
      <p>点上传击图片</p>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/Thepicturea.png"/>
      <span></span>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/Thepictureq.png"/>
      <span></span>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/Thepicturee.png"/>
      <span></span>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/Thepicturew.png"/>
      <span></span>
    </div>


  </div>
</template>

<script>
    export default {
        name: "situationImg"
    }
</script>

<style scoped>
  .l{float: left}
  .content-manage{
    margin: 0 auto;
    margin-top: 30px;
    width: 96%;


  }
  .content-manage .left{
    width: 200px;
    height:140px;
    background: #f0f4f7;
  }
  .content-manage .left img{
    margin: 0 auto;
    width:40px;
    height: 30px;
    margin-top: 50px;
  }
  *{margin: 0 ;padding: 0}
  .content-manage .left p{
    font-size: 12px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manage img{
    width: 200px;
    height:140px;
    margin-left: 22px;
  }
  .content-manage .tuImg{
    position: relative;
  }
  .content-manage .tuImg span{
    display: block;
    width: 24px;
    height:24px ;
    background: url("../../assets/img/content/cha.png") no-repeat;
    background-size: 24px auto;
    position: absolute;
    right: -11px;
    top:-11px;
    z-index: 20;
  }

</style>
