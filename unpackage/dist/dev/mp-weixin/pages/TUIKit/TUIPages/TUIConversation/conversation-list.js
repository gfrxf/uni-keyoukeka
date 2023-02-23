"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_utils_date = require("../../utils/date.js");
const common_assets = require("../../../../common/assets.js");
const TUIConversationList = common_vendor.defineComponent({
  props: {
    conversationList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    currentID: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  setup(props, ctx) {
    const obj = common_vendor.reactive({
      conversationList: [],
      currentID: "",
      isOpened: "none",
      currentConversation: {},
      dialogID: ""
    });
    common_vendor.watchEffect(() => {
      obj.conversationList = props.conversationList;
      obj.currentID = props.currentID;
    });
    const handleItemAvator = (item) => {
      var _a, _b, _c;
      let avatar = "";
      switch (item.type) {
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C:
          avatar = ((_a = item == null ? void 0 : item.userProfile) == null ? void 0 : _a.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png";
          break;
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_GROUP:
          avatar = ((_b = item == null ? void 0 : item.groupProfile) == null ? void 0 : _b.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
          break;
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_SYSTEM:
          avatar = ((_c = item == null ? void 0 : item.groupProfile) == null ? void 0 : _c.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png";
          break;
      }
      return avatar;
    };
    const handleItemName = (item) => {
      var _a, _b;
      let name = "";
      switch (item.type) {
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C:
          name = (item == null ? void 0 : item.userProfile.nick) || ((_a = item == null ? void 0 : item.userProfile) == null ? void 0 : _a.userID) || "";
          break;
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_GROUP:
          name = item.groupProfile.name || ((_b = item == null ? void 0 : item.groupProfile) == null ? void 0 : _b.groupID) || "";
          break;
        case common_vendor.index.$TUIKit.TIM.TYPES.CONV_SYSTEM:
          name = "\u7CFB\u7EDF\u901A\u77E5";
          break;
      }
      return name;
    };
    const handleItemTime = (time) => {
      if (time > 0) {
        return pages_TUIKit_utils_date.caculateTimeago(time * 1e3);
      }
      return "";
    };
    const handleItemMessage = (message) => {
      switch (message.type) {
        case common_vendor.index.$TUIKit.TIM.TYPES.MSG_TEXT:
          return message.payload.text;
        default:
          return message.messageForShow;
      }
    };
    const handleGotoItem = (item) => {
      ctx.emit("handleGotoItem", item);
    };
    const handleItemLongpress = (item) => {
      obj.currentConversation = item;
      obj.dialogID = item.conversationID;
      if (item.type === "C2C") {
        obj.currentuserID = item.userProfile.userID;
      } else if (item.type === "GROUP") {
        obj.currentuserID = item.groupProfile.groupID;
      }
      obj.conversationType = item.type;
    };
    const handlerIsOpened = (item) => {
      if (item.conversationID === obj.doalogID) {
        return "right";
      } else {
        return "none";
      }
    };
    const handleConversation = (type) => {
      switch (type) {
        case "delete":
          common_vendor.index.$TUIKit.TUIConversationServer.deleteConversation(obj.dialogID).then((imResponse) => {
            imResponse.data;
          });
          obj.dialogID = "";
          break;
        case "ispinned":
          if (type === "ispinned") {
            const options = {
              conversationID: obj.dialogID,
              isPinned: true
            };
            common_vendor.index.$TUIKit.TUIConversationServer.pinConversation(options).then((imResponse) => {
              console.log(imResponse);
            });
          }
          obj.dialogID = "";
          break;
        case "dispinned":
          if (type === "dispinned") {
            const options = {
              conversationID: obj.dialogID,
              isPinned: false
            };
            common_vendor.index.$TUIKit.TUIConversationServer.pinConversation(options).then((imResponse) => {
            });
          }
          obj.dialogID = "";
          break;
        case "mute":
          if (type === "mute" && obj.conversationType === "C2C") {
            const options = {
              userIDList: [obj.currentuserID],
              messageRemindType: common_vendor.index.$TUIKit.TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE
            };
            common_vendor.index.$TUIKit.TUIConversationServer.muteConversation(options).then((imResponse) => {
              console.log(imResponse);
            });
          } else if (type === "mute" && obj.conversationType === "GROUP") {
            const options = {
              groupID: obj.currentuserID,
              messageRemindType: common_vendor.index.$TUIKit.TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE
            };
            common_vendor.index.$TUIKit.TUIConversationServer.muteConversation(options).then((imResponse) => {
              console.log(imResponse);
            });
          }
          obj.dialogID = "";
          break;
        case "notMute":
          if (type === "notMute" && obj.conversationType === "C2C") {
            const options = {
              userIDList: [obj.currentuserID],
              messageRemindType: common_vendor.index.$TUIKit.TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE
            };
            common_vendor.index.$TUIKit.TUIConversationServer.muteConversation(options).then((imResponse) => {
              console.log(imResponse);
            });
          } else if (type === "notMute" && obj.conversationType === "GROUP") {
            const options = {
              groupID: obj.currentuserID,
              messageRemindType: common_vendor.index.$TUIKit.TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE
            };
            common_vendor.index.$TUIKit.TUIConversationServer.muteConversation(options).then((imResponse) => {
              console.log(imResponse);
            });
          }
          obj.dialogID = "";
          break;
      }
    };
    return {
      ...common_vendor.toRefs(obj),
      handleGotoItem,
      handleItemAvator,
      handleItemTime,
      handleItemMessage,
      handleItemName,
      handleItemLongpress,
      handleConversation,
      handlerIsOpened
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.conversationList, (item, index, i0) => {
      return common_vendor.e({
        a: _ctx.handleItemAvator(item),
        b: item.unreadCount > 0 && item.messageRemindType !== "AcceptNotNotify"
      }, item.unreadCount > 0 && item.messageRemindType !== "AcceptNotNotify" ? {
        c: common_vendor.t(item.unreadCount > 99 ? "99+" : item.unreadCount)
      } : {}, {
        d: item.unreadCount > 0 && item.messageRemindType === "AcceptNotNotify"
      }, item.unreadCount > 0 && item.messageRemindType === "AcceptNotNotify" ? {} : {}, {
        e: common_vendor.t(_ctx.handleItemName(item)),
        f: item.unreadCount > 0 && item.messageRemindType === "AcceptNotNotify"
      }, item.unreadCount > 0 && item.messageRemindType === "AcceptNotNotify" ? {
        g: common_vendor.t(item.unreadCount > 99 ? "99+" : item.unreadCount)
      } : {}, {
        h: common_vendor.t(_ctx.handleItemMessage(item.lastMessage)),
        i: common_vendor.t(_ctx.handleItemTime(item.lastMessage.lastTime)),
        j: item.messageRemindType === "AcceptNotNotify"
      }, item.messageRemindType === "AcceptNotNotify" ? {
        k: common_assets._imports_0$5
      } : {}, {
        l: item.conversationID === _ctx.dialogID
      }, item.conversationID === _ctx.dialogID ? common_vendor.e({
        m: common_vendor.o(($event) => _ctx.handleConversation("delete", _ctx.dialogID), index),
        n: !item.isPinned
      }, !item.isPinned ? {
        o: common_vendor.o(($event) => _ctx.handleConversation("ispinned", _ctx.dialogID), index)
      } : {}, {
        p: item.isPinned
      }, item.isPinned ? {
        q: common_vendor.o(($event) => _ctx.handleConversation("dispinned", _ctx.dialogID), index)
      } : {}, {
        r: item.messageRemindType === "" || item.messageRemindType === "AcceptAndNotify"
      }, item.messageRemindType === "" || item.messageRemindType === "AcceptAndNotify" ? {
        s: common_vendor.o(($event) => _ctx.handleConversation("mute", _ctx.dialogID), index)
      } : {}, {
        t: item.messageRemindType === "AcceptNotNotify"
      }, item.messageRemindType === "AcceptNotNotify" ? {
        v: common_vendor.o(($event) => _ctx.handleConversation("notMute", _ctx.dialogID), index)
      } : {}) : {}, {
        w: common_vendor.n(_ctx.dialogID === item.conversationID && "selected"),
        x: common_vendor.n(item.isPinned && "pinned"),
        y: common_vendor.o(($event) => _ctx.handleGotoItem(item), index),
        z: common_vendor.o(($event) => _ctx.handleItemLongpress(item), index),
        A: index
      });
    }),
    b: common_vendor.o(($event) => _ctx.dialogID = "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(TUIConversationList, [["render", _sfc_render], ["__scopeId", "data-v-9a62e141"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIConversation/conversation-list.vue"]]);
wx.createComponent(Component);
