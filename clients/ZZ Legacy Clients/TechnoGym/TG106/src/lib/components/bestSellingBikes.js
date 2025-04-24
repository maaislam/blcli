import shared from '../shared';
import { __ } from '../helpers';

export default () => {
    const { ID } = shared;

    const bikes = {
        SKILLBIKE: {
            name: 'Skillbike',
            line: 'Skilline',
            price: '£4,290',
            description: 'The only stationary bike with a real gear shift that lets you experience the thrill and challenges of outdoor cycling. Infinite virtual routes to explore.',
            downloadLink: `${__('https://www.technogym.com/wpress/wp-content/uploads/2018/04/Cat_SKILLBIKE_EN.pdf')}`,
            redirectLink: `${__('https://www.technogym.com/gb/skillbike.html')}`,      
            image1: '//cdn.optimizely.com/img/8355110909/f9ed609037b04b08b8374f50001bc1ae.jpg', 
            image2: '//cdn.optimizely.com/img/8355110909/eeca57b920314cd7b88f58c94184b867.jpg', 
            image3: '//cdn.optimizely.com/img/8355110909/e689eb03c492415892c1e9fe21e1be53.png', 
            finance: 'Finance options available',
            
        },
        BIKEPERSONAL: {
            name: 'Bike Personal',
            line: 'Personal',
            price: '£8,250',
            description: 'With its compact footprint and elegant design, you can shape the gym of your dreams in any environment. Getting addicted to your training was never this easy.',
            downloadLink: `${__('https://www.technogym.com/marketing-support/download/21A26981-95AD-4E6F-8232-3414DD4DAB5F')}`,
            redirectLink: `${__('https://www.technogym.com/gb/bike-personal.html')}`,      
            image1: '//cdn.optimizely.com/img/8355110909/9478e2dc69d6477981298717c0681b91.png', // artis
            image2: '//cdn.optimizely.com/img/8355110909/857c8f2e9edf49c7a320f37cc71dfe4d.png', // bike personal
            image3: '//cdn.optimizely.com/img/8355110909/16c64610456a48958eb2961300b67566.jpg', // skillbike
         },
        ARTISBIKE: {
            name: 'Artis Bike',
            line: 'Artis',
            price: 'POA',
            description: 'Artis Bike strikes the perfect balance between a natural ride feeling and sleek aesthetics. Driven by the console’s training programmes and connected entertainment, your legs will spin beyond any limit.',
            downloadLink: `${__('https://www.technogym.com/marketing-support/download/728CD6E6-61F3-462F-8A7E-F0BBA09861A4')}`,
            redirectLink: `${__('https://www.technogym.com/gb/artis-bike.html')}`,      
            image1: '//cdn.optimizely.com/img/8355110909/d9bdbe887d8f48beb61e9ff262ed6f87.png', // artis
            image2: '//cdn.optimizely.com/img/8355110909/ba22e5165dac4144a9bce520c2a420a2.png', // bike personal
            image3: '//cdn.optimizely.com/img/8355110909/4b802f62117e4f308f8903ac6da87e49.png', // skillbike
        },
    }

    Object.keys(bikes).forEach((i) => {
        const data = bikes[i];

        const element = document.createElement('div');
        element.classList.add(`${ID}_bikeProduct`);
        element.innerHTML = `
        <h3>${data.name}</h3>
        <span>By ${data.line}</span>
        <p class="${ID}-price">${data.price}</p>
        <div class="${ID}-product_images">
            <img src="${data.image1}"/>
            <img src="${data.image2}"/>
            <img src="${data.image3}"/>
        </div>
        <p class="${ID}-description">${data.description}</p>
        <div class="${ID}-cta ${ID}-learnmore" product-name="${data.name}" data-product="${data.redirectLink}" data-downloadlink="${data.downloadLink}">Request Brochure</div>
        <div class="${ID}-finance_wrapper">${data.finance ? `<span class="${ID}-finance">${data.finance}</span>` : ``}</div>`;

        document.querySelector(`.${ID}-bestSell_products`).appendChild(element);
    });
}
