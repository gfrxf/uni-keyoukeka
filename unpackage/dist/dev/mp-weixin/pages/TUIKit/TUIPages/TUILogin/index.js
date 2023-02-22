"use strict";
const common_vendor = require("../../../../common/vendor.js");
const debug_GenerateTestUserSig = require("../../../../debug/GenerateTestUserSig.js");
const pages_TUIKit_TUICore_store_index = require("../../TUICore/store/index.js");
const common_assets = require("../../../../common/assets.js");
require("../../../../debug/lib-generate-test-usersig-es.min.js");
require("../../TUICore/store/modules.js");
require("../../TUICore/store/modules/timStore.js");
const _sfc_main = common_vendor.defineComponent({
  setup(props) {
    const data = common_vendor.reactive({
      userID: "",
      hidden: false,
      btnValue: "\u83B7\u53D6\u9A8C\u8BC1\u7801",
      btnDisabled: false,
      privateAgree: false,
      phone: "",
      code: "",
      sessionID: "",
      second: 60,
      path: "",
      lastTime: 0,
      countryIndicatorStatus: false,
      country: "86",
      indicatorValue: 46,
      showlogin: false
    });
    common_vendor.onLoad((options) => {
      data.path = options && options.path;
      data.type = options && options.type || common_vendor.index.$TUIKit.TIM.TYPES.CONV_C2C;
    });
    const loginWithToken = () => {
      common_vendor.index.switchTab({
        url: "/pages/TUIKit/TUIPages/TUIConversation/index"
      });
    };
    const bindUserIDInput = (e) => {
      const val = e.detail.value;
      data.userID = val;
    };
    const onAgreePrivateProtocol = () => {
      data.privateAgree = !data.privateAgree;
    };
    const linkToPrivacyTreaty = () => {
      const url = "https://web.sdk.qcloud.com/document/Tencent-IM-Privacy-Protection-Guidelines.html";
      common_vendor.index.navigateTo({
        url: `../TUIUserCenter/webview/webview?url=${url}&nav=Privacy-Protection`
      });
    };
    const linkToUserAgreement = () => {
      const url = "https://web.sdk.qcloud.com/document/Tencent-IM-User-Agreement.html";
      common_vendor.index.navigateTo({
        url: `../TUIUserCenter/webview/webview?url=${url}&nav=User-Agreement`
      });
    };
    const handleLogin = () => {
      const userID = data.userID;
      const {
        userSig,
        sdkAppID: SDKAppID
      } = debug_GenerateTestUserSig.genTestUserSig(userID);
      common_vendor.index.$aegis.reportEvent({
        name: "platform",
        ext1: "platform-MP-WEIXIN",
        ext2: "uniTuikitExternalVue3",
        ext3: `${SDKAppID}`
      });
      common_vendor.index.setStorageSync("userInfo", {
        userSig,
        userID
      });
      common_vendor.index.showLoading();
      common_vendor.index.$TUIKit.tim.login({
        userID,
        userSig
      }).then((res) => {
        common_vendor.index.$aegis.reportEvent({
          name: "login",
          ext1: "login-success",
          ext2: "uniTuikitExternalVue3",
          ext3: `${SDKAppID}`
        });
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: "login success",
            icon: "loading"
          });
          common_vendor.index.hideLoading();
          common_vendor.index.setStorageSync("isLogin", true);
          pages_TUIKit_TUICore_store_index.store.commit("timStore/setLoginStatus", true);
          pages_TUIKit_TUICore_store_index.store.commit("timStore/setUserInfo", {
            userID
          });
          common_vendor.index.navigateTo({
            url: "/pages/TUIKit/TUIPages/TUIConversation/index"
          });
        } else {
          common_vendor.index.setStorageSync("isLogin", false);
        }
      }).catch((error) => {
        common_vendor.index.$aegis.reportEvent({
          name: "login",
          ext1: `login-failed#error:${error}`,
          ext2: "uniTuikitExternalVue3",
          ext3: `${SDKAppID}`
        });
        common_vendor.index.setStorageSync("isLogin", false);
        console.warn("login exception = ", error);
      });
    };
    return {
      ...common_vendor.toRefs(data),
      loginWithToken,
      bindUserIDInput,
      onAgreePrivateProtocol,
      linkToPrivacyTreaty,
      linkToUserAgreement,
      handleLogin
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_assets._imports_1,
    c: common_vendor.o([($event) => _ctx.userID = $event.detail.value, (...args) => _ctx.bindUserIDInput && _ctx.bindUserIDInput(...args)]),
    d: _ctx.userID,
    e: _ctx.privateAgree
  }, _ctx.privateAgree ? {
    f: common_assets._imports_0
  } : {
    g: common_assets._imports_3
  }, {
    h: common_vendor.o((...args) => _ctx.onAgreePrivateProtocol && _ctx.onAgreePrivateProtocol(...args)),
    i: common_vendor.o((...args) => _ctx.linkToPrivacyTreaty && _ctx.linkToPrivacyTreaty(...args)),
    j: common_vendor.o((...args) => _ctx.linkToUserAgreement && _ctx.linkToUserAgreement(...args)),
    k: !_ctx.privateAgree,
    l: common_vendor.o((...args) => _ctx.handleLogin && _ctx.handleLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d591e088"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUILogin/index.vue"]]);
wx.createPage(MiniProgramPage);
