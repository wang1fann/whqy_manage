<template>
  <div class="contentAnswer">
    <div class="up">
      <div class="l">
        <label class="l">标题</label>
        <div class="l">
          <el-input v-model="input"  placeholder=""></el-input>
        </div>
      </div>
      <div class="l">
        <label class="l">所属试题库</label>
        <div class="l">
          <el-input v-model="input"  placeholder="一"></el-input>
        </div>
      </div>
      <div class="l">
        <label class="l">上传时间</label>
        <div class="l block">
          <el-date-picker
            v-model="value1"
            placeholder="2018-06-13"
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
          <th class="huawen">标题</th>
          <th class="wenAges">所属试题库</th>
          <th>上传时间</th>
          <th class="last2">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input type="checkbox">
          </td>
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">一</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">二</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
          <td class="huatitle"><a href="#">渭华起义有什么历史意义，下列描述正确的是？</a></td>
          <td class="ageduan">三</td>
          <td>2018-06-03</td>
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
    import KnowledgeAnswerAppend from "./knowledgeAnswerAppend";
    export default {
        name: "knowledgeAnswer",
      components: {KnowledgeAnswerAppend},
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

<style scoped>
  .contentAnswer .gai{
    padding-top: 0;
  }
  .l{float: left}
  .r{float: right}
  .contentAnswer .up{
    line-height: 34px;
    margin-top: 20px;
    margin-left:100px;
    overflow: hidden;
  }
  .contentAnswer  .up label{
    margin-right: 16px;
    color: #999;
  }
  .contentAnswer .up>div{
    margin-left: 34px;
  }
  .contentAnswer .el-button{
    padding: 7px 20px;
    background: #e24142;
    height: 30px;
    margin-left: 20px;
  }
  .contentAnswer .el-date-editor.el-input{
    width: 148px;
  }
  .contentAnswer input.el-input__inner{
    width: 380px;
  }
  .contentAnswer .el-input--prefix .el-input__inner{
    width: 148px;
  }
  .contentAnswer .el-input--prefix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  .contentAnswer .xia{
    width: 96%;
    overflow: hidden;
    margin: 0 auto;
    margin-left: 48px;
    margin-top: 20px;

  }

  .contentAnswer table{
    width: 94%;
    margin-bottom:20px;
    border-spacing: 0;
    padding: 5px;
    empty-cells: show;
    border-collapse: separate;
  }
  .contentAnswer table{border-collapse:collapse;}
  .contentAnswer table tr{display: block; }
  .contentAnswer tbody tr{border:1px solid #ddd; display: block; margin-bottom: 6px}
  .contentAnswer table thead tr{ margin-bottom: 8px}
  .contentAnswer table thead tr th{
    vertical-align: bottom;
    font-size: 15px;
    background: #e5e8ef;
    color: #666;
    padding: 8px;
    text-align: left;
    padding-left: 8px;
  }

  .contentAnswer table tbody tr td{
    padding: 6px;
    font-size: 15px;
    padding-left: 14px;
    color: #868e96;
  }
  .contentAnswer table thead tr th.huawen{
    width: 320px;
    padding-left: 20px;
    text-align: center;
  }
  .contentAnswer table thead tr th:nth-child(4){
    width: 210px;
    text-align: center;
  }
  .contentAnswer table thead tr th:nth-child(1){
    width: 80px;
    padding-left: 15px;
  }
  .contentAnswer table thead tr th:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentAnswer table tbody tr td:nth-child(1) input{
    width: 15px;
    height: 15px;
  }
  .contentAnswer  table thead tr th.last2{
    width: 260px;
    text-align: center;
  }
  .contentAnswer table thead tr th.wenAges{
    width: 216px;
    padding-left: 70px;
    text-align: center;
  }
  .contentAnswer table tbody tr td.huatitle{
    width: 468px;
  }
  .contentAnswer table tbody tr td.ageduan{
    width: 156px;
  }
  .contentAnswer table tbody tr td:nth-child(4){
    width: 280px;
  }
  .contentAnswer table tbody tr td.btnlast{
    padding-left: 32px;
  }

  .contentAnswer table tbody tr td a{
    color: #868e96;
    font-size: 15px;
    text-decoration: none;
  }
  .contentAnswer table tbody tr td button{
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
  .contentAnswer table tbody tr td button:last-child{
    border-right: 0;
  }
  .contentAnswer table tbody tr td button span{
    display: inline-block;
    width:15px;
    height:17px;
    margin-right: 4px;
  }
</style>
