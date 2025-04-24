/**
 *
 * @param {string} source Url of where data is hosted, example https://ucds.ams3.digitaloceanspaces.com/example.json
 * @returns localStorage object
 */

export const getData = source => new Promise((res, rej) => {
  const localData = localStorage.getItem(`${shared.ID}-data`);
  if (localData) {
    res(localData);
  } else {
    fetch(source)
      .then(response => response.json())
      .then((data) => {
        const d = JSON.stringify(data);
        localStorage.setItem(`${shared.ID}-data`, d);

        res(d);
      });
  }
});
