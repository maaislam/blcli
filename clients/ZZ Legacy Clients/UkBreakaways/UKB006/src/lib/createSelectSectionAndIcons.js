export default () => {
  // Get Select options
  const sections = document.querySelectorAll('ul.nav.nav-tabs.hidden-xs.hidden-sm.visible-md.visible-lg.visible-xl li');
  let listOfSectionsToAdd = [];
  [].forEach.call(sections, (section) => {
    const sectionTitle = section.querySelector('a').innerText;
    const sectionHref = section.querySelector('a').getAttribute('href');
    const sectionDetails = {
      section: `${sectionTitle}`,
      href: `${sectionHref}`,
    };
    listOfSectionsToAdd.push(sectionDetails);
  });
  let tempList = [];
  let selectOptions = '';
  listOfSectionsToAdd.forEach((el) => {
    if (tempList.indexOf(`${el.section}`) === -1) {
      if (el.href !== '') {
        selectOptions += `<option value='${el.section}' href='${el.href}'>${el.section}</option>`;
      } else {
        selectOptions += `<option value='${el.section}' href='#'>${el.section}</option>`;
      }
      
      tempList.push(`${el.section}`);
    }  
  });

  // Create and Add Select Container
  const shortlistBtn = document.querySelector('.buttons a.sml-blue-btn.shortlist');
  let activeShortlist = '';
  if (shortlistBtn && shortlistBtn.classList.contains('active')) {
    activeShortlist = 'active';
  }
  const selectContainer = `<div class='UKB006-selectSection__wrapper'>
    <div class='UKB006-select'>
      <select>
        <option value="" disabled selected>More info...</option>
        ${selectOptions}
      </select>
    </div>
    <div class='UKB006-actions__wrapper'>
      <span class='UKB006-action'><div id='UKB006-email'></div></span>
      <span class='UKB006-action'><div id='UKB006-shortlist' class='${activeShortlist}'></div></span>
    </div>
  </div>`; 

  const destinationBoxContainer = document.querySelector('div.destination-box .row');
  destinationBoxContainer.insertAdjacentHTML('afterbegin', selectContainer);
};