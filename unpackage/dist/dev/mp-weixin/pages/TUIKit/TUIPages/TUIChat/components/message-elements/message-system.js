"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const pages_TUIKit_utils_untis = require("../../../../utils/untis.js");
const pages_TUIKit_utils_date = require("../../../../utils/date.js");
require("../../../../utils/decodeText.js");
require("../../../../utils/emojiMap.js");
const MessageSystem = common_vendor.defineComponent({
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    types: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      messageList: [],
      types: {}
    });
    common_vendor.watchEffect(() => {
      data.messageList = props.data;
      data.types = props.types;
    });
    const handleApplication = () => {
      common_vendor.index.showActionSheet({
        itemList: ["\u540C\u610F", "\u62D2\u7EDD"],
        success: (res) => {
          const option = {
            handleAction: "Agree",
            handleMessage: "\u6B22\u8FCE\u8FDB\u7FA4",
            message: this.message
          };
          if (res.tapIndex === 1) {
            option.handleAction = "Reject";
            option.handleMessage = "\u62D2\u7EDD\u7533\u8BF7";
          }
          common_vendor.index.$TUIKit.tim.handleGroupApplication(option).then(() => {
            common_vendor.index.showToast({
              title: option.handleAction === "Agree" ? "\u5DF2\u540C\u610F\u7533\u8BF7" : "\u5DF2\u62D2\u7EDD\u7533\u8BF7"
            });
          }).catch((error) => {
            common_vendor.index.showToast({
              title: error.message || "\u5904\u7406\u5931\u8D25",
              icon: "none"
            });
          });
        }
      });
    };
    return {
      ...common_vendor.toRefs(data),
      translateGroupSystemNotice: pages_TUIKit_utils_untis.translateGroupSystemNotice,
      handleApplication,
      caculateTimeago: pages_TUIKit_utils_date.caculateTimeago
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.messageList, (item, index, i0) => {
      return common_vendor.e({
        a: item.payload.operationType === 1
      }, item.payload.operationType === 1 ? {
        b: common_vendor.t(_ctx.caculateTimeago(item.time * 1e3)),
        c: common_vendor.t(_ctx.translateGroupSystemNotice(item)),
        d: common_vendor.o((...args) => _ctx.handleClick && _ctx.handleClick(...args), index)
      } : {
        e: common_vendor.t(_ctx.caculateTimeago(item.time * 1e3)),
        f: common_vendor.t(_ctx.translateGroupSystemNotice(item))
      }, {
        g: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(MessageSystem, [["render", _sfc_render], ["__scopeId", "data-v-041bacfa"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-system.vue"]]);
wx.createComponent(Component);
