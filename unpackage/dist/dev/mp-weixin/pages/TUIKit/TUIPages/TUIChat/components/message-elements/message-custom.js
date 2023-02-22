"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const MessageCustom = common_vendor.defineComponent({
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
      extension: {},
      isCustom: "",
      payload: {},
      message: {}
    });
    common_vendor.watchEffect(() => {
      data.data = props.data;
      data.message = props.messageData;
      data.isCustom = props.data.message.payload.data;
      data.payload = props.data.message.payload;
      if (props.data.message.payload.data === "consultion") {
        data.extension = JSON.parse(props.data.message.payload.extension);
      }
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isCustom === "consultion"
  }, _ctx.isCustom === "consultion" ? {
    b: common_vendor.t(_ctx.extension.title),
    c: common_vendor.f(_ctx.extension.item, (item, index, i0) => {
      return {
        a: common_vendor.t(item.key),
        b: item.value,
        c: index
      };
    }),
    d: common_vendor.t(_ctx.extension.description)
  } : _ctx.isCustom === "evaluate" ? {
    f: common_vendor.f(~~_ctx.payload.description, (item, index, i0) => {
      return {
        a: index
      };
    }),
    g: common_vendor.t(_ctx.data.custom)
  } : {
    h: common_vendor.t(_ctx.data.custom),
    i: common_vendor.n("content content-" + _ctx.message.flow)
  }, {
    e: _ctx.isCustom === "evaluate"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageCustom, [["render", _sfc_render], ["__scopeId", "data-v-2acfb6b8"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-custom.vue"]]);
wx.createComponent(Component);
