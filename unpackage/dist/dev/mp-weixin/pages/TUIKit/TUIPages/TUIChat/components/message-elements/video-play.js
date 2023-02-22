"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "videoPlay",
  setup(props) {
    const data = common_vendor.reactive({
      videoData: "",
      show: false,
      videoContext: null,
      direction: 0
    });
    common_vendor.onLoad((option) => {
      data.videoData = option && option.videoMessage;
      data.show = true;
    });
    common_vendor.onReady(() => {
      data.videoContext = common_vendor.index.createVideoContext("videoEle");
    });
    const toggleClose = () => {
      data.show = false;
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return {
      ...common_vendor.toRefs(data),
      toggleClose
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? {
    b: _ctx.videoData
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b57b47b7"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/video-play.vue"]]);
wx.createPage(MiniProgramPage);
