"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const common_assets = require("../../../../../../common/assets.js");
const _sfc_main = common_vendor.defineComponent({
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
      video: {},
      message: {},
      show: false,
      videoContext: null
    });
    common_vendor.watchEffect(() => {
      data.video = props.data;
      data.message = props.messageData;
    });
    const toggleShow = () => {
      common_vendor.index.navigateTo({
        url: `./components/message-elements/video-play?videoMessage=${data.video.url}`
      });
    };
    return {
      ...common_vendor.toRefs(data),
      toggleShow
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.video.snapshotUrl,
    b: common_vendor.n("content-" + _ctx.message.flow),
    c: common_assets._imports_0$8,
    d: common_vendor.n(!_ctx.video.progress && "message-video-cover"),
    e: common_vendor.o((...args) => _ctx.toggleShow && _ctx.toggleShow(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e400482"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-video.vue"]]);
wx.createComponent(Component);
