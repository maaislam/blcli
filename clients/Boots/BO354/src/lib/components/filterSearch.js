const filterSearchElem = (ID) => {
  const htmlStr = `<div class="${ID}__filtercontainer">
        <div class="search-container">
          <input type="text" class="search-input" placeholder="Search all filters">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" role="img" class="oct-icon oct-input__icon oct-input__icon--right" aria-hidden="true" aria-label="" data-testid="right-icon" style="height: 20px; width: 30px; fill: #333;"><g fill="unset" fill-rule="evenodd"><g fill="unset"><path d="M18.75 17.869l-4.719-4.744c2.344-2.827 2.051-6.997-.664-9.47-2.715-2.473-6.894-2.375-9.49.222-2.597 2.596-2.695 6.775-.222 9.49s6.643 3.008 9.47.664l4.744 4.719.881-.881zM3.125 8.75c0-3.107 2.518-5.625 5.625-5.625s5.625 2.518 5.625 5.625-2.518 5.625-5.625 5.625-5.625-2.518-5.625-5.625z"></path></g></g></svg>
        </div>
        <div class="${ID}__filter-results ">
          
        </div>
      </div>`;
  return htmlStr;
};

export default filterSearchElem;
