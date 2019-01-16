<template>
  <div class="answerAppend">
    <div class="l left">
      <div
        class="inserts cursorpointer color9099a2"
        @click="showDialog"
      >
        <i class="el-icon-plus"></i>添加试题库
      </div>
      <div class="myclearfix">
        <div class="test-box cursorpointer">
          <el-radio-group v-model="activedTestLibaryId">
            <el-radio-button
              v-for="(option, idx) in testLibaryList"
              :key="idx"
              :label="option.id"
            >{{option.name}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div
        class="inserts cursorpointer color9099a2"
        @click="deleteLibConfirm"
      >
        删除试题库
      </div>
    </div>
    <div class="r right">
      <div class="up">
        <div class="l first cursorpointer"><span>＋</span>添加</div>
        <div class="l">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
        </div>
        <div
          class="l last cursorpointer"
          @click="deleteConfirm()"
        ><i class="el-icon-delete"></i>删除</div>

      </div>
      <div class="down">
        <div class="myclearfix">
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic addtest-box"
          >
            <el-form-item
              class="myclearfix"
              prop="title"
              label="题目"
              :rules="[{ required: true, message: '请输入题目', trigger: 'blur' }]"
            >
              <el-input v-model="dynamicValidateForm.title"></el-input>
            </el-form-item>
            <div class="option">
              <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :label="'选项' + indexName[index]"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
              >
                <el-input v-model="domain.value"></el-input>
                <el-button
                  type="primary"
                  @click.prevent="removeDomain(domain)"
                >删除</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <p
                class="alignleft colorE24142 cursorpointer"
                @click="addDomain"
              >新增选项<i class="el-icon-circle-plus-outline"></i></p>
            </el-form-item>
            <el-form-item
              prop="answer"
              label="正确答案"
              :rules="[{ required: true, message: '请输入正确答案选项：A,B,C,D中的一个', trigger: 'blur' }]"
            >
              <el-input v-model="dynamicValidateForm.answer"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('dynamicValidateForm')"
              >提交</el-button>
              <el-button
                type="primary"
                @click="resetFormAdd('dynamicValidateForm')"
              >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="test-list-box myclearfix">
          <el-checkbox-group
            v-model="checkedTest"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(testItem,index) in testList"
              :label="testItem"
              :key="index"
            >
              <div class="test-item timu">
                <el-collapse
                  v-model="activeNames"
                  @change="handleChange"
                >
                  <el-collapse-item
                    :title="'标题：'+testItem.title"
                    name="index"
                  >
                    <p
                      v-for="(option,ind) in testItem.options"
                      :key="ind"
                    >{{indexName[ind]}}:{{option}}</p>
                    <p>正确答案：{{testItem.answer}}</p>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-row>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </el-row>
        </div>
      </div>

    </div>
    <!-- 添加题库弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="30vh"
      width="35%"
      :before-close="handleClose"
    >
      <MyForm
        :form="form"
        ref="myform"
        :formData="formData"
        :formItem="formItem"
        @submit="submit"
      ></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/api_knowledge.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";

export default {
  name: "knowledgeAnswerAppend",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "form1",
      showTitle: false,
      labelWidth: px2rem(140),
      labelPositon: "right",
      width: "80%",
      column: 1,
      hasSubmit: true,
      submitText: "提交",
      cancleText: "取消"
    };
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        title: "",
        answer: "",
        options: ""
      },
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      indexName: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      testLibaryList: "", //题库列表
      dialogTitle: "添加题库",
      dialogVisible: false,
      form: form,
      formItem: [],
      formData: {},
      currentPage: 1,
      total: 0,
      activedTestLibaryId: "",
      libraryId: "",
      testList: "", //题库对应题目列表
      checkAll: false,
      isIndeterminate: true,
      activeNames: [],
      checkedTest: [] //题目复选框
    };
  },
  created() {
    this.formInit();
    this.getTestLibData();
    this.findTestbylibraryId();
  },
  computed: {
    setLibraryId() {
      return this.activedTestLibaryId;
    }
  },
  watch: {
    setLibraryId(val) {
      this.libraryId = val;
      this.findTestbylibraryId();
    }
  },
  methods: {
    // 删除确认
    deleteConfirm() {
      if (this.checkedTest.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的题目",
          type: "warning"
        });
        return;
      }
      var deleteTestIdArr = this._.map(this.checkedTest, "id");
      deleteTestIdArr = deleteTestIdArr.join(",");
      var _this = this;
      this.$confirm("此操作将永久删除该, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteTest(deleteTestIdArr);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除试题库确认
    deleteLibConfirm() {
      var LibName = this.activedTestLibaryId;
      this.$confirm("确认要删除当前选中题库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteLib(this.activedTestLibaryId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // deleteLib删除试题库
    deleteLib(deleteTestIdArr) {
      window.sessionStorage.setItem("responseType", "json");
      API.delTestLibrary({ id: deleteTestIdArr })
        .then(res => {
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
          if (!!res && res.code === 20000) {
            this.getTestLibData();
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 删除试题
    deleteTest(deleteTestIdArr) {
      window.sessionStorage.setItem("responseType", "json");
      API.delTest({ id: deleteTestIdArr })
        .then(res => {
          console.log(res);
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
          if (!!res && res.code === 20000) {
            this.findTestbylibraryId();
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 添加form表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var optionsArr = this._.map(
            this.dynamicValidateForm.domains,
            "value"
          );
          this.dynamicValidateForm.options = optionsArr.join("&&");
          var params = this.dynamicValidateForm;
          params.libraryid = this.libraryId;
          API.addTest(params)
            .then(res => {
              console.log(res);
              this.$message({
                message: res.message,
                type: !!res && res.code === 20000 ? "success" : "warning"
              });
              if (!!res && res.code === 20000) {
                this.findTestbylibraryId();
              }
            })
            .catch(err => {
              this.$message({
                message: err,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    },
    resetFormAdd(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      if (this.dynamicValidateForm.domains.length > 3) {
        this.$notify({
          title: "提示",
          message: "最多只能添加4个选项",
          type: "warning"
        });
        return;
      }
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    },
    // --------------------------------------------------------------
    formInit(row) {
      this.formItem = getFormField("testLibary", "item");
      this.formData = !!row ? row : getFormField("testLibary", "data");
    },
    // 显示添加题库弹框
    showDialog() {
      this.formInit();
      this.dialogTitle = "添加题库";
      this.dialogVisible = true;
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = "";
        }
      }
      this.resetForm();
      done();
    },
    // 表单重置
    resetForm() {
      if (this.$refs["myform"] != undefined) {
        this.$refs["myform"].resetForm();
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findTestbylibraryId();
    },
    // 修改题库
    update(row) {
      this.formInit(row);
      this.dialogTitle = "编辑题库";
      this.dialogVisible = true;
    },
    getTestLibData() {
      //获取题库列表
      API.findTestLibraryList().then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          this.testLibaryList = res.data;
          // this.activedTestLibaryList = res.data[0].name;
          this.activedTestLibaryId = res.data[0].id;
          this.libraryId = res.data[0].id;
        }
      });
    },
    // 添加题库题库
    submit() {
      API.addTestLibrary(this.formData).then(res => {
        this.dialogVisible = false;
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          this.getTestLibData();
        }
      });
    },
    // 全选事件
    handleCheckAllChange(val) {
      this.checkedTest = val ? this.testList : [];
      this.isIndeterminate = false;
    },
    // 复选框变化事件
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.testList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.testList.length;
    },
    // 手风琴变更事件
    handleChange(val) {},
    //获取试题列表
    findTestbylibraryId() {
      API.findTest({
        libraryid: this.libraryId,
        page: this.currentPage,
        size: 10
      }).then(res => {
        if (!!res && res.code === 20000) {
          var objArr = res.data.rows;
          for (var i = 0; i < objArr.length; i++) {
            objArr[i].options = objArr[i].options.split("&&");
          }
          this.testList = objArr;
          this.total = res.data.total;
        }
      });
    }
  }
};
</script>

<style scoped>
.color9099a2 {
  color: #9099a2;
}
.cursorpointer {
  cursor: pointer;
}
.answerAppend {
  overflow: hidden;
  width: 97%;
  margin: 0 auto;
  margin-top: 25px;
  height: 600px;
}
.answerAppend p {
  margin: 0;
  padding: 0;
}
.answerAppend .l {
  float: left;
}
.answerAppend .r {
  float: right;
}
.answerAppend div.left {
  width: 18%;
  height: 99%;
  overflow: hidden;
  border: 1px solid #ddd;
}

.answerAppend div.left .test-box.actived {
  border: 1px solid #f77f80;
  text-align: center;
  color: #f77f80;
}

.answerAppend div.left .inserts {
  width: 90%;
  margin: 10px auto;
  height: 40px;
  line-height: 40px;
  background: #f5f7f7;
}
.answerAppend div.left .inserts span {
  display: inline-block;
  font-size: 26px;
  margin-left: 48px;
  color: #eb7677;
}
.answerAppend div.left .inserts label {
  color: #7c8892;
}
.answerAppend div.right {
  width: 80.5%;
  height: 99%;
  overflow: auto;
  border: 1px solid #ddd;
}
.answerAppend div.right .up {
  overflow: hidden;
  margin-top: 16px;
}
.answerAppend div.right .up div {
  width: 100px;
  height: 35px;
  line-height: 36px;
  margin-left: 15px;
  vertical-align: middle;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.answerAppend div.right .up div.first {
  border: 0;
  height: 37px;
  line-height: 37px;
  background: #f7a954;
  color: #fff;
}
.answerAppend div.right .up div.first span {
  font-size: 20px;
}
.answerAppend div.right .up div.last i {
  margin-right: 10px;
}
.answerAppend div.right .down {
  overflow: hidden;
  margin-top: 30px;
  margin-left: 15px;
}
.answerAppend div.right .down .repeats {
  overflow: hidden;
  margin-bottom: 18px;
}
.answerAppend div.right .down .repeats div.r {
  width: 90%;
  margin-right: 46px;
  background: #f8fbfb;
  padding: 20px 30px;
  padding-bottom: 36px;
  padding-right: 0;
}
.answerAppend div.right .down .repeats div.r .timu {
  overflow: hidden;
  margin-bottom: 20px;
}
.answerAppend div.right .down .repeats div.r .timu label {
  color: #999;
  font-size: 15px;
  margin-right: 10px;
  margin-top: 10px;
}
.answerAppend div.right .down .repeats div.r .timu input {
  width: 88%;
  height: 34px;
  border: 0;
  border: 1px solid #ddd;
}
.answerAppend div.right .down .repeats div.r .timus {
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
.answerAppend div.right .down .repeats div.r .timus input {
  width: 86%;
  height: 34px;
  border: 0;
  border: 1px solid #ddd;
}
.answerAppend div.right .down .repeats div.r .timus img {
  width: 17px;
  height: 17px;
  margin-left: 10px;
  margin-top: 10px;
}
.answerAppend div.right .down .repeats div.r .timus p {
  margin-left: 26px;
  color: #f63a3c;
  text-align: left;
  display: flex;
  align-items: center;
}
.answerAppend div.right .down .repeats div.r .timus p i {
  display: inline-block;
  margin-left: 6px;
  width: 15px;
  height: 15px;
  background: url("../../../assets/img/content/addf.png") no-repeat;
  background-size: 15px auto;
}
.answerAppend div.right .down .repeats div.r .bottoms {
  overflow: hidden;
  margin-top: 20px;
}
.answerAppend div.right .down .repeats div.r .bottoms input {
  outline: none;
  border: 0;
  background: #f63a3c;
  color: #fff;
  padding: 9px 32px;
  border-radius: 3px;
  margin-right: 30px;
}
</style>
