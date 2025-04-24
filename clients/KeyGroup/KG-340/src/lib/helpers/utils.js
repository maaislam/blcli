export const observeIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: '20px',
    threshold,
  });
  if (!target) {
    return;
  }

  observer?.observe(target);
};
