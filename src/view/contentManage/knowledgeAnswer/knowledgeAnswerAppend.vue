<template>
  <div class="answerAppend">
    <div class="l left">
      <div class="inserts">
        <span class="l">＋</span>
        <label class="l">添加试题库</label>
      </div>
      <div class="tiyi">
          试题库（一）
      </div>
      <div class="tishan">
         删除试题库
      </div>
    </div>
    <div class="r right">
      <div class="up">
        <div class="l first"><span>＋</span>添加</div>
        <div class="l"> <el-checkbox label="全选"></el-checkbox></div>
        <div class="l last"><i class="el-icon-delete"></i>删除</div>

      </div>
      <div class="down">
        <div class="repeats">
          <div class="l"><el-checkbox label=""></el-checkbox></div>
          <div class="r">
            <div class="timu">
              <label class="l">题目</label>
              <input type="text" class="l"/>
            </div>
            <div class="timus">
            <label class="l">选项 A</label>
            <input type="text" class="l"/>
            <img src="@/assets/img/content/cha.png" class="l"/>

          </div>
            <div class="timus">
              <p class="l">添加选项
                <i style="font-style: normal"></i>
              </p>
            </div>
            <div class="bottoms">
              <input type="submit" value="提交"/>
              <input type="reset" value="重置"/>
            </div>
          </div>
        </div>
        <div class="repeats1">
          <div class="l"><el-checkbox label=""></el-checkbox></div>
          <div class="r">
            <div class="timu">
              <label class="l">题目: 渭华起义的历史意义，下列表述正确的是？</label>
            </div>
          </div>
        </div>
        <div class="repeats2">
          <div class="l"><el-checkbox label=""></el-checkbox></div>
          <div class="r">
            <div class="timu">
              <label class="l">题目: 渭华起义的历史意义，下列表述正确的是？</label><br>
              <p>A 渭华起义是大革命失败后中共陕西省中共陕西省委领导的，以军事力量与农民运动相结合。</p>
              <p>B 渭华起义是大革命失败后中共陕西省中共陕西省委领导的，以军事力量与农民运动相结合。</p>
              <p>C 渭华起义是大革命失败后中共陕西省中共陕西省委领导的，以军事力量与农民运动相结合。</p>
              <p>D 渭华起义是大革命失败后中共陕西省中共陕西省委领导的，以军事力量与农民运动相结合。</p>
            </div>
          </div>
        </div>
        <div class="repeats1">
          <div class="l"><el-checkbox label=""></el-checkbox></div>
          <div class="r">
            <div class="timu">
              <label class="l">题目: 渭华起义的历史意义，下列表述正确的是？</label>
            </div>
          </div>
        </div>
        <div class="repeats1">
          <div class="l"><el-checkbox label=""></el-checkbox></div>
          <div class="r">
            <div class="timu">
              <label class="l">题目: 渭华起义的历史意义，下列表述正确的是？</label>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "knowledgeAnswerAppend",
        data() {
          return {
            checked: true
          };
        }
    }
</script>

