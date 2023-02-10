"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "fui-form-field",
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.hidden ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a883648a"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/node_modules/firstui-uni/firstui/fui-form-field/fui-form-field.vue"]]);
wx.createComponent(Component);
