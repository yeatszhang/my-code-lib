function preDay() {
  return new Date(obj.getTime() - 24 * 60 * 60 * 1000);
}

function beforeNowDay(i) {
  return new Date(obj.getTime() - i * 24 * 60 * 60 * 1000);
}

/**
 * 获取i个月之后的日期对象
 * @param i {number} 之前i个月
 * @returns {Date}
 */
function beforeNowMonth(i) {
  var temp = new Date(obj.getTime());
  temp.setMonth(temp.getMonth() - i);
  return temp;
}

//本月第一天
function firstDayInM() {
  var tmpDate = new Date(obj);
  tmpDate.setDate(1);
  return tmpDate;
}

// 本月最后一天
function lastDayInM() {
  var tmpDate = new Date(obj);
  tmpDate.setMonth(tmpDate.getMonth() + 1);
  tmpDate.setDate(1);
  return new Date(tmpDate.getTime() - 24 * 60 * 60 * 1000);
}

//上月的第一天
function firstDayInPreM() {
  var tmpDate = new Date(obj);
  tmpDate.setDate(1);
  tmpDate.setMonth(tmpDate.getMonth() - 1);
  return tmpDate;
}

//上月的最后一天
function lastDayInPreM() {
  var tmpDate = new Date(obj);
  tmpDate.setDate(1);
  return new Date(tmpDate.getTime() - 24 * 60 * 60 * 1000);
}

//得到前n周的最后一天(周六)
function getBeforeWeekend(n) {
  var theDate = new Date(obj);
  var lastDateOfWeek;
  var day = theDate.getDay();
  theDate.setDate(theDate.getDate() + 6 - theDate.getDay());
  theDate.setDate(theDate.getDate() - n * 7);
  lastDateOfWeek = theDate;
  return lastDateOfWeek;
}

//到现在为止过了多少个周日
function getWeekends() {
  var start = firstDayInM();
  var weeks = 0;
  var tmpDate = new Date(obj);
  while (tmpDate > start) {
    if (tmpDate.getDay() == 0) {
      weeks++;
    }
    tmpDate.setDate(tmpDate.getDate() - 1);
  }
  return weeks;
}

function getDateArray(startDate, endDate, offset, formatstr) {
  if (offset == undefined) {
    offset = 0;
  }
  if (formatstr == undefined) {
    formatstr = 'yyyy-MM-dd';
  }
  var dates = [];
  var start = new Date(startDate.getTime() + offset);
  var end = new Date(endDate.getTime() + offset);
  while (start <= end) {
    dates.push(start.format(formatstr));
    start = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  }
  return dates;
}

var distanceByDates = function (date1, date2, unit) {
  unit = unit == null ? 24 * 60 * 60 * 1000 : unit;
  return Math.ceil((date2.getTime() - date1.getTime()) / unit);
};

/**
 * 根据起始日期得到日期数组
 * @param startDate
 * @param endDate
 * @param formatStr 格式字符串 ex:yyyyMMdd
 * @returns {Array}
 */
function getDayArr(startDate, endDate, formatStr) {
  var start = new Date(startDate),
    dayArr = [],
    end = new Date(endDate);

  for (var i = 0; start <= end; i++) {
    dayArr.push(start.format(formatStr));
    start.setDate(start.getDate() + 1);
  }
  return dayArr;
}


/**
 * 根据起始日期得到这段时间中的周六
 * @param startDate
 * @param endDate
 * @param formatStr 格式字符串 ex:yyyyMMdd
 * @returns {Array}
 */
function getWeekArr(startDate, endDate, formatStr) {
  var start = new Date(startDate),
    weekArr = [],
    end = new Date(endDate);

  start.setDate(start.getDate() + 6 - start.getDay());
  if (end.getDay() !== 6) {
    end.setDate(end.getDate() - end.getDay() - 1);
  }
  for (var i = 0; start <= end; i++) {
    weekArr.push(start.format(formatStr));
    start.setDate(start.getDate() + 7);
  }
  return weekArr;
}

/**
 * 根据起始日期得到月份数组
 * @param startDate
 * @param endDate
 * @param formatStr 格式字符串 ex:yyyyMM
 * @returns {Array}
 */
function getMonthArr(startDate, endDate, formatStr) {
  var start = new Date(startDate),
    monthArr = [],
    end = new Date(endDate);

  for (var i = 0; start <= end; i++) {
    start.setDate(1);
    monthArr.push(start.format(formatStr));
    start.setMonth(start.getMonth() + 1);
  }
  return monthArr;
}
