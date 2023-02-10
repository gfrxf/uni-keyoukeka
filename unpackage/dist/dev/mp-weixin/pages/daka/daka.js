"use strict";
const service_daka = require("../../service/daka.js");
const common_vendor = require("../../common/vendor.js");
require("../../service/index.js");
const _sfc_main = {
  components: {
    zqsSelect
  },
  data() {
    return {
      importUserId: [
        {
          value: "0",
          label: "\u4ECA\u65E5\u4E0D\u62BD\u70DF"
        }
      ],
      clockFlag: "",
      rank: []
    };
  },
  methods: {
    open() {
      this.$refs.calendar.open();
    },
    confirm(e) {
      console.log(e);
    },
    async getdakaImfo() {
      await service_daka.getDakaData();
    }
  },
  onLoad() {
    this.getdakaImfo();
  }
};
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  _easycom_uni_calendar2();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  _easycom_uni_calendar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("calendar", "51a49010-0"),
    b: common_vendor.o($options.confirm),
    c: common_vendor.p({
      insert: false,
      lunar: true,
      ["start-date"]: "2023-2-10",
      ["end-date"]: "2025-2-10"
    }),
    d: common_vendor.o((...args) => $options.open && $options.open(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/daka/daka.vue"]]);
wx.createPage(MiniProgramPage);
