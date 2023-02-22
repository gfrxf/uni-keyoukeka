"use strict";
const state = {
  isLogin: false,
  conversationList: [],
  messageList: [],
  conversation: {},
  conversationID: "",
  scrollTop: 0
};
const timStore = {
  namespaced: true,
  state,
  getters: {
    loginInfo: (state2) => {
      return `${state2.isLogin ? "\u5DF2\u767B\u9646" : "\u672A\u767B\u9646"}`;
    },
    userInfo: (state2) => {
      return state2.userInfo;
    }
  },
  mutations: {
    setscrollTop(state2, payload) {
      state2.scrollTop = payload;
    },
    setConversationList(state2, payload) {
      state2.conversationList = payload;
    },
    setConversation(state2, payload) {
      state2.conversation = payload;
    },
    setConversationID(state2, payload) {
      state2.conversationID = payload;
    },
    resetConversationID(state2) {
      state2.conversationID = "";
    },
    setMessageList(state2, payload) {
      state2.messageList = payload;
    },
    resetChat(state2) {
      state2.messageList = [];
    },
    setLoginStatus(state2, payload) {
      state2.isLogin = payload || false;
    },
    setUserInfo(state2, payload) {
      state2.userInfo = payload || {};
    }
  },
  actions: {}
};
exports.timStore = timStore;
