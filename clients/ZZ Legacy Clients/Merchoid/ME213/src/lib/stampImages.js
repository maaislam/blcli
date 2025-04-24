import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';

const occasions = {
    office: {
      image: '//cdn.optimizely.com/img/8355110909/3b3553fe17484cff9df5473fa470b5ec.png',
      text: 'The annual Xmas jumper party',
      link: '#',
    },
    gift: {
      image: '//cdn.optimizely.com/img/8355110909/3b3553fe17484cff9df5473fa470b5ec.png',
      text: 'The ultimate Xmas gift',
      link: '#',
    },
    myself: {
      image: '//cdn.optimizely.com/img/8355110909/3b3553fe17484cff9df5473fa470b5ec.png',
      text: 'Me, to wear everyday!',
      link: '#',
    }
  }

const { ID } = shared;

export default class AddStamps {
  constructor() {
    this.render();
    this.slider();
  }

  render() {
    Object.keys(occasions).forEach((i) => {
      const data = occasions[i];

      const occasionBlock = document.createElement('div');
      occasionBlock.classList.add(`${ID}-occasionImage`);
      occasionBlock.innerHTML =
      `<div class="${ID}-stampBackground">
        <div class="${ID}-stamp_inner">
            <div class="${ID}-stampImage"></div>
            <div class="${ID}-stampButton"><a href="#">${data.text}</a></div>
        </div>
      </div>`;

      document.querySelector(`.${ID}-stampCarousel`).appendChild(occasionBlock);
    });
  }

  slider() {
    jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
        pollerLite(['.ME213-stampCarousel'], () => {
            jQuery('.ME213-stampCarousel').slick({
                centerMode: true,
                centerPadding: '20px',
                slidesToShow: 1,
                mobileFirst: true,
                arrows: true,
            });
        }); 
    });
  }
}
