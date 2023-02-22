"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const UserInfo = () => "./cpns/user-info.js";
const GridView = () => "./cpns/grid-view.js";
const ListView = () => "./cpns/list-view.js";
const _sfc_main = {
  components: {
    UserInfo,
    GridView,
    ListView
  },
  setup() {
    const gridItemDatas = common_vendor.ref([
      {
        price: 0,
        decimal: 0,
        unit: "\u7EA7",
        name: "\u6211\u7684\u7B49\u7EA7"
      },
      {
        price: 0,
        unit: "\u5206",
        name: "\u6211\u7684\u79EF\u5206"
      }
    ]);
    const orderList = [
      { icon: common_assets.messagePNG, iconColor: "#ff8198", info: "\u6211\u7684\u6D88\u606F" },
      { icon: common_assets.vipPNG, iconColor: "#ff8198", info: "\u6211\u7684\u6536\u85CF" },
      { icon: common_assets.appPNG, iconColor: "#fc7b53", info: "\u79EF\u5206\u5546\u57CE" }
    ];
    const serviceList = [];
    return {
      gridItemDatas,
      orderList,
      serviceList
    };
  }
};
if (!Array) {
  const _component_user_info = common_vendor.resolveComponent("user-info");
  const _component_grid_view = common_vendor.resolveComponent("grid-view");
  const _component_list_view = common_vendor.resolveComponent("list-view");
  (_component_user_info + _component_grid_view + _component_list_view)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      listItems: $setup.gridItemDatas
    }),
    b: common_vendor.p({
      listItems: $setup.orderList
    }),
    c: common_vendor.p({
      listItems: $setup.serviceList
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
