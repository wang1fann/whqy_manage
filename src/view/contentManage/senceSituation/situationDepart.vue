<template>
  <div class="content-manageDepart">
    <div class="sitDown">
      <label class="l">机构内容:</label>
      <div class="l">
        <textarea cols="112" rows="22">请输入简介内容...</textarea>
      </div>

    </div>
    <button @click="submitForm($event)">提交</button>
  </div>
</template>

<script>
    export default {
        name: "situationDepart",
        data(){
          return{
            items:[
              {
                content: ''
              }
            ]
          }
        },
      methods:{
        submitForm($event){
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
            url:'/jingqugaikuang',
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
  .content-manageDepart .l{
    float: left;
  }
  .content-manageDepart .r{float: right}
  .content-manageDepart{
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    overflow: hidden;
  }

  *{margin: 0 ;padding: 0}

  .content-manageDepart .sitDown{
    overflow: hidden;
    margin-top: 35px;
  }
  .content-manageDepart .sitDown label{
    margin-right: 24px;
    color: #7f8891;
  }
  .content-manageDepart .sitDown textarea{
    color: #ccc;
    padding-left: 10px;
    padding-top: 10px;
  }
  .content-manageDepart  button{
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
