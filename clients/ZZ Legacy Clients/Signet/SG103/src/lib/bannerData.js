import { events } from '../../../../../lib/utils';
import { getSiteFromHostname } from './services';
import shared from './shared';

/**
 * Banners obj
 */
const EJBanners = {
    'Diamonds': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8C267B591BD2FD224B2522852ED52F708F993740419BF4ED04D589BD0EE6AE83.jpg?meta=/SG103---Homepage-Navigational-Element/EJDiamonds.jpg',
        bannerTarget: 'diamonds',
        subcategories: {
            "Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/6919FE33ED7E7B5ACE4DE47A2C555EE1F40BE01D5FBF38F4F456E8FED852C3F7.jpg?meta=/SG103---Homepage-Navigational-Element/EJEngagementRings.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/engagement-rings/?icid=ej-tn-engagement-all',
            },
            "Eternity Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9968AB30A6890AA9DC3A9744A06C911BDEECECCD16002A311A8592DB3D3F98D4.jpg?meta=/SG103---Homepage-Navigational-Element/EJeternity.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/eternity-rings/?icid=ej-tn-jewellery-her-eternity',
            },
            "Diamond Wedding Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/342EB090F0B0455D656D26CA72B4FF6984DEF3F6C93952A159A45A34F8E3A559.jpg?meta=/SG103---Homepage-Navigational-Element/EJWeddingring.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-rings/occasion%7Cwedding/?icid=ej-tn-diamonds-diamond-wedding',
            },
            "Solitaire Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/4636B60DDE6DEF0080AC2AF00E248423A2BB9A6E531269CA6B1047AD40D812B9.jpg?meta=/SG103---Homepage-Navigational-Element/EJSolitaire.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-engagement-rings/style%7Csolitaire/?icid=ej-tn-engagement-diamond-solitaire',
            },
            "Bridal Sets": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/CA3FF1A48430A0B21D9AF878FDB4A70FBE5B27785CA31DF05580304044775A98.jpg?meta=/SG103---Homepage-Navigational-Element/EJbridalset.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-ring-bridal-sets/?icid=ej-tn-diamonds-diamond-bridal-set',
            },
            "Cluster Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/3F34513892B0F41FB3EFC3377F4CAF16A42456B13267D49C5E8B035A3C43AE06.jpg?meta=/SG103---Homepage-Navigational-Element/EJcluster.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/diamond-engagement-rings/style%7Ccluster/?icid=ej-tn-engagement-diamond-cluster',
            },
        }
    },
    'Watches': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/0A2A8FFC0DAF529F222047DF55D708A5B2392162688A984111D1E7F094062501.jpg?meta=/SG103---Homepage-Navigational-Element/EJWatches.jpg',
        bannerTarget: 'watches',
        subcategories: {
            "All Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/2D95A5CD25AB630077A32679A30D7ACC232FAD6947DD8ED787E3A20000591B82.jpg?meta=/SG103---Homepage-Navigational-Element/EJallwatches.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/watches.do?icid=ej-tn-watches-coll-all',
            },
            "Men's Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/AF2EFE5663527D11EF6C8B871208F2751CC3984B7EB984F15000A5AFB411F6F6.jpg?meta=/SG103---Homepage-Navigational-Element/EJmalewatches.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/mens-watches/?icid=ej-tn-watches-coll-him',
            },
            "Ladies' Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/97D462637227B07224BE7CE31E5AEE031330F1E8E417F984BF0D9908DE075ADB.jpg?meta=/SG103---Homepage-Navigational-Element/EJladieswatch.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-watches/?icid=ej-tn-watches-coll-her',
            },
            "Luxury Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/DE6728588FFC7773B1E05E7C4C4B51049A5FE61974AE03CF05F96C5B40602499.jpg?meta=/SG103---Homepage-Navigational-Element/EJluxwatch.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches/?icid=ej-tn-watches-coll-lux',
            },
            "Designer Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/77CAD01BB4B22F4DD6D55CCF9E0913A44F197C3EF5EB5B88F29569D940D198CE.jpg?meta=/SG103---Homepage-Navigational-Element/EJdesignerwatches.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cfashion%20watches/?icid=ej-tn-watches-coll-designer',
            },
            "Smart Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/12896A90D58EDE301544F0E3EFCA69A08A8E57204824FE4DA315EDE011F53CBD.jpg?meta=/SG103---Homepage-Navigational-Element/EJsmartwatch.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/smartwatches/?icid=ej-tn-watches-coll-smart',
            },
            "New Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/A3AAD74174619E1439138D6F7C4A87B75FD8DB0E6DD9112260F3E6A8883EE0D5.jpg?meta=/SG103---Homepage-Navigational-Element/EJnewwatch.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cnew/?icid=ej-tn-watches-coll-ne',
            },
            "Exclusive Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/1FC1F1A551411060701E96A8D16D309DF3157C3CF0193103D4E984A2591BAB69.jpg?meta=/SG103---Homepage-Navigational-Element/EJexclusive.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/watches/select%7Cexclusive/?icid=ej-tn-watches-coll-exclusive',
            },
        }
    },
    'Jewellery': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/E98B68697EEC824002474FC3B0F97B311C6DD9455E8880DB722305F2450F0FD9.jpg?meta=/SG103---Homepage-Navigational-Element/EJJewellery.jpg',
        bannerTarget: 'jewellery',
        subcategories: {
            "Wedding Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/D2C3460E0201BC4B3330354D45CD67F26F4A08A5829AC806E27E1B50E0746F42.jpg?meta=/SG103---Homepage-Navigational-Element/EJweddingRings2.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/wedding-rings/',
            },
            "Ladies' Jewellery": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/18662453E0122C8CC227085451E2B110A0FB75AA4ECF2EC4FE543CF1540631B5.jpg?meta=/SG103---Homepage-Navigational-Element/EJladiesjewellery.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-jewellery/',
            },
            "Men’s Jewellery": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5EF1580A1ECFDB34F218076CA008EA5EBF181B17102BFB0BB1AF223A75BA279F.jpg?meta=/SG103---Homepage-Navigational-Element/EJmensjewellery.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/jewellery/recipient%7Chim/',
            },
            "Ladies' Earrings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/A950CD127CD014BCB1720C1573CD2234C06108D83957646FAAF65FE7A0BAA1A6.jpg?meta=/SG103---Homepage-Navigational-Element/EJladiesearrings.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-earrings/?icid=ej-tn-jewellery-her-earrings',
            },
            "Ladies' Necklaces": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/E2E13F214209A554F6EC3CEB25E6C9D01C95850D5AC988B1070F9876CD41B6E7.jpg?meta=/SG103---Homepage-Navigational-Element/EJladiesnecklace.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/ladies-necklaces/?icid=ej-tn-jewellery-her-necklaces',
            },
            "Ladies' Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/82EFBC1C6943F12FD719CF9C275D26C77A96040944525828C345F85D40796915.jpg?meta=/SG103---Homepage-Navigational-Element/EJladiesrings.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/rings/recipient%7Cher/?icid=ej-tn-jewellery-her-rings',
            },
            "Men’s Necklaces": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C05D5EE804A9884BA17471EBAFF1FF222D5D826703F56A2E5BF0DB3B4E1EA643.jpg?meta=/SG103---Homepage-Navigational-Element/EJmensnecklace.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/mens-necklaces/?icid=ej-tn-jewellery-him-necklaces',
            },
            "Men’s Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8D76AEA3F6DE355F5E5B9F01FB620279E369E06D64E16FEDB3A92DFD01791E51.jpg?meta=/SG103---Homepage-Navigational-Element/EJmensrings.jpg',
                link: 'https://www.ernestjones.co.uk/webstore/l/rings/recipient%7Chim/?icid=ej-tn-jewellery-him-rings',
            },
        }
    }
}

