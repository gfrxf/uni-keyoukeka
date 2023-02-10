"use strict";
const service_index = require("./index.js");
const getDakaData = () => {
  return service_index.DxRequest.get("/user/clockIndex", {});
};
exports.getDakaData = getDakaData;