<style scoped>
  .answerAppend{
    overflow: hidden;
    width: 97%;
    margin: 0 auto;
    margin-top: 25px;
    height: 600px;
  }
  .answerAppend p{margin: 0; padding: 0}
  .answerAppend .l{
    float: left;
  }
  .answerAppend .r{
    float: right;
  }
  .answerAppend div.left{
    width: 18%;
    height: 99%;
    overflow: hidden;
    border: 1px solid #ddd;
  }
  .answerAppend div.left .tiyi{
    width:90% ;
    margin: 10px auto;
    height:38px ;
    line-height: 38px;
    background: #f5f7f7;
    border: 1px solid #f77f80;
    text-align: center;
    color: #f77f80;
  }

  .answerAppend div.left .inserts{
      width:90% ;
      margin: 10px auto;
      height:40px ;
      line-height: 40px;
      background: #f5f7f7;
  }
  .answerAppend div.left .inserts span{
    display: inline-block;
    font-size: 26px;
    margin-left: 48px;
    color: #eb7677;

  }
  .answerAppend div.left .inserts label{
    color: #7c8892;
  }
  .answerAppend div.left .tishan{
    width:90% ;
    margin: 10px auto;
    height:38px ;
    line-height: 38px;
    background: #f5f7f7;
    text-align: center;
    color: #9099a2;
  }
  .answerAppend div.right{
    width: 80.5%;
    height: 99%;
    overflow: auto;
    border: 1px solid #ddd;
  }
  .answerAppend div.right .up{
    overflow: hidden;
    margin-top: 16px;
  }
  .answerAppend div.right .up div{
    width: 100px;
    height: 35px;
    line-height: 36px;
    margin-left: 15px;
    vertical-align: middle;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  .answerAppend div.right .up div.first{
    border: 0;
    height: 37px;
    line-height: 37px;
    background: #f7a954;
    color: #fff;
  }
  .answerAppend div.right .up div.first span{
    font-size: 20px;
  }
  .answerAppend div.right .up div.last i{
      margin-right: 10px;
  }
  .answerAppend div.right .down{
    overflow: hidden;
    margin-top: 30px;
    margin-left: 15px;
  }
  .answerAppend div.right .down .repeats{
    overflow: hidden;
    margin-bottom: 18px;
  }
  .answerAppend div.right .down .repeats div.r{
    width: 90%;
    margin-right:46px;
    background: #f8fbfb;
    padding: 20px 30px;
    padding-bottom: 36px;
    padding-right: 0;
  }
  .answerAppend div.right .down .repeats div.r .timu{
    overflow: hidden;
    margin-bottom: 20px;
  }
  .answerAppend div.right .down .repeats div.r .timu label {
    color: #999;
    font-size: 15px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .answerAppend div.right .down .repeats div.r .timu input{
    width: 88%;
    height: 34px;
    border: 0;
    border: 1px solid #ddd;
  }
  .answerAppend div.right .down .repeats div.r .timus{
    overflow: hidden;
    margin-bottom: 20px;
    margin-left: 40px;
  }
  .answerAppend div.right .down .repeats div.r .timus label {
    color: #999;
    font-size: 15px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .answerAppend div.right .down .repeats div.r .timus input{
    width: 86%;
    height: 34px;
    border: 0;
    border: 1px solid #ddd;
  }
  .answerAppend div.right .down .repeats div.r .timus img{
    width: 17px;
    height: 17px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .answerAppend div.right .down .repeats div.r .timus p{
    margin-left: 26px;
    color: #f63a3c;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .answerAppend div.right .down .repeats div.r .timus p i{
    display: inline-block;
    margin-left: 6px;
    width: 15px;
    height: 15px;
    background: url("../../../assets/img/content/addf.png") no-repeat;
    background-size: 15px auto;
  }
  .answerAppend div.right .down .repeats div.r .bottoms{
    overflow: hidden;
    margin-top: 20px;
  }
  .answerAppend div.right .down .repeats div.r .bottoms input{
    outline: none;
    border: 0;
    background: #f63a3c;
    color: #fff;
    padding: 9px 32px;
    border-radius: 3px;
    margin-right: 30px;
  }


  .answerAppend div.right .down .repeats1{
    overflow: hidden;
    margin-bottom: 18px;
  }
  .answerAppend div.right .down .repeats1 div.r{
    width: 91%;
    margin-right:46px;
    background: #f8fbfb;
    padding-left: 20px;
    padding-right: 0;
  }
  .answerAppend div.right .down .repeats1 div.r .timu{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .answerAppend div.right .down .repeats1 div.r .timu label {
    color: #999;
    font-size: 15px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .answerAppend div.right .down .repeats1 div.r .timu input{
    width: 88%;
    height: 34px;
    border: 0;
    border: 1px solid #ddd;
  }
  .answerAppend div.right .down .repeats1 div.r .timus{
    overflow: hidden;
    margin-bottom: 20px;
    margin-left: 40px;
  }
  .answerAppend div.right .down .repeats1 div.r .timus label {
    color: #999;
    font-size: 15px;
    margin-top: 10px;
    margin-right: 10px;
  }

  .answerAppend div.right .down .repeats2{
    overflow: hidden;
    margin-bottom: 18px;
  }
  .answerAppend div.right .down .repeats2 div.r{
    width: 91%;
    margin-right:46px;
    background: #f8fbfb;
    padding: 20px;
    padding-right: 0;
  }
  .answerAppend div.right .down .repeats2 div.r .timu{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .answerAppend div.right .down .repeats2 div.r .timu label {
    color: #999;
    display: block;
    font-size: 15px;
    margin-right: 10px;
    margin-left: 20px;
  }
  .answerAppend div.right .down .repeats2 div.r .timu p {
    color: #999;
    margin-top: 20px;
    font-size: 15px;
    text-align: left;
    margin-left: 50px;
  }
  .answerAppend div.right .down .repeats1 div.r .timu input{
    width: 88%;
    height: 34px;
    border: 0;
    border: 1px solid #ddd;
  }
  .answerAppend div.right .down .repeats2 div.r .timus{
    overflow: hidden;
    margin-bottom: 20px;
    margin-left: 40px;
  }
  .answerAppend div.right .down .repeats2 div.r .timus label {
    color: #999;
    font-size: 15px;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
