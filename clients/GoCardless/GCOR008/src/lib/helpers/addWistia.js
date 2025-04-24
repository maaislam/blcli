const initWistia = (jsUrls) => {
  jsUrls.forEach((url) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${url}`;
    script.setAttribute('async', true);
    document.querySelector('head').append(script);
  });
};

export default initWistia;
