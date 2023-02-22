"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "fui-input",
  emits: ["input", "update:modelValue", "focus", "blur", "confirm", "click", "keyboardheightchange"],
  options: {
    addGlobalClass: true,
    virtualHost: true
  },
  props: {
    required: {
      type: Boolean,
      default: false
    },
    requiredColor: {
      type: String,
      default: "#FF2B2B"
    },
    label: {
      type: String,
      default: ""
    },
    labelSize: {
      type: [Number, String],
      default: 0
    },
    labelColor: {
      type: String,
      default: "#333"
    },
    labelWidth: {
      type: [Number, String],
      default: 140
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearColor: {
      type: String,
      default: "#CCCCCC"
    },
    focus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: ""
    },
    modelValue: {
      type: [Number, String],
      default: ""
    },
    modelModifiers: {
      default: () => ({})
    },
    number: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    min: {
      type: [Number, String],
      default: "NaN"
    },
    max: {
      type: [Number, String],
      default: "NaN"
    },
    cursorSpacing: {
      type: Number,
      default: 0
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: -1
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: false
    },
    alwaysEmbed: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: "#333"
    },
    inputBorder: {
      type: Boolean,
      default: false
    },
    isFillet: {
      type: Boolean,
      default: false
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    borderTop: {
      type: Boolean,
      default: false
    },
    topLeft: {
      type: [Number, String],
      default: 0
    },
    topRight: {
      type: [Number, String],
      default: 0
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    bottomLeft: {
      type: [Number, String],
      default: 32
    },
    bottomRight: {
      type: [Number, String],
      default: 0
    },
    borderColor: {
      type: String,
      default: "#EEEEEE"
    },
    trim: {
      type: Boolean,
      default: true
    },
    textRight: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Array,
      default() {
        return ["28rpx", "32rpx"];
      }
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    marginTop: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      placeholderStyl: "",
      focused: false,
      val: "",
      attribute: {}
    };
  },
  computed: {
    getStyles() {
      let styles = `margin-top:${this.marginTop}rpx;`;
      if (!this.inputBorder && !this.borderTop && !this.borderBottom && this.radius != -1) {
        styles += `border-radius:${this.radius}rpx;overflow:hidden;`;
      }
      return styles;
    },
    getSize() {
      const size = common_vendor.index.$fui && common_vendor.index.$fui.fuiInput && common_vendor.index.$fui.fuiInput.size || 32;
      return `${this.size || size}rpx`;
    },
    getLabelSize() {
      const labelSize = common_vendor.index.$fui && common_vendor.index.$fui.fuiInput && common_vendor.index.$fui.fuiInput.labelSize || 32;
      return `${this.labelSize || labelSize}rpx`;
    }
  },
  watch: {
    focus(val) {
      this.$nextTick(() => {
        this.focused = val;
      });
    },
    placeholderStyle() {
      this.fieldPlaceholderStyle();
    },
    modelValue(newVal) {
      this.val = newVal;
    },
    value(newVal) {
      this.val = newVal;
    },
    password: {
      handler(val) {
        if (val) {
          this.attribute = {
            password: true
          };
        } else {
          this.attribute = {};
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.value && !this.modelValue) {
      this.val = this.value;
    } else {
      this.val = this.modelValue;
    }
    this.fieldPlaceholderStyle();
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.focused = this.focus;
      }, 120);
    });
  },
  methods: {
    fieldPlaceholderStyle() {
      if (this.placeholderStyle) {
        this.placeholderStyl = this.placeholderStyle;
      } else {
        const _size = common_vendor.index.$fui && common_vendor.index.$fui.fuiInput && common_vendor.index.$fui.fuiInput.size || 32;
        const size = common_vendor.index.upx2px(this.size || _size);
        this.placeholderStyl = `font-size:${size}px`;
      }
    },
    onInput(event) {
      let value = event.detail.value;
      if (this.trim)
        value = this.trimStr(value);
      this.val = value;
      if (this.modelModifiers.number || this.number || this.type === "digit" || this.type === "number") {
        const currentVal = Number(value);
        let eVal = this.type === "digit" ? value : currentVal;
        if (typeof currentVal === "number") {
          const min = Number(this.min);
          const max = Number(this.max);
          if (typeof min === "number" && currentVal < min) {
            eVal = min;
          } else if (typeof max === "number" && max < currentVal) {
            eVal = max;
          }
        }
        value = isNaN(eVal) ? value : eVal;
      }
      this.$nextTick(() => {
        event.detail.value !== "" && (this.val = value);
      });
      const inputValue = event.detail.value !== "" ? value : "";
      this.$emit("input", inputValue);
      this.$emit("update:modelValue", inputValue);
    },
    onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur(event) {
      this.$emit("blur", event);
    },
    onConfirm(e) {
      this.$emit("confirm", e);
    },
    onClear(event) {
      if (this.disabled && !this.readonly)
        return;
      common_vendor.index.hideKeyboard();
      this.val = "";
      this.$emit("input", "");
      this.$emit("update:modelValue", "");
    },
    fieldClick() {
      this.$emit("click", {
        name: this.name
      });
    },
    onKeyboardheightchange(e) {
      this.$emit("keyboardheightchange", e.detail);
    },
    trimStr(str) {
      return str.replace(/^\s+|\s+$/g, "");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.borderTop && !$props.inputBorder
  }, $props.borderTop && !$props.inputBorder ? {
    b: $props.borderColor,
    c: $props.topLeft + "rpx",
    d: $props.topRight + "rpx"
  } : {}, {
    e: $props.required
  }, $props.required ? {
    f: $props.requiredColor
  } : {}, {
    g: $props.label
  }, $props.label ? {
    h: common_vendor.t($props.label),
    i: $options.getLabelSize,
    j: $props.labelColor,
    k: $props.labelWidth + "rpx"
  } : {}, {
    l: $props.textRight ? 1 : "",
    m: $options.getSize,
    n: $props.color,
    o: $props.type,
    p: $props.name,
    q: $data.val,
    r: $props.placeholder,
    s: $props.password,
    t: $data.placeholderStyl,
    v: $props.disabled || $props.readonly,
    w: $props.cursorSpacing,
    x: $props.maxlength,
    y: $data.focused,
    z: $props.confirmType,
    A: $props.confirmHold,
    B: $props.cursor,
    C: $props.selectionStart,
    D: $props.selectionEnd,
    E: $props.adjustPosition,
    F: $props.holdKeyboard,
    G: $props.autoBlur,
    H: $props.alwaysEmbed,
    I: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    J: common_vendor.o((...args) => $options.onBlur && $options.onBlur(...args)),
    K: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    L: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args)),
    M: common_vendor.o((...args) => $options.onKeyboardheightchange && $options.onKeyboardheightchange(...args)),
    N: $props.clearable && $data.val != ""
  }, $props.clearable && $data.val != "" ? {
    O: $props.clearColor,
    P: common_vendor.o((...args) => $options.onClear && $options.onClear(...args))
  } : {}, {
    Q: $props.borderBottom && !$props.inputBorder
  }, $props.borderBottom && !$props.inputBorder ? {
    R: $props.borderColor,
    S: $props.bottomLeft + "rpx",
    T: $props.bottomRight + "rpx"
  } : {}, {
    U: $props.isFillet ? 1 : "",
    V: $props.inputBorder && !$props.isFillet ? 1 : "",
    W: $props.padding[0] || 0,
    X: $props.padding[1] || 0,
    Y: $props.padding[2] || $props.padding[0] || 0,
    Z: $props.padding[3] || $props.padding[1] || 0,
    aa: $props.backgroundColor,
    ab: $props.inputBorder ? 1 : "",
    ac: $props.isFillet ? 1 : "",
    ad: common_vendor.s($options.getStyles),
    ae: common_vendor.o((...args) => $options.fieldClick && $options.fieldClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a23503dd"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/node_modules/firstui-uni/firstui/fui-input/fui-input.vue"]]);
wx.createComponent(Component);
