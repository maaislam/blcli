/**
 * Delivery logic
 */
class Delivery {
  /**
   * @desc Initialise and set defaults
   */
  constructor() {
    /**
     * @desc Shelf life of biscuits in week
     */
    this.SHELF_LIFE_WEEKS = 4;

    /**
     * @desc How far in future we are able to deliver
     */
    this.DELIVERY_FUTURE_LENGTH_WEEKS = 24;
  }

  /**
   * @desc Helper get shelf life in weeks
   * @return {Number}
   */
  getShelfLifeWeeks() {
    return this.SHELF_LIFE_WEEKS;
  }

  /**
   * @desc Helper get future delivery length
   * @return {Number}
   */
  getDeliveryFutureLengthWeeks() {
    return this.DELIVERY_FUTURE_LENGTH_WEEKS;
  }

  /**
   * @desc Entry point for calculating all logic relative to occasion date
   * @param {Date} occasionDate
   * @return {Object}
   */
  calculateDeliveryLogic(occasionDate) {
    this.resetDateTimePart(occasionDate);
    
    // difference (days) between occasion and now
    const now = new Date();
    this.resetDateTimePart(now);
    
    const occasionNowDiffDays = (occasionDate - now) / 86400000;


    // target delivery dates
    const deliveryDatesFromNow = this.calculateDeliveryDatesFromNow();
    const targetDeliveryDate = deliveryDatesFromNow.date;

    const shelfLifeMs = this.SHELF_LIFE_WEEKS * 86400000 * 7;
    const deliveryFutureLengthMs = this.DELIVERY_FUTURE_LENGTH_WEEKS * 86400000 * 7;
    const todayMs = this.resetDateTimePart(new Date()).getTime();

    let occasionWithinShelfLife = false;
    let occasionWithinShelfLifeIfDeliveredLater = false;

    if(todayMs + shelfLifeMs > occasionDate.getTime()) {
      // Occasion is within the shelf life of biscuits
      occasionWithinShelfLife = true;
    }

    let occasionHasPassed = false;
    if(targetDeliveryDate.getTime() > occasionDate.getTime()) {
      occasionHasPassed = true;
    }

    let deliverLaterEarliestDate = targetDeliveryDate;
    let occasionTooFarInFuture = false;
    if(todayMs + shelfLifeMs + deliveryFutureLengthMs > occasionDate.getTime()) {
      // Occasion is within the shelf life of biscuits if biscuits are delivered later
      deliverLaterEarliestDate = new Date(occasionDate.getTime() - shelfLifeMs +(86400000*4));
      occasionWithinShelfLifeIfDeliveredLater = true;
    } else {
      occasionTooFarInFuture = true;
    }

    return {
      occasionNowDiffDays: occasionNowDiffDays,
      occasionHasPassed: occasionHasPassed,
      occasionTooFarInFuture: occasionTooFarInFuture,
      occasionWithinShelfLife: occasionWithinShelfLife,
      shouldDeliverLater: !occasionWithinShelfLife && !occasionHasPassed && !occasionTooFarInFuture,
      deliverLaterEarliestDate: {
        date: deliverLaterEarliestDate,
        friendly: this.getFriendlyDateString(deliverLaterEarliestDate),
        friendlyWithYear: this.getFriendlyDateString(deliverLaterEarliestDate, true),
      },
      soonestDeliveryDate: deliveryDatesFromNow
    }
  }

  /**
   * @desc Calculate soonest next available delivery date from now
   */
  calculateDeliveryDatesFromNow() {
    const now = this.getNowDate();
    const targetDate = new Date(now.getTime());

    const hours = now.getHours();
    const dow = now.getDay();

    let mustSpecifyWeekendDelivery = false;

    let daysToAdd = 1;

    if(dow === 0) {
      // Sunday delivery is always only available Tuesdsay
      daysToAdd = 2;
    } else if(dow === 6) {
      // Saturday delivery is always only available Tuesdsay
      daysToAdd = 3;
    } else if(dow === 5) {
      // Friday delivery is always only available Tuesdsay if before 1pm
      if(hours >= 13) {
        daysToAdd = 4;
      } else {
        // Saturday delivery is possible, but must specify weekend delivery
        daysToAdd = 1;
        mustSpecifyWeekendDelivery = true;
      }
    } else {
      if(hours >= 13) {
        daysToAdd = 2;
      } else {
        daysToAdd = 1;
      }
    }

    targetDate.setDate(now.getDate() + daysToAdd);

    this.resetDateTimePart(targetDate);

    return {
      daysToAdd: daysToAdd,
      date: targetDate,
      friendly: this.getFriendlyDateString(targetDate, false),
      friendlyWithYear: this.getFriendlyDateString(targetDate, true)
    }

  }

  /**
   * @desc Date to friendly formatting
   * @param {Date} date 
   * @return string
   */
  getFriendlyDateString(date, includeYear = false) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let returnString = weekdays[date.getDay()] 
      + ' '
      + (this.addOrdinalToNumber(date.getDate()))
      + ' '
      + months[date.getMonth()];

    if(includeYear) {
      returnString += (' ' + date.getFullYear());
    }

    return returnString;
  }

  /**
   * @desc Reset time part to 00:00:00:000
   * @param {Date} date
   */
  resetDateTimePart(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }
  
  /**
   * @desc helper get now date
   */
  getNowDate() {
    return new Date();
  }

  /**
   * @desc Helper add ordinal prefix to number
   */
  addOrdinalToNumber(i) {
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
  }
}

export let delivery = new Delivery();
