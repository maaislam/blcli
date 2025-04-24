export const config = (url) => {
    let arr = [];
    
    const obj = {
        '/women/bags': ['Saint Laurent',	'Gucci', 'Burberry', 'Valentino', 'Chloe', 'Prada'],
        '/men/clothing': ['Stone Island', 'C.P Company', 'Gucci', 'Off-White', 'Kenzo', 'DSquared2'],
        '/men/shoes/trainers': ['Alexander McQueen', 'Balenciaga' ,'Valentino', 'Gucci', 'Off-White', 'Giuseppe Zanotti'],
        '/men/clothing/t-shirts': ['Kenzo', 'Stone Island', 'DSquared2', 'Palm Angels', 'Off-White', 'C.P Company'],
        '/men/clothing/sweatshirts': ['Stone Island', 'C.P Company', 'Off-White', 'Kenzo', 'DSquared2', 'Gucci'],
        '/women/shoes/trainers':  ['Alexander McQueen', 'Balenciaga', 'Gucci', 'Valentino', 'Jimmy Choo', 'Giuseppe Zanotti'],
        '/men/clothing/jackets-and-coats': ['Stone Island', 'C.P Company', 'Canada Goose', 'Moncler', 'Gucci', 'Belstaff'],
        '/men/accessories/hats-and-caps': ['DSquared2',	'Gucci', 'Moncler',	'C.P Company', 'Stone Island', 'Palm Angels'],
        '/women/clothing/tops': ['Burberry', 'Gucci',	'Balmain', 'Kenzo', 'Versace', 'McQ Alexander McQueen'],
        '/men/clothing/polo-shirts': ['Moncler', 'Boss', 'Polo Ralph Lauren', 'Kenzo',	'Vivienne Westwood', 'C.P Company'],
        '/men/clothing/activewear': ['Gucci', 'Valentino', 'Prada', 'Dolce & Gabbana', 'Palm Angels', 'Kenzo'],
        '/men/clothing/jeans': ['Emporio Armani', 'DSquared2', 'Diesel Jeans', 'Jacob Cohen', 'True Religion', 'Boss'],
        '/men/clothing/shirts': ['Burberry', 'C.P Company', 'Vivienne Westwood', 'Polo Ralph Lauren',	'Boss',	'Eton'],
    };


    arr = obj[url];

    if (!arr || arr.length == 0) return null;
    
    let html = arr.map((brand) => {
        return `
        <div class="FilterListItem ABRA FLAN-65-filter" data-productname="${brand}" style="display: block;">
                <a class="FilterAnchor " onclick="SetVal(event, 'ABRA','${brand}',this)">
                    <span role="checkbox" data-item="ABRA^${brand}" class="SelectableFilter " aria-checked="false" data-filter-type="deindexed" data-url-order="999">
                        <span class="FilterName" data-filtername="${brand}" data-parsedfiltername="${brand}">
                            ${brand}
                        </span>
                        <span class="FilterValue">
                            
                        </span>
                    </span>
                </a>
        </div>`;
    }).join(' ');

    return html;
}
