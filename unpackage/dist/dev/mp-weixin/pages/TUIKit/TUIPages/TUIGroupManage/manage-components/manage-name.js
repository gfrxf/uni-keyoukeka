"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const common_assets = require("../../../../../common/assets.js");
const manageName = common_vendor.defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const TUIGroupServer = common_vendor.index.$TUIKit.TUIGroupServer;
    const data = common_vendor.reactive({
      groupProfile: {},
      input: "",
      isEdit: false
    });
    common_vendor.watchEffect(() => {
      data.groupProfile = props.data;
      data.input = data.groupProfile.name;
    });
    const updateProfile = async () => {
      if (data.input && data.input !== data.groupProfile.name) {
        const params = {
          groupID: data.groupProfile.groupID,
          name: data.input
        };
        TUIGroupServer.updateGroupProfile(params).then((res) => {
        }).catch((err) => {
        });
        data.groupProfile.name = data.input;
        data.input = "";
      }
      data.isEdit = !data.isEdit;
    };
    return {
      ...common_vendor.toRefs(data),
      updateProfile
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isEdit
  }, _ctx.isEdit ? {
    b: common_vendor.o((...args) => _ctx.updateProfile && _ctx.updateProfile(...args)),
    c: _ctx.input,
    d: common_vendor.o(($event) => _ctx.input = $event.detail.value)
  } : {
    e: common_vendor.t(_ctx.groupProfile.name),
    f: common_assets._imports_0$12,
    g: common_vendor.o(($event) => _ctx.isEdit = !_ctx.isEdit)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(manageName, [["render", _sfc_render], ["__scopeId", "data-v-cf27cfd0"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/manage-components/manage-name.vue"]]);
wx.createComponent(Component);
