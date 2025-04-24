import { pollerLite } from '../../../../../../lib/utils';

export const showPendingResults = (id, submitBtn) => {
  const pendingResultsElem = document.querySelector(`.${id}__pendingResults`);
  pendingResultsElem.classList.add(`${id}__show`);

  const progressBars = pendingResultsElem.querySelectorAll(`.${id}__progress-bar`);
  const successIcons = pendingResultsElem.querySelectorAll(`.form__field-icon--success`);

  const animateProgressBar = (progressBar, successIcon, delay) => {
    return new Promise((resolve) => {
      let width = 0;
      const steps = 50; // steps based on shorter 700ms duration

      const interval = setInterval(() => {
        width += 2; // Progress 2% every interval
        progressBar.style.width = `${width}%`;

        if (width >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            successIcon.classList.add(`${id}__visible`); // Show checkmark after 0.3s delay
            resolve(); // Proceed to the next bar
          }, 300); // 0.3s delay to match the CSS transition
          resolve(); // Proceed to the next bar
        }
      }, delay / steps); // 50 steps to reach 100%
    });
  };

  const startProgress = async () => {
    await animateProgressBar(progressBars[0], successIcons[0], 1000);
    await animateProgressBar(progressBars[1], successIcons[1], 1000);
    await animateProgressBar(progressBars[2], successIcons[2], 3000);

    submitBtn.click();

    pollerLite([() => getComputedStyle(document.body)['overflow'] === 'hidden'], () => {
      document.body.removeAttribute('style');
    });

    // const interval = setInterval(() => {
    //     if (document.querySelector('.results-card__result')) {
    //         clearInterval(interval);
    //         animateProgressBar(progressBars[2], successIcons[2], 700);
    //     }
    // }, 50);

    // setTimeout(() => {
    //     clearInterval(interval);
    // }, 10000);
  };

  startProgress();
};

export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  if (!target) return;

  const config = configObject || {
    childList: false,
    subtree: false,
    attributes: true,
    characterData: false,
    characterDataOldValue: false,
  };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      observer.disconnect();

      callbackFunction(mutation);
      observer.observe(target, config);
    });
  });

  observer.observe(target, config);
};
