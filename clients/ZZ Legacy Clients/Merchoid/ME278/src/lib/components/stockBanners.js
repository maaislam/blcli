
import shared from '../shared';


export default () => {
    const { ID } = shared;


    const limitedStockProducts = [
        "Star Wars: Baby Yoda Christmas Sweater",
        "Star Wars: Baby Yoda Christmas Jumper",
        "Spider-Gwen: Ghost Of Multiverse Present Knitted Christmas Sweater",
        "Harry Potter: I'd Rather Stay At Hogwarts This Christmas Advent Calendar",
        "Friends: Door Premium A5 Notebook",
        "Stormtrooper Bookends",
        "Harry Potter: 2019 Pocket Pop! Vinyl Christmas Advent Calendar",
        "Star Wars: I Find Your Lack Of Cheer Disturbing Knitted Christmas Sweater",
        "Harry Potter: Christmas In The Wizarding World 2020 Advent Calendar",
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Jumper",
        "Batman: Frosty Festivities Christmas Sweater",
        "Star Wars: Happy Hoth-idays Knitted Christmas Sweater",
        "Friends: Central Perk Holiday Special Knitted Christmas Jumper",
        "Harry Potter: Ultimate Movie Quiz",
        "Banjo Kazooie: Limited Edition Replica Jigsaw Piece",
        "Haynes Retro Electronic Games Advent Calendar",
        "Three Wise Stormtrooper Figurines",
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Sweater",
        "Jurassic Park: Christmas Uh...Finds A Way Knitted Christmas Sweater",
        "Harry Potter: A Very Hogwarts Christmas Advent Calendar",
        "Jurassic Park: Christmas Uh...Finds A Way Knitted Christmas Jumper",
        "Captain America: Red White And Blue Knitted Christmas Sweater",
        "Batman: Straight Outta Gotham Premium Hoodie",
        "Spider-Man: ‘Tis The Season To Be Spidey Knitted Christmas Sweater",
        "Star Wars: X-Wing v TIE Fighter Knitted Christmas Sweater",
        "Mary Poppins: Practically Perfect In Every Way Umbrella",
        "Rick & Morty: Let's Get Schwifty Knitted Christmas Sweater",
        "Star Wars: The Season To Be Jolly It Is Christmas Sweater",
        "Friends: Central Perk Holiday Special Knitted Christmas Sweater",
        "Joker: Put On A Santa Hat Christmas Sweater",
        "Wallace And Gromit: Wet Bandit Feathers McGraw Metal Water Bottle",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Sweater",
        "Batman: Frosty Festivities Christmas Jumper",
        "Pac-Man: Ghosts Of Christmas Past Knitted Christmas Sweater",
        "Star Wars: Merry Mandalorian Knitted Christmas Sweater",
        "Nightmare Before Christmas: Making Dinner Plate Set",
        "Captain America: Red White And Blue Knitted Christmas Jumper",
        "Star Wars: Happy Hoth-idays Knitted Christmas Jumper",
        "Game Of Thrones: Winter Is Coming Stark Knitted Christmas Jumper",
        "Star Wars: Han Solo In Carbonite Limited Edition Ingot",
        "Friends: Central Perk Advent Calendar",
        "Star Wars: Frosty Falcon Knitted Christmas Sweater",
        "Haynes Retro Radio Advent Calendar",
        "Wonder Woman: A Wonder-ful Christmas Time Christmas Sweater",
        "Joker: Put On A Santa Hat Christmas Jumper",
        "Atari: Japanese Logo Messenger Bag",
        "Harry Potter: Muggle Storage Gryffindor Handbag",
        "Marvel: Merchoid Exclusive 2019 Pocket Pop! Vinyl Christmas Advent Calendar",
        "Avengers: Iron Man Power Gauntlet Knitted Christmas Sweater",
        "Harry Potter: Ten Gifts To Gryffindor Knitted Christmas Jumper",


    ];

    const sellingFastProducts = [
        "Game Of Thrones: Winter Is Coming Stark Knitted Christmas Sweater",
        "Harry Potter: Make No Bones About It Skele-Gro Water Bottle",
        "Harry Potter: Emergency Snack Storage Hufflepuff Handbag",
        "Harry Potter: Ten Gifts To Gryffindor Knitted Christmas Sweater",
        "Warhammer 40,000: Chaos Reigns Khorne Christmas Sweater",
        "Spider-Man: ‘Tis The Season To Be Spidey Knitted Christmas Jumper",
        "Black Panther: Wakandan Wishes Knitted Christmas Sweater",
        "Deadpool: Once Upon A Deadpool Knitted Christmas Sweater",
        "Marvel: Avengers Knitted Christmas Sweater/Jumper",
        "Harry Potter: Quills & Parchment Carrier Ravenclaw Handbag",
        "Jurassic Park: 'Six Foot Turkey' Velociraptor Magnetic Bottle Opener",
        "Warhammer 40,000: Imperial Tidings Christmas Sweater",
        "Harry Potter: Christmas In The Wizarding World Advent Calendar",
        "Superman: Seasonal Solitude Christmas Sweater",
        "Lion King: Hakuna Holidays Knitted Christmas Jumper",
        "Star Wars: Welcome To The Dark Side Rubber Doormat",
        "Warhammer 40,000: Nefarious Necron Christmas Sweater",
        "Friends: Central Perk 12 Days Of Bath & Body Advent Calendar",
        "Harry Potter: 'Happy Huffle-days!' Hufflepuff Christmas Sweater",
        "Call Of Duty: Monkey Bomb 8 inch Cable Guy Phone and Controller Holder",
        "The Shining: Welcome To The Overlook Hotel Doormat",
        "Nintendo: Making A Splash NES Cartridge Coasters",
        "Harry Potter: 'Happy Huffle-days!' Hufflepuff Christmas Jumper",
        "Star Wars: The Season To Be Jolly It Is Christmas Jumper",
        "Deadpool: Once Upon A Deadpool Knitted Christmas Jumper",
        "Dungeons & Dragons: Restore Mana Tankard",
        "Haynes Retro Camera Advent Calendar",
        "Wallace And Gromit: A Grand Night In Gromit Shaped Mug",
        "Beauty and the Beast: Merry Beastmas Knitted Christmas Jumper",
        "The Little Mermaid: Part Of Your Holidays Knitted Christmas Jumper",
        "Harry Potter: Premium Gryffindor Padded Unisex Jacket",
        "Harry Potter: Slytherin Face Mask (Pack of 2)",
        "One Piece: Luffy Straw Hat Cosplay Replica",
        "Harry Potter: Essential Potions Storage Slytherin Handbag",
        "Star Wars: All I Want For Christmas Is R2 Knitted Christmas Sweater",
        "Star Wars: Mandalorian Limited Edition Ingot",
        "Superman: Seasonal Solitude Christmas Jumper",
        "Wonder Woman: Amazing Amazonian Premium Hoodie",
        "Harry Potter: Ready For Presents Ravenclaw Christmas Sweater",
        "Avengers: Iron Man Power Gauntlet Knitted Christmas Jumper",
        "Wonder Woman: A Wonder-ful Christmas Time Christmas Jumper",
        "Warhammer 40,000: Nefarious Necron Christmas Jumper",
        "Star Wars: The Mandalorian The Child/Baby Yoda I'm All Ears Notebook",
        "Warhammer 40,000: Chaos Undivided Premium Jacket",
        "Harry Potter: Slytherin’ Through The Snow Knitted Christmas Jumper",
        "Jurassic Park: Knitted Christmas Jumper",
        "Toy Story: To Festivities And Beyond Knitted Christmas Jumper",
        "Gears Of War: Gear-ing Up For Gifts Knitted Christmas Sweater (Includes Fruitcake Weapon Set DLC)",
        "Venom: Season of the Symbiote Knitted Christmas Sweater",
        "Warhammer 40,000: Imperial Tidings Christmas Jumper",
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