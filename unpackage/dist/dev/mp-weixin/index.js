"use strict";
const common_vendor = require("./common/vendor.js");
const pages_TUIKit_TUICore_store_index = require("./pages/TUIKit/TUICore/store/index.js");
const common_assets = require("./common/assets.js");
const TUIConversationList = () => "./pages/TUIKit/TUIPages/TUIConversation/conversation-list.js";
const Dialog = () => "./pages/TUIKit/TUIPages/TUIConversation/components/dialog.js";
const TUIConversation = common_vendor.defineComponent({
  name: "TUIConversation",
  components: {
    TUIConversationList,
    Dialog
  },
  setup(props) {
    const timStore = pages_TUIKit_TUICore_store_index.store.state.timStore;
    const data = common_vendor.reactive({
      conversationList: common_vendor.computed$1(() => timStore.conversationList),
      currrentConversationID: "",
      open: false,
      searchUserID: "",
      selectedList: [],
      searchUserList: [],
      step: 1,
      showDialog: false,
      item: {
        flow: "out",
        status: "success"
      },
      styleConfig: {
        width: "150px",
        padding: "16px 16px 0px",
        top: "8px",
        right: "8px"
      },
      chatList: [{
        imgType: "SINGLE",
        type: common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C,
        id: 1,
        content: "\u53D1\u8D77\u4F1A\u8BDD"
      }, {
        imgType: "GROUP",
        type: common_vendor.index.$TUIKit.TIM.TYPES.GRP_WORK,
        id: 1,
        content: "\u5DE5\u4F5C\u7FA4"
      }, {
        imgType: "GROUP",
        type: common_vendor.index.$TUIKit.TIM.TYPES.GRP_PUBLIC,
        id: 2,
        content: "\u793E\u4EA4\u7FA4"
      }, {
        imgType: "GROUP",
        type: common_vendor.index.$TUIKit.TIM.TYPES.GRP_MEETING,
        id: 3,
        content: "\u4F1A\u8BAE\u7FA4"
      }]
    });
    common_vendor.onNavigationBarButtonTap(() => {
      data.showDialog = !data.showDialog;
    });
    common_vendor.onShow(() => {
      pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversationID", "");
    });
    const handleCurrrentConversation = (value) => {
      data.currrentConversationID = value.conversationID;
      pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversationID", value.conversationID);
      common_vendor.index.$TUIKit.TUIChatServer.updateStore(value.conversationID);
      common_vendor.index.navigateTo({
        url: `../TUIChat/index?conversationName=${handleItemName(value)}`
      });
      common_vendor.index.$TUIKit.TUIConversationServer.setMessageRead(value.conversationID);
      const curConversation = data.conversationList.filter((item) => {
        return item.conversationID === value.conversationID;
      });
      pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversation", curConversation);
      common_vendor.index.$TUIKit.TUIConversationServer.getConversationProfile(value.conversationID).then((res) => {
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversation", res.data.conversation);
      });
    };
    const handleShow = () => {
      data.showDialog = true;
    };
    const handleContentClick = (item) => {
      data.showDialog = false;
      common_vendor.index.navigateTo({
        url: `../TUIConversation/create?title=${item.content}&type=${item.type}`
      });
    };
    const handleClose = () => {
      data.showDialog = false;
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
    return {
      ...common_vendor.toRefs(data),
      handleCurrrentConversation,
      handleContentClick,
      handleItemName,
      handleClose,
      handleShow
    };
  }
});
if (!Array) {
  const _component_Dialog = common_vendor.resolveComponent("Dialog");
  const _component_TUIConversationList = common_vendor.resolveComponent("TUIConversationList");
  (_component_Dialog + _component_TUIConversationList)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.chatList, (item, index, i0) => {
      return common_vendor.e({
        a: item.imgType === "SINGLE"
      }, item.imgType === "SINGLE" ? {
        b: common_assets._imports_0$2
      } : {
        c: common_assets._imports_1$1
      }, {
        d: common_vendor.t(item.content),
        e: index,
        f: common_vendor.o(($event) => _ctx.handleContentClick(item), index)
      });
    }),
    b: common_vendor.p({
      visible: _ctx.showDialog,
      styleConfig: _ctx.styleConfig,
      handleClose: _ctx.handleClose
    }),
    c: common_vendor.o((...args) => _ctx.handleShow && _ctx.handleShow(...args)),
    d: common_vendor.o(_ctx.handleCurrrentConversation),
    e: common_vendor.p({
      currentID: _ctx.currrentConversationID,
      conversationList: _ctx.conversationList
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(TUIConversation, [["render", _sfc_render], ["__scopeId", "data-v-653b394a"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIConversation/index.vue"]]);
exports.Component = Component;
