"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const debug_GenerateTestUserSig = require("./debug/GenerateTestUserSig.js");
const pages_TUIKit_TUICore_index = require("./pages/TUIKit/TUICore/index.js");
const pages_TUIKit_TUICore_store_index = require("./pages/TUIKit/TUICore/store/index.js");
require("./debug/lib-generate-test-usersig-es.min.js");
require("./pages/TUIKit/TUICore/server/conversation/index.js");
require("./pages/TUIKit/TUICore/server/IComponentServer.js");
require("./pages/TUIKit/TUICore/server/chat/index.js");
require("./pages/TUIKit/TUICore/server/profile/index.js");
require("./pages/TUIKit/TUICore/server/TUIGroup/index.js");
require("./pages/TUIKit/TUICore/interfaces/ITUIServer.js");
require("./pages/TUIKit/TUICore/store/modules.js");
require("./pages/TUIKit/TUICore/store/modules/timStore.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/daka/daka.js";
  "./pages/social/social.js";
  "./pages/profile/profile.js";
  "./pages/detail/detail.js";
  "./pages/add/add.js";
  "./pages/TUIKit/TUIPages/TUILogin/index.js";
  "./pages/TUIKit/TUIPages/TUIConversation/index.js";
  "./pages/TUIKit/TUIPages/TUIConversation/create.js";
  "./pages/TUIKit/TUIPages/TUIChat/index.js";
  "./pages/TUIKit/TUIPages/TUIMine/index.js";
  "./pages/TUIKit/TUIPages/TUIChat/components/message-elements/video-play.js";
  "./pages/TUIKit/TUIPages/TUIGroupManage/index.js";
  "./pages/TUIKit/TUIPages/TUIUserCenter/webview/webview.js";
  "./pages/TUIKit/TUIPages/TUIGroupManage/memberOperate.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/App.vue"]]);
const aegis = new common_vendor.Aegis({
  id: "iHWefAYqmGKHeAqvDB",
  reportApiSpeed: true
});
common_vendor.index.$aegis = aegis;
common_vendor.index.$TUIKit = pages_TUIKit_TUICore_index.TUICore.init({
  SDKAppID: debug_GenerateTestUserSig.SDKAPPID
});
let options = {
  SDKAppID: debug_GenerateTestUserSig.SDKAPPID
};
let tim = common_vendor.TIM$1.create(options);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(pages_TUIKit_TUICore_store_index.store);
  app.use(common_vendor.createPinia());
  app.config.globalProperties.tim = tim;
  app.config.globalProperties.TIM = common_vendor.TIM$1;
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
