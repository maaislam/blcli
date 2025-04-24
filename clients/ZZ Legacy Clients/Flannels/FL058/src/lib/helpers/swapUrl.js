/**
 * @desc Does what it says on the tin!
 * @param {Element} imgEl 
 * @param {String} url 
 */
let folderNumber;
const swapUrl = (imgEl, url) => {
  if (imgEl && url) {
    imgEl.setAttribute('src', url);
    if (imgEl.getAttribute('href')) {
      imgEl.setAttribute('href', url);
    }
    if (imgEl.getAttribute('srczoom')) {
      imgEl.setAttribute('srczoom', url);
    }
    if (imgEl.getAttribute('data-popuphref')) {
      // Remove
      imgEl.removeAttribute('data-popuphref');
    }
    // Or parent A tag
    if (imgEl.parentElement && imgEl.parentElement.nodeName === 'A') {
      let parentA = imgEl.parentElement;

      const parentAUrl = parentA.getAttribute('srczoom');
      if (parentAUrl) {
        const folderMatch = parentAUrl.match(/\/imgzoom\/(\d+)\//);
        if (folderMatch && folderMatch[1] && folderMatch[1].match(/\d+/)) {
          folderNumber = folderMatch[1];
        }
      }
      let largeUrl = url.replace(/\/98\//, '/1425/');

      if (url.match(/l.jpg$/) || url.match(/_l_/g)) {
        largeUrl = url.replace(/\/products\//g, `/imgzoom/${folderNumber}/`);
        largeUrl = largeUrl.replace(/(_l)|(_l_)/g, '_xxl');
        // Reset the parentA to the img el.
        parentA = imgEl;
      }
      
      parentA.setAttribute('href', largeUrl);
      if (parentA.getAttribute('src')) {
        parentA.setAttribute('src', largeUrl);
      }
      if (parentA.getAttribute('srczoom')) {
        parentA.setAttribute('srczoom', largeUrl);
      }
    }
  }
};

export default swapUrl;
