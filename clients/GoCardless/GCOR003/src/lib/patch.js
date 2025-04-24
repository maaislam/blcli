// const newData = [
//   {
//     pageUrlContains: '/en-us/guides/ach/',
//     learnMoreUrl: '/en-us/solutions/learn-more-about-ach-gocardless/',
//   },
//   {
//     pageUrlContains: '/en-us/guides/posts/talking-to-customers-about-ach-debit/',
//     learnMoreUrl: '/en-us/solutions/learn-more-about-ach-gocardless/',
//   },
//   {
//     pageUrlContains: '/guides/posts/bacs-payments/',
//     learnMoreUrl: '/solutions/direct-debit-learn-more/',
//   },
//   {
//     pageUrlContains: '/guides/intro-to-direct-debit/',
//     learnMoreUrl: '/solutions/direct-debit-learn-more/',
//   },
//   {
//     pageUrlContains: '/direct-debit/',
//     learnMoreUrl: '/solutions/direct-debit-learn-more/',
//   },
//   {
//     pageUrlContains: '/guides/sepa/',
//     learnMoreUrl: '/solutions/learn-more-sepa-uk/',
//   },
// ];

// const getLearnMoreUrl = function () {
//   const filteredUrl = newData.filter(function (item) {
//     return location.pathname.indexOf(item.pageUrlContains) !== -1;
//   })[0];
//   if (filteredUrl) {
//     return filteredUrl.learnMoreUrl;
//   }
// };
// const init = () => {
//   (function pollForVariation() {
//     const oldLearnBtn = document.querySelector('.GCOR003_buttonSc.GCOR003_ctaSticky');
//     if (oldLearnBtn) {
//       const newLearnUrl = getLearnMoreUrl();
//       console.log(newLearnUrl);
//       if (newLearnUrl && document.querySelectorAll('.GCOR003__personalised-btn').length <= 0) {
//         const htmlStr =
//           '<a class="GCOR003_buttonSc GCOR003__personalised-btn" style="background-color:transparent;color:#fff" href="' +
//           newLearnUrl +
//           '">Learn more</a>';
//         oldLearnBtn.style.display = 'none';
//         oldLearnBtn.insertAdjacentHTML('afterend', htmlStr);
//       } else {
//         oldLearnBtn.style.display = 'inline-block';
//         document.querySelector('.GCOR003__personalised-btn').remove();
//       }
//     } else {
//       setTimeout(pollForVariation, 25);
//     }
//   })();
// };
// init();
// const appContainer = document.querySelector('body');
// let oldHref = document.location.href;
// const observer = new MutationObserver(function (mutations) {
//   mutations.forEach(function (mutation) {
//     // console.log(mutation);

//     if (oldHref != document.location.href) {
//       oldHref = document.location.href;
//       setTimeout(() => {
//         init();
//       }, 2000);
//     }
//   });
// });

// const config = {
//   childList: true,
//   subtree: true,
//   // attributes: true,
// };

// observer.observe(appContainer, config);
