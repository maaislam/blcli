const initExternalLib = (jsUrl) => {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = `${jsUrl}`;

  document.querySelector('head').append(script);
};

export default initExternalLib;
