const slideEl = (image,title,duration,date,wasPrice,nowPrice,link) => { 
    const html = `
    <a href="${link}" data-bind="attr: {href: itineraryUrl + '&amp;tourid=' + tourId}, loopBound: 'bound'" class="item slick-slide slick-current slick-active" tabindex="-1" role="option" aria-describedby="slick-slide17" style="width: 260px;" data-slick-index="7" aria-hidden="false">
        <div class="img-wrap">
            <img src="${image}" data-bind="attr: {src: smallImage}">
        </div>
        <div class="content">
            <h3 data-bind="text: title, css: { 'long-title': title.length > 50 }">${title}</h3>
            <div class="text-area">
                <div class="dates">
                    <span data-bind="text: duration > 1 ? duration + ' days' : '1 day'">${duration}</span>
                    <span data-bind="text: tourCount > 1 ? 'See more dates' : departureDateStr">${date}</span>
                </div>
                <div class="was-price">${wasPrice}</div>
                <div class="todays-price">Today's Web Price</div>
            </div>
            <span class="NH08-price-btn orange-btn">from only<br> ${nowPrice}</span>
        </div>
    </a>                    
    `;
    return html;
}


export default slideEl;