"use strict";
const service_index = require("./index.js");
const getDakaData = () => {
  return service_index.DxRequest.get("/user/clockIndex", {});
};
const daka = () => {
  return service_index.DxRequest.post("/user/clock", {});
};
exports.daka = daka;
exports.getDakaData = getDakaData;
