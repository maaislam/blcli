const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

fetch(
  'https://online.shopwithmyrep.co.uk/c10_uk_2021/67e3vbor83yiwka5kvc0hj5amxubhzzku6ghafkt/common/config/summary.json',
  requestOptions,
)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
