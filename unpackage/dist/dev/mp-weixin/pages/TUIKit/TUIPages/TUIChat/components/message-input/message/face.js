"use strict";
const common_vendor = require("../../../../../../../common/vendor.js");
const pages_TUIKit_utils_emojiMap = require("../../../../../utils/emojiMap.js");
const Face = common_vendor.defineComponent({
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    isMute: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, ctx) {
    const data = common_vendor.reactive({
      emojiUrl: pages_TUIKit_utils_emojiMap.emojiUrl,
      emojiMap: pages_TUIKit_utils_emojiMap.emojiMap,
      emojiName: pages_TUIKit_utils_emojiMap.emojiName,
      faceUrl: pages_TUIKit_utils_emojiMap.faceUrl,
      bigEmojiList: pages_TUIKit_utils_emojiMap.bigEmojiList,
      show: false,
      currentIndex: 0,
      isMute: false
    });
    const dialog = common_vendor.ref();
    common_vendor.watchEffect(() => {
      data.show = props.show;
      data.isMute = props.isMute;
    });
    const toggleShow = () => {
      if (!data.isMute) {
        data.show = !data.show;
      }
      if (!data.show) {
        selectFace(0);
      }
    };
    const select = async (item, index) => {
      const options = {
        name: item
      };
      if (data.currentIndex === 0) {
        options.type = "emo";
        options.url = pages_TUIKit_utils_emojiMap.emojiUrl + pages_TUIKit_utils_emojiMap.emojiMap[item];
        options.template = `<image src="${pages_TUIKit_utils_emojiMap.emojiUrl + pages_TUIKit_utils_emojiMap.emojiMap[item]}"></image>`;
        return ctx.emit("send", options);
      }
      try {
        await common_vendor.index.$TUIKit.TUIChatServer.sendFaceMessage({
          index,
          data: item
        });
      } catch (error) {
      }
    };
    const list = common_vendor.computed$1(() => {
      const emjiList = [data.emojiName];
      for (let i = 0; i < data.bigEmojiList.length; i++) {
        emjiList.push(data.bigEmojiList[i].list);
      }
      return emjiList;
    });
    const selectFace = (index) => {
      data.currentIndex = index;
    };
    const handleSendEmoji = () => {
      return ctx.emit("handleSendEmoji");
    };
    return {
      ...common_vendor.toRefs(data),
      toggleShow,
      select,
      selectFace,
      list,
      dialog,
      handleSendEmoji
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => _ctx.toggleShow && _ctx.toggleShow(...args)),
    b: common_vendor.f(_ctx.list, (item, index, i0) => {
      return common_vendor.e({
        a: _ctx.currentIndex === index
      }, _ctx.currentIndex === index ? {
        b: common_vendor.f(item, (childrenItem, childrenIndex, i1) => {
          return common_vendor.e(index === 0 ? {
            a: _ctx.emojiUrl + _ctx.emojiMap[childrenItem]
          } : {
            b: _ctx.faceUrl + childrenItem + "@2x.png"
          }, {
            c: childrenIndex,
            d: common_vendor.o(($event) => _ctx.select(childrenItem, childrenIndex), childrenIndex)
          });
        }),
        c: index === 0
      } : {}, {
        d: index
      });
    }),
    c: common_vendor.o(($event) => _ctx.selectFace(0)),
    d: common_vendor.f(_ctx.bigEmojiList, (item, index, i0) => {
      return {
        a: _ctx.faceUrl + item.icon + "@2x.png",
        b: index,
        c: common_vendor.o(($event) => _ctx.selectFace(index + 1), index)
      };
    }),
    e: common_vendor.o((...args) => _ctx.handleSendEmoji && _ctx.handleSendEmoji(...args)),
    f: _ctx.show
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(Face, [["render", _sfc_render], ["__scopeId", "data-v-cc73b204"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIChat/components/message-input/message/face.vue"]]);
wx.createComponent(Component);
