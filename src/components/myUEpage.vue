
<template>
  <el-row class="components-container">
    <el-row
      class="info"
      :gutter="24"
    >
      <el-col :span="2">
        标题：
      </el-col>
      <el-col :span="22">
        <el-input
          placeholder="请输入标题"
          v-model="titleVal"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row
      class="info"
      :gutter="20"
    >
      <el-col :span="2">
        内容：
      </el-col>
      <el-col :span="22">
        <UE
          :defaultMsg=defaultMsg
          :config=config
          ref="ue"
        ></UE>
      </el-col>
    </el-row>
    <el-row
      style="margin-top:20px;"
      :gutter="20"
      class="my-redbutton"
    >
      <el-button @click="getUEContent">提交</el-button>
    </el-row>
  </el-row>
</template>
<style>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
</style>
<script>
import UE from "@/components/myEdit";
export default {
  components: { UE },
  props: {
    titleVal: [String, Number],
    defaultMsg: "这里是UE测试",
    config: {
      type: Object,
      default: function() {
        return {
          initialFrameWidth: null,
          initialFrameHeight: 350
        };
      }
    }
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      console.log(content);
      this.$emit("content", content);
    }
  }
};
</script>