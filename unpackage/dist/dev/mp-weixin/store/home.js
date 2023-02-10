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
    async fetchMyData(openId) {
      console.log(111);
      const res = await service_home.getMyData(openId);
      this.mydata = res.data || [];
      if (res.data.length !== 0) {
        this.changeAdd();
        console.log(this.isAdd, "isadd");
      }
    },
    async fetchAllData() {
      const res = await service_home.getAllData();
      this.alldata = res.data || [];
    },
    changeAdd() {
      this.isAdd = false;
    }
  }
});
exports.useHomeStore = useHomeStore;
