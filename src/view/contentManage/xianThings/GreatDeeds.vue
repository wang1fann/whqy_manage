<template>
  <div class="content-manageBig">
    <div class="xian">
      <span></span>
      <label>事纪添加</label>
    </div>
    <div class="bigdown">
      <div class="sitDown">
        <label class="l">事纪标题</label>
        <div class="l">
          <div >第一阶段(1919-1926)</div>
        </div>
      </div>
      <div class="sitDowns">
        <label class="l">事纪标题</label>
        <div class="l">
          <div ></div>
        </div>
      </div>
      <button>提交</button>
    </div>

  </div>
</template>

<script>
    export default {
        name: "xianBigThings"
    }
</script>

<style scoped>
  .content-manageBig .l{
    float: left;
  }
  .content-manageBig .r{float: right}
  .content-manageBig{
    margin: 0 auto;
    margin-top: 20px;
    width: 84%;
    overflow: hidden;
  }
  .content-manageBig .xian{
    width: 99.6%;
    height: 46px;
    line-height: 46px;
    color: #7f8891;
    border: 1px solid #ddd;
    border-radius: 2px;
    position: relative;
  }
  .content-manageBig .xian span{
    display: inline-block;
    position: absolute;
    top:12px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/img/content/addf.png") no-repeat;
    background-size: 20px auto;
  }
  .content-manageBig .xian label{
    margin-left: 30px;
    font-size: 13px;
  }
  .content-manageBig .bigdown{
    overflow: hidden;
    background: #f7f9fa;
    margin-top: 30px;
    padding-bottom: 20px;
  }

  .content-manageBig .sitDown{
    overflow: hidden;
    margin-top: 35px;
    margin-left: 40px;
  }
  .content-manageBig .sitDown label{
    margin-right: 16px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageBig .sitDown div.l{
    width: 88%;
  }
  .content-manageBig .sitDown div.l div{
    width: 100%;
    padding-left: 14px;
    border-radius:3px;
    color: #697179;
    height: 40px;
    text-align: left;
    line-height: 40px;
    background: #fff;
  }
  .content-manageBig .sitDown button{
    padding: 12px 40px;
    background: #e24142;
    text-align: center;
    color: #fff;
    margin-top: 40px;
    border-radius: 4px;
    outline: 0;
    border: 0;
  }
  .content-manageBig .sitDowns{
    overflow: hidden;
    margin-top: 20px;
    margin-left: 40px;

  }
  .content-manageBig .sitDowns label{
    margin-right: 16px;
    margin-top: 10px;
    color: #7f8891;
  }
  .content-manageBig .sitDowns div.l{
    width: 88%;
  }
  .content-manageBig .sitDowns div.l div{
    width: 100%;
    padding-left: 14px;
    border-radius:3px;
    color: #697179;
    height: 260px;
    text-align: left;
    line-height: 40px;
    background: #fff;
  }

  .content-manageBig  button{
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


