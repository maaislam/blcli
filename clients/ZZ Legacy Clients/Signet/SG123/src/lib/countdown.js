import shared from "./shared";

export const countdown = () => {

    const { ID } = shared;

    const countDownDate = new Date("March 30, 2021, 23:59:59").getTime();
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

    const countdownEl = document.querySelector(`.${ID}-voucherBox .${ID}-countdown`);
    if(countdownEl) {
        if (actualhours > 24) {
            countdownEl.innerHTML = `
            <div class="${ID}-timeBlock"><span>${days}</span><p>days</p></div>
            <div class="${ID}-timeBlock"><span>${hours}</span><p>hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>mins</p></div>`
        } else {
            countdownEl.innerHTML = `
            <div class="${ID}-timeBlock"><span>${hours}</span><p>hrs</p></div>
            <div class="${ID}-timeBlock"><span>${minutes}</span><p>mins</p></div>
            <div class="${ID}-timeBlock"><span>${seconds}</span><p>secs</p></div>`;
        }

        if (distance < 0) {
            clearInterval(x);
            countdownEl.style.display = 'none';
        }
    }


    }, 1000);
  }