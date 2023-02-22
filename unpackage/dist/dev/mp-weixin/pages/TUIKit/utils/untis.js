"use strict";
const pages_TUIKit_utils_date = require("./date.js");
const pages_TUIKit_utils_decodeText = require("./decodeText.js");
const pages_TUIKit_utils_emojiMap = require("./emojiMap.js");
const common_vendor = require("../../../common/vendor.js");
function handleTipMessageShowContext(message) {
  const options = {
    message,
    text: ""
  };
  const userName = message.nick || message.payload.userIDList.join(",");
  switch (message.payload.operationType) {
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_JOIN:
      options.text = `\u7FA4\u6210\u5458\uFF1A${userName} \u52A0\u5165\u7FA4\u7EC4`;
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_QUIT:
      options.text = `\u7FA4\u6210\u5458\uFF1A${userName} \u9000\u51FA\u7FA4\u7EC4`;
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
      options.text = `\u7FA4\u6210\u5458\uFF1A${userName} \u88AB ${message.payload.operatorID} \u8E22\u51FA\u7FA4\u7EC4`;
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
      options.text = `\u7FA4\u6210\u5458\uFF1A${userName} \u6210\u4E3A\u7BA1\u7406\u5458`;
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      options.text = `\u7FA4\u6210\u5458\uFF1A${userName} \u88AB\u64A4\u9500\u7BA1\u7406\u5458`;
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
      options.text = handleTipGrpUpdated(message);
      break;
    case common_vendor.TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
      for (const member of message.payload.memberList) {
        if (member.muteTime > 0) {
          options.text = `\u7FA4\u6210\u5458\uFF1A${member.userID} \u88AB\u7981\u8A00`;
        } else {
          options.text = `\u7FA4\u6210\u5458\uFF1A${member.userID} \u88AB\u53D6\u6D88\u7981\u8A00`;
        }
      }
      break;
    default:
      options.text = `[\u7FA4\u63D0\u793A\u6D88\u606F]`;
      break;
  }
  return options;
}
function handleTipGrpUpdated(message) {
  const { payload } = message;
  const { newGroupProfile } = payload;
  const { operatorID } = payload;
  let text = "";
  const name = Object.keys(newGroupProfile)[0];
  switch (name) {
    case "ownerID":
      text = `${newGroupProfile[name]} \u6210\u4E3A\u65B0\u7684\u7FA4\u4E3B`;
      break;
    case "groupName":
      text = `${operatorID} \u4FEE\u6539\u7FA4\u540D\u4E3A ${newGroupProfile[name]}`;
      break;
    case "notification":
      text = `${operatorID} \u53D1\u5E03\u65B0\u516C\u544A`;
      break;
  }
  return text;
}
function handleTextMessageShowContext(item) {
  const options = {
    text: pages_TUIKit_utils_decodeText.decodeText(item.payload)
  };
  return options;
}
function handleFaceMessageShowContext(item) {
  const face = {
    message: item,
    name: "",
    url: ""
  };
  const currentEmojiList = pages_TUIKit_utils_emojiMap.bigEmojiList.filter((emoItem) => emoItem.icon === item.payload.data);
  if (currentEmojiList.length > 0) {
    face.name = currentEmojiList[0].list[item.payload.index];
  }
  if (item.payload.data.indexOf("@2x") > 0) {
    face.name = item.payload.data;
  } else {
    face.name = `${item.payload.data}@2x`;
  }
  face.url = `https://web.sdk.qcloud.com/im/assets/face-elem/${face.name}.png`;
  return face;
}
function handleLocationMessageShowContext(item) {
  const location = {
    lon: "",
    lat: "",
    href: "",
    url: "",
    description: "",
    message: item
  };
  location.lon = item.payload.longitude.toFixed(6);
  location.lat = item.payload.latitude.toFixed(6);
  location.href = `https://map.qq.com/?type=marker&isopeninfowin=1&markertype=1&pointx=${location.lon}&pointy=${location.lat}&name=${item.payload.description}`;
  location.url = `https://apis.map.qq.com/ws/staticmap/v2/?center=${location.lat},${location.lon}&zoom=10&size=300*150&maptype=roadmap&markers=size:large|color:0xFFCCFF|label:k|${location.lat},${location.lon}&key=UBNBZ-PTP3P-TE7DB-LHRTI-Y4YLE-VWBBD`;
  location.description = item.payload.description;
  return location;
}
function handleImageMessageShowContext(item) {
  return {
    progress: (item == null ? void 0 : item.status) === "unSend" && item.progress,
    info: item.payload.imageInfoArray,
    message: item
  };
}
function handleVideoMessageShowContext(item) {
  var _a, _b;
  return {
    progress: (item == null ? void 0 : item.status) === "unSend" && (item == null ? void 0 : item.progress),
    url: (_a = item == null ? void 0 : item.payload) == null ? void 0 : _a.videoUrl,
    snapshotUrl: (_b = item == null ? void 0 : item.payload) == null ? void 0 : _b.snapshotUrl,
    message: item
  };
}
function handleAudioMessageShowContext(item) {
  return {
    progress: (item == null ? void 0 : item.status) === "unSend" && item.progress,
    url: item.payload.url,
    message: item,
    second: item.payload.second
  };
}
function handleFileMessageShowContext(item) {
  let size = "";
  if (item.payload.fileSize >= 1024 * 1024) {
    size = `${(item.payload.fileSize / (1024 * 1024)).toFixed(2)} Mb`;
  } else if (item.payload.fileSize >= 1024) {
    size = `${(item.payload.fileSize / 1024).toFixed(2)} Kb`;
  } else {
    size = `${item.payload.fileSize.toFixed(2)}B`;
  }
  return {
    progress: (item == null ? void 0 : item.status) === "unSend" && item.progress,
    url: item.payload.fileUrl,
    message: item,
    name: item.payload.fileName,
    size
  };
}
function handleMergerMessageShowContext(item) {
  return { message: item, ...item.payload };
}
function extractCallingInfoFromMessage(message) {
  let callingmessage = {};
  let objectData = {};
  try {
    callingmessage = JSON.parse(message.payload.data);
  } catch (error) {
    callingmessage = {};
  }
  if (callingmessage.businessID !== 1) {
    return "";
  }
  try {
    objectData = JSON.parse(callingmessage.data);
  } catch (error) {
    objectData = {};
  }
  switch (callingmessage.actionType) {
    case 1: {
      if (objectData.call_end >= 0 && !callingmessage.groupID) {
        return `\u901A\u8BDD\u65F6\u957F \uFF1A${pages_TUIKit_utils_date.formatTime(objectData.call_end)}`;
      }
      if (callingmessage.groupID) {
        return `\u7ED3\u675F\u7FA4\u804A`;
      }
      if (objectData.data && objectData.data.cmd === "switchToAudio") {
        return `\u5207\u6362\u8BED\u97F3\u901A\u8BDD`;
      }
      if (objectData.data && objectData.data.cmd === "switchToVideo") {
        return `\u5207\u6362\u89C6\u9891\u901A\u8BDD`;
      }
      return `\u53D1\u8D77\u901A\u8BDD`;
    }
    case 2:
      return `\u53D6\u6D88\u901A\u8BDD`;
    case 3:
      if (objectData.data && objectData.data.cmd === "switchToAudio") {
        return `\u5207\u6362\u8BED\u97F3\u901A\u8BDD`;
      }
      if (objectData.data && objectData.data.cmd === "switchToVideo") {
        return `\u5207\u6362\u89C6\u9891\u901A\u8BDD`;
      }
      return `\u5DF2\u63A5\u542C`;
    case 4:
      return `\u62D2\u7EDD\u901A\u8BDD`;
    case 5:
      if (objectData.data && objectData.data.cmd === "switchToAudio") {
        return `\u5207\u6362\u8BED\u97F3\u901A\u8BDD`;
      }
      if (objectData.data && objectData.data.cmd === "switchToVideo") {
        return `\u5207\u6362\u89C6\u9891\u901A\u8BDD`;
      }
      return `\u65E0\u5E94\u7B54`;
    default:
      return "";
  }
}
function handleCustomMessageShowContext(item) {
  var _a;
  return {
    message: item,
    custom: extractCallingInfoFromMessage(item) || ((_a = item == null ? void 0 : item.payload) == null ? void 0 : _a.extension) || `[\u81EA\u5B9A\u4E49\u6D88\u606F]`
  };
}
function translateGroupSystemNotice(message) {
  var _a, _b;
  const groupName = ((_a = message.payload.groupProfile) == null ? void 0 : _a.name) || ((_b = message.payload.groupProfile) == null ? void 0 : _b.groupID);
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} \u7533\u8BF7\u52A0\u5165\u7FA4\u7EC4\uFF1A${groupName}`;
    case 2:
      return `\u6210\u529F\u52A0\u5165\u7FA4\u7EC4\uFF1A${groupName}`;
    case 3:
      return `\u7533\u8BF7\u52A0\u5165\u7FA4\u7EC4\uFF1A${groupName} \u88AB\u62D2\u7EDD`;
    case 4:
      return `\u4F60\u88AB\u7BA1\u7406\u5458 ${message.payload.operatorID} \u8E22\u51FA\u7FA4\u7EC4\uFF1A${groupName}`;
    case 5:
      return `\u7FA4\uFF1A${groupName} \u88AB ${message.payload.operatorID} \u89E3\u6563`;
    case 6:
      return `${message.payload.operatorID} \u521B\u5EFA\u7FA4\uFF1A${groupName}`;
    case 7:
      return `${message.payload.operatorID} \u9080\u8BF7\u4F60\u52A0\u7FA4\uFF1A${groupName}`;
    case 8:
      return `\u4F60\u9000\u51FA\u7FA4\u7EC4\uFF1A${groupName}`;
    case 9:
      return `\u4F60\u88AB${message.payload.operatorID} \u8BBE\u7F6E\u4E3A\u7FA4\uFF1A${groupName} \u7684\u7BA1\u7406\u5458`;
    case 10:
      return `\u4F60\u88AB ${message.payload.operatorID} \u64A4\u9500\u7FA4\uFF1A${groupName} \u7684\u7BA1\u7406\u5458\u8EAB\u4EFD`;
    case 12:
      return `${message.payload.operatorID} \u9080\u8BF7\u4F60\u52A0\u7FA4\uFF1A${groupName}`;
    case 13:
      return `${message.payload.operatorID} \u540C\u610F\u52A0\u7FA4 \uFF1A${groupName}`;
    case 14:
      return `${message.payload.operatorID} \u62D2\u63A5\u52A0\u7FA4 \uFF1A${groupName}`;
    case 255:
      return `\u81EA\u5B9A\u4E49\u7FA4\u7CFB\u7EDF\u901A\u77E5: ${message.payload.userDefinedField}`;
  }
}
exports.handleAudioMessageShowContext = handleAudioMessageShowContext;
exports.handleCustomMessageShowContext = handleCustomMessageShowContext;
exports.handleFaceMessageShowContext = handleFaceMessageShowContext;
exports.handleFileMessageShowContext = handleFileMessageShowContext;
exports.handleImageMessageShowContext = handleImageMessageShowContext;
exports.handleLocationMessageShowContext = handleLocationMessageShowContext;
exports.handleMergerMessageShowContext = handleMergerMessageShowContext;
exports.handleTextMessageShowContext = handleTextMessageShowContext;
exports.handleTipMessageShowContext = handleTipMessageShowContext;
exports.handleVideoMessageShowContext = handleVideoMessageShowContext;
exports.translateGroupSystemNotice = translateGroupSystemNotice;
