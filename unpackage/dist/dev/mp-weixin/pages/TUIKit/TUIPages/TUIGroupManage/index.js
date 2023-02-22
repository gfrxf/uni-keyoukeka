"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_TUICore_store_index = require("../../TUICore/store/index.js");
require("../../TUICore/store/modules.js");
require("../../TUICore/store/modules/timStore.js");
const TUIGroupManage = () => "./manage-components/manage.js";
const TUIConversation = common_vendor.defineComponent({
  name: "TUIConversation",
  components: {
    TUIGroupManage
  },
  setup(props) {
    const timStore = pages_TUIKit_TUICore_store_index.store.state.timStore;
    const data = common_vendor.reactive({
      conversation: common_vendor.computed$1(() => timStore.conversation),
      userInfo: {
        isGroup: false,
        list: []
      }
    });
    return {
      ...common_vendor.toRefs(data)
    };
  }
});
if (!Array) {
  const _component_TUIGroupManage = common_vendor.resolveComponent("TUIGroupManage");
  _component_TUIGroupManage();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      conversation: _ctx.conversation,
      userInfo: _ctx.userInfo
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(TUIConversation, [["render", _sfc_render], ["__scopeId", "data-v-b0b4658b"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/index.vue"]]);
wx.createPage(MiniProgramPage);
