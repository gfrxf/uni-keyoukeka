"use strict";
const common_vendor = require("../../common/vendor.js");
const service_home = require("../../service/home.js");
require("../../service/index.js");
const tabcontrol = () => "../../components/tab-control/tab-control.js";
const _sfc_main = {
  components: {
    tabcontrol
  },
  data() {
    return {
      tagId: 1,
      contentEl: "",
      test: "<div>Hello World!</div>",
      current: 0,
      src: "",
      danmuList: [
        {
          text: "\u53EF\u6709\u79D1\u5361\uFF0C\u6218\u80DC\u75BE\u75C5\u7684\u8FC7\u7A0B\u4E0D\u5B64\u5355",
          color: "#B0EC64",
          time: 1
        },
        {
          text: "\u8BF7\u4FDD\u6301\u5F39\u5E55\u7684\u53CB\u5584\u548C\u5408\u89C4",
          color: "#B0EC64",
          time: 3
        }
      ],
      danmuValue: "",
      video: "",
      medicinePoint: ""
    };
  },
  onReady: function(res) {
    this.videoContext = common_vendor.index.createVideoContext("myVideo");
  },
  onLoad(option) {
    this.tagId = option.tagId;
    console.log(this.tagId, "tagid");
    this.getdetail(this.tagId);
  },
  mounted() {
  },
  methods: {
    async getdetail(id) {
      const res = await service_home.getDetails(id);
      this.contentEl = this.htmlUnescape(res.data.content);
      this.video = res.data.video;
      this.medicinePoint = this.htmlUnescape(res.data.medicinePoint);
    },
    htmlUnescape(html) {
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
    },
    handleTabItemClick(index) {
      this.current = index;
      console.log(this.current, "current");
    },
    sendDanmu: function() {
      this.videoContext.sendDanmu({
        text: this.danmuValue,
        color: this.getRandomColor()
      });
      this.danmuValue = "";
    },
    videoErrorCallback: function(e) {
      common_vendor.index.showModal({
        content: e.target.errMsg,
        showCancel: false
      });
    },
    getRandomColor: function() {
      const rgb = [];
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length == 1 ? "0" + color : color;
        rgb.push(color);
      }
      return "#" + rgb.join("");
    }
  }
};
if (!Array) {
  const _easycom_tab_control2 = common_vendor.resolveComponent("tab-control");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_tab_control2 + _easycom_mp_html2)();
}
const _easycom_tab_control = () => "../../components/tab-control/tab-control.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_tab_control + _easycom_mp_html)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleTabItemClick),
    b: common_vendor.p({
      titles: ["\u56FE\u6587\u79D1\u666E", "\u89C6\u9891\u4ECB\u7ECD", "\u7528\u836F\u6307\u5357"]
    }),
    c: !$data.current
  }, !$data.current ? {
    d: common_vendor.p({
      content: $data.contentEl
    })
  } : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {
    f: $data.video,
    g: common_vendor.o((...args) => $options.videoErrorCallback && $options.videoErrorCallback(...args)),
    h: $data.danmuList,
    i: $data.danmuValue,
    j: common_vendor.o(($event) => $data.danmuValue = $event.detail.value),
    k: common_vendor.o((...args) => $options.sendDanmu && $options.sendDanmu(...args))
  } : {}, {
    l: $data.current === 2
  }, $data.current === 2 ? {
    m: common_vendor.p({
      content: $data.medicinePoint
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiongfeng/Desktop/\u53EF\u6709\u79D1\u5361/keyoukekatest/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
