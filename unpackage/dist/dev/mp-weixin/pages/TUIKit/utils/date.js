"use strict";
function formatTime(secondTime) {
  const time = secondTime;
  let newTime;
  let hour;
  let minite;
  let seconds;
  if (time >= 3600) {
    hour = parseInt(`${time / 3600}`, 10) < 10 ? `0${parseInt(`${time / 3600}`, 10)}` : parseInt(`${time / 3600}`, 10);
    minite = parseInt(`${time % 60 / 60}`, 10) < 10 ? `0${parseInt(`${time % 60 / 60}`, 10)}` : parseInt(`${time % 60 / 60}`, 10);
    seconds = time % 3600 < 10 ? `0${time % 3600}` : time % 3600;
    if (seconds > 60) {
      minite = parseInt(`${seconds / 60}`, 10) < 10 ? `0${parseInt(`${seconds / 60}`, 10)}` : parseInt(`${seconds / 60}`, 10);
      seconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    }
    newTime = `${hour}:${minite}:${seconds}`;
  } else if (time >= 60 && time < 3600) {
    minite = parseInt(`${time / 60}`, 10) < 10 ? `0${parseInt(`${time / 60}`, 10)}` : parseInt(`${time / 60}`, 10);
    seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
    newTime = `00:${minite}:${seconds}`;
  } else if (time < 60) {
    seconds = time < 10 ? `0${time}` : time;
    newTime = `00:00:${seconds}`;
  }
  return newTime;
}
function caculateTimeago(dateTimeStamp) {
  const minute = 1e3 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  let result = "";
  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute;
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  if (weekC >= 1 && weekC <= 4) {
    result = ` ${parseInt(`${weekC}`, 10)}\u5468\u524D`;
  } else if (dayC >= 1 && dayC <= 6) {
    result = ` ${parseInt(`${dayC}`, 10)}\u5929\u524D`;
  } else if (hourC >= 1 && hourC <= 23) {
    result = ` ${parseInt(`${hourC}`, 10)}\u5C0F\u65F6\u524D`;
  } else if (minC >= 1 && minC <= 59) {
    result = ` ${parseInt(`${minC}`, 10)}\u5206\u949F\u524D`;
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "\u521A\u521A";
  } else {
    const datetime = new Date();
    datetime.setTime(dateTimeStamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
    result = `${Nyear}-${Nmonth}-${Ndate}`;
  }
  return result;
}
exports.caculateTimeago = caculateTimeago;
exports.formatTime = formatTime;
