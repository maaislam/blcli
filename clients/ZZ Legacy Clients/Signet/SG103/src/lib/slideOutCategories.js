import { getSiteFromHostname } from "./services";
import shared from "./shared";

export const EJtopCategories = {
    elFirst: {
        name: 'Diamonds',
        buttonText: 'Shop all Diamonds',
        allLink: 'https://www.ernestjones.co.uk/webstore/diamonds.do?icid=ej-tn-diamonds',
        blocks: {
            'Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4643682-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-engagement-rings/?icid=ej-tn-diamonds-diamond-engagement',
            },
            'Diamond Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4645758-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-rings/?icid=ej-tn-diamonds-diamond-all',
            },
            'Bridal Sets': {
                icon:'https://d34qiagx43sg99.cloudfront.net/2937832-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-ring-bridal-sets/?icid=ej-tn-diamonds-diamond-bridal-set',
            },
            'Diamond Wedding Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4146840-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-rings/occasion%7Cwedding/?icid=ej-tn-diamonds-diamond-wedding',
            },
            'Diamond Eternity Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3831825-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-rings/style%7Ceternity/?icid=ej-tn-diamonds-diamond-eternity',
            },
            'Diamond Bangles': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1178954-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-bangles/?icid=ej-tn-diamonds-cat-bangles',
            },
            'Diamond Bracelets': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3331709-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-bracelets/?icid=ej-tn-diamonds-cat-bracelets',
            },
            'Diamond Necklaces': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1035037-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-necklaces/?icid=ej-tn-diamonds-cat-necklaces',
            },
            'Diamond Earrings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1186744-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-earrings/?icid=ej-tn-diamonds-cat-earrings',
            },
            'Diamond Set Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4504046-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/watch+features%7Cdiamond+set/?icid=ej-tn-diamonds-cat-watches-set',
            },
        }
    },
    elSecond: {
        name: 'Watches',
        buttonText: 'Shop all Watches',
        allLink: 'https://www.ernestjones.co.uk/webstore/watches.do?icid=ej-tn-watches',
        blocks: {
            "Men's Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/2523442-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/mens-watches/',
            },
            "Ladies' Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3945537-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-watches/',
            },
            "Luxury Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3867447-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches',
            },
            "Designer Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4225945-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cfashion%20watches',
            },
            "Smart Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/1142453-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/smartwatches',
            },
            "Exclusive Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/9301224-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cexclusive',
            },
            "Under £150": {
                icon:'https://d34qiagx43sg99.cloudfront.net/1191632-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/price%7Cunder+%C2%A350%7C%C2%A350+-+%C2%A3149/',
            },
            "£150 - £499": {
                icon:'https://d34qiagx43sg99.cloudfront.net/1075926-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/price%7C%C2%A3150+-+%C2%A3499',
            },
            "£500 - £999": {
                icon:'https://d34qiagx43sg99.cloudfront.net/9302808-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/price%7C%C2%A3500+-+%C2%A3999',
            },
            "Over £1000": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5818338-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/price%7C%C2%A31000+or+over/',
            },

        }
    },
    elThird: {
        name: 'Bridal',
        buttonText: 'Shop all Bridal',
        allLink: 'https://www.ernestjones.co.uk/webstore/wedding.do',
        blocks: {
            "Bridal Sets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4887670-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/bridal-ring-sets/occasion%7Cengagement/',
            },
            "Men's Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/6374557-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/recipient%7Chim/',
            },
            "Ladies' Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/2929880-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/recipient%7Cher/',
            },
            "Platinum Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/6261655-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/platinum-wedding-rings/',
            },
            "White Gold Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8134286-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/material%7Cwhite+gold/',
            },
            "Rose Gold Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4617509-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/rose-gold-wedding-rings/',
            },
            "Silver Wedding Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4151240-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/material%7Call+silver/',
            },
            "Jewellery Sets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5827396-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/sets-of-jewellery/',
            },
            "Pearl Jewellery": {
                icon:'https://d34qiagx43sg99.cloudfront.net/2364557-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/pearl-jewellery/',
            },
            "Cufflinks": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4248813-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/cufflink-gifts/',
            },
        }
    },
    elFourth: {
        name: 'Jewellery',
        buttonText: 'Shop all Jewellery ',
        allLink: 'https://www.ernestjones.co.uk/webstore/l/jewellery/',
        blocks: {
            'New-In Jewellery': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4643682-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/',
            },
            "Ladies' Earrings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5251680-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-earrings/',
            },
            "Ladies' Bracelets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4624831-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-bracelets/',
            },
            "Ladies' Necklaces": {
                icon:'https://d34qiagx43sg99.cloudfront.net/1000217-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/',
            },
            "Ladies' Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4652428-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/rings/recipient%7Cher/',
            },
            "Jewellery Sets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8116989-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-jewellery-sets/',
            },
            "Mens' Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8073422-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/rings/recipient%7Chim/',
            },
            "Mens' Necklaces": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3761622-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/mens-necklaces/',
            },
            "Mens' Bracelets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8817154-745.webp',
                link: 'https://www.ernestjones.co.uk/webstore/l/bracelets-mens/',
            },
        }
    }
}

