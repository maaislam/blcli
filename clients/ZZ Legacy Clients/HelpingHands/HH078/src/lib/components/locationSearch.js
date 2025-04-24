import { isBranchPage } from '../helpers/branchData';

const searchInput = (id, data, fireEvent) => {
  const existingDOM = document.querySelectorAll(`.${id}__search-wrapper`);

  existingDOM.forEach((item) => {
    item?.remove();
  });
  const htmlStr = `
    <div class="${id}__search-wrapper ${data ? 'short-width' : ''}">
        <form class="${id}__search ${data ? `${id}__hide` : ''}">
            <input class="${id}__search-input"
                    type="search"
                    placeholder="Enter postcode to find your local branch...">
            <button class="find-branch-btn btn btn-light" type="submit">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>        
            <span class="exclamation">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" viewBox="0 0 23 25" fill="none">
              <circle cx="11" cy="12.1257" r="10" fill="#FFCFCA"/>
              <path d="M12.65 18.1257L10.35 18.1257L10.35 15.7257L12.65 15.7257L12.65 18.1257ZM12.65 13.3257L10.35 13.3257L10.35 6.12573L12.65 6.12573L12.65 13.3257ZM11.5 24.1257C17.848 24.1257 23 18.7497 23 12.1257C23 5.50173 17.848 0.125734 11.5 0.125733C5.152 0.125733 -3.23845e-07 5.50173 -8.8705e-07 12.1257C-1.45025e-06 18.7497 5.152 24.1257 11.5 24.1257ZM11.5 2.52573C16.5715 2.52573 20.7 6.83373 20.7 12.1257C20.7 17.4177 16.5715 21.7257 11.5 21.7257C6.4285 21.7257 2.3 17.4177 2.3 12.1257C2.3 6.83373 6.4285 2.52573 11.5 2.52573Z" fill="#FE6F61"/>
              </svg>
            </span>
        </form>
        <div class="${id}__searched-location ${data ? '' : `${id}__hide`}">
            Your closest branch is: <span><a href="${data?.branchUrl}"> ${data?.branchTitle}</a></span>
            <span class="${id}__close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15.1078 7.2L11.9998 10.308L8.89176 7.2L7.19976 8.892L10.3078 12L7.19976 15.108L8.89176 16.8L11.9998 13.692L15.1078 16.8L16.7998 15.108L13.6918 12L16.7998 8.892L15.1078 7.2ZM11.9998 0C5.36376 0 -0.000244141 5.364 -0.000244141 12C-0.000244141 18.636 5.36376 24 11.9998 24C18.6358 24 23.9998 18.636 23.9998 12C23.9998 5.364 18.6358 0 11.9998 0ZM11.9998 21.6C6.70776 21.6 2.39976 17.292 2.39976 12C2.39976 6.708 6.70776 2.4 11.9998 2.4C17.2918 2.4 21.5998 6.708 21.5998 12C21.5998 17.292 17.2918 21.6 11.9998 21.6Z" fill="#3D195B"/>
                </svg>
            </span>
        </div>
    </div>`;

  document.querySelector(`.${id}__menu-top-logo`).insertAdjacentHTML('afterend', htmlStr);

  document.querySelector(`.${id}__close-btn`).addEventListener('click', (e) => {
    if (e.target.matches(`.${id}__close-btn`) || e.target.closest(`.${id}__close-btn`)) {
      localStorage.removeItem(`${id}_branch`);

      isBranchPage() && localStorage.setItem(`${id}__clickedCloseBtn`, true);

      location.reload();
    }
  });

  document.querySelector(`.${id}__search-input`).addEventListener('focus', (e) => {
    fireEvent('Clicks location text field');
    e.target.setAttribute('placeholder', 'Enter postcode to find your local branch...');
    e.target.classList.remove('error');
    e.target.value = '';
  });

  document.querySelector(`.${id}__search`).addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(`.${id}__search-input`);
    const searchText = searchInput.value;
    fireEvent('Submits location searched');
    fetch(`/wp-content/themes/helpinghands-bbchild/branchfinder/api.php?searchData=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.permalink) {
          fireEvent('Location successfully found');
          console.log('location found');
          location.href = data.permalink;
        } else {
          //try text search

          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: searchText }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              //alert('location : ' + results[0].geometry.location.lat() + ' ' + results[0].geometry.location.lng());

              fetch(
                `/wp-admin/admin-ajax.php?action=store_search&lat=${results[0].geometry.location.lat()}&lng=${results[0].geometry.location.lng()}&max_results=100&radius=75`
              )
                .then((result) => {
                  return result.json();
                })
                .then((res) => {
                  location.href = res[0].permalink;
                });
            } else {
              //alert('Something got wrong ' + status);
              searchInput.setAttribute('placeholder', "Oops, we can't find that branch....lets try again");
              searchInput.classList.add('error');
              searchInput.value = '';
              searchInput.blur();
              fireEvent('Failed to find location');
            }
          });
        }
      });
  });
};

export default searchInput;
