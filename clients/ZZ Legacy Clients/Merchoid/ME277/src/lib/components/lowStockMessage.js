
import shared from '../shared';


export default () => {
    const { ID } = shared;


    const limitedStockProducts = [
        "Stranger Things: Hellfire Club Christmas Sweater", 
        "Teenage Mutant Ninja Turtles: Cowabunga Christmas Sweater", 
        "Teletext: Santa's Schedule Christmas Sweater", 
        "Lord Of The Rings: One Sweater To Rule Them All Christmas Sweater", 
        "Moon Knight: Silent Knight Christmas Sweater", 
        "Lord of The Rings: One Gold Ring Christmas Sweater", 
        "Nightmare Before Christmas: Christmas Sweater", 
        "Star Wars: Away on A Razorcrest Baby Yoda/Grogu Christmas Sweater", 
        "Stranger Things: Seasons Greetings From The Upside Down Christmas Sweater", 
        "Pokémon: Christmas... I Choose You! Christmas Sweater", 
        "Nightmare Before Christmas: 'What's This?' Christmas Sweater", 
        "The Little Mermaid: Under The Tree Christmas Sweater", 
        "NASA: Houston... We Have A Present! Christmas Sweater",
         "Star Wars: Happy Hoth-idays Christmas Sweater", 
         "Spongebob Squarepants: Have A Krabby Christmas! Christmas Sweater", 
         "Spider-Man: Tis The Season To Be Spidey Christmas Sweater", 
         "Star Wars: I Find Your Lack Of Cheer Disturbing Christmas Sweater", 
         "Jurassic Park: Christmas Uh...Finds A Way Christmas Sweater", 
         "Captain America: Red White And Blue Christmas Sweater", 
         "Harry Potter: Ten Gifts To Gryffindor Christmas Sweater",

         "Stranger Things: Hellfire Club Christmas Jumper", 
         "Teenage Mutant Ninja Turtles: Cowabunga Christmas Jumper", 
         "Teletext: Santa's Schedule Christmas Jumper", 
         "Lord Of The Rings: One Sweater To Rule Them All Christmas Jumper", 
         "Moon Knight: Silent Knight Christmas Jumper", 
         "Lord of The Rings: One Gold Ring Christmas Jumper", 
         "Nightmare Before Christmas: Christmas Jumper", 
         "Star Wars: Away on A Razorcrest Baby Yoda/Grogu Christmas Jumper", 
         "Stranger Things: Seasons Greetings From The Upside Down Christmas Jumper", 
         "Pokémon: Christmas... I Choose You! Christmas Jumper", 
         "Nightmare Before Christmas: 'What's This?' Christmas Jumper", 
         "The Little Mermaid: Under The Tree Christmas Jumper", 
         "NASA: Houston... We Have A Present! Christmas Jumper",
          "Star Wars: Happy Hoth-idays Christmas Jumper", 
          "Spongebob Squarepants: Have A Krabby Christmas! Christmas Jumper", 
          "Spider-Man: Tis The Season To Be Spidey Christmas Jumper", 
          "Star Wars: I Find Your Lack Of Cheer Disturbing Christmas Jumper", 
          "Jurassic Park: Christmas Uh...Finds A Way Christmas Jumper", 
          "Captain America: Red White And Blue Christmas Jumper", 
          "Harry Potter: Ten Gifts To Gryffindor Christmas Jumper", 

        "Star Wars: Happy Hoth-idays Ugly Christmas Sweater/Jumper", 
        "Star Wars: Happy Hoth-idays Ugly Christmas Sweater",
        "Star Wars: Happy Hoth-idays Ugly Christmas Jumper",        
        "Star Wars: Happy Hoth-idays Christmas Jumper",
        "Star Wars: Happy Hoth-idays Christmas Sweater",
        "Star Wars: Away on A Razorcrest Baby Yoda/Grogu Christmas Sweater/Jumper",
        "Star Wars: Away on A Razorcrest Baby Yoda/Grogu Christmas Jumper",
        "Star Wars: Away on A Razorcrest Baby Yoda/Grogu Christmas Sweater",
        "Star Wars: Baby Yoda Grogu Ugly Christmas Sweater/Jumper",
        "Star Wars: Baby Yoda Grogu Ugly Christmas Sweater",
        "Star Wars: Baby Yoda Grogu Ugly Christmas Jumper",
        "Star Wars: Baby Yoda Grogu Christmas Jumper",
        "Star Wars: Baby Yoda Grogu Christmas Sweater",
        "The Winter Soldier: Star Of Bucky Ugly Christmas Sweater/Jumper",
        "The Winter Soldier: Star Of Bucky Ugly Christmas Sweater",
        "The Winter Soldier: Star Of Bucky Ugly Christmas Jumper",
        "The Winter Soldier: Star Of Bucky Christmas Jumper",
        "The Winter Soldier: Star Of Bucky Christmas Sweater",
        "The Winter Soldier: Star Of Bucky Christmas Sweater/Jumper",
        "Loki: The Christmas Variant Christmas Sweater/Jumper",
        "Loki: The Christmas Variant Christmas Jumper",
        "Loki: The Christmas Variant Christmas Sweater",
        "Loki: The Christmas Variant Ugly Christmas Sweater/Jumper",
        "Loki: The Christmas Variant Ugly Christmas Sweater",
        "Loki: The Christmas Variant Ugly Christmas Jumper",
        "Batman: Seasons' Beatings Ugly Christmas Sweater/Jumper",
        "Batman: Seasons' Beatings Christmas Jumper",
        "Batman: Seasons' Beatings Christmas Sweater",
        "Superman: Man of Festivities Christmas Sweater/Jumper",
        "Superman: Man of Festivities Ugly Christmas Sweater/Jumper",
        "Superman: Man of Festivities Christmas Jumper",
        "Superman: Man of Festivities Christmas Sweater",
        "Harry Potter: Ten Gifts To Gryffindor Ugly Christmas Sweater",
        "Harry Potter: Ten Gifts To Gryffindor Christmas Jumper",
        "Harry Potter: Ten Gifts To Gryffindor Christmas Sweater",
        "Harry Potter: Ten Gifts To Gryffindor Christmas Sweater/Jumper",
        "Friends: Central Perk Holiday Special Ugly Christmas Sweater",
        "Friends: Central Perk Holiday Special Christmas Jumper",
        "Friends: Central Perk Holiday Special Christmas Sweater",
        "Friends: Central Perk Holiday Special Christmas Sweater/Jumper",
        "Jurassic Park: Ugly Christmas Uh...Finds A Way Ugly Christmas Sweater",
        "Jurassic Park: Christmas Uh...Finds A Way Christmas Jumper",
        "Jurassic Park: Christmas Uh...Finds A Way Christmas Sweater",
        "Pokémon: Christmas... I Choose You! Christmas Sweater",
        "Pokémon: Christmas... I Choose You! Christmas Jumper",
        "Pokémon: Christmas... I Choose You! Ugly Christmas Sweater/Jumper",
        "Warhammer 40,000: Armed and Dangerous Red Gobbo Christmas Sweater",
        "Warhammer 40,000: Armed and Dangerous Red Gobbo Christmas Jumper",
        "Warhammer 40,000: Armed and Dangerous Red Gobbo Christmas Sweater",
        "Warhammer 40,000: Armed and Dangerous Red Gobbo Christmas Sweater/Jumper",
        "Nightmare Before Christmas: 'What's This?' Ugly Christmas Sweater",
        "Nightmare Before Christmas: 'What's This?' Christmas Jumper",
        "Nightmare Before Christmas: 'What's This?' Christmas Sweater",
        "Nightmare Before Christmas: 'What's This?' Christmas Sweater/Jumper",
        "Nightmare Before Christmas: Ugly Christmas Sweater/Jumper",
        "Nightmare Before Christmas: Christmas Jumper",
        "Nightmare Before Christmas: Christmas Sweater",
        "Nightmare Before Christmas: Christmas Sweater/Jumper",

    ];

    const sellingFastProducts = [
        "Star Wars: X-Wing v TIE Fighter Christmas Jumper",
        "Star Wars: X-Wing v TIE Fighter Ugly Christmas Sweater",
        "Star Wars: X-Wing v TIE Fighter Ugly Christmas Sweater",
        "Star Wars: X-Wing v TIE Fighter Christmas Jumper",
        "Star Wars: X-Wing v TIE Fighter Christmas Sweater",
        "Star Wars: X-Wing v TIE Fighter Christmas Sweater/Jumper",
        "Star Wars: Merry Mandalorian Christmas Jumper",
        "Star Wars: Merry Mandalorian Ugly Christmas Sweater",
        "Star Wars: Merry Mandalorian Christmas Jumper",
        "Star Wars: Merry Mandalorian Christmas Sweater",
        "Star Wars: Merry Mandalorian Christmas Sweater/Jumper",
        "Spider-Man: Tis The Season To Be Spidey Christmas Jumper",
        "Spider-Man: Tis The Season To Be Spidey Ugly Christmas Sweater",
        "Spider-Man: Tis The Season To Be Spidey Christmas Jumper",
        "Spider-Man: Tis The Season To Be Spidey Christmas Sweater",
        "Spider-Man: Tis The Season To Be Spidey Christmas Sweater/Jumper",
        "Captain America: Red White And Blue Christmas Jumper",
        "Captain America: Red White And Blue Ugly Christmas Sweater",
        "Captain America: Red White And Blue Christmas Jumper",
        "Captain America: Red White And Blue Christmas Sweater",
        "Captain America: Red White And Blue Christmas Sweater/Jumper",
        "Spider-Gwen: Ghost Of Multiverse Present Christmas Jumper",
        "Spider-Gwen: Ghost Of Multiverse Present Ugly Christmas Sweater",
        "Spider-Gwen: Ghost Of Multiverse Present Christmas Sweater",
        "Spider-Gwen: Ghost Of Multiverse Present Christmas Sweater/Jumper",
        "Avengers: Assemble Knitted Christmas Jumper",
        "Avengers: Assemble Knitted Christmas Sweater",
        "Green Lantern: \"Guardian of Christmas\" Christmas Jumper",
        "Green Lantern: \"Guardian of Christmas\" Christmas Jumper",
        "Green Lantern: \"Guardian of Christmas\" Ugly Christmas Sweater/Jumper",
        "Green Lantern: \"Guardian of Christmas\" Christmas Sweater",
        "Green Lantern: \"Guardian of Christmas\" Christmas Sweater/Jumper",
        "Joker: Put On A Santa Hat Christmas Jumper",
        "Joker: Put On A Santa Hat Ugly Christmas Sweater",
        "Joker: Put On A Santa Hat Christmas Sweater",
        "Joker: Put On A Santa Hat Christmas Sweater/Jumper",
        "Harley Quinn: Happy Harley-Days Christmas Jumper",
        "Harley Quinn: Happy Harley-Days Ugly Christmas Sweater",
        "Harley Quinn: Happy Harley-Days Christmas Jumper",
        "Harley Quinn: Happy Harley-Days Christmas Sweater",
        "Harley Quinn: Happy Harley-Days Christmas Sweater/Jumper",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Jumper",
        "Harry Potter: I'd Rather Stay at Hogwarts Ugly Christmas Sweater",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Jumper",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Sweater",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Sweater/Jumper",
        "Harry Potter: 'Happy Huffle-Days!' Hufflepuff Christmas Jumper",
        "Harry Potter: 'Happy Huffle-Days!' Hufflepuff Ugly Christmas Sweater",
        "Harry Potter: 'Happy Huffle-Days!' Hufflepuff Christmas Jumper",
        "Harry Potter: 'Happy Huffle-Days!' Hufflepuff Christmas Sweater",
        "Harry Potter: Slytherin Through The Snow Christmas Jumper",
        "Harry Potter: Slytherin Through The Snow Ugly Christmas Sweater",
        "Harry Potter: Slytherin Through The Snow Christmas Sweater",
        "Harry Potter: Slytherin Through The Snow Christmas Sweater/Jumper",
        "Warhammer 40,000: WAAAGH! Ensemble Christmas Jumper",
        "Warhammer 40,000: WAAAGH! Ensemble Christmas Sweater",
        "Warhammer 40,000: WAAAGH! Ensemble Christmas Jumper",
        "Warhammer 40,000: WAAAGH! Ensemble Ugly Christmas Sweater/Jumper",
        "Warhammer 40,000: WAAAGH! Ensemble Christmas Sweater",
        "Warhammer 40,000: Imperial Tidings Christmas Jumper",
        "Warhammer 40,000: Imperial Tidings Ugly Christmas Sweater",
        "Warhammer 40,000: Imperial Tidings Christmas Jumper",
        "Warhammer 40,000: Imperial Tidings Christmas Sweater",
        "Warhammer 40,000: Imperial Tidings Christmas Sweater",
        "Frozen: Let It Snow Christmas Jumper",
        "Frozen: Let It Snow Ugly Christmas Sweater",
        "Frozen: Let It Snow Christmas Jumper",
        "Frozen: Let It Snow Christmas Sweater/Jumper",
        "Warhammer 40,000: Chaos Reigns Khorne Christmas Jumper",
        "Warhammer 40,000: Chaos Reigns Khorne Ugly Christmas Sweater",
        "Warhammer 40,000: Chaos Reigns Khorne Christmas Jumper",
        "Warhammer 40,000: Chaos Reigns Khorne Christmas Sweater",

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
        if(limitedStockProducts.indexOf(productTitle) > -1) {
            badge.classList.add(`${ID}_lowStock_Wrapper`);
            badge.innerHTML = `
            <div class="${ID}-lowStockBadge">
            <div class="${ID}-icon"></div>
                <span>Limited stock</span>
            </div>`;
            element.querySelector('.product-image-container .product-image-wrapper').appendChild(badge);
        } 

        else if(sellingFastProducts.indexOf(productTitle) > -1) {
            badge.classList.add(`${ID}_sellingFast_wrapper`);
            badge.innerHTML = `
            <div class="${ID}-sellFastBadge">
            <div class="${ID}-icon"></div>
                <span>Selling Fast</span>
            </div>`;
            element.querySelector('.product-image-container .product-image-wrapper').appendChild(badge);
        }
    }
}