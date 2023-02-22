"use strict";
const service_home = require("../../service/home.js");
const common_vendor = require("../../common/vendor.js");
require("../../service/index.js");
const tabcontrol = () => "../../components/tab-control/tab-control.js";
const _sfc_main = {
  components: {
    tabcontrol
  },
  data() {
    return {
      tagId: 1,
      contentEl: "",
      test: "<div>Hello World!</div>"
    };
  },
  onLoad(option) {
    this.tagId = option.tagId;
    console.log(this.tagId, "tagid");
    this.getdetail(this.tagId);
  },
  mounted() {
  },
  methods: {
    async getdetail(id) {
      const res = await service_home.getDetails(id);
      this.contentEl = this.htmlUnescape(res.data.content);
    },
    htmlUnescape(html) {
      return html.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&quot;":
            return '"';
          case "&amp;":
            return "&";
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_tab_control2 = common_vendor.resolveComponent("tab-control");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_tab_control2 + _easycom_mp_html2)();
}
const _easycom_tab_control = () => "../../components/tab-control/tab-control.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_tab_control + _easycom_mp_html)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      titles: ["\u56FE\u6587\u79D1\u666E", "\u89C6\u9891\u4ECB\u7ECD"]
    }),
    b: common_vendor.p({
      content: $data.contentEl
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
