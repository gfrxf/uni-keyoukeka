"use strict";
const common_vendor = require("../../common/vendor.js");
const store_home = require("../../store/home.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (HomeBanner + _easycom_uni_grid_item + _easycom_uni_grid)();
}
const HomeBanner = () => "./cpns/home-banner.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    store_home.useHomeStore();
    common_vendor.onLoad(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          column: 2
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
