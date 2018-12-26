<template>
  <div class="content-manage">
    <div class="l left">
      <img src="../../assets/img/content/photou.png"/>
      <p>点上传击图片</p>
    </div>
    <div class="l tuImg">
      <img  src="../../assets/img/content/photoe.png"/>
      <span></span>
      <p>渭华起义工农红军使用过的土铁枪</p>
    </div>
    <div class="l tuImg">
      <img  src="../../assets/img/content/photoq.png"/>
      <span></span>
      <p>《清国革命动乱大地图》</p>
    </div>
    <div class="l tuImg">
      <img  src="../../assets/img/content/photor.png"/>
      <span></span>
      <p>熊秉坤姓名印</p>
    </div>
    <div class="l tuImg">
      <img  src="../../assets/img/content/photow.png"/>
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
  .content-manage{
    margin: 0 auto;
    margin-top: 30px;
    width: 96%;
  }
  .content-manage .left{
    width: 200px;
    height:310px;
    background: #f0f4f7;
  }
  .content-manage .left img{
    margin: 0 auto;
    width:40px;
    height: 30px;
    margin-top: 130px;
  }
  *{margin: 0 ;padding: 0}
  .content-manage .left p{
    font-size: 12px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manage img{
    width: 200px;
    height:250px;

  }
  .content-manage .tuImg{
    position: relative;
    height: 310px;
    width: 200px;
    background: #f5fafc;
    margin-left: 22px;
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
  .content-manage .tuImg p{
    font-size: 12px;
    text-align: center;
    margin-top: 20px;
    color: #58626f;
  }
</style>