const HSBanners = {
    'Rings': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/389C1205120E0643ABABF0D1D0D479B481A4B3A7AD9ECAABFC88D2BBA561E5DB.jpg?meta=/SG103---Homepage-Navigational-Element/HSRings.jpg',
        bannerTarget: 'diamonds',
        subcategories: {
            "Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9305094EDC5053D0426BFC10DCAC174C565EF00A4A48CC9B266DB590522D0A06.jpg?meta=/SG103---Homepage-Navigational-Element/HSengagementring.jpg',
                link: 'https://www.hsamuel.co.uk/engagement-rings/?icid=hs-nv-engagement-rings',
            },
            "Wedding Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/075D5AE493B6745E04797ED68D631EEBA59599C11564D4C16AF5C34AEF2C3E3B.jpg?meta=/SG103---Homepage-Navigational-Element/HSweddingring.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/content/wedding-rings/',
            },
            "Eternity Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/03F31A9FA104F4C50110494C56867EF7DE2E5AA7D32D8FA998179D196FE37B80.jpg?meta=/SG103---Homepage-Navigational-Element/HSeternity.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/stone+style%7Ceternity/?icid=hs-nv-engagement-eternity',
            },
            "Solitaire Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/32ED4A142B2B901B5B8F99E647F68FC380F10F0F1BD6BA459239D9F64384A1C8.jpg?meta=/SG103---Homepage-Navigational-Element/HSSolitaire.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/stone+style%7Csolitaire/?icid=hs-nv-engagement-solitaire',
            },
            "Diamond Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/51A85694C4EF40F207E55E99358AEC00AEA17937648220A3DB6D458849A64EEB.jpg?meta=/SG103---Homepage-Navigational-Element/HSdiamondengagement.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/diamonds/category%7Crings/occasion%7Cengagement/?icid=hs-nv-engagement-diamond-rings',
            },
            "Bridal Sets": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C4CF74AADAC24084BD6F36408279E8960F100CDECF1F349B74EA78295754A0DB.jpg?meta=/SG103---Homepage-Navigational-Element/HSbridalset.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/ring+style%7Cbridal+set/?icid=hs-nv-engagement-bridal-sets',
            },
            "Cluster Engagement Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/7F57A72C8BDBF4AE068972F2E771CD92F308ED335ABA8F1F546EC9FE77F3A870.jpg?meta=/SG103---Homepage-Navigational-Element/HSclusterring.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/stone+style%7Ccluster/?icid=hs-nv-engagement-cluster',
            },
        }
    },
    'Watches': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/98335A622E3E2D74842CF531B29005CAA55AD262C8A23001E8CC1F01C0F5BED8.jpg?meta=/SG103---Homepage-Navigational-Element/HSWatches.jpg',
        bannerTarget: 'watches',
        subcategories: {
            "All Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/26C6E494C39304277F532ABA798F3FE16A2FF68545E2387F0C02EBDAD3E5D2D6.jpg?meta=/SG103---Homepage-Navigational-Element/HSallwatches.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/?icid=hs-nv-watches-all',
            },
            "Men's Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9B18AD31DA5859E6F315AC14C80CB93B13235D604AD601D8E79B9CED9EBEA929.jpg?meta=/SG103---Homepage-Navigational-Element/HSmenswatches.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Chim/?icid=hs-nv-watches-him',
            },
            "Ladies' Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/1DBDA138E58B38707C6CE4EA77BBFC63EA16CDF88FCE9FE71FA24C1789047F1E.jpg?meta=/SG103---Homepage-Navigational-Element/HSladieswatch.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Cher/?icid=hs-nv-watches-her',
            },
            "Kids' Watches": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/46B808848B2D0CD960CA57021A73B570CBF44B60B109585C814CA6E759603FF2.jpg?meta=/SG103---Homepage-Navigational-Element/HSkidswatches.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/watches/recipient%7Cchildren/?icid=hs-nv-watches-children',
            },
        }
    },
    'Jewellery': {
        image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/77D84C59EC0B8367A6816167C7A686B48E5E0BC9F33CE495E0CA580DF48322D9.jpg?meta=/SG103---Homepage-Navigational-Element/HSJewellery.jpg',
        bannerTarget: 'jewellery',
        subcategories: {
            "Ladies' Jewellery": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/86496798F23C6CD1C1EC58F7CF48EA363F085676680A992F69809C5CAD53F0A4.jpg?meta=/SG103---Homepage-Navigational-Element/HSladiesjwl.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/recipient%7Cher/?icid=hs-nv-jewellery-her-all',
            },
            "Men’s Jewellery": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/1142C1BBB72928BF79F84D3E503F6465B6B611946FAC606DE29FD3AF8C59C94C.jpg?meta=/SG103---Homepage-Navigational-Element/HSmensjewellery.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/recipient%7Chim/?icid=hs-nv-jewellery-him-all',
            },
            "Ladies' Earrings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/84DDED3DBD1D73CF8DE89BC9E4471F456A858A9F958E4234FEC9113CD5BF8DBB.jpg?meta=/SG103---Homepage-Navigational-Element/HSladiesearrings.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/earrings-for-ladies/',
            },
            "Ladies' Necklaces": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/642793AFEC4E0B8A03A97F2DA14171F20CC239C5F7F3ED30DCB6AF81AEF2A470.jpg?meta=/SG103---Homepage-Navigational-Element/HSladiesnecklace.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cnecklaces/recipient%7Cher/?icid=hs-nv-jewellery-her-necklaces',
            },
            "Ladies' Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/39245D4E57E4AE83FC67AA3FA17E4407685FDCB3AFE7F8275EA3AC803A46BCE3.jpg?meta=/SG103---Homepage-Navigational-Element/HSladiesrings.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/recipient%7Cher/?icid=hs-nv-jewellery-her-rings',
            },
            "Men’s Necklaces": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/4FBF520323EAC91A3F7BD60F72A544863FB42B97CF682EF812B61DE22754EA68.jpg?meta=/SG103---Homepage-Navigational-Element/HSmensnecklace.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Cnecklaces/recipient%7Chim/?icid=hs-nv-jewellery-him-necklaces',
            },
            "Men’s Rings": {
                image: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/2BE8489E19E7B06FD7313205C9039A04B28D8C647B312156D3A536EA1D5B7370.jpg?meta=/SG103---Homepage-Navigational-Element/HSMensrings.jpg',
                link: 'https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/recipient%7Chim/?icid=hs-nv-jewellery-him-rings',
            },
        }
    }
}

