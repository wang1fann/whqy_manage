<template>
  <div class="content-manageDepart">
    <div class="sitDown">
      <label class="l">机构内容:</label>
      <div class="l">
        <textarea cols="112" rows="22">请输入简介内容...</textarea>
      </div>
      <button>提交</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "situationDepart"
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
  .content-manageDepart  .sitDown button{
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
