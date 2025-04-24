export const mutationObserver = (target, callback, config = { attributes: true, childList: true, subtree: true }) => {
  if (target) {
    const observer = new MutationObserver(callback);
    observer.observe(target, config);
  }
};
