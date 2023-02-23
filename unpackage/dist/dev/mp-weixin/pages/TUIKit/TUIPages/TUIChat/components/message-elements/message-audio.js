"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const common_assets = require("../../../../../../common/assets.js");
const audio = common_vendor.index.createInnerAudioContext();
const MessageAudio = common_vendor.defineComponent({
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
      message: {},
      isPlay: false
    });
    common_vendor.watchEffect(() => {
      data.data = props.data;
      data.message = props.messageData;
    });
    common_vendor.onMounted(() => {
      audio.onPlay(() => {
        console.log("\u5F00\u59CB\u64AD\u653E");
      });
      audio.onEnded(() => {
        console.log("\u505C\u6B62\u64AD\u653E");
      });
      audio.onError((e) => {
        console.error(e, "onError");
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BE5\u97F3\u9891\u6682\u4E0D\u652F\u6301\u64AD\u653E"
        });
      });
    });
    const handlePlay = () => {
      if (audioUrl) {
        audio.src = audioUrl;
        audio.play();
      }
      data.isPlay = true;
    };
    return {
      ...common_vendor.toRefs(data),
      audio,
      handlePlay
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.message.flow === "in"
  }, _ctx.message.flow === "in" ? {
    b: common_assets._imports_0$8
  } : {}, {
    c: common_vendor.t(_ctx.data.second),
    d: _ctx.message.flow === "out"
  }, _ctx.message.flow === "out" ? {
    e: common_assets._imports_0$8
  } : {}, {
    f: common_vendor.n("content content-" + _ctx.message.flow),
    g: common_vendor.o((...args) => _ctx.handlePlay && _ctx.handlePlay(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageAudio, [["render", _sfc_render], ["__scopeId", "data-v-53eee9af"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-audio.vue"]]);
wx.createComponent(Component);
