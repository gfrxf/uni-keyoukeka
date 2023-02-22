"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const common_assets = require("../../../../../common/assets.js");
const ManageName = () => "./manage-name.js";
const ManageNotification = () => "./manage-notification.js";
const ManageMember = () => "./manage-member.js";
const TUIMessage = () => "./message/index.js";
const TUIGroupManage = common_vendor.defineComponent({
  components: {
    ManageName,
    ManageNotification,
    ManageMember,
    TUIMessage
  },
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        isGroup: false,
        list: []
      })
    },
    conversation: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const types = common_vendor.index.$TUIKit.TIM.TYPES;
    const TUIGroupServer = common_vendor.index.$TUIKit.TUIGroupServer;
    const data = common_vendor.reactive({
      conversation: {},
      userInfo: {
        isGroup: false,
        list: []
      },
      isShowMuteTimeInput: false,
      editLableName: "",
      currentTab: "",
      transferType: "",
      isSearch: true,
      isRadio: false,
      transferList: [],
      selectedList: [],
      isMuteTime: false,
      show: false,
      typeName: {
        [types.GRP_WORK]: "\u597D\u53CB\u5DE5\u4F5C\u7FA4",
        [types.GRP_PUBLIC]: "\u964C\u751F\u4EBA\u793E\u4EA4\u7FA4",
        [types.GRP_MEETING]: "\u4E34\u65F6\u4F1A\u8BAE\u7FA4",
        [types.GRP_AVCHATROOM]: "\u76F4\u64AD\u7FA4",
        [types.JOIN_OPTIONS_FREE_ACCESS]: "\u81EA\u7531\u52A0\u5165",
        [types.JOIN_OPTIONS_NEED_PERMISSION]: "\u9700\u8981\u9A8C\u8BC1",
        [types.JOIN_OPTIONS_DISABLE_APPLY]: "\u7981\u6B62\u52A0\u7FA4"
      },
      delDialogShow: false,
      userList: [],
      transferTitle: "",
      member: {
        admin: [],
        member: [],
        muteMember: []
      }
    });
    const dialog = common_vendor.ref();
    common_vendor.watchEffect(() => {
      data.conversation = props.conversation;
      data.userInfo = props.userInfo;
    });
    common_vendor.index$1.useStore();
    const TabName = common_vendor.computed$1(() => {
      let name = "";
      switch (data.currentTab) {
        case "notification":
          name = "\u7FA4\u516C\u544A";
          break;
        case "member":
          name = "\u7FA4\u6210\u5458";
          break;
        default:
          name = "\u7FA4\u7BA1\u7406";
          break;
      }
      return name;
    });
    common_vendor.watch(
      () => data.userInfo.list,
      (newValue, oldValue) => {
        data.member = {
          admin: [],
          member: [],
          muteMember: []
        };
        newValue.map((item) => {
          switch (item == null ? void 0 : item.role) {
            case types.GRP_MBR_ROLE_ADMIN:
              data.member.admin.push(item);
              break;
            case types.GRP_MBR_ROLE_MEMBER:
              data.member.member.push(item);
              break;
          }
          return item;
        });
        const time = new Date().getTime();
        data.member.muteMember = newValue.filter(
          (item) => (item == null ? void 0 : item.muteUntil) * 1e3 - time > 0
        );
      },
      {
        deep: true
      }
    );
    const isDismissGroupAuth = common_vendor.computed$1(() => {
      var _a, _b;
      const {
        conversation
      } = data;
      const userRole = (_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.selfInfo.role;
      const groupType = (_b = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _b.type;
      const isOwner = userRole === types.GRP_MBR_ROLE_OWNER;
      const isWork = groupType === types.GRP_WORK;
      return isOwner && !isWork;
    });
    const isShowAddMember = common_vendor.computed$1(() => {
      var _a;
      const {
        conversation
      } = data;
      const groupType = (_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.type;
      const isWork = groupType === types.GRP_WORK;
      if (isWork) {
        return true;
      }
      return false;
    });
    const showUserNum = common_vendor.computed$1(() => {
      let num = 3;
      if (!isShowAddMember.value) {
        num += 1;
      }
      if (data.conversation.groupProfile.selfInfo.role !== "Owner") {
        num += 1;
      }
      return num;
    });
    const isAuth = common_vendor.computed$1(() => {
      var _a;
      const {
        conversation
      } = data;
      const userRole = (_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.selfInfo.role;
      const isOwner = userRole === types.GRP_MBR_ROLE_OWNER;
      const isAdmin2 = userRole === types.GRP_MBR_ROLE_ADMIN;
      return isOwner || isAdmin2;
    });
    const isAdmin = common_vendor.computed$1(() => {
      var _a, _b;
      const {
        conversation
      } = data;
      const groupType = (_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.type;
      const userRole = (_b = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _b.selfInfo.role;
      const isOwner = userRole === types.GRP_MBR_ROLE_OWNER;
      const isWork = groupType === types.GRP_WORK;
      const isAVChatRoom = groupType === types.GRP_AVCHATROOM;
      if (!isWork && !isAVChatRoom && isOwner) {
        return true;
      }
      return false;
    });
    const getMember = (type) => {
      var _a;
      const {
        conversation
      } = data;
      const options = {
        groupID: (_a = conversation == null ? void 0 : conversation.groupProfile) == null ? void 0 : _a.groupID,
        count: 100,
        offset: type && type === "more" ? data.userInfo.list.length : 0
      };
      TUIGroupServer.getGroupMemberList(options).then((res) => {
        if (type && type === "more") {
          data.userInfo.list = [...data.userInfo.list, ...res.data.memberList];
        } else {
          data.userInfo.list = res.data.memberList;
        }
      });
    };
    const quit = async (group) => {
      await TUIGroupServer.quitGroup(group.groupID);
      TUIGroupServer.store.conversation = {};
      common_vendor.index.switchTab({
        url: "/pages/TUIKit/TUIPages/TUIConversation/index"
      });
    };
    const dismiss = async (group) => {
      await TUIGroupServer.dismissGroup(group.groupID);
      TUIGroupServer.store.conversation = {};
      common_vendor.index.switchTab({
        url: "/pages/TUIKit/TUIPages/TUIConversation/index"
      });
    };
    const edit = (labelName) => {
      data.editLableName = labelName;
    };
    const updateProfile = async (params) => {
      const {
        key,
        value
      } = params;
      const options = {
        groupID: data.conversation.groupProfile.groupID,
        [key]: value
      };
      const res = await TUIGroupServer.updateGroupProfile(options);
      const {
        conversation
      } = TUIGroupServer.store;
      conversation.groupProfile = res.data.group;
      TUIGroupServer.store.conversation = {};
      TUIGroupServer.store.conversation = conversation;
      data.editLableName = "";
    };
    const setTab = (tabName) => {
      data.currentTab = tabName;
      data.editLableName = "";
      if (data.currentTab === "member") {
        data.transferType = "remove";
      }
      if (!data.currentTab) {
        data.transferType = "";
      }
    };
    const submit = (userList) => {
      if (data.transferType === "remove") {
        data.userList = userList;
        data.delDialogShow = !data.delDialogShow;
      } else {
        handleManage(userList, data.transferType);
      }
    };
    const handleManage = (userList, type) => {
      const userIDList = [];
      userList.map((item) => {
        userIDList.push(item.userID);
        return item;
      });
    };
    getMember();
    common_vendor.onBackPress((event) => {
      if (event.from === "backbutton" && data.currentTab) {
        setTab("");
        return true;
      }
      return false;
    });
    const handleOperateMember = (type) => {
      if (type) {
        common_vendor.index.navigateTo({
          url: `../TUIGroupManage/memberOperate?type=${type}&groupID=${data.conversation.groupProfile.groupID}`
        });
      }
    };
    return {
      ...common_vendor.toRefs(data),
      isDismissGroupAuth,
      isShowAddMember,
      isAdmin,
      isAuth,
      quit,
      dismiss,
      edit,
      updateProfile,
      setTab,
      TabName,
      getMember,
      submit,
      handleManage,
      showUserNum,
      dialog,
      handleOperateMember
    };
  }
});
if (!Array) {
  const _component_ManageName = common_vendor.resolveComponent("ManageName");
  const _component_ManageMember = common_vendor.resolveComponent("ManageMember");
  const _component_ManageNotification = common_vendor.resolveComponent("ManageNotification");
  (_component_ManageName + _component_ManageMember + _component_ManageNotification)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f;
  return common_vendor.e({
    a: common_vendor.t(_ctx.TabName),
    b: !_ctx.currentTab
  }, !_ctx.currentTab ? common_vendor.e({
    c: common_vendor.o(_ctx.updateProfile),
    d: common_vendor.p({
      isAuth: _ctx.isAuth,
      data: _ctx.conversation.groupProfile
    }),
    e: common_vendor.t(_ctx.\u7FA4\u6210\u5458),
    f: common_vendor.t(_ctx.conversation.groupProfile.memberCount),
    g: common_assets._imports_0$11,
    h: common_vendor.o(($event) => _ctx.setTab("member")),
    i: common_vendor.f((_b = (_a = _ctx.userInfo) == null ? void 0 : _a.list) == null ? void 0 : _b.slice(0, _ctx.showUserNum), (item, index, i0) => {
      return {
        a: (item == null ? void 0 : item.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png",
        b: common_vendor.t((item == null ? void 0 : item.nick) || (item == null ? void 0 : item.userID)),
        c: index
      };
    }),
    j: _ctx.isShowAddMember
  }, _ctx.isShowAddMember ? {
    k: common_vendor.o(($event) => _ctx.handleOperateMember("add"))
  } : {}, {
    l: _ctx.conversation.groupProfile.selfInfo.role === "Owner"
  }, _ctx.conversation.groupProfile.selfInfo.role === "Owner" ? {
    m: common_vendor.o(($event) => _ctx.handleOperateMember("remove"))
  } : {}, {
    n: _ctx.isAdmin
  }, _ctx.isAdmin ? {
    o: common_assets._imports_0$11,
    p: common_vendor.o(($event) => _ctx.setTab("admin"))
  } : {}, {
    q: common_vendor.t(_ctx.conversation.groupProfile.groupID),
    r: ((_d = (_c = _ctx.conversation) == null ? void 0 : _c.groupProfile) == null ? void 0 : _d.avatar) || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/im/demo/TUIkit/web/img/constomer.svg",
    s: common_vendor.t(_ctx.typeName[_ctx.conversation.groupProfile.type]),
    t: common_vendor.t(_ctx.typeName[_ctx.conversation.groupProfile.joinOption]),
    v: common_vendor.o(($event) => _ctx.editLableName = ""),
    w: _ctx.conversation.groupProfile.selfInfo.role === "Owner" && ((_e = _ctx.userInfo) == null ? void 0 : _e.list.length) > 1
  }, _ctx.conversation.groupProfile.selfInfo.role === "Owner" && ((_f = _ctx.userInfo) == null ? void 0 : _f.list.length) > 1 ? {} : {}, {
    x: !!_ctx.isDismissGroupAuth
  }, !!_ctx.isDismissGroupAuth ? {
    y: common_vendor.o(($event) => _ctx.dismiss(_ctx.conversation.groupProfile))
  } : {
    z: common_vendor.o(($event) => _ctx.quit(_ctx.conversation.groupProfile))
  }) : _ctx.currentTab === "member" ? {
    B: common_vendor.o(($event) => _ctx.getMember("more")),
    C: common_vendor.o(_ctx.submit),
    D: common_vendor.p({
      self: _ctx.conversation.groupProfile.selfInfo,
      list: _ctx.userInfo.list,
      total: _ctx.conversation.groupProfile.memberCount,
      isShowDel: _ctx.conversation.groupProfile.selfInfo.role === "Owner"
    })
  } : _ctx.currentTab === "notification" ? {
    F: common_vendor.o(_ctx.updateProfile),
    G: common_vendor.p({
      isAuth: _ctx.isAuth,
      data: _ctx.conversation.groupProfile
    })
  } : _ctx.currentTab === "admin" ? common_vendor.e({
    I: _ctx.isAdmin
  }, _ctx.isAdmin ? {
    J: common_vendor.f(_ctx.member.admin, (item, index, i0) => {
      return {
        a: (item == null ? void 0 : item.avatar) || "https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png",
        b: common_vendor.t((item == null ? void 0 : item.nick) || (item == null ? void 0 : item.userID)),
        c: index
      };
    })
  } : {}) : {}, {
    A: _ctx.currentTab === "member",
    E: _ctx.currentTab === "notification",
    H: _ctx.currentTab === "admin"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(TUIGroupManage, [["render", _sfc_render], ["__scopeId", "data-v-74555746"], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/TUIKit/TUIPages/TUIGroupManage/manage-components/manage.vue"]]);
wx.createComponent(Component);
