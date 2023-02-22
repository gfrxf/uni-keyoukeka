"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  setup(props) {
    const data = common_vendor.reactive({
      url: "",
      title: ""
    });
    common_vendor.onLoad((options) => {
      data.url = options && options.url || "";
      data.title = options && options.nav || "";
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.url
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIUserCenter/webview/webview.vue"]]);
wx.createPage(MiniProgramPage);
