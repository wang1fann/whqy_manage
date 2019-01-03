<template>
  <div class="contentword">
    <div class="up">
      <div class="l">
        <label class="l">文物标题</label>
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
            <input  type="checkbox">
            <label>全选</label>
          </th>
          <th class="huawen">景区名称</th>
          <th class="wenAges">景区开放时间</th>
          <th>门票价格</th>
          <th class="last2">订票电话</th>
          <th class="last2">公交路线</th>
          <th class="last2">上传时间</th>
          <th class="last2">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td class="shijian">{{new Date(value1).getFullYear() + '-' +(new Date(value1).getMonth() + 1) + '-' + new Date(value1).getDate()}}</td>
          <td class="btnlast">
            <button type="button" class="l" @click="reads">查看</button>
            <button type="button" class="l" @click="writes">编辑</button>
            <button type="button" class="l" @click="delMessages" >删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
            <button type="button" class="l">查看</button>
            <button type="button" class="l">编辑</button>
            <button type="button" class="l">删除</button>
          </td>
        </tr>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义数字纪念馆</a></td>
          <td >周六、周天(9:00-17:00)_</td>
          <td class="ageduan">免费</td>
          <td class="ageduan">032-23456</td>
          <td >2路、23路、12路、106路</td>
          <td >2018-06-03</td>
          <td class="btnlast">
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
        name: "convenienceSearch",
      data() {
        return {
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
          input2: ''
        };
      },
      methods:{
        delMessages() {
          this.$confirm('此操作将永久删除此条查询信息是否继续?', '提示', {
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
        },
        // clear(index) {
        //   this.checkboxData.splice(index, 1);
        // },
        writes() {
          this.$prompt('景区名称', '编辑', {
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
        },
        reads() {
          this.$alert('渭华起义数字纪念馆', '景区名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        },
      }
    }
</script>

<style scoped>
  .contentword .gai{
    padding-top: 0;
  }
  .l{float: left}
  .r{float: right}
  .contentword .up{
    line-height: 34px;
    margin-top: 20px;
    margin-left:100px;
    overflow: hidden;
  }
  .contentword  .up label{
    margin-right: 16px;
    color: #999;
  }
  .contentword .up>div{
    margin-left: 34px;
  }
  .contentword .el-button{
    padding: 7px 20px;
    background: #e24142;
    height: 30px;
    margin-left: 20px;
  }
  .contentword .el-date-editor.el-input{
    width: 148px;
  }
  .contentword input.el-input__inner{
    width: 380px;
  }
  .contentword .el-input--prefix .el-input__inner{
    width: 148px;
  }
  .contentword .el-input--prefix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .contentword .xia{
    width: 96%;
    overflow: hidden;
    margin: 0 auto;
    margin-left: 48px;
    margin-top: 20px;

  }

  .contentword table{
    width: 94%;
    margin-bottom:20px;
    border-spacing: 0;
    padding: 5px;
    empty-cells: show;
    border-collapse: separate;
  }
  .contentword table{border-collapse:collapse;}
  .contentword table tr{display: block; }
  .contentword tbody tr{border:1px solid #ddd; display: block; margin-bottom: 6px}
  .contentword table thead tr{ margin-bottom: 8px}
  .contentword table thead tr th{
    vertical-align: bottom;
    font-size: 15px;
    background: #e5e8ef;
    color: #666;
    padding: 8px;
    text-align: left;
    padding-left: 8px;
  }

  .contentword table tbody tr td{
    padding: 6px;
    font-size: 15px;
    padding-left: 14px;
    color: #868e96;
  }
  .contentword table thead tr th.huawen{
    width: 310px;
    padding-left: 20px;
    text-align: center;
  }
  .contentword table thead tr th:nth-child(4){
    width: 205px;
    text-align: center;
  }
  .contentword table thead tr th:nth-child(1){
    width: 102px;
    padding-left: 15px;
  }
  .contentword table thead tr th:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentword table tbody tr td:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentword  table thead tr th.last2{
    width: 280px;
    text-align: center;
  }
  .contentword table thead tr th.wenAges{
    width: 272px;
    text-align: center;
  }
  .contentword table tbody tr td.huatitle{
    width: 234px;
  }
  .contentword table tbody tr td.ageduan{
    width: 182px;
  }
  .contentword table tbody tr td:nth-child(4){
    width: 44px;
  }
  .contentword table tbody tr td.shijian{
    width: 80px;
  }
  .contentword table tbody tr td.btnlast{
    padding-left: 48px;
  }

  .contentword table tbody tr td a{
    color: #868e96;
    font-size: 15px;
    text-decoration: none;
  }
  .contentword table tbody tr td button{
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
  .contentword table tbody tr td button:last-child{
    border-right: 0;
  }
  .contentword table tbody tr td button span{
    display: inline-block;
    width:15px;
    height:17px;
    margin-right: 4px;
  }
</style>
