"use strict";
const common_vendor = require("../../common/vendor.js");
const service_daka = require("../../service/daka.js");
require("../../service/index.js");
const fuiCheckboxGroup = () => "../../components/firstui/fui-checkbox-group/fui-checkbox-group.js";
const fuiCheckbox = () => "../../components/firstui/fui-checkbox/fui-checkbox.js";
const fuiButton = () => "../../components/firstui/fui-button/fui-button.js";
const headItem = () => "./cpns/headItem.js";
const _sfc_main = {
  components: {
    fuiCheckboxGroup,
    fuiCheckbox,
    fuiButton,
    headItem
  },
  data() {
    return {
      val: "1",
      checkboxItems: [],
      clockFlag: false,
      msg: "\u9009\u597D\u4E86\u6253\u5361",
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
      var _a;
      const res = await service_daka.getDakaData();
      this.checkboxItems = res.data.clockType;
      this.clockFlag = res.data.clockFlag;
      this.rank = (_a = res.data.rank) == null ? void 0 : _a.slice(0, 5);
      console.log(this.rank, "rank");
      if (res.data.clockFlag === true) {
        this.msg = "\u4ECA\u65E5\u5DF2\u6253\u5361";
      }
    },
    async handleClick() {
      const res = await service_daka.daka();
      if (res.success === true) {
        common_vendor.index.showToast({
          title: "\u6210\u529F\u83B7\u5F975\u79EF\u5206",
          duration: 2e3
        });
        this.getdakaImfo();
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          duration: 2e3
        });
      }
    }
  },
  onLoad() {
    this.getdakaImfo();
  }
};
if (!Array) {
  const _component_head_item = common_vendor.resolveComponent("head-item");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_fui_checkbox2 = common_vendor.resolveComponent("fui-checkbox");
  const _easycom_fui_list_cell2 = common_vendor.resolveComponent("fui-list-cell");
  const _easycom_fui_label2 = common_vendor.resolveComponent("fui-label");
  const _easycom_fui_checkbox_group2 = common_vendor.resolveComponent("fui-checkbox-group");
  const _easycom_fui_button2 = common_vendor.resolveComponent("fui-button");
  (_component_head_item + _easycom_uni_calendar2 + _easycom_fui_checkbox2 + _easycom_fui_list_cell2 + _easycom_fui_label2 + _easycom_fui_checkbox_group2 + _easycom_fui_button2)();
}
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_fui_checkbox = () => "../../node-modules/firstui-uni/firstui/fui-checkbox/fui-checkbox.js";
const _easycom_fui_list_cell = () => "../../node-modules/firstui-uni/firstui/fui-list-cell/fui-list-cell.js";
const _easycom_fui_label = () => "../../node-modules/firstui-uni/firstui/fui-label/fui-label.js";
const _easycom_fui_checkbox_group = () => "../../node-modules/firstui-uni/firstui/fui-checkbox-group/fui-checkbox-group.js";
const _easycom_fui_button = () => "../../node-modules/firstui-uni/firstui/fui-button/fui-button.js";
if (!Math) {
  (_easycom_uni_calendar + _easycom_fui_checkbox + _easycom_fui_list_cell + _easycom_fui_label + _easycom_fui_checkbox_group + _easycom_fui_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      rank: $data.rank
    }),
    b: common_vendor.sr("calendar", "51a49010-1"),
    c: common_vendor.o($options.confirm),
    d: common_vendor.p({
      insert: false,
      lunar: true,
      ["start-date"]: "2023-2-10",
      ["end-date"]: "2025-2-10"
    }),
    e: common_vendor.o((...args) => $options.open && $options.open(...args)),
    f: common_vendor.f($data.checkboxItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.clockTypeDetail),
        b: "51a49010-5-" + i0 + "," + ("51a49010-4-" + i0),
        c: common_vendor.p({
          checked: item.checked,
          color: "#B0EC64",
          value: item.clockTypeId
        }),
        d: "51a49010-4-" + i0 + "," + ("51a49010-3-" + i0),
        e: index,
        f: "51a49010-3-" + i0 + ",51a49010-2"
      };
    }),
    g: common_vendor.o($options.handleClick),
    h: common_vendor.p({
      disabled: $data.clockFlag,
      type: "success",
      text: $data.msg
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/daka/daka.vue"]]);
wx.createPage(MiniProgramPage);
