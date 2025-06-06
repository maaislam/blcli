function creatHTMLElement(el, className, parentElement, textNode = null) {
  let elem = el.querySelector('.' + className);
  if (!elem) {
    elem = document.createElement('div');
    elem.classList.add(className);
    if (textNode !== null) {
      const text = document.createTextNode(textNode);
      elem.appendChild(text);
    }
    parentElement.appendChild(elem);
  }
  return elem;
}
function setDataAttr(el, name, value) {
  return el.setAttribute(name, value);
}
function setStyle(el, prop, value) {
  return el.style.setProperty(prop, value);
}
function addClass(el, className) {
  return el.classList.add(className);
}
function removeClass(el, className) {
  return el.classList.remove(className);
}
function toggleClass(el, className) {
  return el.classList.toggle(className);
}

const defaultOptions = {
  selector: '.hello-week',
  lang: 'en',
  langFolder: '../dist/langs/',
  format: 'DD/MM/YYYY',
  monthShort: false,
  weekShort: true,
  defaultDate: null,
  minDate: null,
  maxDate: null,
  disabledDaysOfWeek: null,
  disableDates: null,
  weekStart: 0,
  timezoneOffset: new Date().getTimezoneOffset(),
  daysSelected: null,
  daysHighlight: null,
  multiplePick: false,
  disablePastDays: false,
  todayHighlight: true,
  range: false,
  locked: false,
  rtl: false,
  nav: ['◀', '▶'],
  onLoad: () => {},
  onNavigation: () => {},
  onSelect: () => {},
  onClear: () => {},
};

function extend(options, configurations) {
  return Object.assign(configurations || defaultOptions, options);
}

