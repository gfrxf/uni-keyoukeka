"use strict";
const common_vendor = require("../../../common/vendor.js");
const pages_TUIKit_TUICore_server_conversation_index = require("./server/conversation/index.js");
const pages_TUIKit_TUICore_server_chat_index = require("./server/chat/index.js");
const pages_TUIKit_TUICore_server_profile_index = require("./server/profile/index.js");
const pages_TUIKit_TUICore_server_TUIGroup_index = require("./server/TUIGroup/index.js");
const pages_TUIKit_TUICore_interfaces_ITUIServer = require("./interfaces/ITUIServer.js");
const _TUICore = class extends pages_TUIKit_TUICore_interfaces_ITUIServer.ITUIServer {
  constructor(params) {
    super();
    this.isSDKReady = false;
    this.config = {};
    this.SDKAppID = params.SDKAppID;
    this.TIM = common_vendor.TIM;
    if (!params.tim) {
      this.tim = common_vendor.TIM.create({ SDKAppID: this.SDKAppID, devMode: true });
    } else {
      this.tim = params.tim;
    }
    this.tim.registerPlugin({ "tim-upload-plugin": common_vendor.TIMUploadPlugin });
    this.bindTIMEvent();
  }
  static init(options) {
    if (!_TUICore.instance) {
      _TUICore.instance = new _TUICore(options);
      common_vendor.index.setStorageSync(`TIM_${this.SDKAppID}_isTUIKit`, true);
    }
    return _TUICore.instance;
  }
  login(options) {
    return new Promise((resolve, reject) => {
      this.tim.login(options).then(() => {
        this.loginResolveRejectCache.push({
          resolve,
          reject
        });
        _TUICore.isLogin = true;
        return null;
      }).catch((error) => {
        reject(error);
      });
    });
  }
  logout() {
    return new Promise((resolve, reject) => {
      this.tim.logout().then((imResponse) => {
        this.isSDKReady = false;
        _TUICore.isLogin = false;
        this.TUIConversationServer.destroyed();
        this.TUIChatServer.destroyed();
        this.TUIProfileServer.destroyed();
        this.TUIGroupServer.destroyed();
        resolve(imResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  bindTIMEvent() {
    this.tim.on(common_vendor.TIM.EVENT.SDK_READY, this.handleSDKReady, this);
    this.tim.on(common_vendor.TIM.EVENT.SDK_NOT_READY, this.handleSDKNotReady, this);
  }
  unbindTIMEvent() {
    this.tim.off(common_vendor.TIM.EVENT.SDK_READY, this.handleSDKReady);
  }
  handleSDKReady(event) {
    this.isSDKReady = true;
    this.TUIConversationServer = new pages_TUIKit_TUICore_server_conversation_index.TUIConversationServer();
    this.TUIChatServer = new pages_TUIKit_TUICore_server_chat_index.TUIChatServer();
    this.TUIProfileServer = new pages_TUIKit_TUICore_server_profile_index.TUIProfileServer();
    this.TUIGroupServer = new pages_TUIKit_TUICore_server_TUIGroup_index.TUIGroupServer();
  }
  handleSDKNotReady(event) {
    this.isSDKReady = false;
    common_vendor.index.showToast({
      title: "SDK \u672A\u5B8C\u6210\u521D\u59CB\u5316"
    });
  }
  destroyed() {
    this.unbindTIMEvent();
    this.isSDKReady = false;
  }
};
let TUICore = _TUICore;
TUICore.isLogin = false;
exports.TUICore = TUICore;
