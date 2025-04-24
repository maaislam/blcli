const getSummary = () => {
    return fetch('/uk/basket')
    .then((response) => {
      //console.log('🚀 ~ .then ~ response:', response);
      if (response.status === 200) {
        window.isLoggedIn = true;
        const html = response.text();
        return html;
      }
    })
    .then((html) => {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      return doc;
    })
    .catch(() => {
      return '';
    });
};
export default getSummary;