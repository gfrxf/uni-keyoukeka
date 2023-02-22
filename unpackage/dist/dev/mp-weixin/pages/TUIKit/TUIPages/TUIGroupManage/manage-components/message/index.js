"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "TUIMessage",
  props: {
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 3e3
    },
    repeatNum: {
      type: Number,
      default: 1
    },
    id: {
      type: String,
      default: ""
    },
    onClose: {
      type: Function,
      required: false
    },
    offset: {
      type: Number,
      default: 20
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const visible = common_vendor.ref(false);
    let stopTimer = void 0;
    function startTimer() {
      if (props.duration > 0)
        ;
    }
    function clearTimer() {
      stopTimer == null ? void 0 : stopTimer();
    }
    common_vendor.watch(
      () => props.repeatNum,
      () => {
        clearTimer();
        startTimer();
      }
    );
    const customStyle = common_vendor.computed$1(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex
    }));
    common_vendor.onMounted(() => {
      startTimer();
      visible.value = true;
    });
    return {
      visible,
      customStyle
    };
  }
});
if (!Array) {
  const _component_transition = common_vendor.resolveComponent("transition");
  _component_transition();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.message),
    b: common_vendor.s(_ctx.customStyle),
    c: _ctx.visible,
    d: common_vendor.o(_ctx.onClose),
    e: common_vendor.o(($event) => _ctx.$emit("destroy")),
    f: common_vendor.p({
      name: "fade"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8cf5b8e6"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/manage-components/message/index.vue"]]);
wx.createComponent(Component);
