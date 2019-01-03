<template>
  <div class="content-manageappre">
    <div class="l left">
      <img src="@/assets/img/content/photou.png"/>
      <p>点上传击图片</p>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/photoe.png"/>
      <span></span>
      <p>渭华起义工农红军使用过的土铁枪</p>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/photoq.png"/>
      <span></span>
      <p>《清国革命动乱大地图》</p>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/photor.png"/>
      <span></span>
      <p>熊秉坤姓名印</p>
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/photow.png"/>
      <span></span>
      <p>中立布告照照片</p>
    </div>


  </div>
</template>

<script>
    export default {
        name: "appreciationShow"
    }
</script>

<style scoped>
  .l{float: left}
  .content-manageappre{
    margin: 0 auto;
    margin-top: 30px;
    width: 96%;
  }
  .content-manageappre .left{
    width: 18%;
    height:330px;
    background: #f0f4f7;
  }
  .content-manageappre .left img{
    margin: 0 auto;
    width:40px;
    height: 30px;
    margin-top: 130px;
  }
  *{margin: 0 ;padding: 0}
  .content-manageappre .left p{
    font-size: 12px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manageappre img{
    width: 100%;
    height:270px;

  }
  .content-manageappre .tuImg{
    position: relative;
    height: 330px;
    width: 18%;
    box-sizing: border-box;
    background: #f5fafc;
    margin-left: 28px;
  }
  .content-manageappre .tuImg span{
    display: block;
    width: 24px;
    height:24px ;
    background: url("../../../assets/img/content/cha.png") no-repeat;
    background-size: 24px auto;
    position: absolute;
    right: -11px;
    top:-11px;
    z-index: 20;
  }
  .content-manageappre .tuImg p{
    font-size: 13px;
    text-align: center;
    margin-top: 20px;
    color: #58626f;
  }
</style>
