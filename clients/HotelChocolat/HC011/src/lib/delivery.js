const CUTOFF_TIME = 18;

const NEXT_DAY_DAYS = [1,2,3,4,5];

const getNowDate = () => {
    return (new Date());
};

const getCutoffDate = () => {
    return (new Date()).setHours(CUTOFF_TIME, 0, 0, 0);
}

const addOrdinalToNumber = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
};

const secondsToHms = (d) => {
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return {
        hours: hDisplay,
        minutes: mDisplay,
        seconds: sDisplay,
    }
};

export const getFriendlyDateString = (date, includeYear = false) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let returnString = weekdays[date.getDay()]
      + ' '
      + (addOrdinalToNumber(date.getDate()))
      + ' '
      + months[date.getMonth()];

    if(includeYear) {
      returnString += (' ' + date.getFullYear());
    }

    return returnString;
};

export const addDaysToCurrentDate = (daysToAdd) => {
    const now = getNowDate();
    now.setDate(now.getDate() + daysToAdd);

    return now;
};

export const isNextDayPossible = () => {
    const now = getNowDate();
    const nowDay = now.getDay();

    const isPossible = NEXT_DAY_DAYS.indexOf(nowDay) > -1 && now < getCutoffDate();

    return isPossible;
};

export const timeToCutoff = () => {
    const now = getNowDate();
    const cutoff = getCutoffDate();

    const millisecondsUntilCutoff = cutoff - now;
    const secondsUntilCutoff = millisecondsUntilCutoff / 1000;

    if(secondsUntilCutoff < 0) {
        return 0;
    } else {
        const readableTime = secondsToHms(secondsUntilCutoff);

        return readableTime;
    }
};