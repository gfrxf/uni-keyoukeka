"use strict";
const service_daka = require("../../service/daka.js");
const common_vendor = require("../../common/vendor.js");
require("../../service/index.js");
const fuiRadioGroup = () => "../../components/firstui/fui-radio-group/fui-radio-group.js";
const fuiRadio = () => "../../components/firstui/fui-radio/fui-radio.js";
const _sfc_main = {
  components: {
    fuiRadioGroup,
    fuiRadio
  },
  data() {
    return {
      val: "1",
      radioItems: [
        {
          name: "\u5C0F\u4E8E18\u5C81",
          value: "1",
          checked: true
        },
        {
          name: "18~28\u5C81",
          value: "2",
          checked: false
        },
        {
          name: "29~40\u5C81",
          value: "3",
          checked: false
        }
      ]
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
  const _easycom_fui_radio2 = common_vendor.resolveComponent("fui-radio");
  const _easycom_fui_list_cell2 = common_vendor.resolveComponent("fui-list-cell");
  const _easycom_fui_label2 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_radio_group2 = common_vendor.resolveComponent("fui-radio-group");
  (_easycom_uni_calendar2 + _easycom_fui_radio2 + _easycom_fui_list_cell2 + _easycom_fui_label2 + _easycom_fui_radio_group2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_fui_radio = () => "../../node-modules/firstui-uni/firstui/fui-radio/fui-radio.js";
const _easycom_fui_list_cell = () => "../../node-modules/firstui-uni/firstui/fui-list-cell/fui-list-cell.js";
const _easycom_fui_label = () => "../../node-modules/firstui-uni/firstui/fui-label/fui-label.js";
const _easycom_fui_radio_group = () => "../../node-modules/firstui-uni/firstui/fui-radio-group/fui-radio-group.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_fui_radio + _easycom_fui_list_cell + _easycom_fui_label + _easycom_fui_radio_group)();
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
    d: common_vendor.o((...args) => $options.open && $options.open(...args)),
    e: common_vendor.f($data.radioItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "51a49010-4-" + i0 + "," + ("51a49010-3-" + i0),
        c: common_vendor.p({
          checked: item.checked,
          value: item.value
        }),
        d: "51a49010-3-" + i0 + "," + ("51a49010-2-" + i0),
        e: index,
        f: "51a49010-2-" + i0 + ",51a49010-1"
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/daka/daka.vue"]]);
wx.createPage(MiniProgramPage);
