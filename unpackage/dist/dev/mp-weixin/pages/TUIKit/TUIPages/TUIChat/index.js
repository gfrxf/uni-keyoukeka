"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_TUICore_store_index = require("../../TUICore/store/index.js");
const pages_TUIKit_utils_untis = require("../../utils/untis.js");
const pages_TUIKit_utils_date = require("../../utils/date.js");
require("../../TUICore/store/modules.js");
require("../../TUICore/store/modules/timStore.js");
require("../../utils/decodeText.js");
require("../../utils/emojiMap.js");
const MessageBubble = () => "./components/message-elements/message-bubble.js";
const MessageText = () => "./components/message-elements/message-text.js";
const MessageImage = () => "./components/message-elements/message-image.js";
const MessageOperate = () => "./components/message-elements/message-operate.js";
const MessageVideo = () => "./components/message-elements/message-video.js";
const MessageAudio = () => "./components/message-elements/message-audio.js";
const MessageFace = () => "./components/message-elements/message-face.js";
const MessageCustom = () => "./components/message-elements/message-custom.js";
const MessageTip = () => "./components/message-elements/message-tip.js";
const MessageRevoked = () => "./components/message-elements/message-revoked.js";
const MessageSystem = () => "./components/message-elements/message-system.js";
const TUIChatInput = () => "./components/message-input/index.js";
const _sfc_main = common_vendor.defineComponent({
  name: "TUIChat",
  components: {
    MessageText,
    MessageImage,
    MessageVideo,
    MessageAudio,
    MessageFace,
    MessageCustom,
    MessageBubble,
    MessageTip,
    MessageRevoked,
    MessageSystem,
    TUIChatInput,
    MessageOperate
  },
  setup(props) {
    const timStore = pages_TUIKit_TUICore_store_index.store.state.timStore;
    const TUIServer = common_vendor.index.$TUIKit.TUIChatServer;
    const left = 0;
    const right = 0;
    const defaultDialogPosition = {
      top: -70,
      left,
      right
    };
    const data = common_vendor.reactive({
      messageList: common_vendor.computed$1(() => timStore.messageList),
      conversation: common_vendor.computed$1(() => timStore.conversation),
      triggered: false,
      scrollTop: 9999,
      text: "",
      types: common_vendor.index.$TUIKit.TIM.TYPES,
      currentMessage: {},
      dialogID: "",
      forwardStatus: false,
      imageFlag: false,
      isCompleted: false,
      oldMessageTime: 0,
      dialogPosition: defaultDialogPosition
    });
    const conversationType = common_vendor.computed$1(() => {
      const conversation = data.conversation;
      if (!(conversation == null ? void 0 : conversation.conversationID)) {
        return "";
      }
      if ((conversation == null ? void 0 : conversation.type) === common_vendor.index.$TUIKit.TIM.TYPES.CONV_SYSTEM) {
        return "system";
      }
      return "chat";
    });
    const messages = common_vendor.computed$1(() => {
      if (data.messageList.length > 0) {
        data.oldMessageTime = data.messageList[0].time;
        return data.messageList.filter((item) => {
          return !item.isDeleted;
        });
      }
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.setNavigationBarTitle({
        title: options && options.conversationName
      });
    });
    common_vendor.watch(messages, (newVal, oldVal) => {
      common_vendor.nextTick(() => {
        const newLastMessage = newVal[newVal.length - 1];
        const oldLastMessage = oldVal ? oldVal[oldVal.length - 1] : {};
        data.oldMessageTime = messages.value[0].time;
        handleShowTime();
        if (oldVal && newLastMessage.ID !== oldLastMessage.ID) {
          handleScrollBottom();
        }
      });
    });
    common_vendor.onReady(() => {
      setTimeout(() => {
        data.scrollTop = 9999;
      }, 500);
    });
    common_vendor.onMounted(() => {
      handleShowTime();
      common_vendor.index.addInterceptor("navigateBack", {
        success() {
          common_vendor.index.$TUIKit.TUIConversationServer.setMessageRead(data.conversation.conversationID);
        }
      });
    });
    common_vendor.onNavigationBarButtonTap(() => {
      var _a;
      if (((_a = data.conversation) == null ? void 0 : _a.type) === common_vendor.index.$TUIKit.TIM.TYPES.CONV_GROUP) {
        common_vendor.index.navigateTo({
          url: "../TUIGroupManage/index"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u6682\u65E0\u4FE1\u606F"
        });
      }
    });
    const handleGetProfile = () => {
      common_vendor.index.navigateTo({
        url: "../TUIGroupManage/index"
      });
    };
    const handleShowTime = () => {
      if (messages.value) {
        Array.from(messages.value).forEach((item) => {
          if (item.time - data.oldMessageTime > 5 * 60) {
            data.oldMessageTime = item.time;
            item.showTime = true;
          } else {
            item.showTime = false;
          }
        });
      }
    };
    const handleScrollBottom = () => {
      common_vendor.index.createSelectorQuery().select(".TUI-message-list").boundingClientRect((res) => {
        const scrollH = res.height;
        data.scrollTop = scrollH;
      }).exec();
    };
    const handleScroll = (e) => {
      data.triggered = "restore";
    };
    const handleRefresher = () => {
      data.triggered = true;
      if (!data.isCompleted) {
        TUIServer.getHistoryMessageList().then((res) => {
          console.error(data.isCompleted, "----data.isCompleted");
          data.triggered = false;
          data.isCompleted = res.isCompleted;
        });
      }
      setTimeout(() => {
        data.triggered = false;
      }, 500);
    };
    const handleSend = (emo) => {
      data.text += emo.name;
    };
    const handleSendTextMessage = (e) => {
      if (data.text.trimEnd()) {
        TUIServer.sendTextMessage(JSON.parse(JSON.stringify(data.text)));
      }
      data.text = " ";
    };
    const handleItem = (event, item) => {
      const {
        flow
      } = item;
      try {
        const query = common_vendor.index.createSelectorQuery();
        query.select(`#${item.flow + "-" + item.ID}`).boundingClientRect((res) => {
          const {
            height,
            top
          } = res;
          if (top < 60 + 20) {
            data.dialogPosition = {
              ...data.dialogPosition,
              top: height + 10
            };
            data.dialogPosition = {
              ...data.dialogPosition,
              right: flow === "out" ? 0 : null,
              left: flow === "in" ? 0 : null
            };
          } else {
            data.dialogPosition = {
              ...defaultDialogPosition,
              right: flow === "out" ? 0 : null,
              left: flow === "in" ? 0 : null
            };
          }
        }).exec((res) => {
          data.currentMessage = item;
          data.dialogID = item.ID;
        });
      } catch (error) {
        data.currentMessage = item;
        data.dialogID = item.ID;
      }
    };
    const handleTouchStart = () => {
      common_vendor.index.hideKeyboard();
    };
    const handleEdit = (item) => {
      data.text = item.payload.text;
    };
    return {
      ...common_vendor.toRefs(data),
      conversationType,
      messages,
      handleShowTime,
      handleTouchStart,
      handleRefresher,
      handleScroll,
      handleScrollBottom,
      handleSendTextMessage,
      handleItem,
      handleEdit,
      handleTextMessageShowContext: pages_TUIKit_utils_untis.handleTextMessageShowContext,
      handleImageMessageShowContext: pages_TUIKit_utils_untis.handleImageMessageShowContext,
      handleVideoMessageShowContext: pages_TUIKit_utils_untis.handleVideoMessageShowContext,
      handleAudioMessageShowContext: pages_TUIKit_utils_untis.handleAudioMessageShowContext,
      handleFileMessageShowContext: pages_TUIKit_utils_untis.handleFileMessageShowContext,
      handleFaceMessageShowContext: pages_TUIKit_utils_untis.handleFaceMessageShowContext,
      handleLocationMessageShowContext: pages_TUIKit_utils_untis.handleLocationMessageShowContext,
      handleMergerMessageShowContext: pages_TUIKit_utils_untis.handleMergerMessageShowContext,
      handleTipMessageShowContext: pages_TUIKit_utils_untis.handleTipMessageShowContext,
      handleCustomMessageShowContext: pages_TUIKit_utils_untis.handleCustomMessageShowContext,
      handleSend,
      caculateTimeago: pages_TUIKit_utils_date.caculateTimeago,
      handleGetProfile
    };
  }
});
if (!Array) {
  const _component_MessageTip = common_vendor.resolveComponent("MessageTip");
  const _component_Message_Operate = common_vendor.resolveComponent("Message-Operate");
  const _component_MessageText = common_vendor.resolveComponent("MessageText");
  const _component_MessageImage = common_vendor.resolveComponent("MessageImage");
  const _component_MessageVideo = common_vendor.resolveComponent("MessageVideo");
  const _component_MessageAudio = common_vendor.resolveComponent("MessageAudio");
  const _component_MessageFace = common_vendor.resolveComponent("MessageFace");
  const _component_MessageCustom = common_vendor.resolveComponent("MessageCustom");
  const _component_MessageBubble = common_vendor.resolveComponent("MessageBubble");
  const _component_MessageRevoked = common_vendor.resolveComponent("MessageRevoked");
  const _component_TUIChatInput = common_vendor.resolveComponent("TUIChatInput");
  const _component_MessageSystem = common_vendor.resolveComponent("MessageSystem");
  (_component_MessageTip + _component_Message_Operate + _component_MessageText + _component_MessageImage + _component_MessageVideo + _component_MessageAudio + _component_MessageFace + _component_MessageCustom + _component_MessageBubble + _component_MessageRevoked + _component_TUIChatInput + _component_MessageSystem)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: _ctx.conversationType === "chat"
  }, _ctx.conversationType === "chat" ? common_vendor.e({
    b: ((_a = _ctx.conversation) == null ? void 0 : _a.type) === "GROUP"
  }, ((_b = _ctx.conversation) == null ? void 0 : _b.type) === "GROUP" ? {
    c: common_vendor.o((...args) => _ctx.handleGetProfile && _ctx.handleGetProfile(...args))
  } : {}, {
    d: _ctx.isCompleted
  }, _ctx.isCompleted ? {} : {}, {
    e: common_vendor.f(_ctx.messages, (item, index, i0) => {
      return common_vendor.e({
        a: item.showTime
      }, item.showTime ? {
        b: common_vendor.t(_ctx.caculateTimeago(item.time * 1e3))
      } : {}, {
        c: !item.isRevoked && item.type === _ctx.types.MSG_GRP_TIP
      }, !item.isRevoked && item.type === _ctx.types.MSG_GRP_TIP ? {
        d: "1902a304-0-" + i0,
        e: common_vendor.p({
          data: _ctx.handleTipMessageShowContext(item)
        })
      } : {}, {
        f: !item.isRevoked && item.type !== _ctx.types.MSG_GRP_TIP
      }, !item.isRevoked && item.type !== _ctx.types.MSG_GRP_TIP ? common_vendor.e({
        g: _ctx.dialogID === item.ID
      }, _ctx.dialogID === item.ID ? {
        h: _ctx.dialogPosition.top + "px",
        i: _ctx.dialogPosition.right + "px",
        j: _ctx.dialogPosition.left + "px",
        k: "1902a304-2-" + i0 + "," + ("1902a304-1-" + i0),
        l: common_vendor.p({
          data: item
        })
      } : {}, {
        m: item.type === _ctx.types.MSG_TEXT
      }, item.type === _ctx.types.MSG_TEXT ? {
        n: item.flow + "-" + item.ID,
        o: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        p: "1902a304-3-" + i0 + "," + ("1902a304-1-" + i0),
        q: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleTextMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        r: item.type === _ctx.types.MSG_IMAGE
      }, item.type === _ctx.types.MSG_IMAGE ? {
        s: item.flow + "-" + item.ID,
        t: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        v: "1902a304-4-" + i0 + "," + ("1902a304-1-" + i0),
        w: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleImageMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        x: item.type === _ctx.types.MSG_VIDEO
      }, item.type === _ctx.types.MSG_VIDEO ? {
        y: item.flow + "-" + item.ID,
        z: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        A: "1902a304-5-" + i0 + "," + ("1902a304-1-" + i0),
        B: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleVideoMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        C: item.type === _ctx.types.MSG_AUDIO
      }, item.type === _ctx.types.MSG_AUDIO ? {
        D: item.flow + "-" + item.ID,
        E: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        F: "1902a304-6-" + i0 + "," + ("1902a304-1-" + i0),
        G: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleAudioMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        H: item.type === _ctx.types.MSG_FACE
      }, item.type === _ctx.types.MSG_FACE ? {
        I: item.flow + "-" + item.ID,
        J: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        K: "1902a304-7-" + i0 + "," + ("1902a304-1-" + i0),
        L: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleFaceMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        M: item.type === _ctx.types.MSG_CUSTOM
      }, item.type === _ctx.types.MSG_CUSTOM ? {
        N: item.flow + "-" + item.ID,
        O: common_vendor.o(($event) => _ctx.handleItem($event, item), item.ID),
        P: "1902a304-8-" + i0 + "," + ("1902a304-1-" + i0),
        Q: common_vendor.p({
          id: item.flow + "-" + item.ID,
          data: _ctx.handleCustomMessageShowContext(item),
          messageData: item
        })
      } : {}, {
        R: "1902a304-1-" + i0,
        S: common_vendor.p({
          data: item
        })
      }) : {}, {
        T: item.isRevoked
      }, item.isRevoked ? {
        U: common_vendor.o(($event) => _ctx.handleEdit(item), item.ID),
        V: "1902a304-9-" + i0,
        W: common_vendor.p({
          data: item
        })
      } : {}, {
        X: item.ID,
        Y: "view" + item.ID
      });
    }),
    f: common_vendor.o((...args) => _ctx.handleTouchStart && _ctx.handleTouchStart(...args)),
    g: common_vendor.o(($event) => _ctx.dialogID = ""),
    h: _ctx.triggered,
    i: common_vendor.o((...args) => _ctx.handleRefresher && _ctx.handleRefresher(...args)),
    j: _ctx.scrollTop,
    k: common_vendor.p({
      text: _ctx.text,
      conversationData: _ctx.conversation
    })
  }) : {}, {
    l: _ctx.conversationType === "system"
  }, _ctx.conversationType === "system" ? {
    m: common_vendor.p({
      data: _ctx.messages,
      types: _ctx.types
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1902a304"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/index.vue"]]);
wx.createPage(MiniProgramPage);
