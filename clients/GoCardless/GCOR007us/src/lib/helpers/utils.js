export const invalidUrls = function () {
  const notAllowedUrl = ['/en-us/guides/posts/talking-to-customers-about-ach-debit/', '/en-us/guides/ach/'];

  return notAllowedUrl.indexOf(location.pathname) !== -1;
};
