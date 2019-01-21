<template>
  <div>
    <script
      id="editor"
      type="text/plain"
    ></script>
  </div>
</template>

<script>
export default {
  name: "UE",
  props: {
    id: {
      type: String
    },
    config: {
      type: Object,
      default: function() {
        return {
          BaseUrl: "",
          UEDITOR_HOME_URL: "static/ueditor/",
          initialFrameWidth: null,
          initialFrameHeight: 350
        };
      }
    },
    defaultMsg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      //每个编辑器生成不同的id,以防止冲突
      // randomId: "editor_" + Math.random() * 100000000000000000,
      editor: null
    };
  },
  mounted() {
    //初始化UE
    const _this = this;
    this.editor = UE.delEditor("editor");
    // this.editor = UE.delEditor(this.randomId); //this.randomId
    console.log("editor已删除");
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

    this.editor = UE.getEditor("editor", this.config);
    this.editor.placeholder("请输入内容...");
    console.log("editor已获取");
    this.editor.addListener("ready", function() {
      console.log("ready");
      _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
  },
  destoryed() {
    this.editor.destory();
    console.log("editor已销毁");
  },
  methods: {
    getUEContent: function() {
      return this.editor.getContent();
    },
    getContentTxt: function() {
      return this.editor.getContentTxt();
    },
    hasContents: function() {
      return this.editor.hasContents();
    },
    setContent: function(isAppendTo) {
      this.editor.setContent("<div>" + isAppendTo + "</div>");
    }
  }
};
</script>
