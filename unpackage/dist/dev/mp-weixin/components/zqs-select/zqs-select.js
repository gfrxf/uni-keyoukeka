"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "zqsSelect",
  data() {
    return {
      isShowModal: false,
      searchInput: "",
      options: []
    };
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String, Array, Object],
      default: null
    },
    placeholder: {
      default: "",
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    list: {
      default: () => [],
      type: Array
    },
    valueKey: {
      default: "value",
      type: String
    },
    labelKey: {
      default: "label",
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    clearable: {
      default: false,
      type: Boolean
    },
    emptyText: {
      default: "\u91CD\u7F6E",
      type: String
    },
    title: {
      default: "\u9009\u62E9\u5185\u5BB9",
      type: String
    },
    confirmText: {
      default: "\u786E\u5B9A",
      type: String
    },
    color: {
      default: "#000000",
      type: String
    },
    selectColor: {
      default: "#0081ff",
      type: String
    },
    bgColor: {
      default: "#ffffff",
      type: String
    },
    selectBgColor: {
      default: "#FFFFFF",
      type: String
    },
    valueType: {
      default: "single",
      type: String
    },
    showSearchBtn: {
      default: true,
      type: Boolean
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  emits: ["openDeepScroll", "closeDeepScroll"],
  computed: {
    _value: {
      get() {
        return this.get_value(this.value);
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  created() {
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchInput);
    },
    get_value(val) {
      if (val || val === 0) {
        if (Array.isArray(val)) {
          let chooseAttr = [];
          val.forEach((item) => {
            let choose = this.list.find((temp) => {
              let val_val = this.getValueKeyValue(temp);
              return item === val_val;
            });
            if (choose) {
              chooseAttr.push(choose);
            }
          });
          let values = "";
          if (chooseAttr.length > 0) {
            values = chooseAttr.map((temp) => this.getLabelKeyValue(temp)).join(",");
          }
          return values;
        } else {
          let choose = this.list.find((temp) => {
            let val_val = this.getValueKeyValue(temp);
            return val === val_val;
          });
          if (choose) {
            return this.getLabelKeyValue(choose);
          } else {
            return val;
          }
        }
      } else {
        return "";
      }
    },
    select(item) {
      let val = this.getValueKeyValue(item);
      if (this.multiple) {
        let _value = this.value;
        let index = _value ? _value.indexOf(val) : -1;
        if (index != -1) {
          _value.splice(index, 1);
          this.options.splice(index, 1);
          this.$emit("input", _value);
        } else {
          _value.push(val);
          this.options.push(item);
          this.$emit("input", _value);
        }
        this.$emit("change", item);
      } else {
        let label = this.getLabelKeyValue(item);
        if (this._value) {
          if (label.indexOf(this._value) !== -1) {
            this.$emit("input", "");
          } else {
            this.$emit("input", val);
          }
        } else {
          this.$emit("input", val);
        }
        this.$emit("change", item);
        this.hideModal();
      }
    },
    valueIndexOf(item) {
      let val = this.getValueKeyValue(item);
      if (Array.isArray(this.value)) {
        return this.value.indexOf(val) != -1;
      } else {
        return this.value === val;
      }
    },
    getLabelKeyValue(item) {
      return item[this.labelKey];
    },
    getValueKeyValue(item) {
      return item[this.valueKey];
    },
    empty() {
      if (this.multiple) {
        this.$emit("change", []);
        this.$emit("input", []);
      } else {
        this.$emit("change", "");
        this.$emit("input", "");
      }
    },
    confirmClick() {
      if (this.valueType === "all") {
        this.$emit("confirm", this.options);
      } else {
        this.$emit("confirm", this._value);
      }
      this.hideModal();
    },
    showModal() {
      if (!this.disabled) {
        this.isShowModal = true;
        this.$emit("openDeepScroll");
      }
    },
    hideModal() {
      this.isShowModal = false;
      this.$emit("closeDeepScroll");
    }
  },
  watch: {
    searchInput(val) {
      if (!this.$props.showSearchBtn)
        this.$emit("search", val);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s($props.disabled ? "color:#c0c4cc" : ""),
    b: $props.placeholder,
    c: $options._value,
    d: common_vendor.o(($event) => $options._value = $event.detail.value),
    e: $props.showArrow && !$options._value
  }, $props.showArrow && !$options._value ? {
    f: common_assets._imports_0$2
  } : {}, {
    g: common_vendor.o((...args) => $options.showModal && $options.showModal(...args)),
    h: common_vendor.t($props.title),
    i: $props.showSearch
  }, $props.showSearch ? common_vendor.e({
    j: $data.searchInput,
    k: common_vendor.o(($event) => $data.searchInput = $event.detail.value),
    l: $props.showSearchBtn
  }, $props.showSearchBtn ? {
    m: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args))
  } : {}) : {}, {
    n: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t($options.getLabelKeyValue(item)),
        b: $options.valueIndexOf(item)
      }, $options.valueIndexOf(item) ? {} : {}, {
        c: index,
        d: common_vendor.s($options.valueIndexOf(item) ? "color:" + $props.selectColor + ";background-color:" + $props.selectBgColor + ";" : "color:" + $props.color + ";"),
        e: common_vendor.o(($event) => $options.select(item), index)
      });
    }),
    o: common_vendor.t($props.emptyText),
    p: common_vendor.o((...args) => $options.empty && $options.empty(...args)),
    q: common_vendor.t($props.confirmText),
    r: common_vendor.o((...args) => $options.confirmClick && $options.confirmClick(...args)),
    s: common_vendor.o(() => {
    }),
    t: $props.bgColor,
    v: common_vendor.n($data.isShowModal ? "show" : ""),
    w: common_vendor.o((...args) => $options.hideModal && $options.hideModal(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6f57d348"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/components/zqs-select/zqs-select.vue"]]);
wx.createComponent(Component);
