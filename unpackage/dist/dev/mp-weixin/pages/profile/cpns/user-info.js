"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_profile = require("../../../service/profile.js");
const store_profile = require("../../../store/profile.js");
const common_assets = require("../../../common/assets.js");
require("../../../service/index.js");
const _sfc_main = {
  __name: "user-info",
  setup(__props) {
    const profileStore = store_profile.useProfileStore();
    const isLogin = common_vendor.ref(false);
    const nickName = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("");
    const openid = common_vendor.ref("");
    const chatName = common_vendor.ref("");
    avatarUrl.value = common_assets.touxiang;
    common_vendor.onBeforeMount(() => {
      console.log("onmountes");
      openid.value = common_vendor.index.getStorageSync("openid") || "";
      console.log(openid.value, "openid");
      if (openid.value) {
        nickName.value = common_vendor.index.getStorageSync("nickName");
        avatarUrl.value = common_vendor.index.getStorageSync("avatarUrl");
        isLogin.value = true;
      }
    });
    async function handleClick() {
      const res = await service_profile.getUserInfo();
      console.log(res);
      const userInfo = res.userInfo;
      const rawData = res.rawData;
      const signature = res.signature;
      const code = await service_profile.getCode();
      const resm = await service_profile.getMytoken(code, avatarUrl.value, nickName.value, rawData, signature);
      console.log(resm, "resm");
      if (resm.success === true) {
        avatarUrl.value = userInfo.avatarUrl;
        nickName.value = userInfo.nickName;
        openid.value = resm.data.openId;
        chatName.value = resm.data.chatName;
        profileStore.setnickName(nickName.value);
        profileStore.setavatarUrl(avatarUrl.value);
        profileStore.setopenid(openid.value);
        common_vendor.index.setStorageSync("openid", openid.value);
        common_vendor.index.setStorageSync("avatarUrl", avatarUrl.value);
        common_vendor.index.setStorageSync("nickName", nickName.value);
        common_vendor.index.setStorageSync("chatName", chatName.value);
        isLogin.value = true;
        common_vendor.index.showToast({
          title: "\u767B\u5F55\u6210\u529F",
          duration: 2e3
        });
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u518D\u6B21\u767B\u5F55",
          duration: 2e3
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: avatarUrl.value,
        b: !isLogin.value
      }, !isLogin.value ? {
        c: common_vendor.o(handleClick)
      } : {}, {
        d: isLogin.value
      }, isLogin.value ? {
        e: common_vendor.t(nickName.value)
      } : {}, {
        f: common_vendor.o((...args) => _ctx.itemClick && _ctx.itemClick(...args))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/profile/cpns/user-info.vue"]]);
wx.createComponent(Component);
