const renderCarousel = (id, data, anchorElem, fireEvent) => {
  const carouselItem = (info, i) => {
    const {
      imageSrc,
      mobileimgSrc,
      labelText,
      labelPosition,
      titleLine1,
      titleLine2,
      subtitle,
      paragraph,
      ctaLink,
      ctaCopy,
      contentAlignment,
    } = info;

    const htmlContent = `
        <a href="${ctaLink}" class="${id}__carousel--item ${id}__show-desktop swiper-slide ${
      i === 0 ? 'first-slider' : ''
    } " style="background-image:url(${imageSrc})">
            <div class="label-wrapper ${
              labelText == '' ? `${id}__hide` : ''
            } ${labelPosition}-0"><span class="label">${labelText}</span></div>
            <div class="content-wrapper ${contentAlignment}-content ">   
            
                <div class="title">${titleLine1}</div>
                <div class="title line2">${titleLine2}</div>
            
                <div class="subtitle">${subtitle}</div>
                <div class="paragraph">${paragraph}</div>
                <div class="cta">${ctaCopy}</div>
            </div>
        </a> 
       `;
    const htmlContentMob = `
       
       <a href="${ctaLink}" class="${id}__carousel--item ${id}__hide-desktop swiper-slide">    
       <div class="image-wrapper ${i == 0 ? `${id}__custom-padding` : ''}" > <img src="${mobileimgSrc}" alt="" /></div>
       <div class="label-wrapper ${
         labelText == '' ? `${id}__hide` : ''
       } ${labelPosition}-0"><span class="label">${labelText}</span></div>
       <div class="content-wrapper ${contentAlignment}-content ">   
       
           <div class="title">${titleLine1}</div>
           <div class="title line2">${titleLine2}</div>
       
           <div class="subtitle ${i == 0 || 1 ? `${id}__width-60` : ''}">${subtitle}</div>
           <div class="paragraph ${paragraph == '' ? `${id}__hide` : ''}">${paragraph}</div>
           <div class="cta ${i == 0 ? `${id}__mb-bg-black` : ''}">${ctaCopy}</div>
       </div>
   </a>`;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    return isMobile ? htmlContentMob : htmlContent;
  };
  const htmlStr = `
        <div class="container-fluid">
            <div class="${id}__carousel swiper">
                <div class="${id}__carousel--wrapper swiper-wrapper">
                    ${data.map((item, i) => carouselItem(item, i)).join('\n')}
                </div>
                <div class="${id}__swiper-button-prev">
                <svg aria-hidden="true" data-prefix="fal" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>
                </div>
                <div class="${id}__swiper-button-next">
                    <svg aria-hidden="true" data-prefix="fal" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
                </div>
            </div>
        </div>
        
    `;
  const carouselSection = document.createElement('section');
  anchorElem.insertAdjacentElement('afterbegin', carouselSection);
  carouselSection.classList.add(`${id}__carousel--section`);
  carouselSection.innerHTML = htmlStr;
};

export default renderCarousel;
