import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const checkScrollUntilElIntoView = (elementTarget, bannerPosition) => {
  window.addEventListener("scroll", function() {
    if (!elementTarget.classList.contains('cta-seen')) {
      if (window.scrollY <= (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        if (isElementInViewport(elementTarget)) {
          elementTarget.classList.add('cta-seen');
          if (VARIATION == '1') {
            fireEvent(`Visible - ${bannerPosition}`);
          } else if (VARIATION == 'control') {
            fireEvent(`Visible - Last element of PLP viewed`);
          }
          
        }
      }
    }
  });
};

export const isElementInViewport = (element) => {
  var top = element.offsetTop;
  var left = element.offsetLeft;
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  while(element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
    left += element.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}


export const getUrlParameter = (name, url) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,'\\\]');
  const regexS = `[\\?&]${name}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};
