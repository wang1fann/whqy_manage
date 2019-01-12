<template>
  <el-form
    :inline="true"
    ref="searchForm"
    label-width="75px"
    :model="formData"
    @submit.native.prevent
  >
    <template v-for="(item, index) in formItem">
      <!-- 下拉 -->
      <el-form-item
        v-if="item.type == 'select' && item.show"
        :key="index"
      >
        <el-select
          v-model="formData[item.name]"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="(option) in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 普通输入 -->
      <el-form-item
        v-else-if="item.type == 'text' && item.show"
        :key="index"
        :label="item.label+':'"
      >
        <el-input
          v-model="formData[item.name]"
          size="mini"
          :name="item.name"
          :placeholder="item.placeholder"
          @keyup.enter.native="onSubmit"
        >
        </el-input>
      </el-form-item>
      <!-- 复选框 -->
      <el-form-item
        v-else-if="item.type ==='checkbox'"
        :key="index"
      >
        <el-checkbox-group
          v-model="formData[item.name]"
          :style="'width: ' + (item.width ? item.width : '100%')"
        >
          <el-checkbox
            v-for="(option, idx) in item.options"
            :key="idx"
            :label="option.id"
          >{{option.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 单选 -->
      <el-form-item
        v-else-if="item.type=='radio'"
        :key="index"
      >
        <el-radio-group v-model="formData[item.name]">
          <el-radio
            v-for="(option, idx) in item.options"
            :key="idx"
            :label="option.value"
            :disabled="option.disabled"
          >{{option.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 日期选择框 -->
      <el-form-item
        v-else-if="item.type == 'date' && item.show"
        :key="index"
        :label="item.label"
      >
        <el-date-picker
          v-model="formData[item.name]"
          @change="getTime"
          :type="item.type"
          :placeholder="item.placeholder"
          :default-time="item.defaultTime"
          :disabled="item.disabled"
          format="yyyy-MM-dd"
          :value-format="(item.format ? item.format : 'yyyy-MM-dd hh:mm:ss')"
          :style="'width: ' + (item.width ? item.width : '100%')"
        ></el-date-picker>
      </el-form-item>
      <!-- 时间选择框 -->
      <!-- 时间范围选择 -->
      <el-form-item
        v-else-if="item.type == 'datetimerange' && item.show"
        :key="index"
      >
        <el-date-picker
          v-model="formData[item.name]"
          type="datetimerange"
          :picker-options="pickerOptions"
          :range-separator="item.rangeSeparator"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          :value-format="(item.format ? item.format : 'yyyy-MM-dd hh:mm:ss')"
          align="right"
        >
        </el-date-picker>
      </el-form-item>
      <span
        class="line"
        :key="item.name"
        v-if="(index != formItem.length-1) && item.show"
      >-</span>
    </template>
    <el-form-item
      class="el-form-item-search"
      v-if="formData.buttonShow!==false"
    >
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="onSubmit"
      >搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "search",
  props: {
    formItem: {
      type: Array,
      default: () => [Object]
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      form: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    console.log(this.buttonShow);
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
    getTime(val) {
      console.log(val);
      this.$emit("updateTime", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/mixins.scss";
@import "@/assets/base/variables.scss";
.el-form-item {
  margin: 0;
  &:last-of-type {
    @include px2rem(margin-left, 15);
  }
}
</style>