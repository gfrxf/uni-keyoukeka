"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "grid-view-item",
  props: {
    itemInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["itemClick"],
  setup(__props, { emit }) {
    const props = __props;
    function handleItemClick() {
      emit("itemClick", props.itemInfo);
    }
    return (_ctx, _cache) => {
      return {
        a: __props.itemInfo.img,
        b: common_vendor.t(__props.itemInfo.title),
        c: common_assets._imports_0,
        d: common_vendor.t(__props.itemInfo.collectTimes),
        e: common_vendor.o(handleItemClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/components/grid-view-item/grid-view-item.vue"]]);
wx.createComponent(Component);
