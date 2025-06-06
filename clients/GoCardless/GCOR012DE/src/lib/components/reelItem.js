import { testimonial } from '../data';
import reelBtn from './reelButton';

const reelItem = (id, title, index) => {
  const lastSlideLinkBtn = {
    text: 'Jetzt kostenlos anmelden',
    link: 'https://manage.gocardless.com/signup?lang=de',
    classSuffix: 'pill-slidelast'
  };
  const lastSlideDivBtn = {
    text: 'Den Artikel weiterlesen',
    link: '',
    classSuffix: 'link-slidelast'
  };
  const testimonials = `<figure>
      <blockquote>
          ${testimonial.quote}
      </blockquote>
      <figcaption>- ${testimonial.reviewer}</figcaption>
      <span>${testimonial.advertMsg}</span>
    </figure>`;

  const lastSlideBtns = `<div class="${id}__btn-container">
        ${reelBtn(id, lastSlideLinkBtn, 'link')}
        ${reelBtn(id, lastSlideDivBtn)}
    </div>`;

  const reelImg = `https://ucds.ams3.digitaloceanspaces.com/GCOR011/DE/GCOR011_reel${
    index + 1
  }.png`;

  const htmlStr = `<div class="${id}__reelitem swiper-slide ${id}__reelitem--${index}">
        <div class="${id}__reelitem--title">${title}</div>
        <div class="${id}__reelitem--body">
            ${index === 6 ? testimonials : `<img src="${reelImg}" alt="${title}">`}
        </div>
        ${index === 6 ? lastSlideBtns : ''}
    </div>`;

  return htmlStr.trim();
};

export default reelItem;
