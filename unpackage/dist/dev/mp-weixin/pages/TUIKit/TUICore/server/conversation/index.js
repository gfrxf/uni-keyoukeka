"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pages_TUIKit_TUICore_server_IComponentServer = require("../IComponentServer.js");
const pages_TUIKit_TUICore_store_index = require("../../store/index.js");
class TUIConversationServer extends pages_TUIKit_TUICore_server_IComponentServer.IComponentServer {
  constructor(TUICore) {
    super();
    this.store = pages_TUIKit_TUICore_store_index.store.state.timStore;
    this.TUICore = common_vendor.index.$TUIKit;
    common_vendor.index.showLoading();
    this.bindTIMEvent();
  }
  bindTIMEvent() {
    common_vendor.index.$TUIKit.tim.on(common_vendor.index.$TUIKit.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.handleConversationListUpdate, this);
  }
  unbindTIMEvent() {
    common_vendor.index.$TUIKit.tim.off(common_vendor.index.$TUIKit.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.handleConversationListUpdate);
  }
  handleConversationListUpdate(res) {
    common_vendor.index.hideLoading();
    if (res.data.length === 0) {
      common_vendor.index.showToast({
        title: "\u6682\u65E0\u56DE\u8BDD\u54E6\uFF5E"
      });
    }
    pages_TUIKit_TUICore_store_index.store.commit("timStore/setConversationList", res.data);
  }
  destroyed() {
    this.unbindTIMEvent();
  }
  getConversationList() {
    return new Promise((resolve, reject) => {
    });
  }
  async getConversationProfile(conversationID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getConversationProfile(conversationID);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async deleteConversation(conversationID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.deleteConversation(conversationID);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async pinConversation(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.pinConversation(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async muteConversation(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.setMessageRemindType(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async setMessageRead(conversationID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await common_vendor.index.$TUIKit.tim.setMessageRead({ conversationID });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
}
exports.TUIConversationServer = TUIConversationServer;
