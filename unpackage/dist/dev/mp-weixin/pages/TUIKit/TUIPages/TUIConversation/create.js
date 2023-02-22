"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_TUICore_server_profile_index = require("../../TUICore/server/profile/index.js");
const pages_TUIKit_TUICore_store_index = require("../../TUICore/store/index.js");
const common_assets = require("../../../../common/assets.js");
require("../../TUICore/server/IComponentServer.js");
require("../../TUICore/store/modules.js");
require("../../TUICore/store/modules/timStore.js");
const _sfc_main = common_vendor.defineComponent({
  name: "Create",
  props: {},
  setup(props, context) {
    const TUIConversationServer = common_vendor.index.$TUIKit.TUIConversationServer;
    const { userInfo } = pages_TUIKit_TUICore_store_index.store.state.timStore;
    const data = common_vendor.reactive({
      userID: (userInfo == null ? void 0 : userInfo.userID) || "",
      inputUserID: "",
      chooseUserList: [],
      title: "\u53D1\u8D77\u4F1A\u8BDD",
      type: common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C
    });
    common_vendor.onLoad((options) => {
      data.title = options && options.title || "\u53D1\u8D77\u4F1A\u8BDD";
      data.type = options && options.type || common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C;
    });
    const handleUserIdInput = (e) => {
      data.inputUserID = e.detail.value;
    };
    const handleGetUserProfileInfo = () => {
      if (!data.inputUserID)
        return;
      const userIDList = [data.inputUserID];
      common_vendor.index.showLoading({ title: "\u52A0\u8F7D\u4E2D" });
      pages_TUIKit_TUICore_server_profile_index.getUserProfile(userIDList).then((imRes) => {
        common_vendor.index.hideLoading();
        if (imRes.data.length > 0) {
          const userInfo2 = {
            ...imRes.data[0],
            isChoose: false
          };
          if (data.chooseUserList.filter((obj) => userInfo2.userID === obj.userID).length === 0) {
            data.chooseUserList.push(userInfo2);
          }
        } else {
          common_vendor.index.showToast({
            title: "\u641C\u7D22\u7528\u6237\u4E0D\u5B58\u5728",
            icon: "error"
          });
          data.inputUserID = "";
        }
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const handleChoose = (item) => {
      const list = data.chooseUserList.map((obj) => {
        if (item.userID == obj.userID) {
          return {
            ...obj,
            isChoose: !obj.isChoose
          };
        } else {
          return obj;
        }
      });
      data.chooseUserList = list;
    };
    const handleCreateGroup = () => {
      const chooseList = data.chooseUserList.filter((obj) => obj.isChoose);
      if (chooseList.length > 0) {
        switch (data.type) {
          case common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C: {
            if (chooseList.length > 1) {
              common_vendor.index.showToast({
                title: `\u201C\u53D1\u8D77\u4F1A\u8BDD\u201D\u4EC5\u80FD\u9009\u62E9\u4E00\u4E2A\u7528\u6237`,
                icon: "none"
              });
              return;
            } else {
              const conversationId = `C2C${chooseList[0].userID}`;
              handleJumpToChat(conversationId);
            }
            break;
          }
          case common_vendor.index.$TUIKit.TIM.TYPES.GRP_WORK:
          case common_vendor.index.$TUIKit.TIM.TYPES.GRP_PUBLIC:
          case common_vendor.index.$TUIKit.TIM.TYPES.GRP_MEETING: {
            let name = "";
            if (chooseList.length > 2) {
              name = chooseList.slice(0, 3).map((obj) => obj.nick || obj.userID).join(",") || "";
            } else {
              const { userInfo: userInfo2 } = pages_TUIKit_TUICore_store_index.store.state.timStore;
              name = chooseList.map((obj) => obj.nick || obj.userID).join(",") + "\u3001" + ((userInfo2 == null ? void 0 : userInfo2.nick) || (userInfo2 == null ? void 0 : userInfo2.userID));
            }
            const groupOptions = {
              avatar: "https://web.sdk.qcloud.com/component/TUIKit/assets/group_avatar.png",
              type: data.type,
              name,
              memberList: chooseList.map((obj) => ({
                userID: obj.userID,
                role: obj.role,
                memberCustomField: obj.memberCustomField
              }))
            };
            common_vendor.index.showLoading({ title: "\u7FA4\u7EC4\u521B\u5EFA\u4E2D\u2026" });
            common_vendor.index.$TUIKit.tim.createGroup(groupOptions).then((imResponse) => {
              common_vendor.index.hideLoading();
              const { groupID } = imResponse.data && imResponse.data.group;
              if (groupID) {
                const conversationId = `GROUP${groupID}`;
                handleJumpToChat(conversationId);
              }
            }).catch((err) => {
              common_vendor.index.showToast({ title: "\u7FA4\u7EC4\u521B\u5EFA\u5931\u8D25\uFF01" });
              common_vendor.index.hideLoading();
            });
            break;
          }
        }
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u9009\u62E9\u76F8\u5173\u7528\u6237",
          icon: "none"
        });
      }
    };
    const handleJumpToChat = (conversationId) => {
      pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversationID", conversationId);
      common_vendor.index.$TUIKit.TUIChatServer.updateStore(conversationId);
      TUIConversationServer.setMessageRead(conversationId);
      TUIConversationServer.getConversationProfile(conversationId).then((res) => {
        var _a;
        const { conversation } = res.data;
        console.log("create conversation response = ", res);
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversation", conversation);
        let url = "../TUIChat/index";
        if (conversationId.slice(0, 5) === "GROUP") {
          const { name } = conversation.groupProfile;
          url = `${url}?conversationName=${name}`;
        } else if (conversationId.slice(0, 3) === "C2C") {
          conversation.userProfile;
          url = `${url}?conversationName=${((_a = conversation.userProfile.nick) == null ? void 0 : _a.nick) || conversation.userProfile.userID}`;
        }
        common_vendor.index.redirectTo({ url });
      }).catch((err) => {
        console.warn("\u83B7\u53D6 group profile \u5F02\u5E38 = ", err);
      });
    };
    return {
      ...common_vendor.toRefs(data),
      handleUserIdInput,
      handleGetUserProfileInfo,
      handleChoose,
      handleCreateGroup
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.inputUserID,
    b: common_vendor.o((...args) => _ctx.handleUserIdInput && _ctx.handleUserIdInput(...args)),
    c: common_vendor.o((...args) => _ctx.handleGetUserProfileInfo && _ctx.handleGetUserProfileInfo(...args)),
    d: common_vendor.o((...args) => _ctx.handleGetUserProfileInfo && _ctx.handleGetUserProfileInfo(...args)),
    e: common_vendor.f(_ctx.chooseUserList, (item, index, i0) => {
      return common_vendor.e({
        a: item.isChoose
      }, item.isChoose ? {
        b: common_assets._imports_0
      } : {}, {
        c: item.avatar || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
        d: common_vendor.t(item.nick),
        e: common_vendor.t(item.userID),
        f: index,
        g: common_vendor.o(($event) => _ctx.handleChoose(item), index)
      });
    }),
    f: common_vendor.o((...args) => _ctx.handleCreateGroup && _ctx.handleCreateGroup(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9bc6912"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIConversation/create.vue"]]);
wx.createPage(MiniProgramPage);
