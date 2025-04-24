export default (url, allFilters) => {
  let filters = [];
  [].forEach.call(allFilters, (f) => {
    const title = f.querySelector('.filterBoxTitle p').innerText.trim();
    // --- Assign Filter ID
    let id = title.toLowerCase();
    f.setAttribute('id', id);
    filters.push(id);

    // --- Re-name Filters
    if (url == '/shop/cookware/induction') {
      switch(title) {
        case 'Type':
          f.querySelector('.filterBoxTitle p').innerText = 'Product type';
          break;
        case 'Range':
          f.querySelector('.filterBoxTitle p').innerText = 'Range/Collection';
          break;
        case 'Usage':
          f.querySelector('.filterBoxTitle p').innerText = 'Hob type';
          break;
      }
    } else if (url == '/shop/cookware/frying-pans'
    || url == '/shop/cookware/saucepans'
    || url == '/shop/cookware/stainless-steel'
    || url == '/shop/cookware/sets') {
      switch(title) {
        case 'Size':
          f.querySelector('.filterBoxTitle p').innerText = 'Pan size';
          if (url == '/shop/cookware/sets') {
            f.setAttribute('style', 'display: none;');
          }
          break;
        case 'Range':
          f.querySelector('.filterBoxTitle p').innerText = 'Range/Collection';
          break;
        case 'Type':
          f.querySelector('.filterBoxTitle p').innerText = 'Pan type';
          break;
        case 'Usage':
          f.querySelector('.filterBoxTitle p').innerText = 'Hob type';
          break;
        case 'Colour':
          f.querySelector('.filterBoxTitle p').innerText = 'Pan colour';
          break;
      }
    } else if (url == '/shop/knives-scissors/knife-sets-knife-blocks'
    || url == '/shop/knives-scissors/chefs-knives'
    || url == '/shop/knives-scissors/knife-sets-with-blocks') {
      switch(title) {
        case 'Type':
          f.querySelector('.filterBoxTitle p').innerText = 'Knife storage';
          break;
        case 'Range':
          f.querySelector('.filterBoxTitle p').innerText = 'Range (hardness rating)';
          break;
      }
    } else if (url == '/shop/knives-scissors/damascus-67'
    || url == '/shop/knives-scissors/procook-professional-x50') {
      switch(title) {
        case 'Type':
          f.querySelector('.filterBoxTitle p').innerText = 'Knife type';
          break;
        case 'Range':
          f.querySelector('.filterBoxTitle p').innerText = 'Range/Collection';
          break;
        case 'Material':
          f.querySelector('.filterBoxTitle p').innerText = 'Storage material';
          break;
      }
    }
    
  });
};