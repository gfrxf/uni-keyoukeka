"use strict";
const common_vendor = require("../common/vendor.js");
const service_home = require("../service/home.js");
const useHomeStore = common_vendor.defineStore("home", {
  state: () => {
    return {
      mydata: [],
      alldata: [],
      isAdd: false
    };
  },
  actions: {
    async fetchMyData(openid) {
      var _a;
      console.log(111, "store");
      const res = await service_home.getMyData(openid);
      if (((_a = res.data) == null ? void 0 : _a.length) !== void 0) {
        this.changeAdd();
        console.log(this.isAdd, "isadd");
      }
      this.mydata = res.data || [];
      console.log(this.mydata);
    },
    async fetchAllData() {
      const res = await service_home.getAllData();
      this.alldata = res.data || [];
    },
    changeAdd() {
      this.isAdd = true;
    }
  }
});
exports.useHomeStore = useHomeStore;
