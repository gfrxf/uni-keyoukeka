"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ManageNotification = common_vendor.defineComponent({
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
    const data = common_vendor.reactive({
      groupProfile: {},
      input: "",
      isEdit: false
    });
    common_vendor.watchEffect(() => {
      data.groupProfile = props.data;
      data.input = data.groupProfile.notification;
    });
    const updateProfile = async () => {
      if (data.input && data.input !== data.groupProfile.notification) {
        ctx.emit("update", { key: "notification", value: data.input });
        data.groupProfile.notification = data.input;
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
  } : common_vendor.e({
    e: !_ctx.groupProfile.notification
  }, !_ctx.groupProfile.notification ? {} : {
    f: common_vendor.t(_ctx.groupProfile.notification)
  }), {
    g: _ctx.isAuth
  }, _ctx.isAuth ? common_vendor.e({
    h: _ctx.isEdit
  }, _ctx.isEdit ? {
    i: common_vendor.o((...args) => _ctx.updateProfile && _ctx.updateProfile(...args))
  } : {
    j: common_vendor.o(($event) => _ctx.isEdit = !_ctx.isEdit)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(ManageNotification, [["render", _sfc_render], ["__scopeId", "data-v-8122fc81"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/manage-components/manage-notification.vue"]]);
wx.createComponent(Component);
