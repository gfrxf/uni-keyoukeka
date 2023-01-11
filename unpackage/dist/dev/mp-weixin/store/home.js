"use strict";
const common_vendor = require("../common/vendor.js");
const useHomeStore = common_vendor.defineStore("home", {
  state: () => {
    return {
      banners: [],
      recommends: []
    };
  },
  actions: {}
});
exports.useHomeStore = useHomeStore;
