import { events } from '../../../../../lib/utils';

export default () => {
  /* Increase size and clarity of the images */
  const options = document.querySelectorAll('.menuItems .pic.fixedMenuImage');
  options[0].querySelector('a').style = 'background-image:url("https://dp8v87cz8a7qa.cloudfront.net/43831/5bdb001bb5c821541079067.png")';
  options[1].querySelector('a').style = 'background-image:url("https://dp8v87cz8a7qa.cloudfront.net/43831/5bdaffe1507451541079009.png")';

  // wider images
  /*
   options[0].querySelector('a').style = 'background-image:url("https://dp8v87cz8a7qa.cloudfront.net/43831/5be94ba2d4b041542015906.png")';
  options[1].querySelector('a').style = 'background-image:url("https://dp8v87cz8a7qa.cloudfront.net/43831/5be94b45ae1d51542015813.png")';
  */

  options[0].addEventListener('click', () => {
    events.send('PJ047', 'clicked', 'Half and Half (on pizza page)');
  });
};
