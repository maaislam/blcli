/**
 * @desc add the new sections
 */

import shared from "../shared";

export default () => {

    const { ID } = shared;
    
    const hotspotMarkup = {
        watches: {
            title: 'Watches',
            mobileImage: 'https://service.maxymiser.net/cm/images-us/1/1/2/3B899619AB9507E2C3BF4D8F2977206FEF18D85DEC71509848EF5CF2ECE4CC50/ernestjones-co-uk/EJ031---Homepage-redesign/watches.png',
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/4E7D31062F44490EBFD3CB7BE42FA5B0BC4050C28029CFBB4F7CEA54E347C891/ernestjones-co-uk/EJ031---Homepage-redesign/watches.jpg',
            links: {
                'All watches': '#',
                'Mens watches': '#',
                'Ladies watches': '#',
                'Luxury watches': '#',
                'Fashion watches': '#',
                'Smart watches': '#',
                'New watches': '#',
                'Exclusive watches': '#',
                'Top rated 5 star watches': '#',
            }
        },
        rings: {
            title: 'Engagement Rings',
            mobileImage: 'https://service.maxymiser.net/cm/images-us/1/1/2/9073278288DC95CB8BD5B70E5EB322243202CD605B9AE958C26DDE39FD86B445/ernestjones-co-uk/EJ031---Homepage-redesign/engagement.png',
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/FDF3771A31AA45063855E6DF0980F9157A84895BF750DF8DB00FF39B456DED8A/ernestjones-co-uk/EJ031---Homepage-redesign/engagement.jpg',
            links: {
                'All engagement rings': '#',
                'Top rated 5 star engagement rings': '#',
                'Gemstone engagement rings': '#',
                'All bridal sets': '#',
                "Men's engagement rings": '#',
                'Sale engagement rings': '#',
                'Engagement ring buying guide': '#',
            }
        },
        jewellery: {
            title: 'Jewellery',
            mobileImage: 'https://service.maxymiser.net/cm/images-us/1/1/2/B95310E427152BBB1234B002D8DACA2031AB749048C2BD0595804E64500BBBC0/ernestjones-co-uk/EJ031---Homepage-redesign/jewellery.png',
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/D0220ADCA8B22A3D4FFAC58577B7F3356FF0203823BE87E370DCBE2B6DE2E1B7/ernestjones-co-uk/EJ031---Homepage-redesign/jewellery.jpg',
            links: {
                'Engagement Rings': '#',
                'Wedding Rings': '#',
                'New-in jewellery': '#',
                'Earrings': '#',
                "Bracelets": '#',
                'Necklaces': '#',
                'Rings': '#',
                'Beads and Charms': '#',
                'Jewellery Sets': '#',
            }
        },
        diamonds: {
            title: 'Diamonds',
            mobileImage: 'https://service.maxymiser.net/cm/images-us/1/1/2/4596FE2B553F4CBE5AB54FDEA0234C716D5D8B2F7E3B6E81D9F97A973F4F3F3B/ernestjones-co-uk/EJ031---Homepage-redesign/Diamonds.png',
            image: 'https://service.maxymiser.net/cm/images-us/1/1/2/9CE060F036D9BBF6A38C4941E1FF31DA8C302D0D8238F8D660B9C7BAC81155B9/ernestjones-co-uk/EJ031---Homepage-redesign/diamond.jpg',
            links: {
                'All diamond rings': '#',
                'Engagement Rings': '#',
                'Bridal Sets': '#',
                'Wedding Rings': '#',
                "Eternity Rings": '#',
                'All Diamond Rings': '#',
                'Sale Diamond Rings': '#',
                'Diamond Jewellery buying guide': '#',
            }
        }
    }

    // create the sections
    Object.keys(hotspotMarkup).forEach((i) => {
        const data = hotspotMarkup[i];
        const categoryName = [i][0];


        const section = document.createElement('div');
        section.classList.add(`${ID}-section`);
        section.classList.add(`${ID}-${[i][0]}`);

        if(window.innerWidth > 767) {
            section.innerHTML = 
            `<div class="${ID}-section_inner">
                <div class="${ID}-links_Wrapper">
                <div class="${ID}-innerLinks">
                <h3>${data.title}</h3>
                </div>
                </div>
                <div class="${ID}-section_imageWrapper">
                    <div class="${ID}-sectionImage" style="background-image:url(${data.image})"></div>
                </div>
            </div>`;
        } else {
            section.innerHTML = 
            `<div class="${ID}-section_inner" style="background-image:url(${data.mobileImage})">
                <div class="${ID}-links_Wrapper">
                    <div class="${ID}-innerLinks">
                        <h3>${data.title}</h3>
                    </div>
                </div>
            </div>`;
        }

        // add the links
        const catLink = data.links;
        Object.keys(catLink).forEach((x) => {
            const innerLink = document.createElement('div');
            innerLink.classList.add(`${ID}-homeLink`);
            innerLink.innerHTML = `<a href="${catLink[x]}">${[x][0]}</a>`;
            section.querySelector(`.${ID}-innerLinks`).appendChild(innerLink);
        });

        const sectionsWrap = document.querySelector(`.${ID}-hotspot_wrapper`);
        sectionsWrap.appendChild(section);
    });
}