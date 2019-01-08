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
          UEDITOR_HOME_URL: "static/ueditor/",
          initialFrameWidth: null,
          initialFrameHeight: 350
        };
      }
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    //初始化UE
    const _this = this;
    this.editor = UE.delEditor("editor");
    this.editor = UE.getEditor("editor", this.config);
  },
  destoryed() {
    this.editor.destory();
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
    }
  }
};
</script>
