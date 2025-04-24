import shared from "../../../../../core-files/shared";

const { ID } = shared;

export const createCarousel = (data, parent) => {
    Object.keys(data).forEach((i) => {
        const carData = data[i];

        const slide = document.createElement('div');
        slide.classList.add(`${ID}-slide`);
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
        <div class="${ID}-image" style="background-image:url(${carData.image})"></div>
        <div class="${ID}-textBox">
            <div class="${ID}-textBox-title">
                ${[i][0]}
            </div>
            <p class="${ID}-textBox-paragraph">
                ${carData.text}
            </p>
        </div>`;

        parent.appendChild(slide);

    });  
}

export const countdown = (countdownDate) => {
    const { ID } = shared;

    const countDownDate = new Date(countdownDate).getTime();
    // Update the count down every 1 second
    const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    const dayshours = days * 24;

    const actualhours = (dayshours + hours);

    const countdownEl = document.querySelector(`.${ID}-countdownTimer`);
    if(countdownEl) {
        if (actualhours > 24) {
            countdownEl.innerHTML = `
            <div class="${ID}-timeBlock"><span>${days}</span><p>days</p></div>
            <div class="${ID}-timeBlock"><span>${hours}</span><p>hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>mins</p></div>
            <div class="${ID}-timeBlock"><span>${seconds}</span><p>secs</p></div>`
        } else {
            countdownEl.innerHTML = `
            <div class="${ID}-timeBlock"><span>${hours}</span><p>hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>mins</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>secs</p></div>`
        }

        if (distance < 0) {
            clearInterval(x);
            countdownEl.style.display = 'none';
        }
    }
    }, 1000);
}

export const scrollToElement = (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 100,
    });
}