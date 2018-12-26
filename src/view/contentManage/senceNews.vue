<template>
  <div class="content">
    <div class="up">
      <div class="l">
        <label class="l">新闻标题</label>
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
          <th class="biao">新闻标题</th>
          <th class="gaidate">修改日期</th>
          <th class="last1">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
            <input type="checkbox">
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
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
            <input type="checkbox">
          </td>
          <td class="words"><a href="#">渭华起义纪念馆深入贯彻学习习近平总书记在全国宣传思想工作</a></td>
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
        value1: '',
        input: '',
        input2: ''
      };
    }
  }
</script>
<style  lang="scss">
  .gai{
    padding-top: 0;
  }
  .l{float: left}
  .r{float: right}
  .up{
    line-height: 34px;
    margin-top: 20px;
    margin-left:100px;
    overflow: hidden;
  }
  .up label{
    margin-right: 16px;
    color: #999;
  }
  .up>div{
    margin-left: 34px;
  }
  .el-button{
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
   .xia{
      width: 96%;
     overflow: hidden;
     margin: 0 auto;
     margin-left: 48px;
     margin-top: 20px;

      table{
    width: 94%;
    margin-bottom:20px;
    border-spacing: 0;
    padding: 5px;
    empty-cells: show;
    border-collapse: separate;
  }
    table{border-collapse:collapse;}
  table tr{display: block; }
    tbody tr{border:1px solid #ddd; display: block; margin-bottom: 6px}
  table thead tr{ margin-bottom: 8px}
  table thead tr th{
    vertical-align: bottom;
    font-size: 15px;
    background: #e5e8ef;
    color: #666;
    padding: 8px;
    text-align: left;
    padding-left: 8px;
  }

   table tbody tr td{
    padding: 6px;
    font-size: 15px;
    padding-left: 14px;
     color: #868e96;
  }
  table thead tr th.biao{
    width: 525px;
    text-align: center;
  }
  table thead tr th:nth-child(1){
    width: 80px;
    padding-left: 15px;
  }
  table thead tr th:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  table tbody tr td:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  table thead tr th.last1{
    width: 262px;
    text-align: center;
  }
  table thead tr th.gaidate{
    width: 100px;
    text-align: center;
  }
  table tbody tr td.words{
    width: 600px;
  }
  table tbody tr td.newlast{
    padding-left: 84px;
  }
  table tbody tr td.datenews{
    width: 90px;
  }
  table tbody tr td a{
    color: #868e96;
    font-size: 15px;
    text-decoration: none;
  }
    table tbody tr td button{
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
  table tbody tr td button:last-child{
    border-right: 0;
  }
    table tbody tr td button span{
    display: inline-block;
    width:15px;
    height:17px;
    margin-right: 4px;
  }


  }

  


</style>
