import shared from "../shared";

export const appStyleCategories = {
    brands: {
        buttonText: 'Shop all brands',
        allLink: '/brands/',
        blocks: {
            'Marvel': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Marvel-Logo_1.png',
                link: '/brand/marvel/',
            },
            'Star Wars': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Star-Wars-Logo-PNG-Image.png',
                link: '/brand/star-wars/',
            },
            'Harry Potter': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/580b57fbd9996e24bc43bd6a.png',
                link: '/brand/harry-potter/',
            },
            'Disney': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/latest-153x82.png',
                link: '/brand/disney/',
            }, 
            'DC Comics': {
                icon:'//cdn.optimizely.com/img/6087172626/b797c8cd485147e5ad10c09183e5d462.png',
                link: '/brand/dc-comics/',
            }, 
            'The Last of Us': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Image-Source-PlusPNG.com_1.png',
                link: '/brand/the-last-of-us/',
            }, 
            'Playstation': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/sony_playstation_PNG17532.png',
                link: '/brand/playstation/',
            }, 
            'Legend of Zelda': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/brand-logo-zelda.png',
                link: '/brand/nintendo-legend-of-zelda/',
            }, 
            'Nintendo': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/latest-11_1.png',
                link: '/brand/nintendo-original/',
            }, 
            'Friends': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/friends-logo.png',
                link: '/brand/friends/',
            }, 
            'Batman': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Batman-Dark-Knight-Logo-PNG.png',
                link: '/brand/dc-comics-batman/',
            }, 
            'Rick & Morty': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Rick_and_Morty_logo.png',
                link: '/brand/rick-and-morty/',
            }, 
            'The Avengers': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/avengers-logo-153x172.png',
                link: '/brand/the-avengers/',
            }, 
            'Lord of the Rings': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/latest-153x117-150x117.png',
                link: '/brand/lord-of-the-rings/',
            }, 
            'Spiderman': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/spider_man_logo___captain_armerica__civil_war_by_ultimate_savage-d9v93dn-153x188-150x150.png',
                link: '/brand/spiderman/',
            }, 
            'Game of Thrones': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/Game-of-Thrones-Logo-PNG-Picture.png',
                link: '/brand/game-of-thrones/',
            }, 
            'Fallout': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/1000px-Fallout_logo.svg.png',
                link: '/brand/fallout/',
            }, 
            'Assassins Creed': {
                icon:'https://merchoidcdn-pveiw4zwh96ot9z.netdna-ssl.com/media/amasty/shopby/option_images/slider/1280px-Assassins_Creed_Logo.svg.png',
                link: '/brand/assassins-creed/',
            }, 
        }
    },
    categories: {
        buttonText: 'Shop bestselling products',
        allLink: '/bestsellers/',
        blocks: {
            'Home and Office': {
                icon: '//cdn.optimizely.com/img/6087172626/46a943d60b204a5e904f0baf56d6e6c6.png',
                link: '/home-and-office/',
            },
            'T-shirts & tops': {
                icon: '//cdn.optimizely.com/img/6087172626/d5ad8261f46f43678a2ef1caabae6a71.png',
                link: '/t-shirts-and-tops/',
            },
            'Hoodies': {
                icon: '//cdn.optimizely.com/img/6087172626/4c6fec3d7e8f48728fb64de09488a504.png',
                link: '/hoodies-and-sweatshirts/',
            },
            'Accessories': {
                icon: '//cdn.optimizely.com/img/6087172626/24cfe8c39e174d42bd0a946ac54bb816.png',
                link: '/accessories/',
            },
            'Toys / Gadgets': {
                icon: '//cdn.optimizely.com/img/6087172626/09e2c516f812471ab1dca058acda81fd.png',
                link: '/toys-figures-and-plushies/',
            },
            'Jackets and outwear': {
                icon: '//cdn.optimizely.com/img/6087172626/e9d2a60803644ab09f7f04356673446f.png',
                link: '/jackets-and-outerwear/',
            },
        }
    }
}



export default () => {

    const { ID } = shared;

    // create markup
    Object.keys(appStyleCategories).forEach((i) => {
        const data = appStyleCategories[i];

        const contentEl = document.createElement('div');
        contentEl.classList.add(`${ID}-contentWrapper`);
        contentEl.setAttribute(`name`, [i][0]);
        contentEl.innerHTML = 
        `<div class="${ID}-contentInner">
            <div class="${ID}-title"><div class="${ID}-back"><span>Back</span></div>${[i][0]}</div>
            <div class="${ID}-innerBlocks"></div>
            <a class="${ID}-button" href="${data.allLink}">${data.buttonText}</a>
        </div>`;
        
        // add categories
        Object.keys(data.blocks).forEach((x) => {
            const block = data.blocks[x];
            const blockEL = document.createElement('a');
            blockEL.classList.add(`${ID}-block`);
            blockEL.setAttribute('href', block.link)
            
            blockEL.innerHTML = 
            `<div class="${ID}-icon" style="background-image:url(${block.icon})"></div><p>${[x][0]}</p>`;

            contentEl.querySelector(`.${ID}-innerBlocks`).appendChild(blockEL);
        });


        document.body.append(contentEl);
    });
  
}