"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  props: {
    rank: {
      type: Array,
      default: [],
      required: true
    }
  },
  data() {
    return {
      arr: []
    };
  },
  onLoad() {
    console.log(2222);
  },
  mounted() {
    console.log(this.$props, "arr");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.rank, (item, index, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.nickName),
        c: common_vendor.t(item.score),
        d: common_vendor.n(index == 0 ? "item1" : ""),
        e: common_vendor.n(index == 1 ? "item1" : ""),
        f: common_vendor.n(index === 2 ? "item3" : ""),
        g: index
      };
    }),
    b: common_assets._imports_0$2,
    c: common_assets._imports_1$1,
    d: common_assets._imports_2$1
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/daka/cpns/headItem.vue"]]);
wx.createComponent(Component);
