export const toggleList = (addedElement) => {
  if (!addedElement) return;

  const storedElement = addedElement.cloneNode(true);
  const selectedFiltersWrap = document.querySelectorAll('.SelectedFiltersContainer');
  const refineForClose = document.querySelector('.flanProdList .refineByLeftHeader h2');
  const addedButton = document.querySelector('#FL082-moreBrands');

  const checkLength = () => {
    const listLeft = document.querySelectorAll('.FL082-brands--list li:not(:last-of-type)');
    const allHidden = Array.from(listLeft).map((item) => item.classList.contains('FL082-hide'));
    const el = document.querySelector('.FL082-brands');

    if (!allHidden.includes(false)) {
      el.classList.add('FL082-remove');
    } else {
      el.classList.remove('FL082-remove');
    }
  }
  
  checkLength();

  const removeItem = (item) => {
    if (!item) return;

    const parentLi = item.parentElement;
    // Remove
    parentLi.classList.add('FL082-hide');

    // Still show element?
    checkLength();
  };

  const addElementBack = (filterClicked) => {
    if (!filterClicked) return;

    // Get the name of filter
    const brandName = filterClicked.textContent;
  
    const hiddenItem = document.querySelector(`li.FL082-hide button[data-brand="${brandName}"]`);

    if (hiddenItem && hiddenItem.parentElement) {
      hiddenItem.parentElement.classList.remove('FL082-hide');
    }

    // Still show element?
    checkLength();
  };

  const removeAll = () => {
    let removeSpan = document.querySelector('#clrallfltrs');
    if (window.innerWidth < 1021) {
      removeSpan = document.querySelector('#mobclrfltrs');
    }
    
    if (removeSpan) {
      removeSpan.addEventListener('click', () => {
        const hiddenFilters = document.querySelectorAll('li.FL082-hide');
        if (hiddenFilters.length) {
          for (let i = 0; hiddenFilters.length > i; i += 1) {
            hiddenFilters[i].classList.remove('FL082-hide');
          }
        }
      });
    }
    
    // Still show element?
    checkLength();
  }

  addedElement.addEventListener('click', (e) => {
    const { target } = e;

    const name = target.textContent;
    
    if (e.target.classList.contains('FL082-brandBtn')) {

      // Check for active filters
      if (document.querySelector('span.selectedFilterLabel')) {
        if (document.querySelector('span.selectedFilterLabel').textContent !== name) {
          // Update DOM
          removeItem(e.target);
          
          removeAll();
        }
      } else { // No active filters
         // Update DOM
        removeItem(e.target);
        
        removeAll();
      }
      
    }
  });


  for (let i = 0; selectedFiltersWrap.length > i; i += 1) {
    selectedFiltersWrap[i].addEventListener('click', (e) => {
      // Add back to list
      const span = e.target;
      // Update DOM list
      if (span && span.classList.contains('selectedFilterLabel')) {
        addElementBack(span);
      }
    
    });
  }


  // Close on click of refine if open
  refineForClose.addEventListener('click', () => {
    addedButton.click();
  });
  

  // Add event listener to added filters container
  const addedContainer = document.querySelector('#FiltersHeader');
  if (addedContainer) {
    addedContainer.addEventListener('click', () => {
      // console.log('click');
    }); 
  };


  // Add event listener to original brands list. To remove from added list
  const brandsList = document.querySelectorAll('.FilterListItem span.FilterName');
  for (let i = 0; brandsList.length > i; i += 1) {
    brandsList[i].addEventListener('click', () => {
      // console.log('click');
      const dataName = brandsList[i].getAttribute('data-filtername');
      // console.log(dataName);
      const alreadyAdded = document.querySelector(`.FL082-brands--list [data-brand="${dataName}"]`);
      // console.log(alreadyAdded);
      if (alreadyAdded) {
        const parentLi = alreadyAdded.closest('li');
        parentLi ? parentLi.classList.add('FL082-hide') : null;
      }
    });
  }
  
}