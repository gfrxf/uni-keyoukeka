"use strict";
const pages_TUIKit_utils_emojiMap = require("./emojiMap.js");
function decodeText(payload) {
  const renderDom = [];
  let temp = payload.text;
  let left = -1;
  let right = -1;
  while (temp !== "") {
    left = temp.indexOf("[");
    right = temp.indexOf("]");
    switch (left) {
      case 0:
        if (right === -1) {
          renderDom.push({
            name: "text",
            text: temp
          });
          temp = "";
        } else {
          const emojiKey = temp.slice(0, right + 1);
          if (pages_TUIKit_utils_emojiMap.emojiMap[emojiKey]) {
            renderDom.push({
              name: "img",
              src: pages_TUIKit_utils_emojiMap.emojiUrl + pages_TUIKit_utils_emojiMap.emojiMap[emojiKey]
            });
            temp = temp.substring(right + 1);
          } else {
            renderDom.push({
              name: "text",
              text: "["
            });
            temp = temp.slice(1);
          }
        }
        break;
      case -1:
        renderDom.push({
          name: "text",
          text: temp
        });
        temp = "";
        break;
      default:
        renderDom.push({
          name: "text",
          text: temp.slice(0, left)
        });
        temp = temp.substring(left);
        break;
    }
  }
  return renderDom;
}
exports.decodeText = decodeText;
