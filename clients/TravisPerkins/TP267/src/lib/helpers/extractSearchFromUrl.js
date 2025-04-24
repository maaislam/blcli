const extractSearchTermFromURL = (url) => {
  const queryString = url.split('?')[1];
  if (queryString) {
    const params = new URLSearchParams(queryString);
    const searchTerm = params.get('text');
    if (searchTerm) {
      return decodeURIComponent(searchTerm);
    }
  }
  return null;
};

export default extractSearchTermFromURL;
