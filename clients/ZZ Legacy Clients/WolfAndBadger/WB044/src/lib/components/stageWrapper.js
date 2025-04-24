const stageWrapper = (title, htmlStr, swiper) => {
  const swiperArrow = `
    <div class="WB044__swiper-button-prev">
    <svg width="14" class="transform rotate-180" _css3="" viewBox="0 0 18.071 14.142"><path d="M15.071 7.071L9.5 1.5 11 0l7.071 7.071L11 14.142l-1.5-1.5z"></path><path d="M16 6.071H0v2h16z"></path></svg>
    </div>
    <div class="WB044__swiper-button-next">
    <svg width="14" _css4=""  viewBox="0 0 18.071 14.142"><path d="M15.071 7.071L9.5 1.5 11 0l7.071 7.071L11 14.142l-1.5-1.5z"></path><path d="M16 6.071H0v2h16z"></path></svg>
    </div>
    `;

  const contents = `
    <div class="WB044__stage-wrapper">
        <div class="WB044__stage-wrapper--title absolute top-0">${title}</div>
        <div class="${swiper ? 'WB044__swiper' : ''}">
            <div class="WB044__stage-wrapper--content ${swiper ? 'swiper-wrapper' : ''}">${htmlStr}</div>
            ${swiper ? swiperArrow : ''}
        </div>
    </div>    
    
    `;
  return contents;
};

export default stageWrapper;
