"use strict";
const common_vendor = require("../common/vendor.js");
const service_home = require("../service/home.js");
const useHomeStore = common_vendor.defineStore("home", {
  state: () => {
    return {
      mydata: [],
      alldata: []
    };
  },
  actions: {
    async fetchMyData(openId) {
      const res = await service_home.getMyData(openId);
      this.mydata = res.data || [];
      console.log(this.mydata);
    },
    async fetchAllData() {
      const res = await service_home.getAllData();
      this.alldata = res.data || [];
    }
  }
});
exports.useHomeStore = useHomeStore;
