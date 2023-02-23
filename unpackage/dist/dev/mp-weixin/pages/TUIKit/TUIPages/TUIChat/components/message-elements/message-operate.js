"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const common_assets = require("../../../../../../common/assets.js");
const MessageOperate = common_vendor.defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const TUIServer = common_vendor.index.$TUIKit.TUIChatServer;
    const data = common_vendor.reactive({
      message: {}
    });
    common_vendor.watchEffect(() => {
      data.message = props.data;
    });
    const handleMseeage = async (type) => {
      switch (type) {
        case "revoke":
          await TUIServer.revokeMessage(data.message).catch((error) => {
            if (error.code = 20016)
              common_vendor.index.showToast({
                title: "\u6D88\u606F\u8D85\u8FC7\u4E86 2 \u5206\u949F",
                icon: "error"
              });
          });
          data.dialogID = "";
          break;
        case "delete":
          await TUIServer.deleteMessage([data.message]);
          data.dialogID = "";
          break;
        case "resend":
          await TUIServer.resendMessage(data.message);
          data.dialogID = "";
          break;
        case "forward":
          data.dialogID = "";
          break;
      }
    };
    return {
      ...common_vendor.toRefs(data),
      handleMseeage
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.message.flow === "out" && _ctx.message.status === "success"
  }, _ctx.message.flow === "out" && _ctx.message.status === "success" ? {
    b: common_assets._imports_0$6,
    c: common_vendor.o(($event) => _ctx.handleMseeage("revoke"))
  } : {}, {
    d: _ctx.message.status === "success"
  }, _ctx.message.status === "success" ? {
    e: common_assets._imports_1$3,
    f: common_vendor.o(($event) => _ctx.handleMseeage("delete"))
  } : {}, {
    g: _ctx.message.flow === "out" && _ctx.message.status === "fail"
  }, _ctx.message.flow === "out" && _ctx.message.status === "fail" ? {
    h: common_assets._imports_2$1,
    i: common_vendor.o(($event) => _ctx.handleMseeage("resend"))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageOperate, [["render", _sfc_render], ["__scopeId", "data-v-928c104b"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-operate.vue"]]);
wx.createComponent(Component);
