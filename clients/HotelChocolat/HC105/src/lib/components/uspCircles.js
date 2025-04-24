import shared from "../../../../../../core-files/shared"

export default () => {
    const { ID } = shared;
    
    document.querySelector('.recommendations').insertAdjacentHTML('beforebegin', `<div class="${ID}-usps"></div>`);

    const uspContent = {
      usp1: {
        image: 'https://editor-assets.abtasty.com/48343/620a5fb4079911644847028.png',
        title: 'Register your warranty',
        titleBold: 'and earn rewards',
        description: "It's completely free to register your warranty. We'll share insider tips to get the most joy out of your Velvetiser and reward you with benefits.",
        link: 'https://www.hotelchocolat.com/uk/velvetiser-warranty.html',
        linkText: 'Find out more',
      },
      usp2: {
        image: 'https://editor-assets.abtasty.com/48343/620a5feab5c4c1644847082.png',
        title: 'Make hot chocolate a',
        titleBold: 'Daily Ritual',
        description: 'A morning boost to start the day. A mid-afternoon lift. A post-sports pick-me-up. An evening indulgence. Your Velvetiser, your lifestyle.',
        link: 'https://www.hotelchocolat.com/uk/hot-chocolate-lifestyle-benefits.html',
        linkText: 'Life with a Velvetiser',
      },
      usp3: {
        image: 'https://editor-assets.abtasty.com/48343/620a5fc8bad9c1644847048.png',
        title: 'Imagined by Hotel Chocolat Engineered by',
        titleBold: 'Dualit',
        description: 'We spent 12 months working alongside Dualit to adapt their patented technology to create the Velvetiser.',
        link: 'https://www.hotelchocolat.com/uk/perfect-hot-chocolate-machine.html',
        linkText: 'Read More',
      }
    }

    Object.keys(uspContent).forEach((i) => {
      const uspEl = uspContent[i];
      const usp = document.createElement('div');
      usp.classList.add(`${ID}-usp`);
      usp.innerHTML = `
      <div class="${ID}-uspImage" style="background-image:url(${uspEl.image})"></div>
      <div class="${ID}-uspText">
        <h2>${uspEl.title}<span>${uspEl.titleBold}</span></h2>
        <p>${uspEl.description}</p>
        <a href="${uspEl.link}">${uspEl.linkText}</a>
      </div>`;

      document.querySelector(`.${ID}-usps`).appendChild(usp);
    });
}