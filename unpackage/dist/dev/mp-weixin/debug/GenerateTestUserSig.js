"use strict";
const debug_libGenerateTestUsersigEs_min = require("./lib-generate-test-usersig-es.min.js");
const SDKAPPID = 1400793141;
const EXPIRETIME = 604800;
const SECRETKEY = "2434b73e782a16f9ae27a4b94ce762dc75af78c9b2d5a95a9346110a6352cb29";
function genTestUserSig(userID) {
  const generator = new debug_libGenerateTestUsersigEs_min.LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);
  return {
    sdkAppID: SDKAPPID,
    userSig
  };
}
exports.SDKAPPID = SDKAPPID;
exports.genTestUserSig = genTestUserSig;
