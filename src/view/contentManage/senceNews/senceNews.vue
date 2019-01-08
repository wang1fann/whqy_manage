<template>
  <div class="contentNews">
    <div class="up">
      <div class="l">
        <label class="l">新闻标题</label>
        <div class="l">
          <el-input v-model="input"  ref="searchval" placeholder="请输入内容"></el-input>
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
          <el-button type="danger" class="btn"  @click="search">查询</el-button>
        </el-row>
      </div>

    </div>
    <div class="xia">
      <table class="biao4">
        <thead>
        <tr >
          <th>
            <input  type="checkbox" v-model="checked" @click='checkedAll' >
            <label>全选</label>
          </th>
          <th class="biao">新闻标题</th>
          <th class="gaidate">上传日期</th>
          <th class="last1">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='(item,index) in items' :key="index" >
          <td>
            <input type="checkbox"  v-model='checkboxList' :value="item.id">
          </td>
          <td class="words"><a href="#">{{item.title}}</a></td>
          <td class="datenews"  >{{new Date(value1).getFullYear() + '-' +(new Date(value1).getMonth() + 1) + '-' + new Date(value1).getDate()}}</td>
          <td class="newlast">
            <button type="button" class="l" @click="reads">查看</button>
            <button type="button" class="l" @click="writes">编辑</button>
            <button type="button" class="l" @click="delMessages" >删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="checked">
          </td>
          <td class="words"><a href="#">白水发现700余斤北宋时期古钱币</a></td>
          <td class="datenews">2018-06-03</td>
          <td class="newlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" v-model="checked">
          </td>
          <td class="words"><a href="#">白水发现700余斤北宋时期古钱币</a></td>
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
    name: "senceNews",
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
        value1: '2018-6-3',
        input: '',
        input2: '',
        checkboxList:[],
        checked: false
      }
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
        this.$confirm('此操作将永久删除此条新闻, 是否继续?', '提示', {
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
          url:'/syx/jingquxinwen/1077457008430551040',
          // data:{
          //   "menuId":"51412",
          //   "status":1
          // },
        }).then( (res) =>{
          console.log(res.data.code)
          if(res){
            if(res.data.code === 20000){
              //成功请求
              console.log(res.data.message);
              console.log(res.data.data);
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
        this.$prompt('请输入新闻标题', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '新闻标题是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
        this.readwrite()
      },
      reads() {
        this.$alert('渭华起义纪念馆深入贯彻学习习总书记在全国宣传思想工作', '新闻标题', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        this.readwrite()
      },
      search () {
        let searchText = this.$refs.searchval.value
        if (searchText =='') {
          return
        } else {
          this.closeState = true
          this.searchState.showsug = true
          this.searchState.searchtext = this.$refs.searchval.value
          this.$emit('searchstate', this.searchState)
        }
        var _this = this;
        // this.$axios('/syx/jingquxinwen/search/1/1?keywords=' + searchText)
        this.$axios({
          method:'post',
          url:'/syx/jingquxinwen/search/1/1',
          data:{
            "menuId":"51412",
            "status":1
          },
        }).then((res) => {
            if (res.data.code === 20000) {
              this.$emit('search', res.data.result.allMatch)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //查看编辑
      readwrite(){
        var _this = this;
        this.$axios({
          method:'post',
          url:'/syx/jingquxinwen/1077456936301105152',
          data:{
            "menuId":"51412",
            "status":1
          },
        }).then( (res) =>{
          console.log(res.data.code)
          if(res){
            if(res.data.code === 20000){
              //成功请求
              console.log(res.data.message);
              console.log(res.data.data);
            } else {
              //请求失败
              console.log(res.data.message);
            }
          }
        })
      },
      //内容接口
      getprev(){
        var _this = this;
        this.$axios({
          method:'post',
          url:'/syx/jingquxinwen/search',
          data:{
            "menuId":"10002001",
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

<style  lang="scss">
 .contentNews .gai{
    padding-top: 0;
  }
 .contentNews .l{float: left}
  .contentNews .r{float: right}
 .contentNews .up{
    line-height: 34px;
    margin-top: 20px;
    margin-left:100px;
    overflow: hidden;
  }
 .contentNews  .up label{
    margin-right: 16px;
    color: #999;
  }
 .contentNews .up>div{
    margin-left: 34px;
  }
 .contentNews .el-button{
    padding: 7px 20px;
    background: #e24142;
    height: 30px;
    margin-left: 20px;
  }
 .contentNews .el-date-editor.el-input{
    width: 148px;
  }
  .contentNews input.el-input__inner{
    width: 380px;
  }
 .contentNews .el-input--prefix .el-input__inner{
    width: 148px;
  }
  .contentNews .el-input--prefix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
 .contentNews  .xia{
      width: 96%;
     overflow: hidden;
     margin: 0 auto;
     margin-left: 48px;
     margin-top: 20px;
 }

   .contentNews table{
    width: 94%;
    margin-bottom:20px;
    border-spacing: 0;
    padding: 5px;
    empty-cells: show;
    border-collapse: separate;
  }
   .contentNews table{border-collapse:collapse;}
   .contentNews table tr{display: block; }
   .contentNews  tbody tr{border:1px solid #ddd; display: block; margin-bottom: 6px}
   .contentNews table thead tr{ margin-bottom: 8px}
   .contentNews  table thead tr th{
    vertical-align: bottom;
    font-size: 15px;
    background: #e5e8ef;
    color: #666;
    padding: 8px;
    text-align: left;
    /*padding-left: 8px;*/
  }

   .contentNews table tbody tr td{
    padding: 6px;
    font-size: 15px;
    padding-left: 14px;
     color: #868e96;
  }
   .contentNews table thead tr th.biao{
    width:20%;
     padding-left: 44px;
    text-align: center;
  }
   .contentNews table thead tr th:nth-child(1){
    width: 6%;
    padding-left: 15px;
  }
   .contentNews table thead tr th:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
   .contentNews table tbody tr td:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
   .contentNews table thead tr th.last1{
      width: 3%;
      text-align: left;
      padding-right:112px;
  }
   .contentNews table thead tr th.gaidate{
    width: 18%;
    text-align: left;
     padding-left: 160px;
  }
   .contentNews  table tbody tr td.words{
    width: 62%;
  }
   .contentNews  table tbody tr td.newlast{
    padding-left: 144px;
  }
   .contentNews table tbody tr td.datenews{
    width:94px;
  }
   .contentNews  table tbody tr td a{
    color: #868e96;
    font-size: 15px;
    text-decoration: none;
  }
   .contentNews  table tbody tr td button{
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
   .contentNews table tbody tr td button:last-child{
    border-right: 0;
  }
   .contentNews table tbody tr td button span{
    display: inline-block;
    width:15px;
    height:17px;
    margin-right: 4px;
  }

  


</style>
