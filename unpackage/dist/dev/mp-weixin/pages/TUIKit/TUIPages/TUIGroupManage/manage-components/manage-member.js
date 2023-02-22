"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ManageMember = common_vendor.defineComponent({
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: () => 0
    },
    isShowDel: {
      type: Boolean,
      default: () => false
    },
    self: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const types = common_vendor.TIM$1.TYPES;
    const data = common_vendor.reactive({
      total: 0,
      list: [],
      isShowDel: false,
      self: {}
    });
    common_vendor.watchEffect(() => {
      data.total = props.total;
      data.isShowDel = props.isShowDel;
      data.list = props.list;
      data.self = props.self;
    });
    const handleRoleName = (item) => {
      let name = "";
      switch (item == null ? void 0 : item.role) {
        case types.GRP_MBR_ROLE_ADMIN:
          name = "\u7BA1\u7406\u5458";
          break;
        case types.GRP_MBR_ROLE_OWNER:
          name = "\u7FA4\u4E3B";
      }
      if (name) {
        name = name;
      }
      if (item.userID === data.self.userID) {
        name += "\u6211";
      }
      return name;
    };
    const getMore = () => {
      ctx.emit("more");
    };
    const submit = (item) => {
      ctx.emit("del", [item]);
    };
    return {
      ...common_vendor.toRefs(data),
      getMore,
      submit,
      handleRoleName
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(_ctx.list, (item, index, i0) => {
      return common_vendor.e({
        a: (item == null ? void 0 : item.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png",
        b: common_vendor.t((item == null ? void 0 : item.nick) || (item == null ? void 0 : item.userID)),
        c: common_vendor.t(_ctx.handleRoleName(item)),
        d: item.role !== "Owner" && _ctx.isShowDel
      }, item.role !== "Owner" && _ctx.isShowDel ? {
        e: common_vendor.o(($event) => _ctx.submit(item), index)
      } : {}, {
        f: index
      });
    }),
    b: _ctx.list.length < _ctx.total
  }, _ctx.list.length < _ctx.total ? {
    c: common_vendor.o((...args) => _ctx.getMore && _ctx.getMore(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(ManageMember, [["render", _sfc_render], ["__scopeId", "data-v-e67e05e1"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/manage-components/manage-member.vue"]]);
wx.createComponent(Component);
