"use strict";
const common_vendor = require("../../common/vendor.js");
const store_home = require("../../store/home.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    store_home.useHomeStore();
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
