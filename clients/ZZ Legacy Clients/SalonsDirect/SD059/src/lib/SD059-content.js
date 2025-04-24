/*------------------*/
// Add the product bullet points and set upsell URL
/*------------------*/
export default function setProduct (){
    const products = {
        majirel :{
            points : ['Guarantees rich, deep, vibrant colour.','Restores and protects the natural hair fibre.','Long lasting durable coverage with superior resistance to fading.'],
            upsell : 'https://www.salonsdirect.com/loreal-creme-oxydant-20-vol-1ltr'
        },
        kolestonPerfect:{
            points : ['Brand of choice for hair colour in over 100,000 salons worldwide!','Long-lasting grey coverage.','110 shades of intense vibrant colour.'],
            upsell : 'https://www.salonsdirect.com/welloxon-perfect-6-1ltr'
        },
        touchInstamatic:{
            points : ['Create stunning flashes of colour.','A fashion forward diffused colour finish that fades beautifully!','An incredible collection of six diffused finish matte glass shades.'],
            upsell : 'https://www.salonsdirect.com/wella-color-touch-creme-lotion-1-9-500ml'
        },
        diaLight:{
            points : ['Hair colour that doesn’t lighten or sensitise the hair.','Versatile ammonia free colour that allows you to mix shades.','Ideal for coloured or sensitised hair.'],
            upsell : 'https://www.salonsdirect.com/loreal-diactivateur-6-vol-1ltr'
        },
        royalPearlescence:{
            points : ['Create multi-tonal pearl effects on blonde and brown hair.','Softly blend any of the 8 new stunning shades.','Treat your clients to beautiful pastel pearl tones.'],
            upsell : 'https://www.salonsdirect.com/igora-royal-oil-developer-6-1ltr'
        },
        diaRichesse:{
            points : ['Next generation demi-permanent hair colour.','Advance alkaline technology offer rich, deep reflects.','Develop in just 20 minutes and fade away over time.'],
            upsell : 'https://www.salonsdirect.com/loreal-diactivateur-6-vol-1ltr'
        },
        igoraRoyal:{
            points : ['Reliable and vibrant permanent hair colour products available.','Uncompromising coverage and up to 50% longer colour retention.','‘True colour in high definition’, even on porous hair.'],
            upsell : 'https://www.salonsdirect.com/igora-royal-oil-developer-6-1ltr'
        },
        goldwellTopchic:{
            points : ['Guarantees intense colours with 100% grey coverage.','Innovative CoolProtect Technology gives long lasting results.','Patented Coenzyme Technology guarantees 100% performance.'],
            upsell : 'https://www.salonsdirect.com/goldwell-topchic-lotion-6-1-litre'
        },
        crazyColor:{
            points : ['A fantastic way to add an instant burst of hair colour!','Does not require the addition of peroxide.','Can be mixed with any other Crazy Color shade.'],
            upsell : 'https://www.salonsdirect.com/crazy-color-starter-palette-kit'
        },
        colorTouch:{
            points : ['The No. 1 Demi-Permanent colour from Wella Professionals.','Ammonia-free gentle cream formula that provides excellent grey coverage.','Enhances the colour of hair pigment by up to 57%.'],
            upsell : 'https://www.salonsdirect.com/wella-color-touch-creme-lotion-1-9-500ml'
        },
        wellaColorFresh:{
            points : ['Semi-permanent colour with an acid pH, ideal for quick colour and low commitment services.','Lasts up to 10 shampoos with up to 30% grey coverage!','Perfect to retail to clients for an at home top up service.'],
            upsell : 'https://www.salonsdirect.com/wella-brilliance-shampoo-for-fine-hair-250ml'
        },
        renbowColorissimo:{
            points : ['Permanent hair colour that offers optimum colour in 69 intermixable shades.','Penetrates colour deep into the hair fibre.','Leaves you with an incredible shine.'],
            upsell : 'https://www.salonsdirect.com/renbow-colorissimo-cream-developer-3-10-vol-1-litre'
        },
        kolestonPerfectInnosense:{
            points : ['Suitable for people with allergies and intolerances.','Boasts an excellent range of 27 rich, vibrant and intermixable shades.','Verified by The European Centre Allergy Research Foundation.'],
            upsell : 'https://www.salonsdirect.com/welloxon-perfect-9-500ml'
        },
        majirelHighLift:{
            points : ['Features intense neutralising shades for root touch up.','Provides extra neutralisation delivering shimmering icy results.','Up to 4.5 levels of lift.'],
            upsell : 'https://www.salonsdirect.com/l-oreal-creme-oxydant-20-vol-1l'
        },
        absolutesSilverwhite:{
            points : ['Multi-tonal silver hues and instant anti-yellow effects.','Ideal for clients that do not want to colour their hair but want to enhance their own.','The first beautifying SilverWhite colour.'],
            upsell : 'https://www.salonsdirect.com/igora-royal-oil-developer-6-1ltr'
        },
        wellaIllumina:{
            points : ['31 intermixable shades','Protects the cuticles, allowing light to pass through-revealing previously unseen potential in hair.','It gives up to 100% grey coverage and a sheer colour.'],
            upsell : 'https://www.salonsdirect.com/welloxon-perfect-6-1ltr'
        },
        indolaProfession:{
            points : ['Delivers superb performance every time, with 100% coverage.','The cream is easy to mix and has a smooth consistency for even distribution.','Delivers an intense, long lasting shine with exceptional vibrancy.'],
            upsell : 'https://www.salonsdirect.com/indola-profession-cream-developer-2-7-vol-1litre'
        },
        clynolViton:{
            points : ['Clynol Viton S is an excellent colour system that offers every conceivable colour to suit every client\'s needs.','Formulated with sejan seed extract to protect and condition.','An exclusive pigment that delivers maximum intensity in every gorgeous shade.'],
            upsell : 'https://www.salonsdirect.com/viton-cream-peroxide-9-1-litre'
        }
    }

    let productObj,
    URL = window.location.pathname;

    const productMatch = [
        {
            matchString: '/l-oreal-majirel-50ml-1',
            execute: function() {
                productObj = products.majirel;
            }
        },
        {
            matchString: '/wella-koleston-perfect-60ml',
            execute: function() {
                productObj = products.kolestonPerfect;
            }
        },
        {
            matchString: '/wella-color-touch-instamatic-60ml',
            execute: function() {
                productObj = products.touchInstamatic;
            }
        },
        {
            matchString: '/l-oreal-dia-light-50ml',
            execute: function() {
                productObj = products.diaLight;
            }
        },
        {
            matchString: '/schwarzkopf-igora-royal-pearlescence-60ml',
            execute: function() {
                productObj = products.royalPearlescence;
            }
        },
        {
            matchString: '/l-oreal-dia-richesse-50ml',
            execute: function() {
                productObj = products.diaRichesse;
            }
        },
        {
            matchString: '/schwarzkopf-igora-royal-60ml',
            execute: function() {
                productObj = products.igoraRoyal;
            }
        },
        {
            matchString: '/goldwell-topchic-tube-60ml',
            execute: function() {
                productObj = products.goldwellTopchic;
            }
        },
        {
            matchString: '/crazy-color-100ml',
            execute: function() {
                productObj = products.crazyColor;
            }
        },
        {
            matchString: '/wella-color-touch-60ml',
            execute: function() {
                productObj = products.colorTouch;
            }
        },
        {
            matchString: '/wella-color-fresh-75ml',
            execute: function() {
                productObj = products.wellaColorFresh;
            }
        },
        {
            matchString: '/renbow-colorissimo-100ml',
            execute: function() {
                productObj = products.renbowColorissimo;
            }
        },
        {
            matchString: '/koleston-perfect-innosense-60ml',
            execute: function() {
                productObj = products.kolestonPerfectInnosense;
            }
        },
        {
            matchString: '/l-oreal-majirel-high-lift-50ml',
            execute: function() {
                productObj = products.majirelHighLift;
            }
        },
        {
            matchString: '/schwarzkopf-igora-royal-absolutes-silverwhite-60ml',
            execute: function() {
                productObj = products.absolutesSilverwhite;
            }
        },
        {
            matchString: '/wella-illumina-60ml',
            execute: function() {
                productObj = products.wellaIllumina;
            }
        },
        {
            matchString: '/indola-profession-60ml',
            execute: function() {
                productObj = products.indolaProfession;
            }
        },
        {
            matchString: '/clynol-viton-s-60ml',
            execute: function() {
                productObj = products.clynolViton;
            }
        },
    ];

    let upsellProduct;
    productMatch.forEach((item) => {
        if(window.location.pathname.indexOf(item.matchString) > -1) {
            item.execute();
            const bullet = productObj.points,
            description = document.querySelector('.product-des');
            
            //Add the upsell link
            upsellProduct = productObj.upsell;
            document.querySelector('.SD059-upsell_image a').setAttribute('href',upsellProduct);

            
            //Add the product descriptions
            bullet.forEach(element => {
                const points = document.createElement('div');
                points.classList.add('SD059-product-point');
                points.innerHTML = element;

                description.insertBefore(points, description.firstChild);  
                
            });
        }
    });
}