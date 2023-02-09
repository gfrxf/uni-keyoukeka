"use strict";
const common_vendor = require("../../common/vendor.js");
const service_home = require("../../service/home.js");
require("../../service/index.js");
const _sfc_main = {
  __name: "detail",
  props: {
    tagId: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.ref();
    let content = common_vendor.ref("");
    common_vendor.onLoad(() => {
      getdetail(props.tagId);
    });
    common_vendor.onMounted(() => {
    });
    async function getdetail(id) {
      const res = await service_home.getDetails(id);
      content.value = htmlUnescape(res.data.content);
      console.log(content.value, "con");
      console.log(typeof content.value, "type");
    }
    function htmlUnescape(html) {
      return html.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
          case "&lt;":
            return "<";
          case "&gt;":
            return ">";
          case "&quot;":
            return '"';
          case "&amp;":
            return "&";
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(content).value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukeka/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
