"use strict";
const common_vendor = require("../../common/vendor.js");
const debug_GenerateTestUserSig = require("../../debug/GenerateTestUserSig.js");
const service_social = require("../../service/social.js");
require("../../debug/lib-generate-test-usersig-es.min.js");
require("../../service/index.js");
const TUIConversation = () => "../TUIKit/TUIPages/TUIConversation/index2.js";
const fuiInput = () => "../../components/firstui/fui-input/fui-input.js";
const _sfc_main = {
  components: {
    TUIConversation,
    fuiInput
  },
  data() {
    return {
      SDKAPPID: debug_GenerateTestUserSig.SDKAPPID,
      text: "",
      chatName: ""
    };
  },
  methods: {
    handelclick() {
      if (!this.chatName) {
        common_vendor.index.showToast({
          title: "\u8BF7\u6DFB\u52A0\u6635\u79F0",
          duration: 2e3
        });
        return;
      }
      let userID = this.chatName;
      let userSig = debug_GenerateTestUserSig.genTestUserSig(userID).userSig;
      common_vendor.index.$TUIKit.tim.login({
        userID,
        userSig
      }).then((res) => {
        common_vendor.index.$aegis.reportEvent({
          name: "login",
          ext1: "login-success",
          ext2: "uniTuikitExternalVue3",
          ext3: `${tis.SDKAppID}`
        });
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: "login success",
            icon: "loading"
          });
          common_vendor.index.hideLoading();
          common_vendor.index.setStorageSync("isLogin", true);
          store.commit("timStore/setLoginStatus", true);
          store.commit("timStore/setUserInfo", {
            userID
          });
          common_vendor.index.navigateTo({
            url: "/pages/TUIKit/TUIPages/TUIConversation/index"
          });
        } else {
          common_vendor.index.setStorageSync("isLogin", false);
        }
      }).catch((error) => {
        common_vendor.index.$aegis.reportEvent({
          name: "login",
          ext1: `login-failed#error:${error}`,
          ext2: "uniTuikitExternalVue3",
          ext3: `${this.SDKAppID}`
        });
        common_vendor.index.setStorageSync("isLogin", false);
        console.warn("login exception = ", error);
      });
      common_vendor.index.navigateTo({
        url: "/pages/TUIKit/TUIPages/TUIConversation/index"
      });
    },
    async xiugai() {
      let chatName = JSON.stringify({
        chatName: this.text
      });
      console.log(chatName);
      const res = await service_social.changenickname(chatName);
      if (res.success === true) {
        this.chatName = this.text;
        common_vendor.index.setStorageSync("chatName", res.data);
        common_vendor.index.showToast({
          title: "\u4FEE\u6539\u6210\u529F",
          duration: 2e3
        });
        this.handelclick();
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          duration: 2e3
        });
      }
      console.log(res, "res");
    }
  },
  onLoad() {
    this.chatName = common_vendor.index.getStorageSync("chatName");
    console.log(this.chatName, "chatName789");
  }
};
if (!Array) {
  const _easycom_fui_button2 = common_vendor.resolveComponent("fui-button");
  const _easycom_fui_input2 = common_vendor.resolveComponent("fui-input");
  (_easycom_fui_button2 + _easycom_fui_input2)();
}
const _easycom_fui_button = () => "../../node-modules/firstui-uni/firstui/fui-button/fui-button.js";
const _easycom_fui_input = () => "../../node-modules/firstui-uni/firstui/fui-input/fui-input.js";
if (!Math) {
  (_easycom_fui_button + _easycom_fui_input)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handelclick && $options.handelclick(...args)),
    b: !$data.chatName
  }, !$data.chatName ? {
    c: common_vendor.o($options.xiugai),
    d: common_vendor.p({
      type: "gray",
      color: "#B0EC64",
      bold: true,
      width: "200rpx",
      height: "64rpx",
      size: 28,
      text: "\u63D0\u4EA4"
    }),
    e: common_vendor.o(($event) => $data.text = $event),
    f: common_vendor.p({
      padding: ["20rpx", "32rpx"],
      label: "\u804A\u5929\u6635\u79F0",
      bottomLeft: 0,
      placeholder: "\u8BF7\u8F93\u5165\u804A\u5929\u6635\u79F0",
      modelValue: $data.text
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/social/social.vue"]]);
wx.createPage(MiniProgramPage);
