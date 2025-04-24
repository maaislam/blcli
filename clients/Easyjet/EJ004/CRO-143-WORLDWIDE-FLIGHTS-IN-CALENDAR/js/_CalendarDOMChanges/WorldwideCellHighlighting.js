const loopDatesAndHighlight = () => {
  
  function poll(conditions, options) {
    const DEFAULT_OPTIONS = {
      timeout: 15,
      interval: 10,
      intervalLimit: 2000,
      intervalMultiplier: 1.1,
    };
    options = { ...DEFAULT_OPTIONS, ...options };
    function isValid(condition) {
      if (typeof condition === "string") {
        return !!document.querySelector(condition);
      }
      return condition() === true;
    }
    function validateConditions() {
      return [conditions].flat().every((condition) => isValid(condition));
    }
    function multiplyInterval(interval, multiplier, limit) {
      const multiplied = interval * multiplier;
      if (multiplied < limit) {
        return multiplied;
      }
      return limit;
    }
    const RESOLVE_MESSAGE = "Poller conditions met";
    const REJECT_MESSAGE = "Poller conditions not met";
    return new Promise((resolve, reject) => {
      if (validateConditions()) return resolve(RESOLVE_MESSAGE);
      const startTime = new Date().getTime();
      let currentInterval = options.interval;
      (function ticker() {
        const timeSinceStart = (new Date().getTime() - startTime) / 1000;
        if (timeSinceStart < options.timeout) {
          if (validateConditions()) return resolve(RESOLVE_MESSAGE);
          currentInterval = multiplyInterval(
            currentInterval,
            options.intervalMultiplier,
            options.intervalLimit
          );
          return setTimeout(ticker, currentInterval);
        }
        return reject(REJECT_MESSAGE);
      })();
    });
  }

  poll('[data-tab*=Return] .route-date-picker-month .day.highlight').then(() => {
    let end = null;

    const elements = [...document.querySelectorAll("[data-tab*=Return] .route-date-picker-month .day")];

    const isStartDate = (element) => element.classList.contains("highlight");
    const start = elements.findIndex(isStartDate);

    function clearActiveElements() {
      elements.forEach((el) => el.classList.remove("highlight"));
    }

    function highlightElements() {
      clearActiveElements();

      if (start !== null) {
        elements.forEach((el, idx) => {
          if (idx >= start && idx <= end) {
            el.classList.add("highlight");
          }
        });
      }
    }

    elements.forEach((el, idx) => {
      el.addEventListener("mouseenter", () => {
        end = idx;
        highlightElements();
      });
    });
  });
};

module.exports = {
  loopDatesAndHighlight,
};
