export default function uspDetails () {
  const usps = {
    prescription : 'Same-Day Prescription',
    doctors : 'GMC-Qualified UK doctors',
    hours : 'GPs available 6am-11pm',
    training : 'Our GPs are NHS-trained',
  }

  let uspObj,
  URL = window.location.pathname;

  const pageMatch = [
    {
      matchString: '/ppc/antibiotics-online',
      execute: function() {
          uspObj = usps;
      }
    },
    {
      matchString: '/ppc/gps-near-me',
      execute: function() {
          uspObj = usps;
      }
    },
    {
      matchString: '/ppc/sexual-health-clinic-3',
      execute: function() {
          uspObj = usps;
      }
    },
    {
      matchString: '/ppc/walk-in-centre-near-mob',
      execute: function() {
          uspObj = usps;
      }
    },
  ];
  /**
   * Mobile Experiment
   */
  if (window.innerWidth < 768) {
      // Mobile Top Wrapper
      const uspWrapper = document.querySelector('.PU017_usp-wrapper');
      const newIconList = `<div class='PU017_usp-items'><ul class='PU017_usp-items__list'></ul></div>`;
      uspWrapper.insertAdjacentHTML('afterbegin', newIconList);
      const iconsList = document.querySelector(".PU017_usp-items__list");

      // Mobile Middle Wrapper
      const uspMidWrapper = document.querySelector('.PU017_usp-wrapper__middle');
      if (uspMidWrapper) {
        const newMidIconList = `<div class='PU017_usp-items__middle'><ul class='PU017_usp-items__mid-list'></ul></div>`;
        uspMidWrapper.insertAdjacentHTML('afterbegin', newMidIconList);
        let iconsMidList = document.querySelector(".PU017_usp-items__list");
      }

      pageMatch.forEach((item) => {
        if(window.location.pathname.indexOf(item.matchString) > -1) {
            item.execute();
          // Mobile
            let uspCount = 0;
            for (const key in uspObj) {
              const element = uspObj[key];
              if (uspCount < 2) {
                let listItem = `<li class='PU017-icon PU017-${key}'><p>${element}</p></li>`;
                iconsList.insertAdjacentHTML('beforeend', listItem);
              } else {
                let iconsMidList = document.querySelector(".PU017_usp-items__mid-list");
                let listItem = `<li class='PU017-icon PU017-${key}'><p>${element}</p></li>`;
                iconsMidList.insertAdjacentHTML('afterend', listItem);
              }
              uspCount++;
            }
          return;  
        }
      });
  } else {
    /**
     * Desktop Experiment goes here
     */
    return;
  }

}