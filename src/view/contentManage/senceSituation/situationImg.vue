<template>
  <div class="content-manageImg">
    <div class="l left">
      <img src="@/assets/img/content/photou.png"/>
      <p>点上传击图片</p>
      <!--<el-upload-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--list-type="picture-card"-->
        <!--:on-preview="handlePictureCardPreview"-->
        <!--:on-remove="handleRemove">-->
        <!--<i class="el-icon-plus"></i>-->
      <!--</el-upload>-->
    </div>
    <div class="l tuImg">
      <img  src="@/assets/img/content/Thepicturea.png"/>
      <span></span>
      <!--<el-dialog :visible.sync="dialogVisible">-->
        <!--<img width="100%" :src="dialogImageUrl" alt="">-->
      <!--</el-dialog>-->
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
        name: "situationImg",
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false
        };
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      }
    }
</script>

<style scoped>
  .content-manageImg .l{float: left}
  .content-manageImg{
    margin: 0 auto;
    margin-top: 30px;
    width: 96%;


  }
  .content-manageImg .left{
    width: 20%;
    height:160px;
    background: #f0f4f7;
  }
  .content-manageImg .left img{
    margin: 0 auto;
    width:40px;
    height: 30px;
    margin-top: 50px;
  }
  *{margin: 0 ;padding: 0}
  .content-manageImg .left p{
    font-size: 12px;
    margin-top: 4px;
    color:#d8dde1 ;
  }
  .content-manageImg img{
    width: 93%;
    height:160px;
    margin-left: 22px;
  }
  .content-manageImg .tuImg{
    position: relative;
    box-sizing: border-box;
    width: 20%;
  }
  .content-manageImg .tuImg span{
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

</style>