let banners;

if(getSiteFromHostname() === 'ernestjones') {
    banners = EJBanners;
} else {
    banners = HSBanners;
}


/**
 * Create banners
 */
export default () => {

    const { ID, VARIATION } = shared;

    /**
     * Build banner markup
     */
    const createBanners = () => {
        Object.keys(banners).forEach((i, index) => {
        const data = banners[i];
        const banner = document.createElement('div');
        banner.classList.add(`${ID}-categoryBanner`);
        if(VARIATION === '1') {
            banner.innerHTML = `
            <div class="${ID}-bannerInner" data-target="${data.bannerTarget}" style="background-image:url(${data.image})">
                <div class="${ID}-title"><span>${[i][0]}</span></div>
            </div>
            ${window.innerWidth < 767 ? `<div class="${ID}-bannerCategories" cat-data="${data.bannerTarget}"><div class="${ID}-catInner"></div></div>` : ''}`;
        } else if(VARIATION === '2'){
            banner.innerHTML = `
            <div class="${ID}-bannerInner" data-target="${data.bannerTarget}" style="background-image:url(${data.image})">
                <div class="${ID}-title"><span>${[i][0]}</span></div>
            </div>`;
        }
       

      
        /**
         * Add the subcategories
         */
        Object.keys(data.subcategories).forEach((j) => {
            const catData = data.subcategories[j];

            const subCat = document.createElement('div');
            subCat.classList.add(`${ID}-subCategory`);
            subCat.innerHTML = `
            <a href="${catData.link}">
                <div class="${ID}-catImage" style="background-image:url(${catData.image})"></div>
                <span>${[j][0]}</span>
            </a>`;

            if(window.innerWidth < 767 && VARIATION !== '2') {
                banner.querySelector(`.${ID}-bannerCategories .${ID}-catInner`).appendChild(subCat);
            } else {
                if(index === 0) {
                    document.querySelector(`.${ID}-bannerCategories.${ID}-first .${ID}-catInner`).appendChild(subCat);
                    document.querySelector(`.${ID}-bannerCategories.${ID}-first`).setAttribute('cat-data', data.bannerTarget);
                } 
                if(index === 1) {
                    document.querySelector(`.${ID}-bannerCategories.${ID}-second .${ID}-catInner`).appendChild(subCat);
                    document.querySelector(`.${ID}-bannerCategories.${ID}-second`).setAttribute('cat-data', data.bannerTarget);
                } 
                if(index === 2) {
                    document.querySelector(`.${ID}-bannerCategories.${ID}-third .${ID}-catInner`).appendChild(subCat);
                    document.querySelector(`.${ID}-bannerCategories.${ID}-third`).setAttribute('cat-data', data.bannerTarget);
                } 
            }
        });

        document.querySelector(`.${ID}-bannersContainer`).appendChild(banner);
    });

    }
    /**
     * Banner clicks
     */
    const showHideCategory = () => {

        function scrollToElement(element) {
            window.scroll({
              behavior: 'smooth',
              left: 0,
              top: element.getBoundingClientRect().top + window.scrollY - 200,
            });
        }
        
        const catHeading = document.getElementsByClassName(`${ID}-bannerInner`);

        for (let index = 0; index < catHeading.length; index += 1) {
            const el = catHeading[index];
            if (el.getAttribute(`data-target`)) {
                el.addEventListener('click', toggleItem, false);
            }
        }

        function toggleItem() {
            const itemClass = this.className;
            const innerLinks = document.getElementsByClassName(`${ID}-bannerCategories`);

            for (let i = 0; i < catHeading.length; i += 1) {
                const catEl = catHeading[i];
                catEl.className = `${ID}-bannerInner`;
            }

            for (let x = 0; x < innerLinks.length; x += 1) {
                const innerEl = innerLinks[x];
                innerEl.classList.remove(`${ID}-catActive`);
            }


            if (itemClass == `${ID}-bannerInner`) {

                this.className = `${ID}-bannerInner ${ID}-active`;
                const matchingEl = this.getAttribute(`data-target`);

                if (matchingEl) {
                    const match = document.querySelector(`.${ID}-bannerCategories[cat-data="${matchingEl}"]`);
                    match.className = `${ID}-bannerCategories ${ID}-catActive`;
                    scrollToElement(this.querySelector(`.${ID}-title`));
                    events.send(`${ID} V:${VARIATION}`, 'click', `banner: ${matchingEl}`);                
                }
            }
        }
    }

    const allBannerSubCats = () => {
        const bannerSubCats = document.querySelectorAll(`.${ID}-subCategory`);
        if(bannerSubCats) {
            for (let index = 0; index < bannerSubCats.length; index += 1) {
                const element = bannerSubCats[index];
                element.addEventListener('click', () => {
                    const name = element.querySelector('span').textContent.trim();
                    events.send(`${ID} V:${VARIATION}`, `click', 'subcategory: ${name}`);
                });
            }
        }
    }


     /**
     * Slick the categories
     */
    const slickCategories = () => {
        // put products in carousel 
        const allBanners = document.querySelectorAll(`.${ID}-catInner`);
        for (let index = 0; index < allBanners.length; index +=1 ) {
            const element = allBanners[index];
            if(element.querySelectorAll(`.${ID}-subCategory`).length > 4) {
                element.classList.add(`${ID}-5ormore`);
            }
        }

        window.jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', (data, textStatus, jqxhr) => {
            jQuery(`.${ID}-bannerCategories .${ID}-catInner.${ID}-5ormore`).slick({
                infinite: true,
                arrows: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                rows: 0,
                mobileFirst: true,
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 300,
                      settings: "unslick"
                    }

                  ]
            });

            // resize slick on each banner click
            const allBanners = document.querySelectorAll(`.${ID}-bannerInner`);
            for (let index = 0; index < allBanners.length; index +=1 ) {
                const element = allBanners[index];
                element.addEventListener('click', () => {
                    
                    if(element.querySelectorAll(`.${ID}-subCategory`).length > 4) {
                        jQuery(`.${ID}-bannerCategories.${ID}-catActive .${ID}-catInner`).slick('setPosition');
                        jQuery(`.${ID}-bannerCategories.${ID}-catActive .${ID}-catInner`).slick('refresh');
                    } 
                 });
            }
        });
          
   }

    createBanners();
    showHideCategory();
    allBannerSubCats();
    if(window.innerWidth > 767) {
        slickCategories();
    }
}

