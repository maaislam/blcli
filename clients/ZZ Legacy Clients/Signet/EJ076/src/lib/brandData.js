/**
 * EJ Diamonds
EJ:
Omega, Tag, Vera Wang, Brietling, LeVian, The Diamond Story, Cartier, Tudor, Bremont
HS:
Enchanted, Citizen, Bulova, Forever, Casio, Princessa, Sekonda, Seksy, Tommy Hilfiger, Guess
EJ Watches:
Omega, Tag, Brietling, Cartier, Tudor, Longines, Rado, Bremont, Gucci, Tissot, Bell & Ross, Chopard, Chanel, Zenith
HS - Watches 
Citizen, Bulova, Casio, Sekonda, Seksy, Tommy Hilfiger, Hugo,  AX*/

const brands = {
    'Home': {
        'Omega': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/58C0D5CE979B0677AC1923797F327E4804F3FACB79801BBC4FB000C72D42300A.png?meta=/EJ076---Brand-Bar/1280px-Omega_Logo.svg.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/omega.sdo',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/omega-watches/?icid=ej-tn-watches-lux-omega',
        },
        'Brietling': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B98B242A279E5A61AD6365BBB4034A5A802974C300770FA11990D39C983407AB.png?meta=/EJ076---Brand-Bar/logo.png',
            brandLink: 'https://www.ernestjones.co.uk/breitling/?icid=ej-tn-brands-lux-breitling',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/breitling-watches/?icid=ej-tn-watches-lux-breitling',
        },
        'Tag Heuer': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/09BE6171689E150A071FD336E801CADAA1174E01D1C7133E0C0CFB723AEB4551.jpg?meta=/EJ076---Brand-Bar/TAG-Heuer-logo.jpg',
            brandLink: 'https://www.ernestjones.co.uk/tag-heuer/?icid=ej-tn-brands-lux-tag',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-lux-tag-heuer',
        },
     
        'Vera Wang': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/AA743890B7A6C0D7CAA3610E2AECE9A5898C8B5D31B2BCC3AC1651A4B232635B.png?meta=/EJ076---Brand-Bar/2627ab85c7960760b0f1d3e5affbb8c6.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/l/vera-wang-love-jewellery/?icid=ej-vera-sis-top',
            plpLink: 'https://www.ernestjones.co.uk/webstore/shops/verawanglove.cdo?icid=ej-tn-engagement-brands-vw',
        },
        'The Diamond Story': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C21B4640DA65D41508D8E64A886129CDCC35BBFCABB40C93D266CFA83A264684.gif?meta=/EJ076---Brand-Bar/logo_the_diamond_story.gif',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/diamondstory.cdo?icid=ej-tn-brands-jw-tds',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/the-diamond-story-engagement-rings/',
        },
        'Cartier': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/347F17F48310BB76C8F94C41B3148A2E1C95FA751342AA0D4C91BAF80028B1BF.png?meta=/EJ076---Brand-Bar/cartier.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/cartier.cdo?icid=ej-tn-brands-lux-cartier',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/cartier-watches/?icid=ej-tn-watches-lux-cartier',
        },
        'Tudor': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5AE4447917200278A63A4ABA8B76F11A997B10D699D102BECB448B1FB093BF07.png?meta=/EJ076---Brand-Bar/tudor-logo.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/tudor.cdo?icid=ej-tn-brands-lux-tudor',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tudor-watches/?icid=ej-tudor-sis-hero',
        },
        'Bremont': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/BD36BF62B8946708E2237CD31765FD7B8574F0351C7711C9EF587C60856CA289.png?meta=/EJ076---Brand-Bar/bremont-logo-1.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/bremont.cdo?icid=ej-tn-brands-lux-bremont',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/bremont-watches/?icid=ej-tn-watches-lux-bremont',
        },
        'Tolkowsky': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/0D792BAAB3FD9840D4F59A33E584FF709D90D8A9E780F51E63264BEB247CB31A.png?meta=/EJ076---Brand-Bar/tks.png',
            brandLink: 'https://www.ernestjones.co.uk/tolkowsky/?icid=ej-tn-engagement-brands-tolkowsky',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tolkowsky-diamonds/',
        },
        'LeVian': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9673B5BBF513E05054D63947C057C931BB5403A9ACE49FBAEDC7CF4D2B4ED800.png?meta=/EJ076---Brand-Bar/Levian.png',
            brandLink: 'https://www.ernestjones.co.uk/le-vian/?icid=ej-tn-brands-jw-lev',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/le-vian-jewellery/',
        },
    },

    'Watches': {
        'Omega': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/58C0D5CE979B0677AC1923797F327E4804F3FACB79801BBC4FB000C72D42300A.png?meta=/EJ076---Brand-Bar/1280px-Omega_Logo.svg.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/omega.sdo',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/omega-watches/?icid=ej-tn-watches-lux-omega',
        },
        'Brietling': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B98B242A279E5A61AD6365BBB4034A5A802974C300770FA11990D39C983407AB.png?meta=/EJ076---Brand-Bar/logo.png',
            brandLink: 'https://www.ernestjones.co.uk/breitling/?icid=ej-tn-brands-lux-breitling',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/breitling-watches/?icid=ej-tn-watches-lux-breitling',
        },
        'Tag Heuer': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/09BE6171689E150A071FD336E801CADAA1174E01D1C7133E0C0CFB723AEB4551.jpg?meta=/EJ076---Brand-Bar/TAG-Heuer-logo.jpg',
            brandLink: 'https://www.ernestjones.co.uk/tag-heuer/?icid=ej-tn-brands-lux-tag',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-lux-tag-heuer',
        },
        'Cartier': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/347F17F48310BB76C8F94C41B3148A2E1C95FA751342AA0D4C91BAF80028B1BF.png?meta=/EJ076---Brand-Bar/cartier.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/cartier.cdo?icid=ej-tn-brands-lux-cartier',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/cartier-watches/?icid=ej-tn-watches-lux-cartier',
        },
        'Tudor': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/5AE4447917200278A63A4ABA8B76F11A997B10D699D102BECB448B1FB093BF07.png?meta=/EJ076---Brand-Bar/tudor-logo.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/tudor.cdo?icid=ej-tn-brands-lux-tudor',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tudor-watches/?icid=ej-tudor-sis-hero',
        },
        'Longines': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/F540CD6401277653460618BEC381B980EB2E31DE99A589C8A1C6D5051E95720F.jpg?meta=/EJ076---Brand-Bar/Longines_logo.jpg',
            brandLink: 'https://www.ernestjones.co.uk/longines/?icid=ej-tn-brands-lux-longines',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/longines-watches/?icid=ej-tn-watches-lux-longines',
        },
        'Rado': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9FFE890DB8BA81CFA4E386FE6DA047C82FDC9BCFDE1C212077D2CA821EFBAA37.jpg?meta=/EJ076---Brand-Bar/dc088483919ba6291d1ab1a12a6f6a38.jpg',
            brandLink: 'https://www.ernestjones.co.uk/webstore/brands/rado.sdo?icid=ej-tn-brands-lux-rado',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/rado-watches/?icid=ej-tn-watches-lux-rado',
        },
        'Bremont': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/BD36BF62B8946708E2237CD31765FD7B8574F0351C7711C9EF587C60856CA289.png?meta=/EJ076---Brand-Bar/bremont-logo-1.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/bremont.cdo?icid=ej-tn-brands-lux-bremont',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/bremont-watches/?icid=ej-tn-watches-lux-bremont',
        },

        'Gucci': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B1D22131230E9DFFFC515BD372D42371E4E5CF8203170ABB25C89337E53E82B9.png?meta=/EJ076---Brand-Bar/gucci.png',
            brandLink: 'https://www.ernestjones.co.uk/gucci/?icid=ej-tn-brands-jw-gucci',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/search/brand%7Cgucci+jewellery%7Cgucci+watches/',
        },
        'Tissot': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/B0715DA0C9B9C62C3BB366BCB5E517BFFB5914B9514E9E37D805C69542693B00.jpg?meta=/EJ076---Brand-Bar/tissot-logo-sq.jpg',
            brandLink: 'https://www.ernestjones.co.uk/tissot/',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/tissot-watches/',
        },
        'Bell & Ross': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/3E90947C257E6E181C8DECEF11A69BAF1F856DBF5A67316BDFB9514C20F6BA23.png?meta=/EJ076---Brand-Bar/bellandross.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/l/bell-and-ross-watches/?icid=ej-tn-brands-lux-bell',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/bell-and-ross-watches/?icid=ej-tn-brands-lux-bell',
        },
        'Chopard': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/C540C1E37FD3A9E552C5FE2C07CC678B4959A3A7BEF76B0D1C819313741E7FA1.png?meta=/EJ076---Brand-Bar/chopard.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/shops/chopard.sdo',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/chopard-watches/',
        },
        'Chanel': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8FED9E2EEF635A1F2B5CDE096B21E433C7127FB30F643D0BB77DC9BB83A49B85.jpg?meta=/EJ076---Brand-Bar/chanel.jpg',
            brandLink: 'https://www.ernestjones.co.uk/chanel/?icid=ej-tn-brands-lux-chanel',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/chanel-watches/?icid=ej-tn-watches-lux-chanela',
        },
        'Zenith': {
            logo: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/82C82A434FAE5A12AC8DC01ABBBB0F6A8423756597F07828AA53D6CF175FBD28.png?meta=/EJ076---Brand-Bar/zenith-vector-logo.png',
            brandLink: 'https://www.ernestjones.co.uk/webstore/l/zenith-watches/?icid=ej-tn-brands-lux-zenith',
            plpLink: 'https://www.ernestjones.co.uk/webstore/l/zenith-watches/?icid=ej-tn-brands-lux-zenith',
        },
    }
}

/**
 * Get matching obj based on the category name
 */
const getData = () => {
    const category = window.digitalData.page.category.primaryCategory;
    let categoryData;
    if(category) {
        categoryData = brands[category];
        return categoryData; 
    }
}
export default getData;