"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pages_TUIKit_TUICore_server_IComponentServer = require("../IComponentServer.js");
const pages_TUIKit_TUICore_store_index = require("../../store/index.js");
class TUIGroupServer extends pages_TUIKit_TUICore_server_IComponentServer.IComponentServer {
  constructor(TUICore) {
    super();
    this.store = pages_TUIKit_TUICore_store_index.store.state.timStore;
    this.currentStore = {};
    this.TUICore = common_vendor.index.$TUIKit;
    this.bindTIMEvent();
  }
  destroyed() {
    this.unbindTIMEvent();
  }
  updateStore(newValue, oldValue) {
    this.currentStore.groupList = newValue.groupList;
    this.currentStore.searchGroup = newValue.searchGroup;
  }
  bindTIMEvent() {
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.GROUP_LIST_UPDATED, this.handleGroupListUpdated, this);
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.GROUP_ATTRIBUTES_UPDATED, this.handleGroupAttributesUpdated, this);
  }
  unbindTIMEvent() {
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.GROUP_LIST_UPDATED, this.handleGroupListUpdated);
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.GROUP_ATTRIBUTES_UPDATED, this.handleGroupAttributesUpdated);
  }
  handleGroupListUpdated(event) {
    this.store.groupList = event.data;
  }
  handleGroupAttributesUpdated(event) {
    const { groupID, groupAttributes } = event.data;
    console.log(groupID, groupAttributes);
  }
  handlePromiseCallback(callback) {
    return new Promise((resolve, reject) => {
      const config = {
        TUIName: "TUIGroupServer",
        callback: () => {
          callback && callback(resolve, reject);
        }
      };
      this.TUICore.setAwaitFunc(config.TUIName, config.callback);
    });
  }
  async getGroupList(options) {
    return new Promise(async (resolve, reject) => {
      try {
        let imResponse = {};
        if (!options) {
          imResponse = await this.TUICore.tim.getGroupList();
        } else {
          imResponse = await this.TUICore.tim.getGroupList(options);
        }
        this.store.groupList = imResponse.data.groupList;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupProfile(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupProfile(options);
        this.store.groupList = imResponse.data.groupList;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  createGroup(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.createGroup(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  dismissGroup(groupID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.dismissGroup(groupID);
        this.store.groupProfile = imResponse.data.group;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  updateGroupProfile(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.updateGroupProfile(options);
        this.store.groupProfile = imResponse.data.group;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  joinGroup(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.joinGroup(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  quitGroup(groupID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.quitGroup(groupID);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  searchGroupByID(groupID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.searchGroupByID(groupID);
        this.store.searchGroup = imResponse.data.group;
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupOnlineMemberCount(groupID) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupOnlineMemberCount(groupID);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  changeGroupOwner(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.changeGroupOwner(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  handleGroupApplication(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.handleGroupApplication(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  initGroupAttributes(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.initGroupAttributes(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  setGroupAttributes(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.setGroupAttributes(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  deleteGroupAttributes(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.deleteGroupAttributes(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupAttributes(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupAttributes(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupMemberList(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupMemberList(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  addGroupMember(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.addGroupMember(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  deleteGroupMember(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.deleteGroupMember(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  setGroupMemberMuteTime(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.setGroupMemberMuteTime(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  setGroupMemberRole(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.setGroupMemberRole(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  setGroupMemberNameCard(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.setGroupMemberNameCard(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupMemberProfile(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupMemberProfile(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async bind(params) {
    this.currentStore = params;
    await this.getGroupList();
    return this.currentStore;
  }
}
exports.TUIGroupServer = TUIGroupServer;
