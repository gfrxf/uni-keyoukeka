"use strict";
const service_index = require("./index.js");
const getMyData = (openId) => {
  return service_index.DxRequest.get("/article/list", {
    openId
  });
};
const getAllData = () => {
  return service_index.DxRequest.get("/article/list", {});
};
exports.getAllData = getAllData;
exports.getMyData = getMyData;
