import settings from '../settings';

const { ID } = settings;

// add the treadmills to the matching pa
export default () => {
  const treadmills = {
    myrun: {
      image: '//cdn.optimizely.com/img/8355110909/ca238024e75c4d7c81349f4ceaa7616d.jpg',
      title: 'MyRun',
      description: 'Perfect combination of minimal design and innovative technology, its compact size is suitable for any home environment. Whichever you choose, power walk or an uphill run, the best training experience is what you’ll always get: live feedback, adaptive surface and endless fun included.',
      price: '£3,250',
      link: '/gb/treadmill-myrun.html',
      container: 'myRun',
    },
    runpersonal: {
      image: '//cdn.optimizely.com/img/8355110909/db3263781f2a4ccc8220bcb7cb783cc8.jpg',
      title: 'Run Personal',
      description: 'A true piece of interior art and made for design lovers. Run Personal is a synthesis of innovative materials and design. Born out of the collaboration between Technogym and Antonio Citterio Design Studio for professional cardio training and pure entertainment during a run.',
      price: '£12,500',
      link: '/gb/run-personal.html',
      container: 'myRun',
    },
    skillrun: {
      image: '//cdn.optimizely.com/img/8355110909/310b0955890f483d805bd4630cf6f595.jpg',
      title: 'Skillrun',
      description: 'Skillrun is the first piece of running equipment designed to meet the training requirements of elite athletes and demanding fitness enthusiasts. Thanks to its unique Multidrive Technology™, users can combine well-rounded cardio and power training in a single solution.',
      price: '£POA',
      link: '/gb/skillrun-performance-running.html',
      container: 'skillLine',
    },
    artisrun: {
      image: '//cdn.optimizely.com/img/8355110909/aa6018d01f7a4128b2339fe27daafb57.jpg',
      title: 'Artis Run',
      description: 'Artis® Run is state-of-the-art in treadmill technology combining running ergonomics with Unity™ 3.0, the innovative digital interface ensuring a personalised training experience and cutting-edge connectivity. Artis® Run embodies the essence of indoor running.',
      price: '£POA',
      link: '/gb/artis-run.html',
      container: 'skillLine',
    },
  };

  Object.keys(treadmills).forEach((i) => {
    const data = treadmills[i];

    const productBlock = document.createElement('div');
    productBlock.classList.add(`${ID}-product`);
    productBlock.innerHTML =
    `<a class="${ID}-treadmillLink" href="${data.link}">
      <div class="${ID}-productImage" style="background-image: url(${data.image})"></div>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <p class="${ID}-price">${data.price}</p>
      <div class="${ID}-CTA"><a href="${data.link}">Learn more</a></div>
    </a>`;

    document.querySelector(`.${ID}-${data.container}`).appendChild(productBlock);
  });
};
