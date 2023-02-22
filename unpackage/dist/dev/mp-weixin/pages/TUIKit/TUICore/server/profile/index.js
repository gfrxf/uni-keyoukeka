"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pages_TUIKit_TUICore_server_IComponentServer = require("../IComponentServer.js");
const pages_TUIKit_TUICore_store_index = require("../../store/index.js");
class TUIProfileServer extends pages_TUIKit_TUICore_server_IComponentServer.IComponentServer {
  constructor(TUICore) {
    super();
    this.store = pages_TUIKit_TUICore_store_index.store.state.timStore;
    this.currentStore = {};
    this.TUICore = common_vendor.index.$TUIKit;
    this.bindTIMEvent();
    this.getMyProfile();
  }
  destroyed() {
    this.unbindTIMEvent();
  }
  updateStore(newValue, oldValue) {
    this.currentStore.profile = JSON.parse(JSON.stringify(newValue.profile));
  }
  bindTIMEvent() {
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.PROFILE_UPDATED, this.handleProfileUpdated, this);
  }
  unbindTIMEvent() {
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.PROFILE_UPDATED, this.handleProfileUpdated);
  }
  handleProfileUpdated(event) {
  }
  handlePromiseCallback(callback) {
    return new Promise((resolve, reject) => {
      const config = {
        TUIName: "TUIProfile",
        callback: () => {
          callback && callback(resolve, reject);
        }
      };
      this.TUICore.setAwaitFunc(config.TUIName, config.callback);
    });
  }
  async getMyProfile() {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getMyProfile();
        this.store.profile = imResponse.data;
        this.currentStore.profile = JSON.parse(JSON.stringify(this.store.profile));
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async updateMyProfile(options) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.updateMyProfile(options);
        this.store.profile = imResponse.data;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async bind(params) {
    this.currentStore = params;
    return this.currentStore;
  }
}
async function getUserProfile(userIDList) {
  return new Promise(async (resolve, reject) => {
    try {
      const imResponse = await common_vendor.index.$TUIKit.tim.getUserProfile({ userIDList });
      resolve(imResponse);
    } catch (error) {
      reject(error);
    }
  });
}
exports.TUIProfileServer = TUIProfileServer;
exports.getUserProfile = getUserProfile;
