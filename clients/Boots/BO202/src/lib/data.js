import shared from "../../../../../core-files/shared"
import { adCardCTAS } from "./helpers";



const { ID } = shared;

const departments = {
     
    heading: 'Shop by department',
    tabTitle: 'Departments',
    attr: 'department',
    inner: [
        {
            html: `
            <div class="${ID}-heroBanner">
            <div class="${ID}-left"></div>
            <div class="${ID}-middle ${ID}-ctaWrap">
                <h3>Shop faster, shop better</h3>
                <div class="${ID}-buttons">
                    <a class="${ID}-button" href="/beauty"><span>Beauty & skincare</span></a>
                    <a class="${ID}-button" href="/baby-child"><span>Baby & child</span></a>
                    <a class="${ID}-button" href="/offers"><span>Offers</span></a>
                    <a class="${ID}-button" href="/fragrance"><span>Fragrance</span></a>
                    <a class="${ID}-button" href="/health-pharmacy"><span>Health & Pharmacy</span></a>
                    <a class="${ID}-button" href="/toiletries"><span>Toiletries</span></a>
                    <a class="${ID}-button" href="/electrical"><span>Electrical Beauty</span></a>
                    <a class="${ID}-button" href="/wellness"><span>Wellness</span></a>
                </div>
            </div>
            <div class="${ID}-right"></div>
        </div>`
        }
    ]
  
}

export const offers = {
    heading: 'Top offers',
    attr: 'offers',
    carousel: 'true',
    inner: [
        {
            bgcolour: '#F1CCD9',
            textcolour: '#333333;',
            titlecolour: '#aa1951',
            title: 'Price Advantage',
            text: "Unlock exclusive offers on hundreds of favourites with your Advantage Card",
            linkText: 'Shop savings',
            link: 'https://www.boots.com/sitesearch?searchTerm=price%20advantage',
        },
        {
            bgcolour: '#efe6f4',
            textcolour: '#333333;',
            titlecolour: '#cc0033;',
            title: 'Save up to 1/2',
            text: "on selected fragrance",
            linkText: 'Shop now',
            link: 'https://www.boots.com/fragrance-offers/fragrance-offers-save-up-to-half-price',
        },
        {
            bgcolour: '#c5fae4',
            textcolour: '#333333;',
            titlecolour: '#cc0033;',
            title: '3 for 2',
            text: "across selected No7 skincare",
            linkText: 'Shop now',
            link: 'https://www.boots.com/no7-shop-all#facet:-105049495153505851321021111143250321111103211510110810199116101100327811155321151071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&',
        },
        {
            bgcolour: '#BB2739',
            textcolour: '#fff;',
            titlecolour: '#fff;',
            title: '3 for 2',
            text: "on selected expert skincare",
            linkText: 'Shop now',
            link: 'https://www.boots.com/beauty/skincare/expert-skincare-',
        },
        {
            bgcolour: '#daf4f2',
            textcolour: '#333333;',
            titlecolour: '#cc0033;',
            title: 'Better than 1/2 price',
            text: "on selected electrical beauty",
            linkText: 'Shop now',
            link: 'https://www.boots.com/sitesearch?promotionalText%5B0%5D=Better+than+1%2F2+price+on+selected+electrical+beauty',
        },
    ]
    
}

const brands = {
    heading: 'Brands',
    attr: 'brands',
    link: 'https://www.boots.com/brands',
    linkText: 'Shop all brands',
    carousel: 'true',
    inner: [
        {
            image: 'https://assets.boots.com/content/dam/boots/shop-by-department/beauty-and-skincare/2020-2021/p9a-beauty/Logo_No7.dam.ts%3D1616693426906.jpg',
            link: 'https://www.boots.com/no7',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/brands/brand---s/soltan/soltan_bt/soltan_bt-update_06-04-2022/2022-03_soltan_brand-treatment_logo.dam.ts%3D1648729473183.png',
            link: 'https://www.boots.com/soltan',
        },
        {
            image: 'https://www.boots.com/resource/blob/1850700/35f04c1afa9d29ecf7dbe1fc0e355873/2019-03-la-roche-posay-bt-overlays-data.png',
            link: 'https://www.boots.com/la-roche-posay',
        },
        {
            image: 'https://boots.scene7.com/is/image/Boots/oralB?scl=1&fmt=png-alpha',
            link: 'https://www.boots.com/oral-b',
        },
        {
            image: 'https://boots.scene7.com/is/image/Boots/Clinique%2DLogo?scl=1&fmt=png-alpha',
            link: 'https://www.boots.com/clinique',
        },
        {
            image: 'https://www.boots.com/resource/blob/2672352/7e4e47690accefd8c8c8c2aceda3fb28/2021-01-vitabiotics-bt-overlays-data.png',
            link: 'https://www.boots.com/vitabiotics',
        },
    ]
}

