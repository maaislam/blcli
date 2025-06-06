import fecha from './fecha';

export default () => {
  var HotelDatepicker = (function (t) {
    'use strict';
    function e(t) {
      var e = Object.create(null);
      return (
        t &&
          Object.keys(t).forEach(function (s) {
            if ('default' !== s) {
              var a = Object.getOwnPropertyDescriptor(t, s);
              Object.defineProperty(
                e,
                s,
                a.get
                  ? a
                  : {
                      enumerable: !0,
                      get: function () {
                        return t[s];
                      },
                    }
              );
            }
          }),
        (e.default = t),
        Object.freeze(e)
      );
    }
    var s = e(t);
    let a = 0;
    class i {
      constructor(t, e) {
        (this._boundedEventHandlers = {}), (this.id = i.getNewId());
        const s = e || {};
        (this.className = s.className || 'datepicker'),
          (this.format = s.format || 'YYYY-MM-DD'),
          (this.infoFormat = s.infoFormat || this.format),
          (this.ariaDayFormat = s.ariaDayFormat || 'dddd, MMMM DD, YYYY'),
          (this.separator = s.separator || ' - '),
          (this.startOfWeek = s.startOfWeek || 'sunday'),
          (this.startDate = s.startDate || new Date()),
          (this.endDate = s.endDate || !1),
          (this.minNights = s.minNights || 1),
          (this.minNightsMultiple = s.minNightsMultiple || !1),
          (this.maxNights = s.maxNights || 0),
          (this.selectForward = s.selectForward || !1),
          (this.disabledDates = s.disabledDates || []),
          (this.noCheckInDates = s.noCheckInDates || []),
          (this.noCheckOutDates = s.noCheckOutDates || []),
          (this.disabledDaysOfWeek = s.disabledDaysOfWeek || []),
          (this.noCheckInDaysOfWeek = s.noCheckInDaysOfWeek || []),
          (this.noCheckOutDaysOfWeek = s.noCheckOutDaysOfWeek || []),
          (this.daysWithExtraText = []),
          (this.enableCheckout = s.enableCheckout || !1),
          (this.preventContainerClose = s.preventContainerClose || !1),
          (this.container = s.container || ''),
          (this.animationSpeed = s.animationSpeed || '.5s'),
          (this.hoveringTooltip = s.hoveringTooltip || !0),
          (this.autoClose = void 0 === s.autoClose || s.autoClose),
          (this.showTopbar = void 0 === s.showTopbar || s.showTopbar),
          (this.topbarPosition = 'bottom' === s.topbarPosition ? 'bottom' : 'top'),
          (this.moveBothMonths = s.moveBothMonths || !1),
          (this.inline = s.inline || !1),
          (this.clearButton = s.clearButton || !1),
          (this.submitButton = Boolean(this.inline && s.submitButton)),
          (this.submitButtonName = this.submitButton && s.submitButtonName ? s.submitButtonName : ''),
          (this.closeOnScroll = s.closeOnScroll || !1),
          (this.i18n = s.i18n || {
            selected: 'Your stay:',
            night: 'Night',
            nights: 'Nights',
            button: 'Close',
            clearButton: 'Clear',
            submitButton: 'Submit',
            'checkin-disabled': 'Check-in disabled',
            'checkout-disabled': 'Check-out disabled',
            'day-names-short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            'day-names': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'month-names-short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'month-names': [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            'error-more': 'Date range should not be more than 1 night',
            'error-more-plural': 'Date range should not be more than %d nights',
            'error-less': 'Date range should not be less than 1 night',
            'error-less-plural': 'Date range should not be less than %d nights',
            'info-more': 'Please select a date range of at least 1 night',
            'info-more-plural': 'Please select a date range of at least %d nights',
            'info-range': 'Please select a date range between %d and %d nights',
            'info-range-equal': 'Please select a date range of %d nights',
            'info-default': 'Please select a date range',
            'aria-application': 'Calendar',
            'aria-selected-checkin': 'Selected as check-in date, %s',
            'aria-selected-checkout': 'Selected as check-out date, %s',
            'aria-selected': 'Selected, %s',
            'aria-disabled': 'Not available, %s',
            'aria-choose-checkin': 'Choose %s as your check-in date',
            'aria-choose-checkout': 'Choose %s as your check-out date',
            'aria-prev-month': 'Move backward to switch to the previous month',
            'aria-next-month': 'Move forward to switch to the next month',
            'aria-close-button': 'Close the datepicker',
            'aria-clear-button': 'Clear the selected dates',
            'aria-submit-button': 'Submit the form',
          }),
          (this.getValue =
            s.getValue ||
            function () {
              return t.value;
            }),
          (this.setValue =
            s.setValue ||
            function (e) {
              t.value = e;
            }),
          (this.onDayClick = void 0 !== s.onDayClick && s.onDayClick),
          (this.onOpenDatepicker = void 0 !== s.onOpenDatepicker && s.onOpenDatepicker),
          (this.onSelectRange = void 0 !== s.onSelectRange && s.onSelectRange),
          (this.extraDayText = void 0 !== s.extraDayText && s.extraDayText),
          (this.input = t),
          this.init();
      }
      addBoundedListener(t, e, s, a) {
        t in this._boundedEventHandlers || (this._boundedEventHandlers[t] = {}),
          e in this._boundedEventHandlers[t] || (this._boundedEventHandlers[t][e] = []);
        const i = s.bind(this);
        this._boundedEventHandlers[t][e].push([i, a]), t.addEventListener(e, i, a);
      }
      removeAllBoundedListeners(t, e) {
        if (t in this._boundedEventHandlers) {
          const s = this._boundedEventHandlers[t];
          if (e in s) {
            const a = s[e];
            for (let s = a.length; s--; ) {
              const i = a[s];
              t.removeEventListener(e, i[0], i[1]);
            }
          }
        }
      }
      static getNewId() {
        return ++a;
      }
      setFechaI18n() {
        s.setGlobalDateI18n({
          dayNamesShort: this.i18n['day-names-short'],
          dayNames: this.i18n['day-names'],
          monthNamesShort: this.i18n['month-names-short'],
          monthNames: this.i18n['month-names'],
        });
      }
      getWeekDayNames() {
        let t = '';
        if ('monday' === this.startOfWeek) {
          for (let e = 0; e < 7; e++)
            t += '<th class="' + this.className + '__week-name">' + this.lang('day-names-short')[(1 + e) % 7] + '</th>';
          return t;
        }
        for (let e = 0; e < 7; e++)
          t += '<th class="' + this.className + '__week-name">' + this.lang('day-names-short')[e] + '</th>';
        return t;
      }
      getMonthDom(t) {
        return document.getElementById(this.getMonthTableId(t));
      }
      getMonthName(t) {
        return this.lang('month-names')[t];
      }
      getDatepickerId() {
        return this.className + '-' + this.generateId();
      }
      getMonthTableId(t) {
        return 'month-' + t + '-' + this.generateId();
      }
      getCloseButtonId() {
        return 'close-' + this.generateId();
      }
      getClearButtonId() {
        return 'clear-' + this.generateId();
      }
      getSubmitButtonId() {
        return 'submit-' + this.generateId();
      }
      getTooltipId() {
        return 'tooltip-' + this.generateId();
      }
      getNextMonth(t) {
        const e = new Date(t.valueOf());
        return new Date(e.setMonth(e.getMonth() + 1, 1));
      }
      getPrevMonth(t) {
        const e = new Date(t.valueOf());
        return new Date(e.setMonth(e.getMonth() - 1, 1));
      }
      getDateString(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.format;
        return this.setFechaI18n(), s.format(t, e);
      }
      parseDate(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.format;
        return this.setFechaI18n(), s.parse(t, e);
      }
      init() {
        (this.parent = this.container ? this.container : this.input.parentElement),
          (this.start = !1),
          (this.end = !1),
          (this.minDays = this.minNights > 1 ? this.minNights + 1 : 2),
          (this.maxDays = this.maxNights > 0 ? this.maxNights + 1 : 0),
          this.startDate && 'string' == typeof this.startDate && (this.startDate = this.parseDate(this.startDate)),
          this.endDate && 'string' == typeof this.endDate && (this.endDate = this.parseDate(this.endDate)),
          this.isTouchDevice() && (this.hoveringTooltip = !1),
          (this.isOpen = !1),
          (this.changed = !1),
          (this.justEsc = !1),
          (this.isOnFocus = !1),
          this.createDom();
        let t = new Date();
        if (
          (this.startDate && this.compareMonth(t, this.startDate) < 0 && (t = new Date(this.startDate.getTime())),
          this.endDate &&
            this.compareMonth(this.getNextMonth(t), this.endDate) > 0 &&
            (t = new Date(this.getPrevMonth(this.endDate.getTime()))),
          this.disabledDates.length > 0 && this.parseDisabledDates(),
          this.disabledDaysOfWeek.length > 0 && this.getDisabledDays(),
          this.showMonth(t, 1),
          this.showMonth(this.getNextMonth(t), 2),
          this.setDayIndexes(),
          this.topBarDefaultText(),
          this.inline && (this.openDatepicker(), this.submitButton))
        ) {
          const t = document.getElementById(this.getSubmitButtonId());
          (t.disabled = !0), t.setAttribute('aria-disabled', 'true');
        }
        if (this.clearButton && (this.inline || (!this.start && !this.end))) {
          const t = document.getElementById(this.getClearButtonId());
          (t.disabled = !0), t.setAttribute('aria-disabled', 'true');
        }
        this.addListeners(), (this.isFirstDisabledDate = 0), (this.lastDisabledDate = !1), this.setDayAriaAttributes();
      }
      addListeners() {
        const t = this.datepicker.getElementsByClassName(this.className + '__month-button--next');
        for (let e = 0; e < t.length; e++) t[e].addEventListener('click', (t) => this.goToNextMonth(t));
        const e = this.datepicker.getElementsByClassName(this.className + '__month-button--prev');
        for (let t = 0; t < e.length; t++) e[t].addEventListener('click', (t) => this.goToPreviousMonth(t));
        this.addBoundedListener(this.input, 'click', (t) => this.openDatepicker(t)),
          this.showTopbar &&
            !this.inline &&
            document.getElementById(this.getCloseButtonId()).addEventListener('click', (t) => this.closeDatepicker(t)),
          this.showTopbar &&
            this.clearButton &&
            document.getElementById(this.getClearButtonId()).addEventListener('click', (t) => this.clearDatepicker(t)),
          window.addEventListener('resize', (t) => this.onResizeDatepicker(t)),
          this.datepicker.addEventListener('mouseover', (t) => this.datepickerHover(t)),
          this.datepicker.addEventListener('mouseout', (t) => this.datepickerMouseOut(t)),
          this.addBoundedListener(this.input, 'change', () => this.checkAndSetDefaultValue()),
          this.inline ||
            (this.justEsc || this.addBoundedListener(this.input, 'focus', (t) => this.openDatepicker(t)), (this.justEsc = !1)),
          window.addEventListener('keydown', (t) => this.doKeyDown(t)),
          document.addEventListener('focus', (t) => this.checkOnFocus(t), !0),
          this.closeOnScroll && window.addEventListener('scroll', (t) => this.closeDatepicker(t));
      }
      generateId() {
        return this.input.id ? this.input.id : this.id;
      }
      createDom() {
        const t = this.createDatepickerDomString();
        this.parent.insertAdjacentHTML('beforeend', t), (this.datepicker = document.getElementById(this.getDatepickerId()));
      }
      createDatepickerDomString() {
        let t = this.inline ? ' ' + this.className + '--inline' : '';
        this.showTopbar &&
          ('bottom' === this.topbarPosition
            ? (t += ' ' + this.className + '--topbar-bottom')
            : (t += ' ' + this.className + '--topbar-top')),
          this.inline || (t += ' ' + this.className + this.className + '--topbar-has-close-button'),
          this.clearButton && (t += ' ' + this.className + '--topbar-has-clear-button'),
          this.submitButton && (t += ' ' + this.className + '--topbar-has-submit-button');
        const e = this.inline ? '' : ' style="display:none"';
        let s =
          '<div id="' +
          this.getDatepickerId() +
          '"' +
          e +
          ' class="' +
          this.className +
          ' ' +
          this.className +
          '--closed' +
          t +
          '" tabindex="0">';
        s += '<div class="' + this.className + '__inner">';
        let a = '';
        if (this.showTopbar) {
          a +=
            '<div class="' +
            this.className +
            '__topbar"><div class="' +
            this.className +
            '__info ' +
            this.className +
            '__info--selected"><span class="' +
            this.className +
            '__info ' +
            this.className +
            '__info--selected-label">' +
            this.lang('selected') +
            ' </span> <strong class="' +
            this.className +
            '__info-text ' +
            this.className +
            '__info-text--start-day">...</strong> <span class="' +
            this.className +
            '__info-text ' +
            this.className +
            '__info--separator">' +
            this.separator +
            '</span> <strong class="' +
            this.className +
            '__info-text ' +
            this.className +
            '__info-text--end-day">...</strong> <em class="' +
            this.className +
            '__info-text ' +
            this.className +
            '__info-text--selected-days">(<span></span>)</em></div><div class="' +
            this.className +
            '__info ' +
            this.className +
            '__info--feedback"></div>';
          let t = '';
          this.clearButton &&
            (t +=
              '<button type="button" id="' +
              this.getClearButtonId() +
              '" class="' +
              this.className +
              '__clear-button" aria-label="' +
              this.i18n['aria-clear-button'] +
              '">' +
              this.lang('clearButton') +
              '</button>'),
            this.inline ||
              (t +=
                '<button type="button" id="' +
                this.getCloseButtonId() +
                '" class="' +
                this.className +
                '__close-button" aria-label="' +
                this.i18n['aria-close-button'] +
                '">' +
                this.lang('button') +
                '</button>'),
            this.submitButton &&
              (t +=
                '<input type="submit" id="' +
                this.getSubmitButtonId() +
                '" class="' +
                this.className +
                '__submit-button" value="' +
                this.lang('submitButton') +
                '" name="' +
                this.submitButtonName +
                '" aria-label="' +
                this.i18n['aria-submit-button'] +
                '">'),
            t && (a += '<div class="' + this.className + '__buttons">' + t + '</div>'),
            (a += '</div>');
        }
        this.showTopbar && 'top' === this.topbarPosition && (s += a),
          (s +=
            '<div class="' +
            this.className +
            '__months" role="application" aria-roledescription="datepicker" aria-label="' +
            this.i18n['aria-application'] +
            '">');
        for (let t = 1; t <= 2; t++)
          s +=
            '<table role="presentation" id="' +
            this.getMonthTableId(t) +
            '" class="' +
            this.className +
            '__month ' +
            this.className +
            '__month--month' +
            t +
            '"><thead><tr class="' +
            this.className +
            '__month-caption"><th><span  role="button" tabindex="0" aria-label="' +
            this.i18n['aria-prev-month'] +
            '" class="' +
            this.className +
            '__month-button ' +
            this.className +
            '__month-button--prev" month="' +
            t +
            '">&lt;</span></th><th colspan="5" class="' +
            this.className +
            '__month-name"></th><th><span role="button" tabindex="0" aria-label="' +
            this.i18n['aria-next-month'] +
            '" class="' +
            this.className +
            '__month-button ' +
            this.className +
            '__month-button--next" month="' +
            t +
            '">&gt;</span></th></tr><tr class="' +
            this.className +
            '__week-days"  aria-hidden="true" role="presentation">' +
            this.getWeekDayNames(t) +
            '</tr></thead><tbody></tbody></table>';
        return (
          (s += '</div>'),
          this.showTopbar && 'bottom' === this.topbarPosition && (s += a),
          (s += '<div style="display:none" id="' + this.getTooltipId() + '" class="' + this.className + '__tooltip"></div>'),
          (s += '</div>'),
          (s += '</div>'),
          s
        );
      }
      showMonth(t, e) {
        t.setHours(0, 0, 0, 0);
        const s = this.getMonthName(t.getMonth()),
          a = this.getMonthDom(e),
          i = a.getElementsByClassName(this.className + '__month-name')[0],
          h = a.getElementsByTagName('tbody')[0];
        (i.textContent = s + ' ' + t.getFullYear()),
          this.emptyElement(h),
          h.insertAdjacentHTML('beforeend', this.createMonthDomString(t)),
          this.updateSelectableRange(),
          (this['month' + e] = t);
      }
      createMonthDomString(t) {
        const e = [];
        let s,
          a = '';
        t.setDate(1);
        let i = t.getDay();
        const h = t.getMonth();
        if ((0 === i && 'monday' === this.startOfWeek && (i = 7), i > 0))
          for (let a = i; a > 0; a--) {
            const i = new Date(t.getTime() - 864e5 * a);
            (s = this.isValidDate(i.getTime())),
              ((this.startDate && this.compareDay(i, this.startDate) < 0) ||
                (this.endDate && this.compareDay(i, this.endDate) > 0)) &&
                (s = !1),
              e.push({ date: i, type: 'lastMonth', day: i.getDate(), time: i.getTime(), valid: s });
          }
        for (let a = 0; a < 40; a++) {
          const i = this.addDays(t, a);
          (s = this.isValidDate(i.getTime())),
            ((this.startDate && this.compareDay(i, this.startDate) < 0) ||
              (this.endDate && this.compareDay(i, this.endDate) > 0)) &&
              (s = !1),
            e.push({
              date: i,
              type: i.getMonth() === h ? 'visibleMonth' : 'nextMonth',
              day: i.getDate(),
              time: i.getTime(),
              valid: s,
            });
        }
        for (let t = 0; t < 6 && 'nextMonth' !== e[7 * t].type; t++) {
          a += '<tr class="' + this.className + '__week-row">';
          for (let s = 0; s < 7; s++) {
            let i = 'monday' === this.startOfWeek ? s + 1 : s;
            i = e[7 * t + i];
            const h = this.getDayClasses(i);
            let n = '';
            this.hasClass(i, this.className + '__month-day--no-checkin') && (n = this.i18n['checkin-disabled']),
              this.hasClass(i, +this.className + '__month-day--no-checkout') &&
                (n && (n += '. '), (n += this.i18n['checkout-disabled']));
            const o = { daytype: i.type, time: i.time, class: h.join(' '), d: s + 1 };
            n && (o.title = n),
              (o.role = 'button'),
              this.getDateString(i.time) === this.getDateString(new Date()) && (o.tabindex = '0');
            let l = '';
            this.extraDayText && (l = this.extraDayText(this.getDateString(i.time), o)),
              (l = l || ''),
              l &&
                ((o.class = o.class + ' ' + this.className + '__month-day--with-extra'),
                this.daysWithExtraText.push(this.getDateString(i.time))),
              (a += '<td class="' + o.class + '" ' + this.printAttributes(o) + '>' + i.day + l + '</td>');
          }
          a += '</tr>';
        }
        return a;
      }
      openDatepicker() {
        this.isOpen ||
          (this.removeClass(this.datepicker, this.className + '--closed'),
          this.addClass(this.datepicker, this.className + '--open'),
          this.checkAndSetDefaultValue(),
          this.inline || this.slideDown(this.datepicker, this.animationSpeed),
          (this.isOpen = !0),
          this.showSelectedDays(),
          this.disableNextPrevButtons(),
          this.addBoundedListener(document, 'click', (t) => this.documentClick(t)),
          this.onOpenDatepicker && this.onOpenDatepicker());
      }
      closeDatepicker() {
        if (!this.isOpen || this.inline) return;
        this.removeClass(this.datepicker, this.className + '--open'),
          this.addClass(this.datepicker, this.className + '--closed'),
          this.slideUp(this.datepicker, this.animationSpeed),
          (this.isOpen = !1);
        const t = document.createEvent('Event');
        t.initEvent('afterClose', !0, !0), this.input.dispatchEvent(t), this.removeAllBoundedListeners(document, 'click');
      }
      autoclose() {
        this.autoClose && this.changed && this.isOpen && this.start && this.end && !this.inline && this.closeDatepicker();
      }
      documentClick(t) {
        this.parent.contains(t.target) || t.target === this.input
          ? 'td' === t.target.tagName.toLowerCase() && this.dayClicked(t.target)
          : this.preventContainerClose || this.closeDatepicker();
      }
      datepickerHover(t) {
        t.target.tagName && 'td' === t.target.tagName.toLowerCase() && this.dayHovering(t.target);
      }
      datepickerMouseOut(t) {
        if (t.target.tagName && 'td' === t.target.tagName.toLowerCase()) {
          document.getElementById(this.getTooltipId()).style.display = 'none';
        }
      }
      onResizeDatepicker() {
        this.checkAndSetDefaultValue(!0);
      }
      getDayClasses(t) {
        const e = this.getDateString(t.time) === this.getDateString(new Date()),
          a = this.getDateString(t.time) === this.getDateString(this.startDate),
          i = this.daysWithExtraText.indexOf(this.getDateString(t.time)) > -1;
        let h = !1,
          n = !1,
          o = !1,
          l = !1,
          r = !1,
          d = !1;
        if (t.valid || 'visibleMonth' === t.type) {
          const e = this.getDateString(t.time, 'YYYY-MM-DD');
          if (this.disabledDates.length > 0) {
            const s = this.getClosestDisabledDates(t.date);
            if (
              (!1 === s[0] && (s[0] = this.substractDays(this.startDate, 1)),
              s[0] && s[1] && this.compareDay(t.date, s[0]) && this.countDays(s[0], s[1]) - 2 > 0)
            ) {
              const e = this.countDays(s[1], t.date) - 1,
                a = this.countDays(t.date, s[0]) - 1;
              ((this.selectForward && e < this.minDays) || (!this.selectForward && e < this.minDays && a < this.minDays)) &&
                (t.valid = !1),
                !t.valid && this.enableCheckout && 2 === e && (d = !0);
            }
            this.disabledDates.indexOf(e) > -1
              ? ((t.valid = !1), (h = !0), this.isFirstDisabledDate++, (this.lastDisabledDate = t.date))
              : (this.isFirstDisabledDate = 0),
              t.valid &&
                this.lastDisabledDate &&
                this.compareDay(t.date, this.lastDisabledDate) > 0 &&
                2 === this.countDays(t.date, this.lastDisabledDate) &&
                (r = !0);
          }
          this.disabledDaysOfWeek.length > 0 &&
            this.disabledDaysOfWeek.indexOf(s.format(t.time, 'dddd')) > -1 &&
            ((t.valid = !1), (l = !0)),
            this.noCheckInDates.length > 0 && this.noCheckInDates.indexOf(e) > -1 && ((n = !0), (r = !1)),
            this.noCheckOutDates.length > 0 && this.noCheckOutDates.indexOf(e) > -1 && (o = !0),
            this.noCheckInDaysOfWeek.length > 0 &&
              this.noCheckInDaysOfWeek.indexOf(s.format(t.time, 'dddd')) > -1 &&
              ((n = !0), (r = !1)),
            this.noCheckOutDaysOfWeek.length > 0 && this.noCheckOutDaysOfWeek.indexOf(s.format(t.time, 'dddd')) > -1 && (o = !0);
        }
        return [
          this.className + '__month-day',
          this.className + '__month-day--' + t.type,
          this.className + '__month-day--' + (t.valid ? 'valid' : 'invalid'),
          e ? this.className + '__month-day--today' : '',
          h ? this.className + '__month-day--disabled' : '',
          h && this.enableCheckout && 1 === this.isFirstDisabledDate ? this.className + '__month-day--checkout-enabled' : '',
          d ? this.className + '__month-day--before-disabled-date' : '',
          a || r ? this.className + '__month-day--checkin-only' : '',
          n ? this.className + '__month-day--no-checkin' : '',
          o ? this.className + '__month-day--no-checkout' : '',
          l ? this.className + '__month-day--day-of-week-disabled' : '',
          i ? this.className + '__month-day--with-extra' : '',
        ];
      }
      checkAndSetDayClasses() {
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++) {
          const s = parseInt(t[e].getAttribute('time'), 10),
            a = new Date(s),
            i = t[e].getAttribute('daytype');
          let h;
          (h = this.isValidDate(a.getTime())),
            ((this.startDate && this.compareDay(a, this.startDate) < 0) ||
              (this.endDate && this.compareDay(a, this.endDate) > 0)) &&
              (h = !1);
          const n = { date: a, type: i, day: a.getDate(), time: s, valid: h },
            o = this.getDayClasses(n);
          t[e].className = o.join(' ');
        }
      }
      checkAndSetDefaultValue() {
        let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        const e = this.getValue(),
          s = e ? e.split(this.separator) : '';
        if (s && s.length >= 2) {
          const e = this.format;
          (this.changed = !1), this.setDateRange(this.parseDate(s[0], e), this.parseDate(s[1], e), t), (this.changed = !0);
        } else if (this.showTopbar) {
          if (((this.datepicker.getElementsByClassName(this.className + '__info--selected')[0].style.display = 'none'), t)) {
            let t = new Date();
            this.startDate && this.compareMonth(t, this.startDate) < 0 && (t = new Date(this.startDate.getTime())),
              this.endDate &&
                this.compareMonth(this.getNextMonth(t), this.endDate) > 0 &&
                (t = new Date(this.getPrevMonth(this.endDate.getTime()))),
              this.start && !this.end && this.clearSelection(),
              this.showMonth(t, 1),
              this.showMonth(this.getNextMonth(t), 2),
              this.setDayIndexes();
          }
        }
      }
      setDateRange(t, e) {
        let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (t.getTime() > e.getTime()) {
          let s = e;
          (e = t), (t = s), (s = null);
        }
        let a = !0;
        if (
          (((this.startDate && this.compareDay(t, this.startDate) < 0) ||
            (this.endDate && this.compareDay(e, this.endDate) > 0)) &&
            (a = !1),
          !a)
        )
          return (
            this.showMonth(this.startDate, 1),
            this.showMonth(this.getNextMonth(this.startDate), 2),
            this.setDayIndexes(),
            this.showSelectedDays(),
            void this.disableNextPrevButtons()
          );
        t.setTime(t.getTime() + 432e5),
          e.setTime(e.getTime() + 432e5),
          (this.start = t.getTime()),
          (this.end = e.getTime()),
          this.compareDay(t, e) > 0 && 0 === this.compareMonth(t, e) && (e = this.getNextMonth(t)),
          0 === this.compareMonth(t, e) && (e = this.getNextMonth(t)),
          this.showMonth(t, 1),
          this.showMonth(e, 2),
          this.setDayIndexes(),
          this.showSelectedDays(),
          this.disableNextPrevButtons(),
          this.checkSelection(),
          this.showSelectedInfo(),
          s || this.autoclose(),
          this.setDayAriaAttributes();
      }
      showSelectedDays() {
        if (!this.start && !this.end) return;
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++) {
          const s = parseInt(t[e].getAttribute('time'), 10);
          (this.start && this.end && this.end >= s && this.start <= s) ||
          (this.start && !this.end && this.getDateString(this.start, 'YYYY-MM-DD') === this.getDateString(s, 'YYYY-MM-DD'))
            ? this.addClass(t[e], this.className + '__month-day--selected')
            : this.removeClass(t[e], this.className + '__month-day--selected'),
            this.start && this.getDateString(this.start, 'YYYY-MM-DD') === this.getDateString(s, 'YYYY-MM-DD')
              ? this.addClass(t[e], this.className + '__month-day--first-day-selected')
              : this.removeClass(t[e], this.className + '__month-day--first-day-selected'),
            this.end && this.getDateString(this.end, 'YYYY-MM-DD') === this.getDateString(s, 'YYYY-MM-DD')
              ? this.addClass(t[e], this.className + '__month-day--last-day-selected')
              : this.removeClass(t[e], this.className + '__month-day--last-day-selected');
        }
      }
      showSelectedInfo() {
        if (!this.showTopbar) {
          if (this.start && this.end) {
            const t = this.getDateString(new Date(this.start)) + this.separator + this.getDateString(new Date(this.end));
            this.setValue(t, this.getDateString(new Date(this.start)), this.getDateString(new Date(this.end))),
              (this.changed = !0);
          }
          return;
        }
        const t = this.datepicker.getElementsByClassName(this.className + '__info--selected')[0],
          e = t.getElementsByClassName(this.className + '__info-text--start-day')[0],
          s = t.getElementsByClassName(this.className + '__info-text--end-day')[0],
          a = t.getElementsByClassName(this.className + '__info-text--selected-days')[0],
          i = document.getElementById(this.getCloseButtonId()),
          h = document.getElementById(this.getClearButtonId()),
          n = document.getElementById(this.getSubmitButtonId());
        if (
          ((e.textContent = '...'),
          (s.textContent = '...'),
          (a.style.display = 'none'),
          this.start &&
            ((t.style.display = ''),
            (e.textContent = this.getDateString(new Date(parseInt(this.start, 10)), this.infoFormat)),
            this.clearButton && ((h.disabled = !1), h.setAttribute('aria-disabled', 'false'))),
          this.end && (s.textContent = this.getDateString(new Date(parseInt(this.end, 10)), this.infoFormat)),
          this.start && this.end)
        ) {
          const t = this.countDays(this.getDateString(new Date(this.end)), this.getDateString(new Date(this.start))) - 1,
            e = 1 === t ? t + ' ' + this.lang('night') : t + ' ' + this.lang('nights'),
            s = this.getDateString(new Date(this.start)) + this.separator + this.getDateString(new Date(this.end));
          (a.style.display = ''),
            (a.firstElementChild.textContent = e),
            this.inline
              ? this.submitButton && ((n.disabled = !1), n.setAttribute('aria-disabled', 'false'))
              : ((i.disabled = !1), i.setAttribute('aria-disabled', 'false')),
            this.setValue(s, this.getDateString(new Date(this.start)), this.getDateString(new Date(this.end))),
            (this.changed = !0);
        } else
          this.inline || !1 !== this.start || !1 !== this.end
            ? this.inline
              ? this.submitButton && ((n.disabled = !0), n.setAttribute('aria-disabled', 'true'))
              : ((i.disabled = !0), i.setAttribute('aria-disabled', 'true'))
            : ((i.disabled = !1), i.setAttribute('aria-disabled', 'false'));
        !this.clearButton || this.start || this.end || ((h.disabled = !0), h.setAttribute('aria-disabled', 'true'));
      }
      dayClicked(t) {
        if (this.hasClass(t, this.className + '__month-day--invalid')) return;
        const e = (this.start && this.end) || (!this.start && !this.end),
          s = parseInt(t.getAttribute('time'), 10);
        if (e) {
          if (this.hasClass(t, this.className + '__month-day--no-checkin')) return;
        } else if (this.start) {
          if (this.start > s && this.hasClass(t, this.className + '__month-day--no-checkin')) return;
          const e = this.datepicker.querySelectorAll('td[time="' + this.start + '"]')[0];
          if (e && this.hasClass(e, this.className + '__month-day--no-checkout') && this.start > s) return;
          if (this.hasClass(t, this.className + '__month-day--no-checkout') && s > this.start) return;
        }
        if (
          (this.addClass(t, this.className + '__month-day--selected'),
          e ? ((this.start = s), (this.end = !1)) : this.start && (this.end = s),
          this.start && this.end && this.start > this.end)
        ) {
          const t = this.end;
          (this.end = this.start), (this.start = t);
        }
        (this.start = parseInt(this.start, 10)),
          (this.end = parseInt(this.end, 10)),
          this.clearHovering(),
          this.start && !this.end && this.dayHovering(t),
          this.updateSelectableRange(),
          this.checkSelection(),
          this.showSelectedInfo(),
          this.start && this.end && this.checkAndSetDayClasses(),
          this.showSelectedDays(),
          this.autoclose(),
          this.onDayClick && this.onDayClick(),
          this.end && this.onSelectRange && this.onSelectRange(),
          this.setDayAriaAttributes();
      }
      isValidDate(t) {
        if (
          ((t = parseInt(t, 10)),
          (this.startDate && this.compareDay(t, this.startDate) < 0) || (this.endDate && this.compareDay(t, this.endDate) > 0))
        )
          return !1;
        if (this.start && !this.end) {
          if (
            (this.maxDays > 0 && this.countDays(t, this.start) > this.maxDays) ||
            (this.minDays > 0 && this.countDays(t, this.start) > 1 && this.countDays(t, this.start) < this.minDays)
          )
            return !1;
          if (this.minNightsMultiple && (this.countDays(t, this.start) - 1) % 7 != 0) return !1;
          if (this.selectForward && t < this.start) return !1;
          if (this.disabledDates.length > 0) {
            const e = this.getClosestDisabledDates(new Date(parseInt(this.start, 10)));
            if (e[0] && this.compareDay(t, e[0]) <= 0) return !1;
            if (e[1] && this.compareDay(t, e[1]) >= 0) return !1;
          }
          if (this.disabledDaysOfWeek.length > 0) {
            const e = this.getClosestDisabledDays(new Date(parseInt(this.start, 10)));
            if (e[0] && this.compareDay(t, e[0]) <= 0) return !1;
            if (e[1] && this.compareDay(t, e[1]) >= 0) return !1;
          }
        }
        return !0;
      }
      checkSelection() {
        const t = this.countDays(this.end, this.start),
          e = !!this.showTopbar && this.datepicker.getElementsByClassName(this.className + '__info--feedback')[0];
        if (this.maxDays && t > this.maxDays) {
          (this.start = !1), (this.end = !1);
          const t = this.datepicker.getElementsByTagName('td');
          for (let e = 0; e < t.length; e++)
            this.removeClass(t[e], this.className + '__month-day--selected'),
              this.removeClass(t[e], this.className + '__month-day--first-day-selected'),
              this.removeClass(t[e], this.className + '__month-day--last-day-selected');
          if (this.showTopbar) {
            const t = this.maxDays - 1;
            this.topBarErrorText(e, 'error-more', t);
          }
        } else if (this.minDays && t < this.minDays) {
          (this.start = !1), (this.end = !1);
          const t = this.datepicker.getElementsByTagName('td');
          for (let e = 0; e < t.length; e++)
            this.removeClass(t[e], this.className + '__month-day--selected'),
              this.removeClass(t[e], this.className + '__month-day--first-day-selected'),
              this.removeClass(t[e], this.className + '__month-day--last-day-selected');
          if (this.showTopbar) {
            const t = this.minDays - 1;
            this.topBarErrorText(e, 'error-less', t);
          }
        } else
          this.start || this.end
            ? this.showTopbar &&
              (this.removeClass(e, this.className + '__info--error'), this.removeClass(e, this.className + '__info--help'))
            : this.showTopbar &&
              (this.removeClass(e, this.className + '__info--error'), this.addClass(e, this.className + '__info--help'));
      }
      addDays(t, e) {
        const s = new Date(t);
        return s.setDate(s.getDate() + e), s;
      }
      substractDays(t, e) {
        const s = new Date(t);
        return s.setDate(s.getDate() - e), s;
      }
      countDays(t, e) {
        return Math.abs(this.daysFrom1970(t) - this.daysFrom1970(e)) + 1;
      }
      compareDay(t, e) {
        const s = parseInt(this.getDateString(t, 'YYYYMMDD'), 10) - parseInt(this.getDateString(e, 'YYYYMMDD'), 10);
        return s > 0 ? 1 : 0 === s ? 0 : -1;
      }
      compareMonth(t, e) {
        const s = parseInt(this.getDateString(t, 'YYYYMM'), 10) - parseInt(this.getDateString(e, 'YYYYMM'), 10);
        return s > 0 ? 1 : 0 === s ? 0 : -1;
      }
      daysFrom1970(t) {
        return Math.round(this.toLocalTimestamp(t) / 864e5);
      }
      toLocalTimestamp(t) {
        return (
          'object' == typeof t && t.getTime && (t = t.getTime()),
          'string' != typeof t || t.match(/\d{13}/) || (t = this.parseDate(t).getTime()),
          (t = parseInt(t, 10) - 60 * new Date().getTimezoneOffset() * 1e3)
        );
      }
      printAttributes(t) {
        const e = t;
        let s = '';
        for (const a in t) Object.prototype.hasOwnProperty.call(e, a) && (s += a + '="' + e[a] + '" ');
        return s;
      }
      goToNextMonth(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const s = Number.isInteger(t) ? t : t.target.getAttribute('month'),
          a = s > 1;
        let i = a ? this.month2 : this.month1;
        return (
          (i = this.getNextMonth(i)),
          !((!this.isSingleMonth() && !a && this.compareMonth(i, this.month2) >= 0) || this.isMonthOutOfRange(i)) &&
            ((this.moveBothMonths || e) && a && this.showMonth(this.month2, 1),
            this.showMonth(i, s),
            this.setDayIndexes(),
            this.showSelectedDays(),
            this.disableNextPrevButtons(),
            !0)
        );
      }
      goToPreviousMonth(t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        const s = Number.isInteger(t) ? t : t.target.getAttribute('month'),
          a = s > 1;
        let i = a ? this.month2 : this.month1;
        return (
          (i = this.getPrevMonth(i)),
          !((a && this.compareMonth(i, this.month1) <= 0) || this.isMonthOutOfRange(i)) &&
            ((!this.moveBothMonths && !e) || a || this.showMonth(this.month1, 2),
            this.showMonth(i, s),
            this.setDayIndexes(),
            this.showSelectedDays(),
            this.disableNextPrevButtons(),
            !0)
        );
      }
      isSingleMonth() {
        return !this.isVisible(this.getMonthDom(2));
      }
      isMonthOutOfRange(t) {
        const e = new Date(t.valueOf());
        return !!(
          (this.startDate && new Date(e.getFullYear(), e.getMonth() + 1, 0, 23, 59, 59) < this.startDate) ||
          (this.endDate && new Date(e.getFullYear(), e.getMonth(), 1) > this.endDate)
        );
      }
      disableNextPrevButtons() {
        if (this.isSingleMonth()) return;
        const t = parseInt(this.getDateString(this.month1, 'YYYYMM'), 10),
          e = parseInt(this.getDateString(this.month2, 'YYYYMM'), 10),
          s = Math.abs(t - e),
          a = this.datepicker.getElementsByClassName(this.className + '__month-button--next'),
          i = this.datepicker.getElementsByClassName(this.className + '__month-button--prev');
        s > 1 && 89 !== s
          ? (this.removeClass(a[0], this.className + '__month-button--disabled'),
            a[0].setAttribute('aria-disabled', 'false'),
            this.removeClass(i[1], this.className + '__month-button--disabled'),
            i[1].setAttribute('aria-disabled', 'false'))
          : (this.addClass(a[0], this.className + '__month-button--disabled'),
            a[0].setAttribute('aria-disabled', 'true'),
            this.addClass(i[1], this.className + '__month-button--disabled'),
            i[1].setAttribute('aria-disabled', 'true')),
          this.isMonthOutOfRange(this.getPrevMonth(this.month1))
            ? (this.addClass(i[0], this.className + '__month-button--disabled'), i[0].setAttribute('aria-disabled', 'true'))
            : (this.removeClass(i[0], this.className + '__month-button--disabled'), i[0].setAttribute('aria-disabled', 'false')),
          this.isMonthOutOfRange(this.getNextMonth(this.month2))
            ? (this.addClass(a[1], this.className + '__month-button--disabled'), a[1].setAttribute('aria-disabled', 'true'))
            : (this.removeClass(a[1], this.className + '__month-button--disabled'), a[1].setAttribute('aria-disabled', 'false'));
      }
      topBarDefaultText() {
        if (!this.showTopbar) return;
        let t = '';
        t =
          this.minDays && this.maxDays
            ? this.minDays === this.maxDays
              ? this.lang('info-range-equal')
              : this.lang('info-range')
            : this.minDays && this.minDays > 2
            ? this.lang('info-more-plural')
            : this.minDays
            ? this.lang('info-more')
            : this.lang('info-default');
        const e = this.datepicker.getElementsByClassName(this.className + '__info--feedback')[0];
        (t = t.replace(/%d/, this.minDays - 1).replace(/%d/, this.maxDays - 1)),
          this.addClass(e, this.className + '__info--help'),
          this.removeClass(e, this.className + '__info--error'),
          (e.textContent = t);
      }
      topBarErrorText(t, e, s) {
        if (!this.showTopbar) return;
        this.addClass(t, this.className + '__info--error'),
          this.removeClass(t, this.className + '__info--help'),
          s > 1 ? ((e = (e = this.lang(e + '-plural')).replace('%d', s)), (t.textContent = e)) : (e = this.lang(e));
        this.datepicker.getElementsByClassName(this.className + '__info--selected')[0].style.display = 'none';
      }
      updateSelectableRange() {
        const t = this.datepicker.getElementsByTagName('td'),
          e = this.start && !this.end;
        for (let s = 0; s < t.length; s++)
          if (
            (this.hasClass(t[s], this.className + '__month-day--invalid') &&
              this.hasClass(t[s], this.className + '__month-day--tmp') &&
              (this.removeClass(t[s], this.className + '__month-day--tmp'),
              this.hasClass(t[s], this.className + '__month-day--tmpinvalid')
                ? this.removeClass(t[s], this.className + '__month-day--tmpinvalid')
                : (this.removeClass(t[s], this.className + '__month-day--invalid'),
                  this.addClass(t[s], this.className + '__month-day--valid'))),
            e)
          ) {
            if (
              this.hasClass(t[s], this.className + '__month-day--visibleMonth') &&
              (this.hasClass(t[s], this.className + '__month-day--valid') ||
                this.hasClass(t[s], this.className + '__month-day--disabled') ||
                this.hasClass(t[s], this.className + '__month-day--before-disabled-date'))
            ) {
              const e = parseInt(t[s].getAttribute('time'), 10);
              this.isValidDate(e)
                ? (this.addClass(t[s], this.className + '__month-day--valid'),
                  this.addClass(t[s], this.className + '__month-day--tmp'),
                  this.removeClass(t[s], this.className + '__month-day--invalid'),
                  this.removeClass(t[s], this.className + '__month-day--disabled'))
                : (this.hasClass(t[s], this.className + '__month-day--invalid') &&
                    this.addClass(t[s], this.className + '__month-day--tmpinvalid'),
                  this.addClass(t[s], this.className + '__month-day--invalid'),
                  this.addClass(t[s], this.className + '__month-day--tmp'),
                  this.removeClass(t[s], this.className + '__month-day--valid'));
            }
            this.setDayAriaAttributes();
          } else
            (this.hasClass(t[s], this.className + '__month-day--checkout-enabled') ||
              this.hasClass(t[s], this.className + '__month-day--before-disabled-date')) &&
              (this.addClass(t[s], this.className + '__month-day--invalid'),
              this.removeClass(t[s], this.className + '__month-day--valid'),
              this.hasClass(t[s], this.className + '__month-day--before-disabled-date') ||
                this.addClass(t[s], this.className + '__month-day--disabled'));
        return !0;
      }
      dayHovering(t) {
        const e = parseInt(t.getAttribute('time'), 10);
        let s = '';
        if (!this.hasClass(t, this.className + '__month-day--invalid')) {
          const t = this.datepicker.getElementsByTagName('td');
          for (let s = 0; s < t.length; s++) {
            const a = parseInt(t[s].getAttribute('time'), 10);
            a === e
              ? this.addClass(t[s], this.className + '__month-day--hovering')
              : this.removeClass(t[s], this.className + '__month-day--hovering'),
              this.start && !this.end && ((this.start < a && e >= a) || (this.start > a && e <= a))
                ? this.addClass(t[s], this.className + '__month-day--hovering')
                : this.removeClass(t[s], this.className + '__month-day--hovering');
          }
          if (this.start && !this.end) {
            const t = this.countDays(e, this.start) - 1;
            if (this.hoveringTooltip)
              if ('function' == typeof this.hoveringTooltip) s = this.hoveringTooltip(t, this.start, e);
              else if (!0 === this.hoveringTooltip && t > 0) {
                s = t + ' ' + (1 === t ? this.lang('night') : this.lang('nights'));
              }
          }
        }
        if (s) {
          const e = t.getBoundingClientRect(),
            a = this.datepicker.getBoundingClientRect();
          let i = e.left - a.left,
            h = e.top - a.top;
          i += e.width / 2;
          const n = document.getElementById(this.getTooltipId());
          (n.style.display = ''), (n.textContent = s);
          const o = n.getBoundingClientRect().width,
            l = n.getBoundingClientRect().height;
          (i -= o / 2),
            (h -= l),
            setTimeout(() => {
              (n.style.left = i + 'px'), (n.style.top = h + 'px');
            }, 10);
        } else {
          document.getElementById(this.getTooltipId()).style.display = 'none';
        }
      }
      clearHovering() {
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++) this.removeClass(t[e], this.className + '__month-day--hovering');
        document.getElementById(this.getTooltipId()).style.display = 'none';
      }
      clearSelection() {
        (this.start = !1), (this.end = !1);
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++)
          this.removeClass(t[e], this.className + '__month-day--selected'),
            this.removeClass(t[e], this.className + '__month-day--first-day-selected'),
            this.removeClass(t[e], this.className + '__month-day--last-day-selected'),
            this.removeClass(t[e], this.className + '__month-day--hovering');
        this.setValue(''), this.checkSelection(), this.showSelectedInfo(), this.showSelectedDays();
      }
      clearDatepicker() {
        (this.start = !1), (this.end = !1);
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++)
          this.removeClass(t[e], this.className + '__month-day--selected'),
            this.removeClass(t[e], this.className + '__month-day--first-day-selected'),
            this.removeClass(t[e], this.className + '__month-day--last-day-selected'),
            this.removeClass(t[e], this.className + '__month-day--hovering');
        this.setValue(''), this.checkSelection(), this.showSelectedInfo();
        (this.datepicker.getElementsByClassName(this.className + '__info--selected')[0].style.display = 'none'),
          this.showSelectedDays(),
          this.updateSelectableRange();
        const e = document.createEvent('Event');
        e.initEvent('afterClear', !0, !0), this.input.dispatchEvent(e);
      }
      parseDisabledDates() {
        const t = [];
        this.setFechaI18n();
        for (let e = 0; e < this.disabledDates.length; e++) t[e] = s.parse(this.disabledDates[e], 'YYYY-MM-DD');
        t.sort((t, e) => t - e), (this.disabledDatesTime = t);
      }
      getClosestDisabledDates(t) {
        let e = [!1, !1];
        if (t < this.disabledDatesTime[0])
          e = this.enableCheckout ? [!1, this.addDays(this.disabledDatesTime[0], 1)] : [!1, this.disabledDatesTime[0]];
        else if (t > this.disabledDatesTime[this.disabledDatesTime.length - 1])
          e = [this.disabledDatesTime[this.disabledDatesTime.length - 1], !1];
        else {
          let s = this.disabledDatesTime.length,
            a = this.disabledDatesTime.length;
          const i = Math.abs(new Date(0, 0, 0).valueOf());
          let h,
            n = i,
            o = -i,
            l = 0;
          for (h = 0; h < this.disabledDatesTime.length; ++h)
            (l = t - this.disabledDatesTime[h]), l < 0 && l > o && ((a = h), (o = l)), l > 0 && l < n && ((s = h), (n = l));
          this.disabledDatesTime[s] && (e[0] = this.disabledDatesTime[s]),
            void 0 === this.disabledDatesTime[s]
              ? (e[1] = !1)
              : this.enableCheckout
              ? (e[1] = this.addDays(this.disabledDatesTime[a], 1))
              : (e[1] = this.disabledDatesTime[a]);
        }
        return e;
      }
      getDisabledDays() {
        const t = [],
          e = [],
          a = new Date();
        for (let e = 0; e < 7; e++) {
          const i = this.addDays(a, e);
          t[s.format(i, 'd')] = s.format(i, 'dddd');
        }
        for (let s = 0; s < this.disabledDaysOfWeek.length; s++) e.push(t.indexOf(this.disabledDaysOfWeek[s]));
        e.sort(), (this.disabledDaysIndexes = e);
      }
      getClosestDisabledDays(t) {
        const e = [!1, !1];
        for (let a = 0; a < 7; a++) {
          const i = this.substractDays(t, a);
          if (this.disabledDaysIndexes.indexOf(parseInt(s.format(i, 'd'), 10)) > -1) {
            e[0] = i;
            break;
          }
        }
        for (let a = 0; a < 7; a++) {
          const i = this.addDays(t, a);
          if (this.disabledDaysIndexes.indexOf(parseInt(s.format(i, 'd'), 10)) > -1) {
            e[1] = i;
            break;
          }
        }
        return e;
      }
      lang(t) {
        return t in this.i18n ? this.i18n[t] : '';
      }
      emptyElement(t) {
        for (; t.firstChild; ) t.removeChild(t.firstChild);
      }
      classRegex(t) {
        return new RegExp('(^|\\s+)' + t + '(\\s+|$)');
      }
      hasClass(t, e) {
        return this.classRegex(e).test(t.className);
      }
      addClass(t, e) {
        this.hasClass(t, e) || (t.className = t.className + ' ' + e);
      }
      removeClass(t, e) {
        t.className = t.className.replace(this.classRegex(e), ' ');
      }
      isVisible(t) {
        return t.offsetWidth || t.offsetHeight || t.getClientRects().length;
      }
      slideDown(t, e) {
        t.style.display = '';
        const s = t.getBoundingClientRect().height;
        (t.style.height = 0),
          this.recalc(t.offsetHeight),
          (t.style.transition = 'height ' + e),
          (t.style.height = s + 'px'),
          t.addEventListener('transitionend', () => {
            t.style.height = t.style.transition = t.style.display = '';
          });
      }
      slideUp(t, e) {
        const s = t.getBoundingClientRect().height;
        (t.style.height = s + 'px'),
          this.recalc(t.offsetHeight),
          (t.style.transition = 'height ' + e),
          (t.style.height = 0),
          t.addEventListener('transitionend', () => {
            t.style.display = 'none';
          });
      }
      recalc(t) {
        return t.offsetHeight;
      }
      isTouchDevice() {
        return 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch);
      }
      setDayAriaAttributes() {
        const t = this.datepicker.getElementsByTagName('td');
        for (let e = 0; e < t.length; e++) {
          const a = t[e].className,
            i = parseInt(t[e].getAttribute('time'), 10);
          let h = 'false',
            n = '';
          a.includes(this.className + '__month-day--invalid')
            ? ((n = this.replacei18n(this.i18n['aria-disabled'], s.format(i, this.ariaDayFormat))), (h = 'true'))
            : (n = a.includes(this.className + '__month-day--first-day-selected')
                ? this.replacei18n(this.i18n['aria-selected-checkin'], s.format(i, this.ariaDayFormat))
                : a.includes(this.className + '__month-day--last-day-selected')
                ? this.replacei18n(this.i18n['aria-selected-checkout'], s.format(i, this.ariaDayFormat))
                : a.includes(this.className + '__month-day--selected')
                ? this.replacei18n(this.i18n['aria-selected'], s.format(i, this.ariaDayFormat))
                : this.start && !this.end
                ? this.replacei18n(this.i18n['aria-choose-checkout'], s.format(i, this.ariaDayFormat))
                : this.replacei18n(this.i18n['aria-choose-checkin'], s.format(i, this.ariaDayFormat))),
            n && t[e].setAttribute('aria-label', n),
            t[e].setAttribute('aria-disabled', h);
        }
      }
      replacei18n(t, e) {
        return t.replace('%s', e);
      }
      checkOnFocus(t) {
        (t.target && this.input === t.target) || this.datepicker.contains(t.target)
          ? (this.isOnFocus = !0)
          : ((this.isOnFocus = !1), this.isOpen && this.closeDatepicker());
      }
      doKeyDown(t) {
        switch (t.keyCode) {
          case 39:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('next'));
            break;
          case 37:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('prev'));
            break;
          case 40:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('down'));
            break;
          case 38:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('up'));
            break;
          case 36:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('first'));
            break;
          case 35:
            this.isOnFocus && (t.preventDefault(), this.setActiveDay('last'));
            break;
          case 27:
            this.isOnFocus && null !== this.input.offsetParent && this.setFocusToInput();
            break;
          case 34:
            this.isOnFocus && (t.preventDefault(), this.moveMonthFromKeyboard('next'));
            break;
          case 33:
            this.isOnFocus && (t.preventDefault(), this.moveMonthFromKeyboard('prev'));
            break;
          case 13:
            this.isOnFocus && (t.preventDefault(), this.handleReturn());
        }
      }
      setActiveDay(t) {
        const e = document.activeElement;
        if (e && this.hasClass(e, this.className + '__month-day--visibleMonth') && this.datepicker.contains(e)) {
          const s = parseInt(e.getAttribute('index'), 10),
            a = parseInt(e.getAttribute('d'), 10);
          let i = -1;
          switch (t) {
            case 'next':
              i = s + 1;
              break;
            case 'prev':
              i = s - 1;
              break;
            case 'up':
              i = s - 7;
              break;
            case 'down':
              i = s + 7;
              break;
            case 'first':
              if (1 === a) return !1;
              i = s - (a - 1);
              break;
            case 'last':
              if (7 === a) return !1;
              i = s + (7 - a);
          }
          const h = this.datepicker.querySelectorAll('[index="' + i + '"]');
          if (h.length > 0 && i > 0) this.setDayFocus(h[0]);
          else if (i > 0) {
            let e = '';
            if (this.goToNextMonth(2, !0)) {
              const s = this.datepicker.getElementsByClassName(this.className + '__month--month2');
              if (s.length > 0) {
                if ('down' === t) e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth[d="' + a + '"]');
                else if ('last' === t) {
                  const t = a + (7 - a);
                  e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth[d="' + t + '"]');
                } else e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth');
                e.length > 0 && this.setDayFocus(e[0]);
              }
            }
          } else if (i <= 0) {
            let e = '';
            if (this.goToPreviousMonth(1, !0)) {
              const s = this.datepicker.getElementsByClassName(this.className + '__month--month1');
              if (s.length > 0) {
                if ('up' === t) e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth[d="' + a + '"]');
                else if ('first' === t) {
                  const t = a - (a - 1);
                  e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth[d="' + t + '"]');
                } else e = s[0].querySelectorAll('.' + this.className + '__month-day--visibleMonth');
                e.length > 0 && this.setDayFocus(e[e.length - 1]);
              }
            }
          }
        } else this.setInitialActiveDay();
      }
      setInitialActiveDay() {
        const t = this.datepicker.getElementsByClassName(this.className + '__month-day--today');
        if (t.length > 0) return this.setDayFocus(t[0]), t[0];
        const e = this.datepicker.getElementsByClassName(this.className + '__month-day--first-day-selected');
        if (e.length > 0) return this.setDayFocus(e[0]), e[0];
        const s = this.datepicker.getElementsByClassName(this.className + '__month-day--visibleMonth');
        return s.length > 0 ? (this.setDayFocus(s[0]), s[0]) : void 0;
      }
      setDayFocus(t) {
        const e = this.datepicker.getElementsByTagName('td');
        this.removeDaysTabIndex(e), t.setAttribute('tabindex', '0'), t.focus(), this.start && !this.end && this.dayHovering(t);
      }
      removeDaysTabIndex(t) {
        for (let e = 0; e < t.length; e++) t[e].removeAttribute('tabindex');
      }
      setDayIndexes() {
        const t = this.datepicker.getElementsByTagName('td');
        this.dayIndex = 1;
        for (let e = 0; e < t.length; e++)
          this.hasClass(t[e], this.className + '__month-day--visibleMonth')
            ? (t[e].setAttribute('index', this.dayIndex), this.dayIndex++)
            : t[e].setAttribute('index', 0);
      }
      setFocusToInput() {
        this.input.focus(), this.closeDatepicker(), this.clearHovering(), (this.justEsc = !0), (this.isOnFocus = !1);
      }
      moveMonthFromKeyboard(t) {
        'prev' === t ? this.goToPreviousMonth(1, !0) : this.goToNextMonth(2, !0);
      }
      handleReturn() {
        const t = document.activeElement;
        t &&
          this.datepicker.contains(t) &&
          (this.hasClass(t, this.className + '__month-day--visibleMonth') ||
            this.hasClass(t, this.className + '__month-button') ||
            this.hasClass(t, this.className + '__close-button') ||
            this.hasClass(t, this.className + '__clear-button') ||
            this.hasClass(t, this.className + '__submit-button')) &&
          t.click();
      }
      open() {
        this.openDatepicker();
      }
      close() {
        this.closeDatepicker();
      }
      getDatePicker() {
        return this.datepicker;
      }
      setRange(t, e) {
        'string' == typeof t && 'string' == typeof e
          ? ((t = this.parseDate(t)), (e = this.parseDate(e)))
          : ((t = new Date(t.getTime())), (e = new Date(e.getTime()))),
          this.setDateRange(t, e);
      }
      clear() {
        this.clearSelection();
      }
      getNights() {
        let t = 0;
        if (this.start && this.end) t = this.countDays(this.end, this.start) - 1;
        else {
          const e = this.getValue(),
            s = e ? e.split(this.separator) : '';
          if (s && s.length >= 2) {
            const e = this.format;
            t = this.countDays(this.parseDate(s[0], e), this.parseDate(s[1], e)) - 1;
          }
        }
        return t;
      }
      destroy() {
        document.getElementById(this.getDatepickerId()) &&
          (this.removeAllBoundedListeners(this.input, 'click'),
          this.removeAllBoundedListeners(document, 'click'),
          this.removeAllBoundedListeners(this.input, 'change'),
          this.datepicker.parentNode.removeChild(this.datepicker));
      }
    }
    return i;
  })(fecha);
};
