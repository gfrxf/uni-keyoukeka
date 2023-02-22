"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const pages_TUIKit_TUICore_server_IComponentServer = require("../IComponentServer.js");
const pages_TUIKit_TUICore_store_index = require("../../store/index.js");
class TUIChatServer extends pages_TUIKit_TUICore_server_IComponentServer.IComponentServer {
  constructor(TUICore) {
    super();
    this.currentStore = {};
    this.store = pages_TUIKit_TUICore_store_index.store.state.timStore;
    this.TUICore = common_vendor.index.$TUIKit;
    this.bindTIMEvent();
  }
  destroyed() {
    this.unbindTIMEvent();
  }
  updateStore(conversationID) {
    pages_TUIKit_TUICore_store_index.store.commit("timStore/resetChat");
    this.getMessageList({ conversationID, count: 15 }).then((res) => {
    });
  }
  bindTIMEvent() {
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.MESSAGE_RECEIVED, this.handleMessageReceived, this);
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.MESSAGE_MODIFIED, this.handleMessageModified, this);
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.MESSAGE_REVOKED, this.handleMessageRevoked, this);
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.MESSAGE_READ_BY_PEER, this.handleMessageReadByPeer, this);
    this.TUICore.tim.on(this.TUICore.TIM.EVENT.GROUP_LIST_UPDATED, this.handleGroupListUpdated, this);
  }
  unbindTIMEvent() {
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.MESSAGE_RECEIVED, this.handleMessageReceived);
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.MESSAGE_MODIFIED, this.handleMessageModified);
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.MESSAGE_REVOKED, this.handleMessageRevoked);
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.MESSAGE_READ_BY_PEER, this.handleMessageReadByPeer);
    this.TUICore.tim.off(this.TUICore.TIM.EVENT.GROUP_LIST_UPDATED, this.handleGroupListUpdated, this);
  }
  handleMessageReceived(event) {
    event.data.forEach((item) => {
      if (item.conversationID === this.store.conversationID) {
        common_vendor.index.$TUIKit.TUIConversationServer.setMessageRead(item.conversationID);
        const messageList = [...this.store.messageList, item];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
      }
    });
  }
  handleMessageModified(event) {
    const middleData = this.store.messageList;
    this.store.messageList = [];
    this.store.messageList = middleData;
  }
  handleMessageRevoked(event) {
  }
  async handleMessageReadByPeer(event) {
    const middleData = this.store.messageList;
    await pages_TUIKit_TUICore_store_index.store.commit("timStore/resetChat");
    await pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", middleData);
  }
  handleGroupListUpdated(event) {
    event == null ? void 0 : event.data.map((item) => {
      var _a, _b, _c;
      if ((item == null ? void 0 : item.groupID) === ((_c = (_b = (_a = this == null ? void 0 : this.store) == null ? void 0 : _a.conversation) == null ? void 0 : _b.groupProfile) == null ? void 0 : _c.groupID)) {
        this.store.conversation.groupProfile = item;
        const midden = this.store.conversation;
        this.store.conversation = {};
        this.store.conversation = midden;
      }
      return item;
    });
  }
  handleMessageOptions(content, type, callback, to) {
    var _a, _b, _c, _d, _e, _f;
    const options = {
      to: "",
      conversationType: (to == null ? void 0 : to.type) || this.store.conversation.type,
      payload: content,
      needReadReceipt: true
    };
    if (type === "file" && callback) {
      options.onProgress = callback;
    }
    switch (options.conversationType) {
      case this.TUICore.TIM.TYPES.CONV_C2C:
        options.to = ((_a = to == null ? void 0 : to.userProfile) == null ? void 0 : _a.userID) || ((_c = (_b = this.store.conversation) == null ? void 0 : _b.userProfile) == null ? void 0 : _c.userID) || "";
        break;
      case this.TUICore.TIM.TYPES.CONV_GROUP:
        options.to = ((_d = to == null ? void 0 : to.groupProfile) == null ? void 0 : _d.groupID) || ((_f = (_e = this.store.conversation) == null ? void 0 : _e.groupProfile) == null ? void 0 : _f.groupID) || "";
        break;
    }
    return options;
  }
  handlePromiseCallback(callback) {
    return new Promise((resolve, reject) => {
    });
  }
  handleUploadProgress(progress, message) {
    this.store.messageList.map((item) => {
      if (item.ID === message.ID) {
        item.progress = progress;
      }
      return item;
    });
  }
  sendTextMessage(text) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions({ text }, "text");
        const message = this.TUICore.tim.createTextMessage(options);
        const messageList = [...this.store.messageList, message];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
        const middleData = this.store.messageList;
        pages_TUIKit_TUICore_store_index.store.commit("timStore/resetChat");
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", middleData);
      }
    });
  }
  sendFaceMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(data, "face");
        const message = this.TUICore.tim.createFaceMessage(options);
        const messageList = [...this.store.messageList, message];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendImageMessage(res, image) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions({ file: res }, "file");
        const message = this.TUICore.tim.createImageMessage(options);
        message.payload.imageInfoArray[1].height = image.height;
        message.payload.imageInfoArray[1].width = image.width;
        const messageList = [...this.store.messageList, message];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendVideoMessage(res, video) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions({ file: res }, "file");
        const message = this.TUICore.tim.createVideoMessage(options);
        const messageList = [...this.store.messageList, message];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendAudioMessage(audio) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions({ file: audio }, "file", (progress) => {
          this.handleUploadProgress(progress, message);
        });
        const message = this.TUICore.tim.createAudioMessage(options);
        const messageList = [...this.store.messageList, message];
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        console.log("\u53D1\u9001\u97F3\u9891\u6D88\u606F\u5B8C\u6210", imResponse);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendFileMessage(file) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions({ file }, "file", (progress) => {
          this.handleUploadProgress(progress, message);
        });
        const message = this.TUICore.tim.createFileMessage(options);
        this.currentStore.messageList.push(message);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        console.log("\u53D1\u9001\u6587\u4EF6\u6D88\u606F\u5B8C\u6210", imResponse);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendCustomMessage(data) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(data, "custom");
        const message = this.TUICore.tim.createCustomMessage(options);
        this.currentStore.messageList.push(message);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        console.log("\u53D1\u9001\u81EA\u5B9A\u4E49\u6D88\u606F\u5B8C\u6210", imResponse);
        this.store.messageList = this.store.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendLocationMessage(data) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(data, "location");
        const message = this.TUICore.tim.createLocationMessage(options);
        this.store.messageList.push(message);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        console.log("\u53D1\u9001\u5730\u7406\u4F4D\u7F6E\u6D88\u606F\u5B8C\u6210", imResponse);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  forwardMessage(message, to) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(message, "forward", {}, to);
        const imMessage = this.TUICore.tim.createForwardMessage(options);
        const imResponse = await this.TUICore.tim.sendMessage(imMessage);
        if (this.store.conversation.conversationID === imResponse.data.message.conversationID) {
          this.store.messageList.push(imResponse.data.message);
        }
        console.log("\u6D88\u606F\u8F6C\u53D1\u5B8C\u6210", imResponse);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendTextAtMessage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(data, "text");
        const message = this.TUICore.tim.createTextAtMessage(options);
        this.currentStore.messageList.push(message);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        this.currentStore.messageList = this.currentStore.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  sendMergerMessage(data) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const options = this.handleMessageOptions(data, "merger");
        const message = this.TUICore.tim.createMergerMessage(options);
        this.currentStore.messageList.push(message);
        const imResponse = await this.TUICore.tim.sendMessage(message);
        console.log("\u53D1\u9001\u5408\u5E76\u6D88\u606F\u5B8C\u6210", imResponse);
        this.currentStore.messageList = this.currentStore.messageList.map((item) => {
          if (item.ID === imResponse.data.message.ID) {
            return imResponse.data.message;
          }
          return item;
        });
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupMemberList(options) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupMemberList(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  async getMessageList(options, history) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getMessageList(options);
        let messageList;
        if (!history) {
          messageList = imResponse.data.messageList;
        } else {
          messageList = [...imResponse.data.messageList, ...this.store.messageList];
        }
        this.currentStore.nextReqMessageID = imResponse.data.nextReqMessageID;
        this.currentStore.isCompleted = imResponse.data.isCompleted;
        pages_TUIKit_TUICore_store_index.store.commit("timStore/setMessageList", messageList);
        resolve(imResponse.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  async getHistoryMessageList() {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          conversationID: this.store.conversation.conversationID,
          nextReqMessageID: this.currentStore.nextReqMessageID,
          count: 15
        };
        let messageList = [];
        if (!this.currentStore.isCompleted) {
          messageList = await this.getMessageList(options, true);
        }
        resolve(messageList);
      } catch (error) {
        reject(error);
      }
    });
  }
  revokeMessage(message) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.revokeMessage(message);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  resendMessage(message) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.resendMessage(message);
        console.log("\u6D88\u606F\u91CD\u53D1\u5B8C\u6210", imResponse);
        this.currentStore.messageList = this.currentStore.messageList.filter((item) => item.ID !== message.ID);
        this.currentStore.messageList.push(imResponse.data.message);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  deleteMessage(messages) {
    return new Promise(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.deleteMessage(messages);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupMemberList(options) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupMemberList(options);
        this.currentStore.userInfo.isGroup = true;
        if (options.offset) {
          this.currentStore.userInfo.list = [...this.currentStore.userInfo.list, ...imResponse.data.memberList];
        } else {
          this.currentStore.userInfo.list = imResponse.data.memberList;
        }
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  getGroupMemberProfile(options) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.getGroupMemberProfile(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
  handleGroupApplication(options) {
    return this.handlePromiseCallback(async (resolve, reject) => {
      try {
        const imResponse = await this.TUICore.tim.handleGroupApplication(options);
        resolve(imResponse);
      } catch (error) {
        reject(error);
      }
    });
  }
}
exports.TUIChatServer = TUIChatServer;