const newIn = {
        heading: 'New in / Trending',
        attr: 'newin',
        carousel: 'true',
        inner: [
            {
                image: 'https://boots.scene7.com/is/image/Boots/benefit?scl=1&fmt=png-alpha',
                badge: 'New in',
                title: 'Benefit',
                text: "Soft Powder Blushes",
                linkText: 'Shop now',
                link: 'https://www.boots.com/benefit/benefit-complexion-',
            },
            {
                image: 'https://boots.scene7.com/is/image/Boots/fenty%20%281%29?scl=1&fmt=png-alpha',
                badge: 'New in',
                title: 'Fenty Skin',
                text: "Cookies N Clean Whipped Clay Detox Face Mask",
                linkText: 'Shop now',
                link: 'https://www.boots.com/fenty-skin-cookies-n-clean-whipped-clay-detox-face-mask-10312489',
            },
            {
                image: 'https://boots.scene7.com/is/image/Boots/browbar%201?scl=1&fmt=png-alpha',
                badge: 'New in',
                title: 'No7',
                text: "Brow Bar",
                linkText: 'Shop now',
                link: 'https://www.boots.com/no7-make-up/no7-make-up-brows',
            },
            {
                image: 'http://boots.scene7.com/is/image/Boots/laroche?scl=1&fmt=png-alpha',
                badge: 'Trending',
                title: 'La Roche-Posay Anthelios',
                text: "UVMUNE 400 Invisible Fluid SPF50 50ML",
                linkText: 'Shop now',
                link: 'https://www.boots.com/la-roche-posay-anthelios-uvmune-400-invisible-fluid-spf50-50ml-10306562',
            },
            {
                image: 'https://boots.scene7.com/is/image/Boots/test4?scl=1&fmt=png-alpha',
                badge: 'Trending',
                title: 'Flowflex',
                text:  "Antigen Rapid Test Lateral Flow Self-Testing Kit 4 Kit Bundle",
                linkText: 'Shop now',
                link: 'https://www.boots.com/flowflex-antigen-rapid-test-lateral-flow-self-testing-kit-4-kit-bundle-10314028',
            },
            {
                image: 'https://boots.scene7.com/is/image/Boots/no7%20%281%29?scl=1&fmt=png-alpha',
                badge: 'Trending',
                title: 'No7',
                text: "Protect & Perfect Intense ADVANCED Day Cream 50ml",
                linkText: 'Shop now',
                link: 'https://www.boots.com/protect-perfect-advanced-day-cream-50ml-10288482',
            },
           
        ]
    
}

