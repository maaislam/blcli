export const initWistia = (jsUrls) => {
  jsUrls.forEach((url) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `${url}`;
    script.setAttribute("async", true);
    document.querySelector("head").append(script);
  });
};

export const wistiaId = () => {
  const countryConfig = {
    uk: "4c570et3gk",
    usa: "bnqhjw2iig",
    au: "iw8kho88r9",
  };
  const getCountry = (str) => window.location.pathname.includes(str);
  const countryStr = getCountry("en-us") ? "usa" : getCountry("en-au") ? "au" : "uk";
  return countryConfig[countryStr];
};
