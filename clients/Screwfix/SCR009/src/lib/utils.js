export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation, index) {
      callbackFunction(mutation);
    });
  });

  // configuration of the observer:

  const config = configObject || { attributes: false, childList: true, characterData: false, subtree: false };

  observer.observe(target, config);
};

export const offerInfo = (id) =>
  fetch(`https://www.screwfix.com/product/jsp/product/responsive/offerPopup.jsp?productId=${id}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      return { error: false, table: doc.querySelector("table tbody") };
    })
    .catch(function (err) {
      // There was an error
      return { error: true, err };
    });
