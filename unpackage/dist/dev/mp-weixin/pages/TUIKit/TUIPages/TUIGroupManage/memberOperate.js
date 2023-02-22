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
    const TUIGroupServer = common_vendor.index.$TUIKit.TUIGroupServer;
    const { userInfo } = pages_TUIKit_TUICore_store_index.store.state.timStore;
    const data = common_vendor.reactive({
      userID: (userInfo == null ? void 0 : userInfo.userID) || "",
      inputUserID: "",
      chooseUserList: [],
      title: "\u53D1\u8D77\u4F1A\u8BDD",
      type: "",
      groupID: ""
    });
    common_vendor.onLoad((options) => {
      data.title = (options == null ? void 0 : options.title) || "\u53D1\u8D77\u4F1A\u8BDD";
      data.type = (options == null ? void 0 : options.type) || "";
      data.groupID = (options == null ? void 0 : options.groupID) || "";
      common_vendor.index.setNavigationBarTitle({ title: (options == null ? void 0 : options.type) === "add" ? "\u6DFB\u52A0\u6210\u5458" : "\u5220\u9664\u6210\u5458" });
      const params = {
        groupID: data.groupID,
        count: 100,
        offset: 0
      };
      TUIGroupServer.getGroupMemberList(params).then((res) => {
        if (res.code === 0) {
          data.chooseUserList = (res.data.memberList || []).map((obj) => ({
            ...obj,
            isShow: true,
            isExist: true
          }));
        }
      });
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
            isChoose: false,
            isShow: true
          };
          if (data.chooseUserList.filter((obj) => userInfo2.userID === obj.userID).length === 0) {
            data.chooseUserList.push(userInfo2);
          } else {
            data.chooseUserList = data.chooseUserList.map((obj) => {
              return obj.userID === userInfo2.userID ? { ...obj, isShow: true } : obj;
            });
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
      if (item.isExist && data.type === "add")
        return;
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
    const handleConfirmOperate = async () => {
      const { type, groupID } = data;
      if (type === "add") {
        const userIDList = data.chooseUserList.filter((obj) => obj.isChoose && !obj.isExist).map((obj) => obj.userID);
        await TUIGroupServer.addGroupMember({
          groupID,
          userIDList
        });
        common_vendor.index.navigateBack();
      }
      if (type === "remove") {
        const userIDList = data.chooseUserList.filter((obj) => obj.isChoose).map((obj) => obj.userID);
        await TUIGroupServer.deleteGroupMember({
          groupID,
          userIDList
        });
        common_vendor.index.navigateBack();
      }
    };
    return {
      ...common_vendor.toRefs(data),
      handleUserIdInput,
      handleGetUserProfileInfo,
      handleChoose,
      handleConfirmOperate
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.type === "add"
  }, _ctx.type === "add" ? {
    b: _ctx.inputUserID,
    c: common_vendor.o((...args) => _ctx.handleUserIdInput && _ctx.handleUserIdInput(...args)),
    d: common_vendor.o((...args) => _ctx.handleGetUserProfileInfo && _ctx.handleGetUserProfileInfo(...args)),
    e: common_vendor.o((...args) => _ctx.handleGetUserProfileInfo && _ctx.handleGetUserProfileInfo(...args))
  } : {}, {
    f: common_vendor.t(_ctx.userID),
    g: _ctx.chooseUserList.length > 0
  }, _ctx.chooseUserList.length > 0 ? {
    h: common_vendor.f(_ctx.chooseUserList, (item, index, i0) => {
      return common_vendor.e({
        a: item.isChoose
      }, item.isChoose ? {
        b: common_assets._imports_0
      } : {
        c: item.isExist && _ctx.type === "add" ? 1 : ""
      }, {
        d: item.avatar || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
        e: common_vendor.t(item.nick),
        f: common_vendor.t(item.userID),
        g: item.isExist && _ctx.type === "add"
      }, item.isExist && _ctx.type === "add" ? {} : {}, {
        h: item.isExist ? 1 : "",
        i: index,
        j: common_vendor.o(($event) => _ctx.handleChoose(item), index)
      });
    }),
    i: _ctx.type === "remove" ? 1 : ""
  } : {}, {
    j: common_vendor.o((...args) => _ctx.handleConfirmOperate && _ctx.handleConfirmOperate(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-21531b37"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/memberOperate.vue"]]);
wx.createPage(MiniProgramPage);
