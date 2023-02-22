"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "dialog",
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {
          width: "240px",
          padding: "16px",
          top: "10px",
          right: "10px"
        };
      }
    },
    handleClose: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(props, context) {
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.visible
  }, _ctx.visible ? {
    b: common_vendor.s(_ctx.styleConfig),
    c: common_vendor.o((...args) => _ctx.handleClose && _ctx.handleClose(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-842d67a9"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIConversation/components/dialog.vue"]]);
wx.createComponent(Component);
