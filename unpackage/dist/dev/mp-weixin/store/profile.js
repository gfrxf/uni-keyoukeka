"use strict";
const common_vendor = require("../common/vendor.js");
const useProfileStore = common_vendor.defineStore("profile", {
  state: () => {
    return {
      nickName: "",
      avatarUrl: "",
      openid: ""
    };
  },
  actions: {
    setnickName(name) {
      this.nickName = name;
      console.log(this.nickName, "nicname");
    },
    setavatarUrl(url) {
      this.avatarUrl = url;
      console.log(this.avatarUrl, "avatar");
    },
    setopenid(id) {
      this.openid = id;
      console.log(this.openid, "storeopenid");
    }
  }
});
exports.useProfileStore = useProfileStore;
