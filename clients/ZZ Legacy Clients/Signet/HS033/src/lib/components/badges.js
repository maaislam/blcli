import shared from "../shared";

// create a map of product names
// add the placeholder text
export default () => {

    const {
        ID
    } = shared;


    //Best Seller, Exclusive, Buyers Choice, Perfect Gift, Top Rated,
    const bestSeller = [
        '3002535',
        '2997185',
        '4313313',
        '9789278',
        '3000001',
        '8671818',
        '8594333',
        '3963926',
        '3963926',
        '2968878',
        '8064873',
        '1032410',
        '9049703',
        '9781188',
        '3002535',
        '8103542',
        '2997185',
        '8671818',
        '2967480',
        '4756606',
        '4875559',
        '8594333',
        '2243881',
        '3963977',
        '2079909',
        '9654380',
        '3963977',
        '9781218',
        '2338181',
        '3411036',
        '5276411',
        '5276454',
        '5091144',
        '5091128',
        '9794166',
        '8216398',
        '4413709',
        '8120153',
        '3177319',
        '9052356',
        '8147671',
        '1409026',
        '3002535',
        '9789278',
        '8671818',
        '3957500',
        '2997185',
        '4313313',
        '3000001',
        '8594333',
        '3384381',
        '4618963',
        '4089529',
        '4466918',
        '9793674',
        '1042726',
        '3375544',
        '9808442',
        '8158819',
        '8681155',
        '3020827',
        '9194622',
        '3671968',
        '4635124',
        '3671550',
        '3671518',
        '6204074',
        '4372352',
    ]

    const buyersChoice = [
        '4131908',
        '3424847',
        '4393198',
        '5381053',
        '6853684',
        '1326015',
        '3420337',
        '3400409',
        '9735739',
        '5087163',
        '2572672',
        '5114802',
        '5169364',
        '3000001',
        '8342865',
        '4932684',
        '3327833',
        '5967015',
        '5812089',
        '8151601',
        '5912318',
        '2338777',
        '8151695',
        '4321863',
        '8592675',
        '5381088',
        '4584945',
        '3057623',
        '5938635',
        '1299425',
        '6011950',
        '6011969',
        '6011896',
        '6011977',
        '6011942',
        '5867592',
        '9561099',
        '1940392',
        '4089529',
        '5114802',
        '2967480',
        '9788956',
        '4875559',
        '4733401',
        '6229212',
        '4756606',
        '6215335',
        '8176094',
        '9530037',
        '3004260',
        '6011950',
        '6011969',
        '6011896',
        '6011977',
        '6011942',
        '9808906',
        '5867592',
        '5867568',
        '1084283',
        '5867487',
        '6087671',
        '3671623',
        '8680914',
        '1274279',
        '8681503',
        '2794586',
        '4635450',
        '8676488',
        '2641941',
        '2636131',
        '5114802',
        '2967480',
        '5114802',
        '9788956',
        '4756606',
        '4875559',
        '4733401',
        '6215335',
        '8176094',
        '9530037',
        '6229212',
    ]

    const perfectGift = [
        '1299522',
        '1326171',
        '6129900',
        '5381037',
        '5262356',
        '6452817',
        '6619177',
        '6450482',
        '2866692',
        '5745969',
        '6836909',
        '1362356',
        '9207015',
        '3800938',
        '5170842',
        '9594310',
        '9788956',
        '3408345',
        '9219110',
        '4195299',
        '5381061',
        '5812550',
        '1063952',
        '2018209',
        '9789103',
        '1003291',
        '8109109',
        '3827968',
        '9558705',
        '3403548',
        '1754831',
        '6626041',
        '9629491',
        '3057798',
        '9600590',
        '5276381',
        '9602755',
        '8063974',
        '8342865',
        '9594310',
        '9219110',
        '4600371',
        '9929711',
        '2774852',
        '3327833',
        '3354520',
        '4750810',
        '4346424',
        '4313526',
        '9922067',
        '9600434',
        '2266210',
        '6136559',
        '5234417',
        '8683360',
        '3671429',
        '3398900',
        '3671607',
        '8677301',
        '1274139',
        '8676011',
        '4407733',
        '3671402',
        '6377181',
        '1337823',
        '8342865',
        '9594310',
        '3327833',
        '9219110',
        '3354520',
        '4600371',
        '9929711',
        '4750810',
        '4346424',
        '2774852',
        '8683360',
    ]

    // loop through all the products, match against arrays
    const allProducts = document.querySelectorAll('.product-tile-list__item');
    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const productName = element.querySelector('meta[itemprop="sku"]').getAttribute('content');

        if (productName) {

            // add best seller badge
            if (bestSeller.indexOf(productName) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
                <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/2CF6698F8D47F9603DAA6180780D50316ACFD54BB2201797F0A0B31EE23F90D8/hsamuel-co-uk/HS033---PLP-Badging/HS-Best-Seller.png')">
                </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);

                // if buyers choice
            } else if (buyersChoice.indexOf(productName) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
                <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/B0EE14C5C85349BDAC476A391F377187E08DAE8DCF8166590FB7E819BA7E017E/hsamuel-co-uk/HS033---PLP-Badging/HS-Buyers-Choice.png')">
                </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);

                // if perfect gift
            } else if (perfectGift.indexOf(productName) > -1) {
                const productBadge = document.createElement('div');
                productBadge.classList.add(`${ID}-productBadge`);
                productBadge.innerHTML = `
            <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/53F75917596526CA440D5482475135E917807F14C3AB599B1A0E85238186DC63/hsamuel-co-uk/HS033---PLP-Badging/HS-Perfect-Gift-1.png')">
            </span>`;
                element.querySelector('.product-tile').appendChild(productBadge);
            }
            // if exclusive sash
            else if (element.querySelector('.product-tile__corner-flag')) {
                const sashName = element.querySelector('.product-tile__corner-flag').textContent.trim().toLowerCase();
                if (sashName === 'exclusive') {
                    const productBadge = document.createElement('div');
                    productBadge.classList.add(`${ID}-productBadge`);
                    productBadge.innerHTML = `
                <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/0D436754B9293A186367F5A648A22A66557726B528A946AC2BD197D43C5EB7A8/hsamuel-co-uk/HS033---PLP-Badging/HS-Exclusive1.png')">
                </span>`;
                    element.querySelector('.product-tile').appendChild(productBadge);
                }
            }

            // if topRated
            else if (element.querySelector('.rating-stars')) {
                const starAmount = element.querySelector('.rating-stars__rating-count').textContent.replace('(', '').replace(')', '');
                const starsRating = element.querySelector('.rating-stars .sr-only');
                if ((starsRating.textContent === '5 out of 5 stars') && (parseInt(starAmount, 10) >= 5)) {
                    const productBadge = document.createElement('div');
                    productBadge.classList.add(`${ID}-productBadge`);
                    productBadge.innerHTML = `
                    <span class="${ID}-badge_image" style="background-image:url('https://service.maxymiser.net/cm/images-us/1/1/2/4CA1DCD7CA69BBF778E4CAC95FA0635F3C821E2F2129A968C729296B3B732092/hsamuel-co-uk/HS033---PLP-Badging/HS-Top-Rated.png')">
                    </span>`;
                    element.querySelector('.product-tile').appendChild(productBadge);
                }
            }
        }

    }
}