"use strict";
const service_index = require("./index.js");
const changenickname = (chatName) => {
  console.log(chatName, "chatName.");
  return service_index.DxRequest.post("/user/editChatName", chatName);
};
exports.changenickname = changenickname;
