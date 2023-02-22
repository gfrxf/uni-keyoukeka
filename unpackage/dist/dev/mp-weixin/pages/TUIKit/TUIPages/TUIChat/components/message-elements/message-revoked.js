"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const MessageRevoked = common_vendor.defineComponent({
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
    const edit = () => {
      ctx.emit("edit", data.message);
    };
    return {
      ...common_vendor.toRefs(data),
      edit
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.message.flow === "in"
  }, _ctx.message.flow === "in" ? {
    b: common_vendor.t(_ctx.message.nick || _ctx.message.from)
  } : {}, {
    c: _ctx.message.flow === "out"
  }, _ctx.message.flow === "out" ? {
    d: common_vendor.o((...args) => _ctx.edit && _ctx.edit(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageRevoked, [["render", _sfc_render], ["__scopeId", "data-v-74cb0d08"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-revoked.vue"]]);
wx.createComponent(Component);
