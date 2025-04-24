export const sortQuery = (queryString) => {
  // Create URL friendly string
  if (queryString) {
    let query = queryString;
    if (query.match('Query')) {
      query = query.replace('Query: ', ':');
    }
    if (query.match(/\s/g)) {
      query = query.replace(/\s/g, '%20'); // Space
    }
    if (query.match(/\:/g)) {
      query = query.replace(/\:/g, '%3A'); // :
    }
    if (query.match(/\&/g)) {
      query = query.replace(/\&/g, '%26'); // &
    }
    if (query.match(/\+/g)) {
      query = query.replace(/\+/g, '%2B'); // +
    }
    query = `%3A${query}`;
    return query;
  }
};

