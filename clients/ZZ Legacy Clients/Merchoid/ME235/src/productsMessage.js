import shared from "./lib/shared";


export default () => {
    const { ID } = shared;

    const lowStockProducts = [
        "Destiny: Strength and Sacrifice Titan Hoodie", 
        "Spiderman: Premium Hoodie",
        "Avengers: Premium Limited Edition Jacket", 
        "Nintendo: Game Girl Zip Around Purse",
        "Zelda: Treasure Seekers Bracelet",
        "Spider-Man: Time For Action Plushes - Set of 5",
        "Guardians of the Galaxy: Ragtag Group Plushes - Set of 7",
        "Toy Story: Woody's Roundup Plushes - Set of 5",
        "Spider-Man: The Stuff(ing) Of Nightmares 12 inch Plushes - Set of 5", 
        "Harry Potter: Deluxe Premium Cube Advent Calendar",
        "Legend Of Zelda: Time To Save Hyrule Triforce Alarm Clock",
        "Game of Thrones: Dead of Winter Tankard",
        "Game of Thrones: Refreshment Is Coming Stark Stein Mug", 
        "Game Of Thrones: Viserion White Walker Goblet",
        "Tamagotchi: Evolution Of A Tamagotchi Heat Change Mug", 
    ];

    const sellingFastProducts = [
        'Thor: Premium Limited Edition Jacket',
        "Avengers Endgame: Advanced Tech Men's Quantum Hoodie",
        'Captain America: Premium Limited Edition Jacket',
        "Joker: Premium Red Blazer",
        "Nintendo: Time To Step Things Up Game Boy Color Watch",
       " Playstation: PS1 Messenger Bag",
        "Jurassic Park: Visitor Centre Limited Edition Legacy Kit",
        "Jurassic World: Deluxe Welcome Kit",
        "Legend Of Zelda: Seal The Darkness Master Sword Light",
        "Game of Thrones: Heart of a Direwolf Goblet",
        "Game of Thrones: Mother of Dragons House Targaryen Goblet", 
        "Fallout: Nuclear Option Bomb Mug",
        "Black Panther: Fist Of Fury Shaped Mug", 
        "Game of Thrones: Stark Raving Mad House Goblet",
    ]
    

    // loop through product names
    const allProducts = document.querySelectorAll('.products-grid .product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const productTitle = element.querySelector('.product-item-link').textContent.trim();

        // create the low stock badge

        const badge = document.createElement('div');
        badge.classList.add(`${ID}-badge`);

        // add the badge to products not in the exclude list
        if(lowStockProducts.indexOf(productTitle) > -1) {
            badge.classList.add(`${ID}_lowStock_Wrapper`);
            badge.innerHTML = `
            <div class="${ID}-lowStockBadge">
            <div class="${ID}-icon"></div>
                <span>Low stock</span>
            </div>`;
            element.querySelector('.product-image-container').appendChild(badge);
        } 

        else if(sellingFastProducts.indexOf(productTitle) > -1) {
            badge.classList.add(`${ID}_sellingFast_wrapper`);
            badge.innerHTML = `
            <div class="${ID}-sellFastBadge">
            <div class="${ID}-icon"></div>
                <span>Selling Fast</span>
            </div>`;
            element.querySelector('.product-image-container').appendChild(badge);
        } 
    }
}