export const HStopCategories = {
    elFirst: {
        name: 'Engagement',
        buttonText: 'Shop all Engagement',
        allLink: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement',
        blocks: {
            'Solitaire Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4677862-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/stone+style%7Csolitaire/?icid=hs-nv-engagement-solitaire',
            },
            'Diamond Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/5240719-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/?icid=hs-nv-engagement-diamond-rings',
            },
            'Bridal Sets': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4346424-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/ring+style%7Cbridal+set/?icid=hs-nv-engagement-bridal-sets',
            },
            'Cluster Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/5923190-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/stone+style%7Ccluster/?icid=hs-nv-engagement-cluster',
            },
            'Eternity Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4718992-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/stone+style%7Ceternity/?icid=hs-nv-engagement-eternity',
            },
            'Yellow Gold Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4729595-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/yellow-gold-jewellery/category%7Crings/occasion%7Cengagement/?icid=hs-nv-engagement-yellow',
            },
            'White Gold Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3808300-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/white-gold-rings/occasion%7Cengagement/?icid=hs-nv-engagement-white',
            },
            'Rose Gold Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4571584-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/rose-gold-jewellery/category%7Crings/occasion%7Cengagement/?icid=hs-nv-engagement-rose',
            },
            'Platinum Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/2886456-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/material%7Cplatinum/occasion%7Cengagement/?icid=hs-nv-engagement-platnium',
            },
            'Silver Engagement Rings': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4388534-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/material%7Call+silver/occasion%7Cengagement/?icid=hs-nv-engagement-silver',
            },
        }
    },
    elSecond: {
        name: 'Watches',
        buttonText: 'Shop all Watches',
        allLink: 'https://www.hsamuel.co.uk/webstore/l/watches/',
        blocks: {
            "Men's Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8109257-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Chim/',
            },
            "Ladies' Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3034437-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Cher/',
            },
            "Kids' Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5214823-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/childrens-watches',
            },
            'Exclusive Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/9600752-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/select%7Cexclusive/',
            },
            'Smart Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1138499-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/category%7Cactivity+tracker%7Csmart+watches/',
            },
            'New Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1251546-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/select%7cnew/',
            },
            'Top Rated Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/5293197-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/rating%7c5+stars/',
            },
            'Citizen Star Wars Watches': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1016997-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/brand%7Ccitizen+star+wars/',
            },
            "Men's Tissot Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/1251597-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/brand%7ctissot/recipient%7chim/',
            },
            "Ladies' Sekonda Watches": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5321387-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/ladies-sekonda-watches/',
            },
        }
    },
    elThird: {
        name: 'Jewellery',
        buttonText: 'Shop all Jewellery',
        allLink: 'https://www.hsamuel.co.uk/webstore/l/jewellery/',
        blocks: {
            "Ladies' Jewellery": {
                icon:'https://d34qiagx43sg99.cloudfront.net/5032342-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/recipient%7Cher/',
            },
            "Men's Jewellery": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3671968-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/recipient%7Chim',
            },
            "Ladies' Earrings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4667298-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/earrings-for-ladies/',
            },
            "Ladies' Bracelets & Bangles": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4760603-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cbangles%7Cbracelets/recipient%7Cher/',
            },
            "Ladies' Necklaces": {
                icon:'https://d34qiagx43sg99.cloudfront.net/8496226-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher',
            },
            "Ladies' Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4717333-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/recipient%7Cher/',
            },
            "Ladies' Beads & Charms": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4673972-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cbeads+%26+charms/recipient%7Cher/',
            },
            "Mens' Rings": {
                icon:'https://d34qiagx43sg99.cloudfront.net/9199322-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/recipient%7Chim/',
            },
            "Mens' Necklaces": {
                icon:'https://d34qiagx43sg99.cloudfront.net/4819365-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/',
            },
            "Mens' Bracelets": {
                icon:'https://d34qiagx43sg99.cloudfront.net/3424251-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/mens-bracelets/',
            },
        }
    },
    elFourth: {
        name: 'Gifts',
        buttonText: 'Shop all Gifts',
        allLink: 'https://www.hsamuel.co.uk/webstore/l/gift-cards/',
        blocks: {
            'Gifts For Her': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3946274-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/ladies-gift-ideas/',
            },
            'Gifts For Him': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3625818-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/gifts-for-men/',
            },
            'Gifts For Children': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3397475-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/gifts/recipient%7Cchildren/',
            },
            'Figurines and Traditions': {
                icon:'https://d34qiagx43sg99.cloudfront.net/9726454-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/collectibles-figurines-and-gifts/',
            },
            'Personalised Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1439731-745.webp',
                link: 'https://www.hsamuelpersonalisedgifts.co.uk/',
            },
            'Birthday Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/9111212-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/birthday-gifts/',
            },
            'Wedding Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3397122-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/wedding-gifts/',
            },
            'New Baby Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/3419886-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/new-baby-gifts/',
            },
            'Christening Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/1444905-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/gifts-for-christening/',
            },
            'New Home Gifts': {
                icon:'https://d34qiagx43sg99.cloudfront.net/4298381-745.webp',
                link: 'https://www.hsamuel.co.uk/webstore/l/gifts/category%7Chome+accessories/',
            },
        }
    }
}



