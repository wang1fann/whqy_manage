<template>
  <div>
    <!--下面通过传递进来的id完成初始化-->
    <script
      :id="randomId"
      type="text/plain"
    ></script>
  </div>
</template>

<script>
export default {
  name: "UE",
  props: {
    value: {
      default: function() {
        return "";
      }
    },
    //配置可以传递进来
    ueditorConfig: {
      type: Object,
      default: function() {
        return {
          BaseUrl: "",
          UEDITOR_HOME_URL: "static/ueditor/",
          enableAutoSave: false, //禁止自动保存
          autoSyncData: false, //自动同步编辑器要提交的数据
          initialFrameWidth: null,
          initialFrameHeight: 600
        };
      }
    }
  },
  data() {
    return {
      //每个编辑器生成不同的id,以防止冲突
      randomId: "editor_" + Math.random() * 100000000000000000,
      //编辑器实例
      instance: null,
      ready: false
    };
  },
  watch: {
    value: function(val, oldVal) {
      console.log(val);
      console.log(this.ready);
      console.log("/////////////////////////////////");
      if (val != null && this.ready) {
        this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
        this.instance.setContent(val);
      }
    }
  },
  //此时--el挂载到实例上去了,可以初始化对应的编辑器了
  mounted() {
    this.placeholedEditor();
    this.initEditor();
  },

  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  },
  methods: {
    placeholedEditor() {
      UE.Editor.prototype.placeholder = function(justPlainText) {
        var _editor = this;
        _editor.addListener("focus", function() {
          var localHtml = _editor.getPlainTxt();
          if ($.trim(localHtml) === $.trim(justPlainText)) {
            _editor.setContent(" ");
          }
        });
        _editor.addListener("blur", function() {
          var localHtml = _editor.getContent();
          if (!localHtml) {
            _editor.setContent(justPlainText);
          }
        });
        _editor.ready(function() {
          _editor.fireEvent("blur");
        });
      };
    },
    initEditor() {
      const _this = this;
      //dom元素已经挂载上去了
      this.$nextTick(() => {
        this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.instance.addListener("ready", () => {
          this.ready = true;
          this.$emit("ready", this.instance);
        });
      });
    },
    setText(con) {
      this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
      this.instance.setContent(con);
    },
    getUEContent: function() {
      this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
      return this.instance.getContent();
    },
    getContentTxt: function() {
      this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
      return this.instance.getContentTxt();
    },
    hasContents: function() {
      this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
      return this.instance.hasContents();
    },
    setContent: function(isAppendTo) {
      this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
      this.instance.setContent("<div>" + isAppendTo + "</div>");
    }
  }
};
</script>

<style>
</style>