import shared from "../../../../../core-files/shared";

const { ID } = shared;

export default () => {

  const boxData = [
    {
        front: {
            attr: 'delivery',
            icon: 'https://editor-assets.abtasty.com/49254/62bd8eafa58791656589999.png',
            icon2: 'https://editor-assets.abtasty.com/49254/62bd8ef62ec571656590070.png',
            title: 'Free delivery*',
            text: 'For most countries, shipping is totally free! We pay for your shipping so you don’t have to.'
        },
        content: {
            text: `Our team of happy workers ship out your orders every day at no additional shipping cost (for most countries). No surprises, just great service! More information can be found <a href="https://help.merchoid.com/">here</a>`,
            v3Text:`Our team of happy workers ship out your orders every day at no additional shipping cost (for most countries). No surprises, just great service! More information can be found <a href="https://help.merchoid.com/">here</a>`,
        }
    },
    {
        front: {
            attr: 'official',
            icon: 'https://editor-assets.abtasty.com/49254/62bd8ec8f2c861656590024.png',
            icon2: 'https://editor-assets.abtasty.com/49254/62bd8f1dbba621656590109.png',
            title: '100% official merch',
            text: 'Approved by the creator, so you can be confident anything you buy will be of the highest quality'
        },
        content: {
            text: `Who’s your favourite Doctor? Dr Gordon Freeman, Dr Doom or Doctor Who? We search all the known galaxies looking for the coolest, quirkiest, most fashionable merchandise from all the videogames, TV shows, comics and movies you love.<br></br>Everything we sell is 100% officially licensed, so you can be confident anything you buy will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators<br></br>Oh, and sorry Whovians, but Dr Gordon Freeman will forever be our favourite Doctor!`,
            v3Text: `Everything we sell is 100% officially licensed, so you can be confident anything you buy will be of the highest quality and give you that warm, fuzzy feeling that only comes from supporting the creators.`
        }
    },
    {
        front: {
            attr: 'returns',
            icon: 'https://editor-assets.abtasty.com/49254/62bd8edc171f51656590044.png',
            icon2: 'https://editor-assets.abtasty.com/49254/62bd8f3db07751656590141.png',
            title: 'Money back guarantee',
            text: "If for some reason you're not happy with your order, you can return for a full refund"
        },
        content: {
            text: `We offer a 100-day returns policy on almost all items*. You can return an item you have bought from us within 100 days from when it shipped for a full refund or exchange. UK customers are provided with a Freepost returns address, other customers are responsible for paying shipping costs to return an item back to us.<br/><br/><span>* There are exceptions, such as underwear and products with downloadable content (DLC) codes.</span>`,
            v3Text: `We offer a 100-day returns policy on almost all items*. You can return an item you have bought from us within 100 days from when it shipped for a full refund or exchange. More information can be found <a href="https://help.merchoid.com/">here</a>`
        }
    },
  ];


  const addBoxes = () => {
    const boxMarkup = `
    <div class="${ID}-box-container">
      <h3>Reasons to shop with merchoid</h3>
        <div class="${ID}-boxes">
        </div>
    </div>`;

    document.querySelector('.merchoid-product-reasons').insertAdjacentHTML('beforebegin', boxMarkup);

    
    boxData.forEach(element => {
    const box = document.createElement('div');
    box.className = `${ID}-box`;
    box.setAttribute('content-target', element.front.attr);
    box.innerHTML = 
    `<div class="box-content">
      <div class="box-front">
        <div class="box-icon" style="background-image:url(${element.front.icon2})"></div>
        <h4>${element.front.title}</h4>
        <p>${element.front.text}</p>
        <div class="box-link">Learn more</div>
      </div>
      <div class="box-inner-content ${element.front.attr}">
        <div class="box-close"></div>
        <div class="box-inner-title">
          <div class="box-icon" style="background-image:url(${element.front.icon2})"></div>
            <h4>${element.front.title}</h4>
          </div>
        <p>${element.content.text}</p>
      </div>`

      document.querySelector(`.${ID}-boxes`).appendChild(box);
    });
  }

  const boxEvents = () => {
    // // box events
    const allBoxes = document.querySelectorAll(`.${ID}-box`);
    for (let index = 0; index < allBoxes.length; index += 1) {
      const boxEl = allBoxes[index];
      boxEl.addEventListener('click', (e) => {
        
        if(e.currentTarget.classList.contains('open')) {
          e.currentTarget.classList.remove('open');

          document.querySelector(`.${ID}-overlay`).classList.remove('open');
          
        } else {

          if(document.querySelector(`.${ID}-box.open`)) {
          document.querySelector(`.${ID}-box.open`).classList.remove('open');
          }

          document.querySelector(`.${ID}-overlay`).classList.add('open');
          
          e.currentTarget.classList.add('open');
        }
      });
    }

    document.querySelector(`.${ID}-overlay`).addEventListener('click', (e) => {
      
        e.currentTarget.classList.remove('open');

        if(document.querySelector(`.${ID}-box.open`)) {
          document.querySelector(`.${ID}-box.open`).classList.remove('open');
        }
      });
    
  }

  addBoxes();
  boxEvents();
}