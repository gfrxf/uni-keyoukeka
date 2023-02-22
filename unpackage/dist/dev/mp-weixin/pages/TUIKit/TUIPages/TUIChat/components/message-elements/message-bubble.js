"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const messageBubble = common_vendor.defineComponent({
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
      message: {},
      show: false
    });
    common_vendor.watchEffect(() => {
      data.message = props.data;
    });
    const toggleDialog = () => {
      data.show = !data.show;
    };
    return {
      ...common_vendor.toRefs(data),
      toggleDialog
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: ((_a = _ctx.message) == null ? void 0 : _a.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png",
    b: _ctx.message.flow === "in"
  }, _ctx.message.flow === "in" ? {
    c: common_vendor.t(_ctx.message.nick)
  } : {}, {
    d: common_vendor.n("content content-" + _ctx.message.flow),
    e: _ctx.message.status === "fail"
  }, _ctx.message.status === "fail" ? {} : {}, {
    f: _ctx.message.conversationType === "C2C" && _ctx.message.flow == "out" && _ctx.message.status !== "fail"
  }, _ctx.message.conversationType === "C2C" && _ctx.message.flow == "out" && _ctx.message.status !== "fail" ? common_vendor.e({
    g: !_ctx.message.isPeerRead
  }, !_ctx.message.isPeerRead ? {} : {}, {
    h: common_vendor.n(!_ctx.message.isPeerRead && "unRead")
  }) : {}, {
    i: common_vendor.n(_ctx.message.flow === "in" ? "" : "reverse")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(messageBubble, [["render", _sfc_render], ["__scopeId", "data-v-bdaa27cd"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-bubble.vue"]]);
wx.createComponent(Component);
