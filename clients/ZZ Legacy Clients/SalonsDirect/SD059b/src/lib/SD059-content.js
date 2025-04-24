/*eslint-disable*/
export default function setProduct (){
    const products = {
        elchimHealthy :{
            points : ['Lightweight at just 570g with built in silencer','Hotter than other hairdryers on the market, cutting drying time by 30%','Powerful ionic technology leaves the hair shiny and healthy'],
            upsell : 'https://www.salonsdirect.com/elchim-cocoon-2-in-1-diffuser-3900-8th-sense'
        },
        wahl5Star:{
            points : ['The most powerful motor in a cordless Wahl clipper.','High blade speed with increased torque for more cutting power.','Kit includes 1 x Clipper, 1 x Blade Guard and 10 x Premium Attachment Combs (grades1-8, 0.5 & 1.5)'],
            upsell : 'https://www.salonsdirect.com/medic-clipper-spray-180ml'
        },
        parluxLight:{
            points : ['Ionic ceramic technology guarantees healthy, static- free hair.','Exceptionally light at just 380g','2200 Watt, 2 speeds, 4 temperatures.'],
            upsell : 'https://www.salonsdirect.com/parlux-advance-diffuser'
        },
        wahlsuperTaper:{
          points : ['Combining Wahl’s bestselling Super Taper and Super Trimmer','Save £15.54 when you buy the combination!','Includes: Blade Guard 4 Comb Attachments (sizes 1& 4), Flat Top Comb, Clipper Oil, Cleaning Brush, 5 Position Adjustable Attachment Comb, Charging Stand & Instruction Booklet'],
          upsell : 'https://www.salonsdirect.com/wahl-12pk-flat-top-combs-coloured'
        },
        wahlsuperTaperClipper:{
          points : ['Bestselling cordless clipper allows you to slip without restriction','90 minute run time from a 180 minute charge, can also used plugged in for when charge is low','Convenient thumb lever adjusts the taper & texture without changing the blades.'],
          upsell : 'https://www.salonsdirect.com/medic-clipper-spray-180ml'
        },
        parlux3200:{
          points : ['Featuring the new revolutionary 1900w K Lamination motor','3 heat settings and 2 speed settings.','12 month guarantee'],
          upsell : 'https://www.salonsdirect.com/parlux-advance-diffuser'
        },
        andisSlimlinePro:{
          points : ['Close-cutting T-blade. Lithium-ion battery delivers up to 2 hours of run time with a 2 1/2 hour charge','Improved motor for increased speed, power and life.','Includes 4 attachment combs, charging adaptor, Euro, UK and Australia plug, charger stand, blade brush and blade oil.'],
          upsell : 'https://www.salonsdirect.com/andis-cool-care-plus-5-in-1-for-blades-15-5oz'
        },
        wahlExtraBlade:{
          points : ['Wahl’s most popular corded trimmer','6mm wider than the standard T-blade allowing a more precise trim.','Includes: oil, cleaning brush, and three cutting guide combs offering additional cutting lengths of 1.5mm, 3mm and 4.5mm.'],
          upsell : 'https://www.salonsdirect.com/wahl-flat-top-clipper-comb-black-small'
        },
        elchim8thsense:{
          points : ['The 8th sense is a professional dryer with high speeds, high pressure and high temperatures.','With adjustable airflow it can be used as a styler to create any type of look','1800-2100w with built in silencer'],
          upsell : 'https://www.salonsdirect.com/elchim-cocoon-2-in-1-diffuser-3900'
        },
        haitoTrolleyBag:{
          points : ['Two in one bag featuring a large trolley bag and a smaller carry case.','Features a detachable clear PVC zip up bag with a vast array of pockets and compartments to keep all your tools.','Features an extendable handle and wheels for easy transportation. Carry straps are also provided for your convenience.','Dimensions: Large trolley bag: 41 x 31 x 45cm Small carry bag: 33 x 22 x 25cm.'],
          upsell : 'https://www.salonsdirect.com/haito-black-tool-case'
        },
        andisProFoil:{
          points : ['Staggered head shaver blades deliver ultra-close cutting with gold titanium foils that are hypoallergenic for less irritation and bumps','Delivers up to 80 minutes of run time on a single charge of its powerful lithium-ion battery.', 'Can be used with or without cord.'],
          upsell : 'https://www.salonsdirect.com/andis-replacement-foil-head-profoil-lithium-titanium-shaver'
        },
        XenTanMist :{
          points : ['Creates an instant, sun-kissed glow that develops and deepens over 3-4 hours for a long-lasting, natural finish.','Same results as the Xen-Tan bestselling dark lotion but in spray form.','Provides enough solution for 32 full body treatements.'],
          upsell : 'https://www.salonsdirect.com/xen-tan-allure-spray-tan-starter-package'
        },
        wahl5starmagic :{
          points : ['Features all the elements of the bestselling Magic Clip Clipper but cordless!','Powerful, durable and long lasting V5000 clipper motor and rust resistant, high precision chrome plated blades.','ncludes: Blade Guard, 6 Comb Attachments, Clipper Oil, Flat Top Comb, Cleaning Brush, and Instruction Booklet.'],
          upsell : 'https://www.salonsdirect.com/wahl-hygienic-clipper-spray-250ml'
        },
        wahl5starmagicCord :{
          points : ['Powerful, durable and long lasting V5000 clipper motor and rust resistant, high precision chrome plated blades.','Convenient thumb lever adjusts the taper and texture without changing the blades.','Includes: Blade Guard, 6 Comb Attachments, Clipper Oil, Flat Top Comb, Cleaning Brush, and Instruction Booklet.'],
          upsell : 'https://www.salonsdirect.com/wahl-hygienic-clipper-spray-250ml'
        },
        babylissProMotorClipper :{
          points : ['Heavy-duty professional clipper featuring a high frequency pivot motor for supreme power.','Japanese steel blades with a super sharp cutting angle for a smooth, precise cut.','5 position taper control, 6 comb attachments and an all-metal housing design for ultimate professional reliability.'],
          upsell : 'https://www.salonsdirect.com/medic-clipper-spray-180ml'
        },
        sibelFilingTool :{
          points : ['The Sibel Electric Nail Filing Tool 28000 has a handset that can be switched on/off by hand or foot pedal.','Includes set of bits, digital display and maximum rotation speed of 28.000 rpm.', '<span>NB:</span> Drill bits can be found <span>inside</span> the item.'],
          upsell : 'https://www.salonsdirect.com/sibel-sanding-band-medium-grit-150-pack-of-100'
        },
        lotusLineaTrolley :{
          points : ['Features 5 generous pull out trays plus a dryer holder on the top corner.','The swivel castor wheels allow ease of use around the salon.','<span>Dimensions:</span> <span>H:</span> 88cm <span>W:</span> 34cm D: 37cm'],
          upsell : 'https://www.salonsdirect.com/sibel-sanding-band-medium-grit-150-pack-of-100'
        },
        babylissProSuperTrimmer :{
          points : ['Zero gap adjustable Japanese steel blades and a high-torque brushless motor to deliver outstanding cutting performance and precise control', 'The long-life digital motor and lithium technology delivers sustained high power and speed for clean, close cutting', 'Features 2 interchangeable 30mm and 40mm zero gap adjustable cutting blades'],
          upsell : 'https://www.salonsdirect.com/medic-clipper-spray-180ml'
        },
        faceSteamer :{
          points : ['Built in ultra violet lamp which generates ozone, and a special holder for aromatics and herbs.','The Digital Facial Steamer features a fixed spray arm with a rotating nozzle to reach different parts of the body','1-3 minute heat up time with adjustable height'],
          upsell : 'https://www.salonsdirect.com/sibel-purified-water-5l'
        },
        divaStraightners :{
          points : ['Perfect for shorter hair, fringes and men\'s styling','Variable temperature settings 80°C to 210°C. Auto shut-off after 10 minutes of inactivity.','Comes with a FREE Diva Heat Bag '],
          upsell : 'https://www.salonsdirect.com/indola-innova-thermal-protector-spray-300ml'
        },
    }

    let productObj,
    URL = window.location.pathname;

    const productMatch = [
        {
          matchString: '/elchim-3900-healthy-ionic-hairdryer',
          execute: function() {
              productObj = products.elchimHealthy;
          }
        },
        {
          matchString: '/wahl-5-star-cordless-senior-clipper-kit',
          execute: function() {
              productObj = products.wahl5Star;
          }
        },
        {
          matchString: '/parlux-advance-light-ionic-ceramic-hairdryer',
          execute: function() {
              productObj = products.parluxLight;
          }
        },
        {
          matchString: '/wahl-perfect-partners-super-taper-clipper-super-trimmer',
          execute: function() {
              productObj = products.wahlsuperTaper;
          }
        },
        {
          matchString: '/wahl-cordless-super-taper-clipper',
          execute: function() {
              productObj = products.wahlsuperTaperClipper;
          }
        },
        {
          matchString: '/parlux-3200-compact-hairdryer-1900w',
          execute: function() {
              productObj = products.parlux3200;
          }
        },
        {
          matchString: '/andis-slimline-pro-li-cordless-rechargeable-trimmer',
          execute: function() {
              productObj = products.andisSlimlinePro;
          }
        },
        {
          matchString: '/wahl-5-star-cordless-detailer-trimmer-with-extra-wide-blade',
          execute: function() {
              productObj = products.wahlExtraBlade;
          }
        },
        {
          matchString: '/elchim-8th-sense-dryer',
          execute: function() {
              productObj = products.elchim8thsense;
          }
        },
        {
          matchString: '/haito-duo-trolley-bag',
          execute: function() {
              productObj = products.haitoTrolleyBag;
          }
        },
        {
          matchString: '/andis-profoil-lithium-titanium-shaver',
          execute: function() {
              productObj = products.andisProFoil;
          }
        },
        {
          matchString: '/xen-tan-mist-intense-spray-tan-solution',
          execute: function() {
              productObj = products.XenTanMist;
          }
        },
        {
          matchString: '/wahl-5-star-cordless-magic-clip-clipper',
          execute: function() {
              productObj = products.wahl5starmagic;
          }
        },
        {
          matchString: '/wahl-magic-clip-afro-clipper',
          execute: function() {
              productObj = products.wahl5starmagicCord;
          }
        },
        {
          matchString: '/babyliss-pro-super-motor-clipper',
          execute: function() {
              productObj = products.babylissProMotorClipper;
          }
        },
        {
          matchString: '/sibel-electric-nail-filing-tool-28000',
          execute: function() {
              productObj = products.sibelFilingTool;
          }
        },
        {
          matchString: '/lotus-linea-5-drawer-trolley',
          execute: function() {
              productObj = products.lotusLineaTrolley;
          }
        },
        {
          matchString: '/babyliss-pro-super-motor-trimmer',
          execute: function() {
              productObj = products.babylissProSuperTrimmer;
          }
        },
        {
          matchString: '/digital-facial-steamer',
          execute: function() {
              productObj = products.faceSteamer;
          }
        },
        {
          matchString: '/diva-feel-the-heat-wide-argan-styler-straighteners',
          execute: function() {
              productObj = products.divaStraightners;
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