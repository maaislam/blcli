const getRatings = (prodPrimaryId) => {
  const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };

  return fetch(`https://api.yotpo.com/products/wLzCgzI3qtYaGL8IebLnz3ZEkclM5g2BAA6PvG6L/${prodPrimaryId}/bottomline`, options);
};

export default getRatings;
