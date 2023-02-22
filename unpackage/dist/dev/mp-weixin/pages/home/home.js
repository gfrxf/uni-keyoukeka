"use strict";
const common_vendor = require("../../common/vendor.js");
const store_home = require("../../store/home.js");
require("../../service/home.js");
require("../../service/index.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_tab_control2 = common_vendor.resolveComponent("tab-control");
  const _easycom_grid_view_item2 = common_vendor.resolveComponent("grid-view-item");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_tab_control2 + _easycom_grid_view_item2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_tab_control = () => "../../components/tab-control/tab-control.js";
const _easycom_grid_view_item = () => "../../components/grid-view-item/grid-view-item.js";
if (!Math) {
  (HomeBanner + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_tab_control + _easycom_grid_view_item)();
}
const HomeBanner = () => "./cpns/home-banner.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const current = common_vendor.ref(0);
    const homeStore = store_home.useHomeStore();
    const {
      mydata,
      alldata,
      isAdd
    } = common_vendor.storeToRefs(homeStore);
    common_vendor.onLoad(() => {
      console.log("home\u6E32\u67D3");
      const openId = common_vendor.index.getStorageSync("openid");
      homeStore.fetchMyData(openId);
      homeStore.fetchAllData();
      common_vendor.index.$on("update", function(data) {
        console.log("\u76D1\u542C\u5230\u4E8B\u4EF6\u6765\u81EA update \uFF0C\u643A\u5E26\u53C2\u6570 msg \u4E3A\uFF1A" + data.msg);
        homeStore.fetchMyData(openId);
      });
    });
    common_vendor.onBeforeUpdate(() => {
    });
    common_vendor.onMounted(() => {
      console.log("update");
      const openId = common_vendor.index.getStorageSync("openid");
      homeStore.fetchMyData(openId);
    });
    function handleTabItemClick(index) {
      current.value = index;
    }
    function handleGridItemClick(itemInfo) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?tagId=" + itemInfo.tagId
      });
    }
    function addDisease() {
      common_vendor.index.navigateTo({
        url: "/pages/add/add?openId"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          column: 2
        }),
        b: common_vendor.o(handleTabItemClick),
        c: common_vendor.p({
          titles: ["\u6211\u7684", "\u5168\u90E8"]
        }),
        d: !common_vendor.unref(isAdd) && !current.value
      }, !common_vendor.unref(isAdd) && !current.value ? {
        e: common_vendor.o(addDisease)
      } : {}, {
        f: !current.value
      }, !current.value ? {
        g: common_vendor.f(common_vendor.unref(mydata), (itemInfo, index, i0) => {
          return {
            a: common_vendor.o(handleGridItemClick, index),
            b: "9e1124bc-9-" + i0 + "," + ("9e1124bc-8-" + i0),
            c: common_vendor.p({
              itemInfo
            }),
            d: "9e1124bc-8-" + i0 + ",9e1124bc-7",
            e: index
          };
        }),
        h: common_vendor.p({
          column: 2,
          square: false,
          borderColor: "#B0EC64"
        })
      } : {}, {
        i: current.value
      }, current.value ? {
        j: common_vendor.f(common_vendor.unref(alldata), (itemInfo, index, i0) => {
          return {
            a: common_vendor.o(handleGridItemClick, index),
            b: "9e1124bc-12-" + i0 + "," + ("9e1124bc-11-" + i0),
            c: common_vendor.p({
              itemInfo
            }),
            d: "9e1124bc-11-" + i0 + ",9e1124bc-10",
            e: index
          };
        }),
        k: common_vendor.p({
          column: 2,
          square: false,
          borderColor: "#B0EC64"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
