"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    listItems: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  setup() {
    const formatPrice = common_vendor.computed$1(() => {
      return (item) => {
        return item.decimal ? item.price.toFixed(item.decimal) : item.price;
      };
    });
    return {
      formatPrice
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.listItems, (item, index, i0) => {
      return {
        a: common_vendor.t($setup.formatPrice(item)),
        b: common_vendor.t(item.unit),
        c: common_vendor.t(item.name),
        d: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/profile/cpns/grid-view.vue"]]);
wx.createComponent(Component);
