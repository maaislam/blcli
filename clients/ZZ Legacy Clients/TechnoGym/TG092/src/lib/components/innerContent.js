/**
 * Add section content from object
 */

import settings from '../../lib/settings';
import { __ } from '../helpers';

const { ID } = settings;

export default () => {
  const sections = {
    fitness: {
      heading: `${__('Fitness facilities')}`,
      subcontent: `${__('Gyms, fitness studios and health centres: we serve over 80,000 around the world and know well how to satisfy their ever-changing needs. Attract more members with a diverse fitness offering. Keep them hooked with an engaging training experience. Get rid of any hassle with our complete support.')}`,
      blocks: [
        {
          title: `${__('Premium solution')}`,
          content: `${__('An interactive and personalised training experience enabled by technologically advanced cardio, strength and functional equipment.')}`,
          link: `${__('https://www.technogym.com/gb/fitness-facilities-premium-solution/')}`,
          image: '//cdn.optimizely.com/img/8355110909/aaeddf29977b4c4a823da02fc626a9ef.png',
        },
        {
          title: `${__('Prestige solution')}`,
          content: `${__('Classy environments that inspire peak performance, exceptional design and connected technology for clubs that won’t go unnoticed.')}`,
          link: `${__('https://www.technogym.com/gb/fitness-facilities-prestige-solution/')}`,
          image: '//cdn.optimizely.com/img/8355110909/b4d942acf15b4301ac7e86b86452635b.png',
        },
      ],
    },

    hospitality: {
      heading: `${__('Hospitality')}`,
      subcontent: `${__('The aspiration for a better quality of life can be satisfied even when we are on the move, whether if for work or leisure. Make sure to exceed travellers’ expectations offering a superior journey into wellness.')}`,
      blocks: [
        {
          title: `${__('Hotel')}`,
          content: `${__('Wellness is the new luxury for those who travel. Turn their stay into an exceptional experience.')}`,
          link: `${__('https://www.technogym.com/it/fitness-facilities-prestige-solution/')}`,
          image: '//cdn.optimizely.com/img/8355110909/5e1dc8a35e374fb5a0046ef2aa4b128b.png',
        },
        {
          title: `${__('Cruises')}`,
          content: `${__('Make the cruise unforgettable with the unique feeling of our training solutions.')}`,
          link: `${__('https://www.technogym.com/gb/cruise-wellness-solution/')}`,
          image: '//cdn.optimizely.com/img/8355110909/edcf56407169475e9c1018e7fa28efa9.png',
        },
      ],
    },

    residential: {
      heading: `${__('Residential')}`,
      subcontent: `${__('Residential areas and innovative housing developments projects are constantly looking to offer more services to their occupants. Gyms and wellness areas are in growing demand from condo residents. Quench their thirst for movement and add more value to your properties.')}`,
      blocks: [
        {
          title: `${__('Wellness facilities')}`,
          content: `${__('Design exclusive centres where residents can follow tailored training programmes using innovative technology with a sleek design.')}`,
          link: `${__('https://www.technogym.com/gb/wellness-facilities/')}`,
          image: '//cdn.optimizely.com/img/8355110909/57e0ddb406294e3cace5615bd8c74564.png',
        },
        {
          title: `${__('Wellness spaces')}`,
          content: `${__('Make shared residential areas stand out with Wellness solutions that can be used to relax, replenish energies and socialise.')}`,
          link: `${__('https://www.technogym.com/gb/wellness-spaces/')}`,
          image: '//cdn.optimizely.com/img/8355110909/2b280fc7cd3748869a1dde3eaba1da99.png',
        },
        {
          title: `${__('In-home wellness')}`,
          content: `${__('Increase property value offering potential customers a complete Wellness experience in the intimacy of their home.')}`,
          link: `${__('https://www.technogym.com/gb/home-wellness-solutions/')}`,
          image: '//cdn.optimizely.com/img/8355110909/72da00f712c64eddb919251b226234ee.png',
        },
      ],
    },

    health: {
      heading: `${__('Health')}`,
      subcontent: `${__('Residential areas and innovative housing developments projects are constantly looking to offer more services to their occupants. Gyms and wellness areas are in growing demand from condo residents. Quench their thirst for movement and add more value to your properties.')}`,
      blocks: [
        {
          title: `${__('Prevention')}`,
          content: `${__('Our complete solutions for prevention leverage the power of physical exercise to address some of the most common health disorders before they happen.')}`,
          link: `${__('https://www.technogym.com/gb/prevention/')}`,
          image: '//cdn.optimizely.com/img/8355110909/733c2e480a6b46ecb67d14f8117f7d27.png',
        },
        {
          title: `${__('Rehabilitation')}`,
          content: `${__('Our complete system for rehabilitation offers specific equipment and makes prescription and monitoring of exercise easy for operators.')}`,
          link: `${__('https://www.technogym.com/gb/rehabilitation/')}`,
          image: '//cdn.optimizely.com/img/8355110909/aa6d907a8c2b4eed9aacfc5b230c1207.png',
        },
      ],
    },
    performance: {
      heading: `${__('Performance')}`,
      subcontent: `${__('Where athletic performance is key, you want to be sure to have the very best tools for training. We’re not only talking about sports teams and facilities: emergency and uniformed services too need to rely on their bodies’ capacities.')}`,
      blocks: [
        {
          title: `${__('Sports associations')}`,
          content: `${__('Perpetual innovation, collaborations with world-class athletes and Olympic Games to offer the safest and highest performing solutions.')}`,
          link: `${__('https://www.technogym.com/gb/sports-associations/')}`,
          image: '//cdn.optimizely.com/img/8355110909/201c208378ea481ca118b2ae329f27b3.png',
        },
        {
          title: `${__('Schools and universities')}`,
          content: `${__('Better athletic performances, better learning: discover our solutions for schools and universities.')}`,
          link: `${__('https://www.technogym.com/gb/fitness-solutions-school-university/')}`,
          image: '//cdn.optimizely.com/img/8355110909/2706813dbd4b4273ae2188e053d7f894.png',
        },
        {
          title: `${__('Uniformed services')}`,
          content: `${__('Our professional equipment and advanced programming for service members translate into the highest standards of physical performance.')}`,
          link: `${__('https://www.technogym.com/gb/uniformed-services/')}`,
          image: '//cdn.optimizely.com/img/8355110909/73bcc9db2f22443690cddc1e38438ff7.png',
        },
      ],
    },
    workplace: {
      heading: 'Corporate Wellness',
      subcontent: 'A black hole is constantly swallowing companies’ productivity, and employees’ chronic illnesses play a significant role in this loss. Corporate wellness programmes can counter the damage inflicted by the lack of movement, saving costs and attracting new talents.',
      link: `${__('https://www.technogym.com/gb/corporate-wellness-programmes/')}`,
      blocks: [
        {
          title: `${__('Corporate wellness programmes')}`,
          content: `${__('Chronic employee health conditions cost companies millions of dollars. Much of this can be in fact prevented by applying corporate wellness programmes to your company, which can also help attract new talents in your teams.')}`,
          link: `${__('https://www.technogym.com/gb/corporate-wellness-programmes/')}`,
          image: '//cdn.optimizely.com/img/8355110909/8e52bd7fcf55439dbb9b83f2e2581493.png',
        },
      ],
    },
  };

  // loop through and add the sections
  Object.keys(sections).forEach((i) => {
    const data = sections[i];

    const sectionContainer = document.querySelector(`.${ID}-${[i][0]}`);
    const newSection = document.createElement('div');
    newSection.classList.add(`${ID}-section_inner`);
    newSection.innerHTML =
    `
    <div class="${ID}-sectionHeading">
      <h2>${data.heading}</h2>
      <p class="${ID}-subcontent">${data.subcontent}</p>
    </div>
    ${data.blocks ? Array.prototype.map.call(data.blocks, (blocks, x) => `
      <div class="${ID}-section_block">
        <div class="${ID}-section_content" style="background-image: url(${blocks.image})">
          <div class="${ID}-image" style="background-image: url(${blocks.image})"></div>
          <div class="${ID}-section_text">
            <div class="${ID}-text_inner">
              <h3>${blocks.title}</h3>
              <p>${blocks.content}</p>
              <a href="${blocks.link}">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    `).join('') : `<a href="${data.link}">Learn More</a>`}
    </div>`;
    sectionContainer.appendChild(newSection);
  });
};

