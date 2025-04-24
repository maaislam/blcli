const trapFocus = (e, ID, modal) => {
  const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const focusableSelectors = isMobile()
    ? `input, .${ID}__closeWrapper ,button:not([disabled]), a[href], textarea, select`
    : `input,button:not([disabled]), a[href], textarea, select`;
  const focusableElements = modal ? Array.from(modal.querySelectorAll(focusableSelectors)) : [];

  if (e.key === 'Tab') {
    e.preventDefault(); // Prevent default tab behavior

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    if (e.shiftKey) {
      // SHIFT + TAB: Cycle to the last element if currently on the first
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
      } else {
        const index = focusableElements.indexOf(document.activeElement);
        focusableElements[Math.max(0, index - 1)].focus();
      }
    } else {
      // TAB: Cycle to the first element if currently on the last
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
      } else {
        const index = focusableElements.indexOf(document.activeElement);
        focusableElements[Math.min(focusableElements.length - 1, index + 1)].focus();
      }
    }
  }
};

export default trapFocus;