const blog = {
    heading: 'Inspiration',
    attr: 'blog',
    carousel: 'true',
    link: 'https://www.boots.com/skincare-beauty-advice',
    linkText: 'More inspiration',
    inner: [
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/beauty-and-skincare/beauty-edits/skincare-and-makeup-beauty-trends-2022/advice_beauty-skincare_beauty-edits_2022-beauty-trends-for-skincare-and-makeup_decorative-panel.jpg',
            title: 'The Boots beauty trends report 2022',
            text: "the looks and launches that are set to be huge",
            linkText: 'Find out more',
            link: 'https://www.boots.com/skincare-beauty-advice/beauty-edits/2022-beauty-trends-for-skincare-and-makeup',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/wellness/healthy-lifestyle/how-to-help-keep-your-gut-healthy/inspiration-advice_how-to-help-keep-your-gut-healthy_hero_1360x502.jpg',
            title: 'How to help keep your gut healthy',
            text: "Having a gut friendly diet is a great way to help your body and mind feel great.",
            linkText: 'Find out more',
            link: 'https://www.boots.com/wellness-advice/healthy-lifestyle/how-to-keep-your-gut-healthy',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/beauty-and-skincare/beauty-edits/17-is-back/advice_beauty-skincare_beauty-edits_17-is-back_decorative-panel_1440x680.jpg',
            title: '17 is back',
            text: "(and everything’s £5 or under)",
            linkText: 'Find out more',
            link: 'https://www.boots.com/skincare-beauty-advice/beauty-edits/17-makeup-review',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/wellness/sleep/sleep-better/advice_wellness_sleep_six-expert-approved-ways-to-help-you-sleep-better_decorative-panel_1440x680.jpg',
            title: 'Six expert-approved ways',
            text: "to help you sleep better",
            linkText: 'Find out more',
            link: 'https://www.boots.com/wellness-advice/sleep-advice/sleep-better',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/health/_health-online-doctor-decorative-panel-masters/online-doctor_general-health_decorative-panel_B.jpg',
            title: 'Ways to help quit smoking',
            text: "It’s a big challenge, but you can do it. And trust us. It’s so worth it.",
            linkText: 'Find out more',
            link: 'https://www.boots.com/health/stop-smoking-advice/quit-smoking-help',
        },
        {
            image: 'https://assets.boots.com/content/dam/boots/advice/beauty-and-skincare/beauty-edits/be-all-together-beautiful-with-these-top-beauty-picks/advice_beauty-skincare_beauty-edits_be-all-together-beautiful-with-these-top-beauty-picks_decorative-panel.jpg',
            title: 'Be all together beautiful',
            text: "with these top beauty picks.",
            linkText: 'Find out more',
            link: 'https://www.boots.com/skincare-beauty-advice/beauty-edits/express-your-beauty',
        },
    ]
    
}

const services = {
    heading: 'Health Services',
    attr: 'services',
    carousel: 'true',
    inner: [
        {
            title: "Women's health",
            text: "Get the treatment you need, whenever and wherever you need it.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/womens-health',
        },
        {
            title: "Men's health",
            text: "Getting the advice and prescription treatment you need has never been easier.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/mens-health',
        },
        {
            title: "General health",
            text: "Health is the greatest wealth of all. Make sure yours is taken care of wherever you are.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/general-health',
        },
        {
            title: 'Sexual health',
            text: "Discreet test kits and prescription treatments delivered to your door. No appointment needed.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/sexual-health',
        },
        {
            title: 'Acne and Skin',
            text: "Get advice and access to a range of prescription only treatments.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/acne-skin-conditions',
        },
        {
            title: 'Testing Services',
            text: "Our home test kits are easy to use and give fast results.",
            linkText: 'Discover',
            link: 'https://onlinedoctor.boots.com/home-testing-kits',
        },
    ]
}

const adCard = {
    heading: 'Price Advantage',
    attr: 'adcard',
    tabBg: '#F1CCD9',
    inner: [
        {
            html: `
            <div class="left"></div>
            <div class="right">
                <h3>Price advantage offers too good to miss</h3>
                <span>Advantage card is now bursting with savings!</span>
                <p>Your Advantage Card gives you instant savings on hundreds of favourite products when you shop online or in-store. Just look for the products marked Price Advantage in pink to see your exclusive offer and fill your basket with savings. Plus, you’ll still earn points every time you shop, how delightful!</p>
                <div class="ctas">
                    ${adCardCTAS()}
                </div>
                <span class="smallprint">Price Advantage is only available in larger Boots UK stores currently. Read more T&Cs <a href="#">here</a>.</span>
            </div>`
        }
    ]
    
}


export const content = {
    'horizontal': {
        departments,
        offers,
        brands
    },
    'vertical': {
        offers,
        newIn,
        blog
    },
    '2tabs': {
        departments,
        offers
    },
    '3tabs': {
        departments,
        newIn,
        services
    },
    '4tabs': {
        newIn,
        brands,
        offers,
        adCard
    },
    'arrowTabs': {
        departments,
        offers,
        newIn
    }
}

