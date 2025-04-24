const startCheckoutCountdown = (ID, VARIATION) => {
  const minutesElement = document.querySelector(`.${ID}__minutes`);
  const secondsElement = document.querySelector(`.${ID}__secs`);
  const timerTitleElement = document.querySelector(`.${ID}__timerTite`);
  const timerElement = document.querySelector(`.${ID}__timer`);

  if (!minutesElement || !secondsElement || !timerTitleElement) {
    console.error(`Countdown elements not found. Please check the ID: ${ID}`);
    return;
  }

  const totalTime = 10 * 60; // Total countdown time in seconds (3 minutes)
  const remainingTimeKey = `${ID}-Remaining-Time`; // Key to store the remaining time
  const lastUpdatedKey = `${ID}-Last-Updated`; // Key to store the last updated time

  // Format seconds into "mm mins ss secs"
  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (timeInSeconds % 60).toString().padStart(2, '0');
    return { mins, secs };
  };

  // Initialize the timer
  const initializeTimer = () => {
    const storedRemainingTime = sessionStorage.getItem(remainingTimeKey);
    const lastUpdated = sessionStorage.getItem(lastUpdatedKey);

    if (storedRemainingTime && lastUpdated) {
      // Use the stored remaining time if it exists
      return parseInt(storedRemainingTime, 10);
    } else {
      // If no stored time exists, initialize with total time
      sessionStorage.setItem(remainingTimeKey, totalTime);
      sessionStorage.setItem(lastUpdatedKey, Math.floor(Date.now() / 1000)); // Current timestamp
      return totalTime;
    }
  };

  const updateUI = (remainingTime) => {
    const { mins, secs } = formatTime(remainingTime);
    minutesElement.textContent = `${mins} mins`;
    secondsElement.textContent = `${secs} secs`;

    if (remainingTime <= 2 * 60 && remainingTime > 0) {
      timerTitleElement.textContent = 'Less than 2 minutes to secure your rate';
      if (mins <= 0 && !minutesElement.classList.contains(`${ID}__hide`)) {
        minutesElement.classList.add(`${ID}__hide`);
      }
    } else if (remainingTime <= 0) {
      timerTitleElement.textContent = 'Your session has expired';
      timerElement.textContent = 'You can refresh the page or continue';
    } else {
      VARIATION === '1'
        ? (timerTitleElement.textContent = 'Great find. Let’s secure your rate.')
        : (timerTitleElement.textContent = 'Don’t miss out. Let’s secure your rate.');
    }
  };

  const startCountdown = () => {
    let remainingTime = initializeTimer();

    const updateTimer = () => {
      if (remainingTime > 0) {
        updateUI(remainingTime); // Update the UI with the remaining time
        remainingTime -= 1; // Decrease remaining time by 1 second
        sessionStorage.setItem(remainingTimeKey, remainingTime); // Save updated remaining time
        sessionStorage.setItem(lastUpdatedKey, Math.floor(Date.now() / 1000)); // Update timestamp
        setTimeout(updateTimer, 1000); // Update the timer every second
      } else {
        updateUI(0); // Timer expired
        sessionStorage.removeItem(remainingTimeKey); // Clear session storage
        sessionStorage.removeItem(lastUpdatedKey);
      }
    };

    updateTimer(); // Start the countdown immediately
  };

  startCountdown();
};

// To start the countdown, just call:
export default startCheckoutCountdown;
