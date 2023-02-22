"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_TUICore_store_index = require("../../TUICore/store/index.js");
require("../../TUICore/store/modules.js");
require("../../TUICore/store/modules/timStore.js");
const TUIMine = common_vendor.defineComponent({
  setup(props) {
    const data = common_vendor.reactive({
      myInfo: {
        nick: "",
        userID: "",
        avatar: ""
      }
    });
    common_vendor.onReady(() => {
      handleGetMyProfile();
    });
    const handlePersonal = () => {
    };
    const handleQuit = () => {
      common_vendor.index.$TUIKit.logout().then(() => {
        common_vendor.index.clearStorage();
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setLoginStatus", false);
        common_vendor.index.reLaunch({
          url: "../TUILogin/index",
          success: () => {
            common_vendor.index.showToast({
              title: "\u9000\u51FA\u6210\u529F",
              icon: "none"
            });
          }
        });
      });
    };
    const handleGetMyProfile = () => {
      common_vendor.index.$TUIKit.tim.getMyProfile().then((imResponse) => {
        data.myInfo = imResponse.data;
        console.log(imResponse.data, data.config, "---linda");
      }).catch((imError) => {
        console.warn("getMyProfile error:", imError);
      });
    };
    return {
      ...common_vendor.toRefs(data),
      handlePersonal,
      handleQuit,
      handleGetMyProfile
    };
  }
});
const _sfc_main = TUIMine;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.myInfo.avatar ? _ctx.myInfo.avatar : "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
    b: common_vendor.t(_ctx.myInfo.nick ? _ctx.myInfo.nick : "\u63D0\u83AB"),
    c: common_vendor.t(_ctx.myInfo.userID),
    d: common_vendor.o((...args) => _ctx.handlePersonal && _ctx.handlePersonal(...args)),
    e: common_vendor.o((...args) => _ctx.handleQuit && _ctx.handleQuit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIMine/index.vue"]]);
wx.createPage(MiniProgramPage);
