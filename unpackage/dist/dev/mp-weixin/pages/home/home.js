"use strict";
const common_vendor = require("../../common/vendor.js");
const store_home = require("../../store/home.js");
if (!Array) {
  const _easycom_tab_control2 = common_vendor.resolveComponent("tab-control");
  _easycom_tab_control2();
}
const _easycom_tab_control = () => "../../components/tab-control/tab-control.js";
if (!Math) {
  _easycom_tab_control();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    store_home.useHomeStore();
    common_vendor.onLoad(() => {
    });
    function handleTabItemClick(index) {
      console.log(index);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleTabItemClick),
        b: common_vendor.p({
          titles: ["\u6211\u7684", "\u5168\u90E8"]
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
