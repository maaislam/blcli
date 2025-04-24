import { fullStory, events } from '../../../../lib/utils';

/**
 * {{NH018}} - {{Zero Search Results}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'NH018',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    const { settings, services, components } = Experiment;
    services.tracking();
    document.body.classList.add(settings.ID);
    const searchObj = components.getSearch();
    const newDates = components.amendDates(searchObj);
    console.log(searchObj);
    /**
     * Return the new dates to the correct format for the URL
     * @param {String} minOrMax
     * @param {String} dateInput
     */
    const reBuildDates = (minOrMax, dateInput) => {
      const dateArr = dateInput.split('/');
      const newDate = minOrMax ? `min=${dateArr[2]}-${dateArr[1]}-${dateArr[0]}` : `max=${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
      return newDate;
    };
    const newMinDate = reBuildDates(true, newDates.minDateDeducted);
    const newMaxDate = reBuildDates(false, newDates.maxDateAdded);
    // console.log(newMinDate, newMaxDate);
    /**
     * Rebuild the full URL
     */
    const newUrl = components.rebuildUrl(searchObj, newMinDate, newMaxDate);
    /**
     * Make the new Ajax request
     */
    const results = components.loadingPost(newUrl);
    // console.log(results);
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    getSearch() {
      const url = window.location.search;
      let urlString = null;
      let region = null;
      let town = null;
      let minDate = null;
      let maxDate = null;
      let duration = null;
      const splitUrl = url.split('&');
      splitUrl.forEach((element) => {
        // urlString
        if (element.match(/s=\w.+/)) {
          urlString = element;
          // region
        } else if (element.match('rg=')) {
          region = element;
        } else if (element.match('t3p=')) {
          town = element;
        } else if (element.match(/min=\d.+/)) {
          minDate = element;
        } else if (element.match(/max=\d.+/)) {
          maxDate = element;
        } else if (element.match(/d=\d/)) {
          duration = element;
        }
      });
      return {
        str: urlString,
        reg: region,
        twn: town,
        min: minDate,
        max: maxDate,
        dur: duration,
      };
    },
    // Returns new dates object.
    amendDates(obj) {
      /*
      * Extend search dates by 10 days either side.
      * Extend duration by 1 day, if no duration set to 3.
      */
      /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
      // Add days to a date object
      Date.prototype.addDays = (isDate, days) => {
        const dat = new Date(isDate);
        dat.setDate(dat.getDate() + days);
        return dat;
      };
      // Deduct days to a date object
      Date.prototype.deductDays = (isDate, days) => {
        const dat = new Date(isDate);
        dat.setDate(dat.getDate() - days);
        return dat; 
      };
      /*
      * Add 10 days to date.
      * Input is the date object min date property.
      */
      const addToDates = (dateProp, shouldRemoveDays) => {
        const dateStr = dateProp.replace(/\w+=/, '');
        const dateArr = dateStr.split('-');
        const dateIntArr = [];
        dateArr.forEach((dateEl) => {
          const dateInt = parseInt(dateEl, 10);
          dateIntArr.push(dateInt);
        });
        const date = new Date(dateIntArr[0], (dateIntArr[1] - 1), dateIntArr[2]);
        const newDate = shouldRemoveDays ? date.deductDays(date, 10) : date.addDays(date, 10);
        return newDate.toLocaleDateString();
      };
      /*
      * Add 1 day to duration or set to 3 days.
      */
      const addToDuration = (durationProp) => {
        let newDuration = null;
        if (durationProp === null) {
          newDuration = 'd=8';
        } else {
          const durationStr = durationProp.replace('d=','');
          const durationInt = parseInt(durationStr, 10);
          newDuration = durationInt + 1;
        }
        return newDuration;
      };
      // returns new date object.
      return {
        // minDateAdded: addToDates(obj.min, false),
        maxDateAdded: addToDates(obj.max, false),
        minDateDeducted: addToDates(obj.min, true),
        // maxDateDeducted: addToDates(obj.max, true),
        newDuration: addToDuration(obj.dur),
      };
    },
    // Re build the url.
    rebuildUrl(obj, min, max) {
      if (obj.dur === null) {
        obj.dur = 'd=8';
      }
      const url = `//www.nationalholidays.com/search-results${obj.str}&${obj.reg}&${obj.twn}&${min}&${max}&${obj.dur}`;
      console.log(url);
      return url;
    },
    // To show loading screen whilst is does another search
    loadingPost(url) {
      fetch(url, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        .then(res => res.text())
        .then((response) => {
          const html = document.createElement('div');
          html.innerHTML = response;
          console.log(html);
          if (!html) {
            return false;
          }
          const results = html.querySelectorAll('.result-item');
          console.log(results);
          return results;
        })
        .catch((err) => {
          console.log(err);
          alert('sorry no results available');
        });
    },
  },
};

export default Experiment;