function setTimeZone({ date, timezoneOffset }) {
  const dt = date ? new Date(date) : new Date();
  timezoneOffset = timezoneOffset ? timezoneOffset : dt.getTimezoneOffset();
  dt.setTime(dt.getTime() + timezoneOffset * 60 * 1000);
  return dt;
}
function timestampToHuman({ timestamp, format, langs, timezoneOffset }) {
  const dt = setTimeZone({ date: timestamp, timezoneOffset });
  format = format.replace('dd', dt.getDate().toString());
  format = format.replace('DD', (dt.getDate() > 9 ? dt.getDate() : '0' + dt.getDate()).toString());
  format = format.replace('mm', (dt.getMonth() + 1).toString());
  format = format.replace('MMM', langs.months[dt.getMonth()]);
  format = format.replace('MM', (dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : '0' + (dt.getMonth() + 1)).toString());
  format = format.replace('mmm', langs.monthsShort[dt.getMonth()]);
  format = format.replace('yyyy', dt.getFullYear().toString());
  format = format.replace('YYYY', dt.getFullYear().toString());
  format = format.replace('YY', dt.getFullYear().toString().substring(2));
  format = format.replace('yy', dt.getFullYear().toString().substring(2));
  return format;
}
function formatDate(day, month, year) {
  return `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
}
function setToTimestamp(date) {
  if (typeof date === 'object') {
    return date.setHours(0, 0, 0, 0);
  }
  if (date && (!isNaN(Number(date)) || date.split('-').length !== 3)) {
    throw new Error(`The date ${date} is not valid!`);
  }
  if (date || typeof date === 'string') {
    return new Date(date + 'T00:00:00Z').getTime();
  }
  return new Date().setHours(0, 0, 0, 0);
}

function isNull(val) {
  return val === null;
}
function isArray(obj) {
  return obj !== null && Array.isArray(obj);
}
function isString(val) {
  return typeof val === 'string';
}

function getIndexForEventTarget(daysOfMonth, target) {
  return Array.prototype.slice.call(daysOfMonth).indexOf(target) + 1;
}

const CSS_CLASSES = {
  CALENDAR: 'hello-week',
  MONTH: 'month',
  DAY: 'day',
  WEEK: 'week',
  NAVIGATION: 'navigation',
  PERIOD: 'period',
  PREV: 'prev',
  NEXT: 'next',
  RTL: 'rtl',
};
const FORMAT_DATE = 'YYYY-MM-DD';
const CSS_STATES = {
  IS_HIGHLIGHT: 'is-highlight',
  IS_SELECTED: 'is-selected',
  IS_BEGIN_RANGE: 'is-begin-range',
  IS_END_RANGE: 'is-end-range',
  IS_DISABLED: 'is-disabled',
  IS_TODAY: 'is-today',
  IS_WEEKEND: 'is-weekend',
};
const DAYS_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

class HelloWeek {
  constructor(options) {
    this.calendar = {
      navigation: undefined,
      period: undefined,
      prevMonth: undefined,
      nextMonth: undefined,
      week: undefined,
      month: undefined,
    };
    this.intervalRange = {
      begin: 0,
      end: 0,
    };
    this.daysSelected = [];
    this.options = Object.assign({}, extend(options));
    HelloWeek.initOptions = Object.assign({}, extend(options));
    this.selector =
      typeof this.options.selector === 'string' ? document.querySelector(this.options.selector) : this.options.selector;
    if (isNull(this.selector)) {
      throw new Error('You need to specify a selector!');
    }
    if (this.options.selector !== HelloWeek.cssClasses.CALENDAR) {
      addClass(this.selector, HelloWeek.cssClasses.CALENDAR);
    }
    this.calendar.navigation = creatHTMLElement(this.selector, HelloWeek.cssClasses.NAVIGATION, this.selector);
    if (this.options.nav) {
      const [prev, next] = this.options.nav;
      this.calendar.prevMonth = creatHTMLElement(this.selector, HelloWeek.cssClasses.PREV, this.calendar.navigation, prev);
      this.calendar.period = creatHTMLElement(this.selector, HelloWeek.cssClasses.PERIOD, this.calendar.navigation);
      this.calendar.nextMonth = creatHTMLElement(this.selector, HelloWeek.cssClasses.NEXT, this.calendar.navigation, next);
      this.calendar.prevMonth.addEventListener('click', () => {
        this.prev(() => {});
      });
      this.calendar.nextMonth.addEventListener('click', () => {
        this.next(() => {});
      });
    } else {
      this.calendar.period = creatHTMLElement(this.selector, HelloWeek.cssClasses.PERIOD, this.calendar.navigation);
    }
    this.calendar.week = creatHTMLElement(this.selector, HelloWeek.cssClasses.WEEK, this.selector);
    this.calendar.month = creatHTMLElement(this.selector, HelloWeek.cssClasses.MONTH, this.selector);
    if (this.options.rtl) {
      addClass(this.calendar.week, HelloWeek.cssClasses.RTL);
      addClass(this.calendar.month, HelloWeek.cssClasses.RTL);
    }
    import(this.options.langFolder + this.options.lang + '.js')
      .then((data) => data)
      .then((data) => {
        this.langs = data.default;
      })
      .then(() => this.init());
  }
  static get cssClasses() {
    return CSS_CLASSES;
  }
  static get cssStates() {
    return CSS_STATES;
  }
  static get daysWeek() {
    return DAYS_WEEK;
  }
  destroy() {
    this.removeStatesClass();
    this.selector.remove();
  }
  prev(callback) {
    const prevMonth = this.date.getMonth() - 1;
    this.date.setMonth(prevMonth);
    this.update();
    this.options.onNavigation.call(this);
    if (callback) {
      callback.call(this);
    }
  }
  next(callback) {
    const nextMonth = this.date.getMonth() + 1;
    this.date.setMonth(nextMonth);
    this.update();
    this.options.onNavigation.call(this);
    if (callback) {
      callback.call(this);
    }
  }
  update() {
    this.clearCalendar();
    this.mounted();
  }
  reset(options, callback) {
    this.clearCalendar();
    this.options = extend(options, HelloWeek.initOptions);
    this.init(callback);
  }
  goToday() {
    this.date = new Date();
    this.date.setDate(1);
    this.update();
  }
  goToDate(date) {
    this.date = new Date(date || this.todayDate);
    this.date.setDate(1);
    this.update();
  }
  getDays() {
    return this.daysSelected.map((day) =>
      timestampToHuman({
        timestamp: day,
        format: this.options.format,
        langs: this.langs,
        timezoneOffset: this.options.timezoneOffset,
      })
    );
  }
  getDaySelected() {
    return this.lastSelectedDay;
  }
  getDaysHighlight() {
    return this.daysHighlight;
  }
  getMonth() {
    return this.date.getMonth() + 1;
  }
  getYear() {
    return this.date.getFullYear();
  }
  setDaysHighlight(daysHighlight) {
    this.daysHighlight = [...this.daysHighlight, ...daysHighlight];
  }
  setMultiplePick(state) {
    this.options.multiplePick = state;
  }
  setDisablePastDays(state) {
    this.options.disablePastDays = state;
  }
  setTodayHighlight(state) {
    this.options.todayHighlight = state;
  }
  setRange(state) {
    this.options.range = state;
  }
  setLocked(state) {
    this.options.locked = state;
  }
  setMinDate(date) {
    this.options.minDate = new Date(date);
    this.options.minDate.setHours(0, 0, 0, 0);
    this.options.minDate.setDate(this.options.minDate.getDate() - 1);
  }
  setMaxDate(date) {
    this.options.maxDate = new Date(date);
    this.options.maxDate.setHours(0, 0, 0, 0);
    this.options.maxDate.setDate(this.options.maxDate.getDate() + 1);
  }
  init(callback) {
    this.daysHighlight = this.options.daysHighlight ? this.options.daysHighlight : [];
    this.daysSelected = this.options.daysSelected ? this.options.daysSelected : [];
    if (this.daysSelected.length > 1 && !this.options.multiplePick) {
      throw new Error(`There are ${this.daysSelected.length} dates selected, but the multiplePick option
                is ${this.options.multiplePick}!`);
    }
    this.todayDate = setToTimestamp();
    this.date = new Date();
    this.defaultDate = new Date();
    if (this.options.defaultDate) {
      this.date = new Date(this.options.defaultDate);
      this.defaultDate = new Date(this.options.defaultDate);
      this.defaultDate.setDate(this.defaultDate.getDate());
    }
    this.date.setDate(1);
    if (this.options.minDate) {
      this.setMinDate(this.options.minDate);
    }
    if (this.options.maxDate) {
      this.setMaxDate(this.options.maxDate);
    }
    this.mounted();
    this.options.onLoad.call(this);
    if (callback) {
      callback.call(this);
    }
  }
  selectDay(callback) {
    this.daysOfMonth = this.selector.querySelectorAll('.' + HelloWeek.cssClasses.MONTH + ' .' + HelloWeek.cssClasses.DAY);
    this.daysOfMonth.forEach((element) => {
      this.handleClickInteraction(element, callback);
      if (this.options.range) {
        this.handleMouseInteraction(element);
      }
    });
  }
  getIntervalOfDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date.getTime();
    };
    while (currentDate <= endDate) {
      dates.push(
        timestampToHuman({
          timestamp: currentDate,
          format: FORMAT_DATE,
          langs: this.langs,
          timezoneOffset: this.options.timezoneOffset,
        })
      );
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
  handleClickInteraction(target, callback) {
    target.addEventListener('click', (event) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target);
      if (this.days[index].locked) {
        return;
      }
      this.lastSelectedDay = this.days[index].timestamp;
      if (!this.options.range) {
        if (this.options.multiplePick) {
          if (this.days[index].timestamp) {
            this.daysSelected = this.daysSelected.filter((day) => setToTimestamp(day) !== this.lastSelectedDay);
          }
          if (!this.days[index].isSelected) {
            this.daysSelected.push(
              timestampToHuman({
                timestamp: this.lastSelectedDay,
                format: FORMAT_DATE,
                langs: this.langs,
                timezoneOffset: this.options.timezoneOffset,
              })
            );
          }
        } else {
          if (!this.days[index].locked) {
            this.removeStatesClass();
          }
          this.daysSelected = [];
          this.daysSelected.push(
            timestampToHuman({
              timestamp: this.lastSelectedDay,
              format: FORMAT_DATE,
              langs: this.langs,
              timezoneOffset: this.options.timezoneOffset,
            })
          );
        }
      }
      toggleClass(event.target, HelloWeek.cssStates.IS_SELECTED);
      this.days[index].isSelected = !this.days[index].isSelected;
      if (this.options.range) {
        if (this.intervalRange.begin && this.intervalRange.end) {
          this.intervalRange.begin = undefined;
          this.intervalRange.end = undefined;
          this.removeStatesClass();
        }
        if (this.intervalRange.begin && !this.intervalRange.end) {
          this.intervalRange.end = this.days[index].timestamp;
          this.daysSelected = this.getIntervalOfDates(this.intervalRange.begin, this.intervalRange.end);
          addClass(event.target, HelloWeek.cssStates.IS_END_RANGE);
          if (this.intervalRange.begin > this.intervalRange.end) {
            this.intervalRange.begin = undefined;
            this.intervalRange.end = undefined;
            this.removeStatesClass();
          }
        }
        if (!this.intervalRange.begin) {
          this.intervalRange.begin = this.days[index].timestamp;
        }
        addClass(event.target, HelloWeek.cssStates.IS_SELECTED);
      }
      this.options.onSelect.call(this);
      if (callback) {
        callback.call(this);
      }
    });
  }
  handleMouseInteraction(target) {
    target.addEventListener('mouseover', (event) => {
      const index = getIndexForEventTarget(this.daysOfMonth, event.target);
      if (!this.intervalRange.begin || (this.intervalRange.begin && this.intervalRange.end)) {
        return;
      }
      this.removeStatesClass();
      for (let i = 1; i <= Object.keys(this.days).length; i++) {
        this.days[i].isSelected = false;
        if (this.days[index].timestamp >= this.intervalRange.begin) {
          if (this.days[i].timestamp >= this.intervalRange.begin && this.days[i].timestamp <= this.days[index].timestamp) {
            addClass(this.days[i].element, HelloWeek.cssStates.IS_SELECTED);
            if (this.days[i].timestamp === this.intervalRange.begin) {
              addClass(this.days[i].element, HelloWeek.cssStates.IS_BEGIN_RANGE);
            }
          }
        }
      }
    });
  }
  creatWeek(dayShort) {
    const weekDay = document.createElement('span');
    addClass(weekDay, HelloWeek.cssClasses.DAY);
    weekDay.textContent = dayShort;
    this.calendar.week.appendChild(weekDay);
  }
  createMonth() {
    const currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(this.date);
      this.date.setDate(this.date.getDate() + 1);
    }
    this.date.setMonth(this.date.getMonth() - 1);
    this.selectDay();
  }
  createDay(date) {
    const num = date.getDate();
    const day = date.getDay();
    const newDay = document.createElement('div');
    const dayOptions = {
      day: num,
      timestamp: setToTimestamp(formatDate(date.getDate(), date.getMonth(), date.getFullYear())),
      isWeekend: false,
      locked: false,
      isToday: false,
      isSelected: false,
      isHighlight: false,
      element: undefined,
    };
    this.days = this.days || [];
    newDay.textContent = dayOptions.day.toString();
    addClass(newDay, HelloWeek.cssClasses.DAY);
    if (dayOptions.day === 1) {
      if (this.options.weekStart === HelloWeek.daysWeek.SUNDAY) {
        setStyle(
          newDay,
          this.options.rtl ? 'margin-right' : 'margin-left',
          day * (100 / Object.keys(HelloWeek.daysWeek).length) + '%'
        );
      } else {
        if (day === HelloWeek.daysWeek.SUNDAY) {
          setStyle(
            newDay,
            this.options.rtl ? 'margin-right' : 'margin-left',
            (Object.keys(HelloWeek.daysWeek).length - this.options.weekStart) * (100 / Object.keys(HelloWeek.daysWeek).length) +
              '%'
          );
        } else {
          setStyle(
            newDay,
            this.options.rtl ? 'margin-right' : 'margin-left',
            (day - 1) * (100 / Object.keys(HelloWeek.daysWeek).length) + '%'
          );
        }
      }
    }
    if (day === HelloWeek.daysWeek.SUNDAY || day === HelloWeek.daysWeek.SATURDAY) {
      addClass(newDay, HelloWeek.cssStates.IS_WEEKEND);
      dayOptions.isWeekend = true;
    }
    if (
      this.options.locked ||
      (this.options.disabledDaysOfWeek && this.options.disabledDaysOfWeek.includes(day)) ||
      (this.options.disablePastDays && +this.date.setHours(0, 0, 0, 0) <= +this.defaultDate.setHours(0, 0, 0, 0) - 1) ||
      (this.options.minDate && +this.options.minDate >= dayOptions.timestamp) ||
      (this.options.maxDate && +this.options.maxDate <= dayOptions.timestamp)
    ) {
      addClass(newDay, HelloWeek.cssStates.IS_DISABLED);
      dayOptions.locked = true;
    }
    if (this.options.disableDates) {
      this.setDaysDisable(newDay, dayOptions);
    }
    if (this.todayDate === dayOptions.timestamp && this.options.todayHighlight) {
      addClass(newDay, HelloWeek.cssStates.IS_TODAY);
      dayOptions.isToday = true;
    }
    this.daysSelected.find((day) => {
      if (day === dayOptions.timestamp || setToTimestamp(day.toString()) === dayOptions.timestamp) {
        addClass(newDay, HelloWeek.cssStates.IS_SELECTED);
        dayOptions.isSelected = true;
      }
    });
    if (dayOptions.timestamp === this.intervalRange.begin) {
      addClass(newDay, HelloWeek.cssStates.IS_BEGIN_RANGE);
    }
    if (dayOptions.timestamp === this.intervalRange.end) {
      addClass(newDay, HelloWeek.cssStates.IS_END_RANGE);
    }
    if (this.daysHighlight) {
      this.setDayHighlight(newDay, dayOptions);
    }
    if (this.calendar.month) {
      this.calendar.month.appendChild(newDay);
    }
    dayOptions.element = newDay;
    this.days[dayOptions.day] = dayOptions;
  }
  setDaysDisable(newDay, dayOptions) {
    if (isArray(this.options.disableDates[0])) {
      this.options.disableDates.forEach((date) => {
        if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
          addClass(newDay, HelloWeek.cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
      return;
    }
    if (isArray(this.options.disableDates)) {
      this.options.disableDates.forEach((date) => {
        if (isString(date) && dayOptions.timestamp === setToTimestamp(date)) {
          addClass(newDay, HelloWeek.cssStates.IS_DISABLED);
          dayOptions.locked = true;
        }
      });
    }
  }
  setDayHighlight(newDay, dayOptions) {
    for (const key in this.daysHighlight) {
      if (isArray(this.daysHighlight[key].days[0])) {
        this.daysHighlight[key].days.forEach((date) => {
          if (dayOptions.timestamp >= setToTimestamp(date[0]) && dayOptions.timestamp <= setToTimestamp(date[1])) {
            this.setStyleDayHighlight(newDay, +key, dayOptions);
          }
        });
        return;
      }
      if (isArray(this.daysHighlight[key])) {
        this.daysHighlight[key].days.forEach((date) => {
          if (dayOptions.timestamp === setToTimestamp(date)) {
            this.setStyleDayHighlight(newDay, +key, dayOptions);
          }
        });
      }
    }
  }
  setStyleDayHighlight(newDay, key, dayOptions) {
    addClass(newDay, HelloWeek.cssStates.IS_HIGHLIGHT);
    if (this.daysHighlight[key].title) {
      dayOptions.title = this.daysHighlight[key].title;
      setDataAttr(newDay, 'data-title', this.daysHighlight[key].title);
    }
    if (this.daysHighlight[key].color) {
      setStyle(newDay, 'color', this.daysHighlight[key].color);
    }
    if (this.daysHighlight[key].backgroundColor) {
      setStyle(newDay, 'background-color', this.daysHighlight[key].backgroundColor);
    }
    dayOptions.isHighlight = true;
  }
  monthsAsString(monthIndex) {
    return this.options.monthShort ? this.langs.monthsShort[monthIndex] : this.langs.months[monthIndex];
  }
  weekAsString(weekIndex) {
    return this.options.weekShort ? this.langs.daysShort[weekIndex] : this.langs.days[weekIndex];
  }
  mounted() {
    const listDays = [];
    if (this.calendar.period) {
      this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear();
    }
    this.calendar.week.textContent = '';
    for (let i = this.options.weekStart; i < this.langs.daysShort.length; i++) {
      listDays.push(i);
    }
    for (let i = 0; i < this.options.weekStart; i++) {
      listDays.push(i);
    }
    for (const day of listDays) {
      this.creatWeek(this.weekAsString(day));
    }
    this.createMonth();
  }
  clearCalendar() {
    this.calendar.month.textContent = '';
  }
  removeStatesClass() {
    this.daysOfMonth.forEach((element, i) => {
      removeClass(element, HelloWeek.cssStates.IS_SELECTED);
      removeClass(element, HelloWeek.cssStates.IS_BEGIN_RANGE);
      removeClass(element, HelloWeek.cssStates.IS_END_RANGE);
      this.days[i + 1].isSelected = false;
    });
  }
}

export default HelloWeek;