export default () => {

    const { ID } = shared;

    let topCategories;
    if(getSiteFromHostname() === 'ernestjones') {
        topCategories = EJtopCategories;
    } else {
        topCategories = HStopCategories;
    }

    // create markup
    Object.keys(topCategories).forEach((i) => {
        const data = topCategories[i];

        const contentEl = document.createElement('div');
        contentEl.classList.add(`${ID}-contentWrapper`);
        contentEl.setAttribute(`name`, [i][0]);
        contentEl.innerHTML = 
        `<div class="${ID}-contentInner">
            <div class="${ID}-title"><div class="${ID}-back"><span>Back</span></div>${data.name}</div>
            <div class="${ID}-innerBlocks">
            <div class="${ID}-lineBreak"></div>
            <a class="${ID}-button" href="${data.allLink}">${data.buttonText}</a>
            </div>
        </div>`;
        
        // add categories
        Object.keys(data.blocks).forEach((x) => {
            const block = data.blocks[x];
            const blockEL = document.createElement('a');
            blockEL.classList.add(`${ID}-block`);
            blockEL.setAttribute('href', block.link)
            
            blockEL.innerHTML = 
            `<div class="${ID}-icon" style="background-image:url(${block.icon})"></div><p>${[x][0]}</p>`;
            contentEl.querySelector(`.${ID}-innerBlocks .${ID}-lineBreak`).insertAdjacentElement('beforebegin', blockEL);
        });


        document.body.append(contentEl);
    });
  
}