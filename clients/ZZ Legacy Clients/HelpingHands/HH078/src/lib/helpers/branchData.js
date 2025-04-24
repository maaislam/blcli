export const updateBranchData = (id) => {
  const fallbackLinks = [
    {
      label: 'Home Care in branch_name',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/',
    },

    {
      label: 'Dementia Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/dementia-care/',
    },

    {
      label: 'Domiciliary Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/domiciliary-care/',
    },

    {
      label: 'Elderly Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/elderly-care/',
    },

    {
      label: 'Respite Care',
      url: 'https://www.helpinghandshomecare.co.uk/home-care-services/respite-care/',
    },
  ];
  // Phone & URL.
  var reviewsData = null;

  const branchUrl = window.location.pathname;
  let phone = document.querySelector('.branch-call-num .InfinityNumber');
  if (!phone) {
    // Oxfordshire has a different layout
    phone = document.querySelector('.branch-details .InfinityNumber');
  }
  console.log('phone', phone);

  if (phone) phone = phone.innerText.trim();
  else {
    // Fallback
    phone = '0333 060 5358';
  }

  // Reviews count, Rating, Reviews url.
  const branchPanel = document.querySelector('.reviews-box');
  if (branchPanel) {
    const starsList = branchPanel.querySelector('.branch-star-list');
    const branchReviews = branchPanel.querySelector('.branch-review-average');
    const viewAll = branchPanel.querySelector('.viewall');

    reviewsData = {
      stars: starsList ? starsList.outerHTML : null,
      rating: branchReviews ? branchReviews.childNodes[0].nodeValue.trim().replace('stars,', '') : null,
      total: branchReviews ? branchReviews.childNodes[1].textContent.trim() : null,
      reviewsUrl: viewAll ? viewAll.href : null,
    };
  }

  // Additional links: section class="branch-subpage-care subpage-elements-5"
  const additional = document.querySelector('.branch-subpage-care');
  const additionalList = additional ? additional.querySelectorAll('.row a') : false;

  let additionalLinks = fallbackLinks; // Default links.
  let branchTitle = document.querySelector('h1');
  if (branchTitle) branchTitle = branchTitle.textContent;

  if (additional && additionalList && additionalList.length > 4) {
    // Loop through anchors and get the label and url for each link.
    additionalLinks = [];
    additionalList.forEach((anchor) => {
      additionalLinks.push({
        label: anchor.textContent.trim(),
        url: anchor.href,
      });
    });
  } else if (branchTitle) {
    // set the branch name in the first fallback link to this page's title.
    const newLabel = additionalLinks[0].label.replace('branch_name', branchTitle);
    additionalLinks[0].label = newLabel;
  }

  // update session storage.
  localStorage.setItem(
    `${id}_branch`,
    JSON.stringify({
      branchUrl,
      phone,
      branchTitle,
      reviewsData,
      additionalLinks,
    })
  );
};

export const isBranchPage = () => {
  return window.location.pathname.indexOf('/our-locations/') !== -1 && document.body.classList.contains('single');
};
