"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const MessageText = common_vendor.defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    messageData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      data: {},
      message: {}
    });
    common_vendor.watchEffect(() => {
      data.data = props.data;
      data.message = props.messageData;
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.data.text, (item, index, i0) => {
      return common_vendor.e({
        a: item.name === "text"
      }, item.name === "text" ? {
        b: common_vendor.t(item.text)
      } : item.name === "img" ? {
        d: item.src
      } : {}, {
        c: item.name === "img",
        e: index
      });
    }),
    b: common_vendor.n("content content-" + _ctx.message.flow)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageText, [["render", _sfc_render], ["__scopeId", "data-v-8469577b"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-text.vue"]]);
wx.createComponent(Component);
