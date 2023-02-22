"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const MessageFace = common_vendor.defineComponent({
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
      data: {}
    });
    common_vendor.watchEffect(() => {
      data.data = props.data;
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.data.url
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageFace, [["render", _sfc_render], ["__scopeId", "data-v-579879ce"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-face.vue"]]);
wx.createComponent(Component);
