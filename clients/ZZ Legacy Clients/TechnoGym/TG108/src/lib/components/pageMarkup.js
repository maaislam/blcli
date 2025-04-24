import shared from "../shared";

import getData from "./content";

const { ID } = shared;

export default class PageMarkup {
    constructor() {
      this.createAndRender();
    }
  
    createAndRender() {
        
        const pageTitle = document.querySelector('.category-title h1').textContent.trim();
        const content = getData();
        
        const element = document.createElement('div');
        element.classList.add(`${ID}__pageContent`);
        element.innerHTML = 
        `<div class="${ID}__header" style="background-image:url(${content.heroImage})">
            <div class="${ID}__header-text">
                <h1 class="${ID}__h1">${pageTitle}</h1>
                <p class="${ID}__p">${content.subtitle}</p>
            </div>
        </div>
        <div class="${ID}__section ${ID}-mainProducts"></div>
        ${window.location.href.indexOf('bike') > -1 ? 
        `<div class="${ID}__section ${ID}-moreProducts ${ID}-upright">
          <h2 class="${ID}__h2">More Smart Upright Exercise bikes</h2>
          <div class="${ID}__carousel"></div>
        </div>
        <div class="${ID}__section ${ID}-moreProducts ${ID}-recumbent">
          <h2 class="${ID}__h2">More Smart Recumbent Exercise bikes</h2>
          <div class="${ID}__carousel"></div>
        </div>` : 
        `<div class="${ID}__section ${ID}-moreProducts">
            <h2 class="${ID}__h2">More Smart ${content.title}</h2>
            <div class="${ID}__carousel"></div>
        </div>`
        }
        ${content.medCarousel ? 
        `<div class="${ID}__section ${ID}-medical">
          <h2 class="${ID}__h2">Rehabilitation and prevention</h2>
          <div class="${ID}__carousel"></div>
        </div>` : ''
        }

        ${pageTitle === 'Treadmills' ? `
        <div class="${ID}__section ${ID}-treadmillHelp">
        <div class="${ID}__helpContainer">
          <h2 class="${ID}__h2">Need help choosing your treadmill?</h2>
          <p class="${ID}__intro">Learn what to look for in a treadmill in our guide, and how to choose the right one for your home or facility</p>
          <div class="${ID}__info">
            <div class="${ID}__topContent">
              <h3>How to choose your treadmill</h3>
              <p>The result of more than thirty years of research, all our treadmills offer the best available biomechanics for comfortable and safe training. Thanks to their connectivity, your workout gets more effective, engaging and fun than ever before. They are also a real investment, both for professional and home use: thanks to their extreme reliability, their value remains the highest even over time.</p>
            </div>
            <div class="${ID}__learnMore">
              <span>Learn More</span>
            </div>
            <div class="${ID}__bottomContent">
              <h4>Indoor running and walking equipment for the home, the fitness center, and much more</h4>
              <p>At home or in the gym, in groups or alone, our treadmills are the tool to create real experiences, offering the maximum stimulus to body and mind. It is your needs, and the environment in which you will use it, that will guide your choice.</p>

              <h4>The treadmill for tight spaces</h4>
              <p>When the available space poses limits on the size of the treadmill, for example a home or hotel room, looking for maximum performance in the smallest of spaces is key. MyRun offers the best ratio between running surface area (143 X 50 cm) and footprint, so you can train comfortably even in tight spaces. Compact, silent but powerful, it is suitable for both fast walking and running, with a maximum speed of 20 km/h and inclination up to 12%. It can also connect to your tablet for maximum enjoyment: training for set goals, playback of your recorded outdoor runs. It also offers tracking of your indoor workouts on your app and lets you share them with Strava, and you can run in virtual environments with participants from all over the world through the integration with Zwift.</p>

              <h4>The simple and effective treadmill</h4>
              <p>Thanks to the new user interface with QR code training guide, and the new Hand Sensors to keep your heart rate monitored, Jog Forma allows you to train easily and effectively. In its price range, it guarantees superior and consistent performance over time: the powerful engine follows you in your improvements, footboard and chassis are designed to withstand even the most intense workouts over time. With a surface area of 151 x 52 cm and inclination up to 15%, Jog Forma offers the performance of a professional treadmill, in versatile sizes even for home or hotel environments.</p>

              <h4>Award-winning design and high performance</h4>
              <p>Run Personal meets the needs of those who require professional performance, but also a unique and timeless design. Its appearance certainly does not go unnoticed, thanks to the shapes designed by Antonio Citterio and its precious metallic reflections. The 19" touch interface allows you to surf the net, watch movies and series on Netflix, keep up to date with the latest news and browse your social networks, and much more. In addition, it contains many fully guided training programs to meet the needs of both beginners and athletes. The convenient Hand Sensors located on the front handle of the treadmill allow you to monitor your heart rate and maximize your workout.</p>
            
              <h4>Treadmills for the cardio area of the fitness centre</h4>
              <p>The Excite line offers treadmills of great versatility to adapt to the needs of every type of user, a feature that makes it particularly suitable for fitness and wellness centres, but not only. Excite offers in fact many configuration options, which allow to modulate features and price with great flexibility. The two base models are Run 600 and Run 1000. Excite Run 600 is the versatile and durable treadmill with new features and new exercise and entertainment options to make your workout more engaging, challenging and enjoyable. Compared to Run 600, Excite Run 1000 has a wider running surface and allows speeds up to 27 km/h and inclination up to 18%. The treadmills also vary depending on their interface.They are available in three options: LED display, TV or with a connected touchscreen console. You can also choose from a range of different colors that allow you to customize your equipment fully. Our customer service is at your disposal to guide you through the configuration and get all the details, options and prices of your treadmill.</p>
            
              <h4>The superior treadmill, for a complete gym</h4>
              <p>The minimalist and essential design of Artis Run is the common trait of the entire Artis line, composed of cardio and strength equipment and designed to offer complete training and maximum performance. Artis Run provides a large, cushioned running surface (152 x 58 cm) that perfectly adapts to your pace. It features the 21" Unity™ multimedia touch interface with ergonomic positioning and tilt. The large touchscreen allows you to watch movies and TV series, listen to music and surf the web, all while your workout is tracked automatically. Brushless motor technology ensures quiet operation and low power consumption. Easy-to-use, programmable Fast Track controls for interval training. Hand Sensor to detect the heartbeat. Uphill training: the running surface can simulate up to 15% inclination. Emergency lock system ensures complete safety.</p>

              <h4>The ultimate technology for superlative running performance</h4>
              <p>Skillrun is the first running equipment designed to satisfy the most demanding athletes and fitness enthusiasts. It is perfect for both individual training and exciting running or bootcamp classes. Thanks to the exclusive Multidrive Technology™, it allows you to perform both cardio and power workouts in one machine. Sled Push mode simulates the weight and inertia of a weight-loaded sled for maximum sprint and acceleration. Conversely, Parachute mode trains the maximum speed by simulating the traction of an open parachute, increasing resistance proportionally to the athlete's speed. Featuring an ergonomic design with a large slat belt, its performance is extraordinary: inclination from -3% to +25% and maximum speed 30 km/h. Skillrun is available in configurations that differ in features and prices. In particular, it offers a 10" touchscreen interfaces focused on training, or 19" for more flexibility and entertainment features, along with goal-oriented training programs. Biofeedback provides detailed analysis of running performance, and is also available with advanced sensors allowing for left and right foot differentiation.</p>

              <h4>Treadmills for rehabilitation and prevention of metabolic disorders</h4>
              <p>The Excite line is also available in the MED version, designed for rehabilitation and prevention of metabolic disorders. Excite 600 Med can be fitted with an optional handle extension kit for greater safety and accessibility. Excite 1000 Med, in addition to the extensive library of test protocols, can be connected to most external instruments for stress testing (ECG) and maximum oxygen consumption (gas analysers).</p>
            </div>
            </div>
          </div>
        </div>`: ''}`;
      this.component = element;

      document.querySelector('.header-container').insertAdjacentElement('afterend', element);
    }
  }
