<template>
  <div class="contentSpeak">
    <div class="up">
      <div class="l">
        <label class="l">标题</label>
        <div class="l">
          <el-input v-model="input"  placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="l">
        <label class="l">上传时间</label>
        <div class="l block">
          <el-date-picker
            v-model="value1"
            placeholder="请选择日期"
            suffix-icon="el-icon-date">
          </el-date-picker>
        </div>
        <el-row class="l">
          <el-button type="danger" class="btn">查询</el-button>
        </el-row>
      </div>

    </div>
    <div class="xia">
      <table class="biao4">
        <thead>
        <tr >
          <th>
            <input  type="checkbox" v-model="checked" @click='checkedAll'>
            <label>全选</label>
          </th>
          <th class="biao">标题</th>
          <th class="gaidate">上传时间</th>
          <th class="last1">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(item,index) in items' :key="index" >
          <td>
            <input type="checkbox" v-model='checkboxList' :value="item.id">
          </td>
          <td class="words"><a href="#">{{item.title}}</a></td>
          <td class="datenews">{{new Date(value1).getFullYear() + '-' +(new Date(value1).getMonth() + 1) + '-' + new Date(value1).getDate()}}</td>
          <td class="newlast">
            <button type="button" class="l" @click="reads">查看</button>
            <button type="button" class="l" @click="writes">编辑</button>
            <button type="button" class="l" @click="delMessages" >删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">"我心中的渭华" 系列比赛活动</a></td>
          <td class="datenews">2018-06-03</td>
          <td class="newlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">"我心中的渭华" 系列比赛活动</a></td>
          <td class="datenews">2018-06-03</td>
          <td class="newlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>


        </tbody>
      </table>
    </div>
    <div class="down">
      <el-pagination
        background
        class="gai"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "redSpeak",
      data() {
        return {
          items:[
            {
              title:'',//标题
              id:'',
              createTime:'',//时间
            }
          ],
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value1: '2018-06-03',
          input: '',
          input2: '',
          checkboxList:[],
          checked: false
        };
      },
      methods:{
        checkedAll: function() {
          if (this.checked) {//实现反选
            this.checkboxList = [];
          } else { //实现全选
            this.checkboxList = [];
            this.items.forEach( (item) => {
              this.checkboxList.push(item.id);
            });
          }
        },
        delMessages() {
          this.$confirm('此操作将永久删除此条标题活动是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
          var _this = this;
          this.$axios({
            method:'delete',
            url:'/syx/hongsejiaoyu/1',
            // data:{
            //   "menuId":"10007001",
            //   "status":1
            // },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
              } else {
                //请求失败
                console.log(res.data.message);
              }
            }
          })
        },
        // clear(index) {
        //   this.checkboxData.splice(index, 1);
        // },
        writes() {
          this.$prompt('宣传标题', '编辑', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '文物标题是: ' + value
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
          var _this = this;
          this.$axios({
            method:'put',
            url:'/syx/hongsejiaoyu/1077497926311350272',
            // data:{
            //   "menuId":"10007001",
            //   "status":1
            // },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
              } else {
                //请求失败
                console.log(res.data.message);
              }
            }
          })
        },
        reads() {
          this.$alert('"我心中的渭华" 系列比赛活动', '宣传标题', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
          var _this = this;
          this.$axios({
            method:'get',
            url:'/syx/hongsejiaoyu/1',
            // data:{
            //   "menuId":"10007001",
            //   "status":1
            // },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
              } else {
                //请求失败
                console.log(res.data.message);
              }
            }
          })
        },
        getprev(){
          var _this = this;
          this.$axios({
            method:'post',
            url:'/syx/hongsejiaoyu/search',
            data:{
              "menuId":"10007001",
              "status":1
            },
          }).then( (res) =>{
            console.log(res.data.code)
            if(res){
              if(res.data.code === 20000){
                //成功请求
                console.log(res.data.message);
                console.log(res.data.data);
                _this.items = res.data.data;
              } else {
                //请求失败
                console.log(res.data.message);
              }
            }
          })
        },
      },
      mounted(){
        this.getprev()
      }
    }
</script>

<style scoped>
  .contentSpeak .gai{
    padding-top: 0;
  }
  .contentSpeak .l{float: left}
  .contentSpeak .r{float: right}
  .contentSpeak .up{
    line-height: 34px;
    margin-top: 20px;
    margin-left:100px;
    overflow: hidden;
  }
  .contentSpeak  .up label{
    margin-right: 16px;
    color: #999;
  }
  .contentSpeak .up>div{
    margin-left: 34px;
  }
  .contentSpeak .el-button{
    padding: 7px 20px;
    background: #e24142;
    height: 30px;
    margin-left: 20px;
  }
  .el-date-editor.el-input{
    width: 148px;
  }
  input.el-input__inner{
    width: 380px;
  }
  .el-input--prefix .el-input__inner{
    width: 148px;
  }
  .el-input--prefix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .contentSpeak  .xia{
    width: 96%;
    overflow: hidden;
    margin: 0 auto;
    margin-left: 48px;
    margin-top: 20px;
  }

  .contentSpeak table{
    width: 94%;
    margin-bottom:20px;
    border-spacing: 0;
    padding: 5px;
    empty-cells: show;
    border-collapse: separate;
  }
  .contentSpeak table{border-collapse:collapse;}
  .contentSpeak table tr{display: block; }
  .contentSpeak  tbody tr{border:1px solid #ddd; display: block; margin-bottom: 6px}
  .contentSpeak table thead tr{ margin-bottom: 8px}
  .contentSpeak  table thead tr th{
    vertical-align: bottom;
    font-size: 15px;
    background: #e5e8ef;
    color: #666;
    padding: 8px;
    text-align: left;
    padding-left: 8px;
  }

  .contentSpeak table tbody tr td{
    padding: 6px;
    font-size: 15px;
    padding-left: 14px;
    color: #868e96;
  }
  .contentSpeak table thead tr th.biao{
    width: 480px;
    text-align: center;
  }
  .contentSpeak table thead tr th:nth-child(1){
    width: 80px;
    padding-left: 15px;
  }
  .contentSpeak table thead tr th:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentSpeak table tbody tr td:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentSpeak table thead tr th.last1{
    width: 262px;
    text-align: center;
  }
  .contentSpeak table thead tr th.gaidate{
    width: 350px;
    text-align: center;
  }
  .contentSpeak  table tbody tr td.words{
    width: 600px;
  }
  .contentSpeak  table tbody tr td.newlast{
    padding-left: 144px;
  }
  .contentSpeak table tbody tr td.datenews{
    width: 210px;
  }
  .contentSpeak  table tbody tr td a{
    color: #868e96;
    font-size: 15px;
    text-decoration: none;
  }
  .contentSpeak  table tbody tr td button{
    padding:0px 10px;
    padding-right: 9px;
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
    font-size: 13px;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    border: 1px solid transparent;
    cursor: pointer;
    border-right: 1px solid #ccc;
    background: #fff;
    color: #eb5e5f;
  }
  .contentSpeak table tbody tr td button:last-child{
    border-right: 0;
  }
  .contentSpeak table tbody tr td button span{
    display: inline-block;
    width:15px;
    height:17px;
    margin-right: 4px;
  }



</style>
