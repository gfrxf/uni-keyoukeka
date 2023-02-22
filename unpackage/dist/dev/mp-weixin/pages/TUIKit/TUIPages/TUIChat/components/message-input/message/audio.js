"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const recorderManager = common_vendor.index.getRecorderManager();
const AudioMessage = common_vendor.defineComponent({
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      popupToggle: false,
      isRecording: false,
      canSend: true,
      text: "\u6309\u4F4F\u8BF4\u8BDD",
      recorderManager: null,
      title: " ",
      recordTime: 0,
      recordTimer: null
    });
    common_vendor.onMounted(() => {
      recorderManager.onStop((res) => {
        clearInterval(data.recordTimer);
        let msg = {
          duration: res.duration ? res.duration : data.recordTime * 1e3,
          tempFilePath: res.tempFilePath,
          fileSize: res.fileSize ? res.fileSize : 48 * data.recordTime / 8 * 1024
        };
        common_vendor.index.hideLoading();
        if (data.canSend) {
          if (msg.duration < 1e3) {
            common_vendor.index.showToast({
              title: "\u5F55\u97F3\u65F6\u95F4\u592A\u77ED",
              icon: "none"
            });
          } else {
            common_vendor.index.$TUIKit.TUIChatServer.sendAudioMessage(msg);
          }
        }
        data.popupToggle = false;
        data.isRecording = false;
        data.canSend = true;
        data.title = " ";
        data.text = "\u6309\u4F4F\u8BF4\u8BDD";
      });
    });
    const handleLongPress = (e) => {
      data.popupToggle = true, recorderManager.start({
        duration: 6e4,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192e3,
        format: "aac"
      });
      data.startPoint = e.target, data.title = "\u6B63\u5728\u5F55\u97F3", data.isRecording = true, data.recordTime = 0;
      data.recordTimer = setInterval(() => {
        data.recordTime++;
      }, 1e3);
    };
    const handleTouchMove = (e) => {
      if (data.isRecording) {
        if (e.currentTarget.offsetTop - e.changedTouches[e.changedTouches.length - 1].clientY > 100) {
          data.text = "\u62AC\u8D77\u505C\u6B62";
          data.title = "\u677E\u5F00\u624B\u6307\uFF0C\u53D6\u6D88\u53D1\u9001";
          data.canSend = false;
        } else if (e.currentTarget.offsetTop - e.changedTouches[e.changedTouches.length - 1].clientY > 20) {
          data.text = "\u62AC\u8D77\u505C\u6B62";
          data.title = "\u4E0A\u5212\u53EF\u53D6\u6D88";
          data.canSend = true;
        } else {
          data.text = "\u62AC\u8D77\u505C\u6B62";
          data.title = "\u6B63\u5728\u5F55\u97F3";
          data.canSend = true;
        }
      }
    };
    const handleTouchEnd = () => {
      data.isRecording = false;
      data.popupToggle = false;
      data.text = "\u6309\u4F4F\u8BF4\u8BDD";
      common_vendor.index.hideLoading();
      recorderManager.stop();
    };
    const sendUploadMessage = (e) => {
      Video.TUIServer.sendVideoMessage(e.target);
    };
    return {
      ...common_vendor.toRefs(data),
      sendUploadMessage,
      handleLongPress,
      handleTouchEnd,
      handleTouchMove
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(_ctx.text),
    b: _ctx.popupToggle
  }, _ctx.popupToggle ? {
    c: common_vendor.t(_ctx.title),
    d: common_vendor.o((...args) => _ctx.handleLongPress && _ctx.handleLongPress(...args)),
    e: common_vendor.o((...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
    f: common_vendor.o((...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args))
  } : {}, {
    g: common_vendor.o((...args) => _ctx.handleLongPress && _ctx.handleLongPress(...args)),
    h: common_vendor.o((...args) => _ctx.handleTouchMove && _ctx.handleTouchMove(...args)),
    i: common_vendor.o((...args) => _ctx.handleTouchEnd && _ctx.handleTouchEnd(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(AudioMessage, [["render", _sfc_render], ["__scopeId", "data-v-764d0a96"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-input/message/audio.vue"]]);
wx.createComponent(Component);
