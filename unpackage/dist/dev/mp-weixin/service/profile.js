"use strict";
const common_vendor = require("../common/vendor.js");
const service_index = require("./index.js");
function getCode() {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      "provider": "weixin",
      "onlyAuthorize": true,
      success: (res) => {
        console.log(res, "code");
        resolve(res.code);
      },
      fail: function(err) {
      }
    });
  });
}
const getMytoken = (code, avatarUrl, nickName, rawData, signature) => {
  return service_index.DxRequest.post("/login/login", {
    code,
    avatarUrl,
    nickName,
    rawData,
    signature
  });
};
function getUserInfo() {
  return new Promise((reslove, reject) => {
    common_vendor.index.getUserProfile({
      desc: "\u83B7\u53D6\u4F60\u7684\u6635\u79F0\u3001\u5934\u50CF",
      success: (res) => {
        reslove(res);
      },
      fail: function(err) {
      }
    });
  });
}
exports.getCode = getCode;
exports.getMytoken = getMytoken;
exports.getUserInfo = getUserInfo;
