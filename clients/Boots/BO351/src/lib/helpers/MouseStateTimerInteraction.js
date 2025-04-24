class pointerStateTimerInteraction {
  constructor(targetSelector, timeoutDuration, callback) {
    this.targetElement = document.querySelector(targetSelector);
    this.timeoutDuration = timeoutDuration;
    this.callback = callback;
    this.timer = null;

    if (this.targetElement) {
      this.init();
    } else {
      console.error(`Element not found: ${targetSelector}`);
    }
  }

  init() {
    this.startTimer();
    this.targetElement.addEventListener('pointerenter', () => this.clearTimer());
    this.targetElement.addEventListener('pointermove', () => this.clearTimer());
    this.targetElement.addEventListener('pointerleave', (event) => {
      if (!event.relatedTarget || !this.targetElement.contains(event.relatedTarget)) {
        this.startTimer();
      }
    });
  }

  startTimer() {
    this.clearTimer(); // Ensure previous timer is cleared
    this.timer = setTimeout(() => {
      this.callback();
    }, this.timeoutDuration);
  }

  clearTimer() {
    clearTimeout(this.timer);
    this.timer = null;
    this.destroy();
  }

  destroy() {
    // Remove event listeners if needed
    this.targetElement.removeEventListener('pointerenter', this.clearTimer);
    this.targetElement.removeEventListener('pointermove', this.clearTimer);
    this.targetElement.removeEventListener('pointerleave', this.startTimer);
  }
}

export default pointerStateTimerInteraction;
