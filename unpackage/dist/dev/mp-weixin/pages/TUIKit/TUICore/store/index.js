"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_TUIKit_TUICore_store_modules = require("./modules.js");
const store = common_vendor.createStore({
  modules: pages_TUIKit_TUICore_store_modules.modules
});
exports.store = store;
