"use strict";
const common_vendor = require("../../common/vendor.js");
const service_home = require("../../service/home.js");
require("../../service/index.js");
const _sfc_main = {
  data() {
    return {
      hobby: [
        {
          text: "\u611F\u67D3\u6027\u5FC3\u5185\u819C\u708E",
          value: 1
        },
        {
          text: "\u9AD8\u8840\u538B",
          value: 2
        },
        {
          text: "\u9AD8\u8102\u8840\u75C7",
          value: 3
        },
        {
          text: "\u51A0\u5FC3\u75C5",
          value: 4
        },
        {
          text: "\u6162\u6027\u5FC3\u5305\u708E",
          value: 5
        },
        {
          text: "\u6162\u6027\u5FC3\u529B\u8870\u7AED",
          value: 6
        },
        {
          text: "\u5FC3\u808C\u75BE\u75C5",
          value: 7
        },
        {
          text: "\u5FC3\u5F8B\u5931\u5E38",
          value: 8
        }
      ],
      checkbox1: []
    };
  },
  methods: {
    async submitHandle() {
      console.log(this.checkbox1, "checkbox1");
      const arg = this.checkbox1.join(",");
      const argumet = JSON.stringify({
        tagId: arg
      });
      console.log(argumet, "argumet");
      const res = await service_home.addDisease(argumet);
      console.log(res, "res");
      if (res.success === true) {
        common_vendor.index.showToast({
          title: "\u6DFB\u52A0\u6210\u529F",
          duration: 2e3
        });
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.showToast({
          title: "\u5931\u8D25\u8BF7\u91CD\u8BD5",
          duration: 2e3
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_data_checkbox2 + _easycom_uni_section2 + _easycom_uni_card2)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_data_checkbox + _easycom_uni_section + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(JSON.stringify($data.checkbox1)),
    b: common_vendor.o(($event) => $data.checkbox1 = $event),
    c: common_vendor.p({
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox1
    }),
    d: common_vendor.p({
      title: "\u591A\u9009",
      subTitle: "\u60A8\u53EF\u4EE5\u9009\u62E9\u60A8\u611F\u5174\u8DA3\u7684\u591A\u79CD\u75BE\u75C5",
      type: "line"
    }),
    e: common_vendor.o((...args) => $options.submitHandle && $options.submitHandle(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/add/add.vue"]]);
wx.createPage(MiniProgramPage);
