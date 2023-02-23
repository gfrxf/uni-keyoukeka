"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pages_TUIKit_TUICore_store_index = require("../../../../TUICore/store/index.js");
const common_assets = require("../../../../../../common/assets.js");
require("../../../../TUICore/store/modules.js");
require("../../../../TUICore/store/modules/timStore.js");
const Face = () => "./message/face.js";
const AudioMessage = () => "./message/audio.js";
const TUIChatInput = common_vendor.defineComponent({
  components: {
    Face,
    AudioMessage
  },
  props: {
    text: {
      type: String,
      default: () => {
        return "";
      }
    },
    conversationData: {
      type: Object,
      default: () => {
        return "";
      }
    }
  },
  setup(props) {
    const TUIServer = common_vendor.index.$TUIKit.TUIChatServer;
    const data = common_vendor.reactive({
      firstSendMessage: true,
      inputText: "",
      extensionArea: false,
      sendMessageBtn: false,
      displayFlag: "",
      isAudio: false,
      displayServiceEvaluation: false,
      displayCommonWords: false,
      displayOrderList: false,
      conversation: common_vendor.computed$1(() => pages_TUIKit_TUICore_store_index.store.state.timStore.conversation)
    });
    common_vendor.watchEffect(() => {
      data.inputText = props.text;
    });
    const handleSwitchAudio = () => {
      data.isAudio = !data.isAudio;
    };
    const handleEmoji = () => {
      data.displayFlag = data.displayFlag === "emoji" ? "" : "emoji";
    };
    const handleExtensions = (e) => {
      data.displayFlag = data.displayFlag === "extension" ? "" : "extension";
    };
    const handleSendTextMessage = (e) => {
      if (data.inputText.trimEnd()) {
        common_vendor.index.$TUIKit.TUIChatServer.sendTextMessage(JSON.parse(JSON.stringify(data.inputText)));
      }
      data.inputText = " ";
    };
    const handleSend = (emo) => {
      data.inputText += emo.name;
    };
    const handleSendImageMessage = (type) => {
      common_vendor.index.chooseImage({
        sourceType: [type],
        count: 1,
        success: (res) => {
          common_vendor.index.getImageInfo({
            src: res.tempFilePaths[0],
            success(image) {
              console.error(image);
              TUIServer.sendImageMessage(res, image);
            }
          });
        }
      });
    };
    const handleSendVideoMessage = (type) => {
      common_vendor.index.chooseVideo({
        sourceType: [type],
        maxDuration: 60,
        camera: "back",
        success: (res) => {
          if (res) {
            console.error(res, "----linda");
            TUIServer.sendVideoMessage(res);
          }
        }
      });
    };
    const handleCalling = (value) => {
      if (data.conversation.type === "GROUP") {
        common_vendor.index.showToast({
          title: "\u7FA4\u804A\u6682\u4E0D\u652F\u6301",
          icon: "none"
        });
        return;
      }
      data.conversation.userProfile;
      common_vendor.index.showToast({
        title: "\u6682\u4E0D\u652F\u6301",
        icon: "none"
      });
    };
    return {
      ...common_vendor.toRefs(data),
      handleExtensions,
      handleSendImageMessage,
      handleSendTextMessage,
      handleSendVideoMessage,
      handleEmoji,
      handleSend,
      handleSwitchAudio,
      handleCalling
    };
  }
});
if (!Array) {
  const _component_AudioMessage = common_vendor.resolveComponent("AudioMessage");
  const _component_Face = common_vendor.resolveComponent("Face");
  (_component_AudioMessage + _component_Face)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => _ctx.handleSwitchAudio && _ctx.handleSwitchAudio(...args)),
    b: common_assets._imports_0$9,
    c: !_ctx.isAudio
  }, !_ctx.isAudio ? {
    d: common_vendor.o((...args) => _ctx.handleSendTextMessage && _ctx.handleSendTextMessage(...args)),
    e: _ctx.inputText,
    f: common_vendor.o(($event) => _ctx.inputText = $event.detail.value)
  } : {}, {
    g: common_vendor.o((...args) => _ctx.handleEmoji && _ctx.handleEmoji(...args)),
    h: common_assets._imports_1$4,
    i: common_assets._imports_2$2,
    j: common_vendor.o((...args) => _ctx.handleExtensions && _ctx.handleExtensions(...args)),
    k: _ctx.displayFlag === "emoji"
  }, _ctx.displayFlag === "emoji" ? {
    l: common_vendor.o(_ctx.handleSend),
    m: common_vendor.o(_ctx.handleSendTextMessage),
    n: common_vendor.p({
      show: _ctx.displayFlag === "emoji"
    })
  } : {}, {
    o: _ctx.displayFlag === "extension"
  }, _ctx.displayFlag === "extension" ? {
    p: common_assets._imports_3$1,
    q: common_vendor.o(($event) => _ctx.handleSendImageMessage("camera")),
    r: common_assets._imports_4,
    s: common_vendor.o(($event) => _ctx.handleSendImageMessage("album")),
    t: common_assets._imports_5,
    v: common_vendor.o(($event) => _ctx.handleSendVideoMessage("album")),
    w: common_assets._imports_3$1,
    x: common_vendor.o(($event) => _ctx.handleSendVideoMessage("camera")),
    y: common_assets._imports_6,
    z: common_vendor.o(($event) => _ctx.handleCalling(1)),
    A: common_assets._imports_5,
    B: common_vendor.o(($event) => _ctx.handleCalling(2))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(TUIChatInput, [["render", _sfc_render], ["__scopeId", "data-v-f3fabc48"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-input/index.vue"]]);
wx.createComponent(Component);
