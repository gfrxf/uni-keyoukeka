"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const MessageTip = common_vendor.defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      message: {}
    });
    common_vendor.watchEffect(() => {
      data.message = props.data;
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.message.text)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageTip, [["render", _sfc_render], ["__scopeId", "data-v-eba994b3"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-tip.vue"]]);
wx.createComponent(Component);
