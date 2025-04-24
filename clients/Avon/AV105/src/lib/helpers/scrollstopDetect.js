function scrollStop(target, callback, refresh = 60) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== 'function') return;

  // Setup scrolling variable
  let isScrolling;

  // Listen for scroll events
  target.addEventListener(
    'scroll',
    function (event) {
      // Clear our timeout throughout the scroll
      clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(callback, refresh);
    },
    false
  );
}

export default scrollStop;
