import { getUrlParameter, addUrlParameter } from '../../../../../../lib/utils';

export const fetchData = (images) => {
  debugger;
  const combinedData = [];
  fetch(location.pathname + 'categoriesfeed.json')
    .then((resp) => resp.json())
    .then((data) => {
      data =
        data[
          Object.keys(data).filter((k) => !!data[k].name.match(/BROCHURE/i))[0]
        ];

      images.forEach((img) => {
        let targetUrl =
          data.categories.filter(
            (d) => d.name.toLowerCase() == img.name.toLowerCase()
          )[0]?.url || '';

        if (img.id == 'all') {
          // All prods has no filters, so set 0 value to force scrollshop
          targetUrl =
            (data.categories[0]?.url.replace(/\?filterBy=.+/, '') || '') +
            '?filterBy=categories:0';
        }

        if (location.search.match(/rep_id/)) {
          // Retain Rep ID
          const rep_id = getUrlParameter('rep_id', location.href);

          targetUrl = addUrlParameter(targetUrl, 'rep_id', rep_id);
        }

        const extraSegmentsMatch = location.pathname.match(/(avon\/.+)\/.+/);
        if (extraSegmentsMatch && extraSegmentsMatch[1]) {
          // Retain Rep ID when it is in the url segments
          targetUrl = targetUrl.replace(
            location.hostname,
            location.hostname + '/' + extraSegmentsMatch[1]
          );
        }

        combinedData.push({
          name: img.name,
          url: img.url,
          href: targetUrl,
        });
      });
    });
		return combinedData;
};

// export const fetchData = async (images) => {
// 	const combinedData = [];
//   const response = await fetch(location.pathname + 'categoriesfeed.json');
//   const data = await response.json();
//   data[Object.keys(data).filter((k) => !!data[k].name.match(/BROCHURE/i))[0]];

//   images.forEach((img) => {
//     let targetUrl =
//       data.categories.filter(
//         (d) => d.name.toLowerCase() == img.name.toLowerCase()
//       )[0]?.url || '';

//     if (img.id == 'all') {
//       // All prods has no filters, so set 0 value to force scrollshop
//       targetUrl =
//         (data.categories[0]?.url.replace(/\?filterBy=.+/, '') || '') +
//         '?filterBy=categories:0';
//     }

//     if (location.search.match(/rep_id/)) {
//       // Retain Rep ID
//       const rep_id = getUrlParameter('rep_id', location.href);

//       targetUrl = addUrlParameter(targetUrl, 'rep_id', rep_id);
//     }

//     const extraSegmentsMatch = location.pathname.match(/(avon\/.+)\/.+/);
//     if (extraSegmentsMatch && extraSegmentsMatch[1]) {
//       // Retain Rep ID when it is in the url segments
//       targetUrl = targetUrl.replace(
//         location.hostname,
//         location.hostname + '/' + extraSegmentsMatch[1]
//       );
//     }

//     combinedData.push({
//       name: img.name,
//       url: img.url,
//       href: targetUrl,
//     });
//   });
//   return combinedData;
// };
