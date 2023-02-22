"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    messageData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      imageInfo: [],
      imageHeight: 0,
      imageWidth: 0,
      message: {}
    });
    common_vendor.watchEffect(() => {
      const DEFAULT_MAX_SIZE = 155;
      let imageWidth = 0;
      let imageHeight = 0;
      data.message = props.messageData;
      data.imageInfo = props.data.info[1];
      if (data.imageInfo.width >= data.imageInfo.height) {
        imageWidth = DEFAULT_MAX_SIZE;
        imageHeight = DEFAULT_MAX_SIZE * data.imageInfo.height / data.imageInfo.width;
      } else {
        imageWidth = DEFAULT_MAX_SIZE * data.imageInfo.width / data.imageInfo.height;
        imageHeight = DEFAULT_MAX_SIZE;
      }
      data.imageWidth = imageWidth + "px";
      data.imageHeight = imageHeight + "px";
    });
    const handlePreviewImage = () => {
      console.error(props.data.info[0].url, "----linda");
      common_vendor.index.previewImage({
        current: props.data.info[0].url,
        urls: [props.data.info[0].url]
      });
    };
    return {
      ...common_vendor.toRefs(data),
      handlePreviewImage
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.data.info[1].url,
    b: _ctx.imageHeight,
    c: _ctx.imageWidth,
    d: common_vendor.n("content-" + _ctx.message.flow),
    e: common_vendor.o((...args) => _ctx.handlePreviewImage && _ctx.handlePreviewImage(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d71110be"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-elements/message-image.vue"]]);
wx.createComponent(Component);
