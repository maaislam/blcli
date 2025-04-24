import shared from "../../../../../../core-files/shared"

export default () => {
    const { ID } = shared;
    
    document.querySelector('.recommendations').insertAdjacentHTML('beforebegin', `<div class="${ID}-usps"></div>`);

    const uspContent = {
      usp1: {
        image: 'https://editor-assets.abtasty.com/48343/620a5a1cd9a291644845596.png',
        title: 'and earn rewards',
        titleBold: 'Register your warranty',
        description: "It's completely free to register your warranty. We'll share insider tips to get the most joy out of your Podster and reward you with benefits.",
        link: 'https://www.hotelchocolat.com/uk/podster-warranty.html',
        linkText: 'Find out more',
      },
      usp2: {
        image: 'https://editor-assets.abtasty.com/48343/61bb4c2598d7d1639664677.png',
        title: 'Coffee Pods',
        titleBold: '100% Recyclable',
        description: 'Each flavour is available in Nespresso®* - compatible capsules, fully recycleable with the Podcycler. Find the blend to suit your taste with our strength-o-meter.',
        link: 'https://www.hotelchocolat.com/uk/shop/coffee/pods/',
        linkText: 'Find out more',
      },
      usp3: {
        image: 'https://production-web-hotelchocolat.demandware.net/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/v7378a29272e75e2d5302100af0cf89d81870350b/images/responsibly-sourced-600px.png?version=1,639,494,054,000',
        title: 'Rabot Estate Coffee',
        titleBold: 'Responsibly Sourced',
        description: 'Responsibly sourced from around the world. Expertly roasted and blended to create five unique coffee personalities: delicious on their own, and as you would expect, ideal pairing with chocolate.',
        link: 'https://www.hotelchocolat.com/uk/shop/coffee/',
        linkText: 'Find out more',
      }
    }

    Object.keys(uspContent).forEach((i) => {
      const uspEl = uspContent[i];
      const usp = document.createElement('div');
      usp.classList.add(`${ID}-usp`);
      usp.innerHTML = `
      <div class="${ID}-uspImage" style="background-image:url(${uspEl.image})"></div>
      <div class="${ID}-uspText">
        <h2><span>${uspEl.titleBold}</span>${uspEl.title}</h2>
        <p>${uspEl.description}</p>
        <a href="${uspEl.link}">${uspEl.linkText}</a>
      </div>`;

      document.querySelector(`.${ID}-usps`).appendChild(usp);
    });
}