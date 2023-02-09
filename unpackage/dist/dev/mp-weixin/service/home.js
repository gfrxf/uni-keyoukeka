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
const getDetails = (id) => {
  return service_index.DxRequest.get("/article/detail", {
    id
  });
};
exports.getAllData = getAllData;
exports.getDetails = getDetails;
exports.getMyData = getMyData;
