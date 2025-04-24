
import shared from '../shared';


export default () => {
    const { ID } = shared;

    const lowStockProducts = [
        'Avengers: Iron Man Power Gauntlet Knitted Christmas Sweater',
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Jumper",
        "Captain Marvel: Festive Is A Good Look For You Knitted Christmas Sweater",
        'Captain America: Red White And Blue Knitted Christmas Sweater',
        'Avengers: Iron Man Power Gauntlet Knitted Christmas Jumper',
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Sweater/Jumper",
        'Deadpool: Once Upon A Deadpool Knitted Christmas Sweater',
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Sweater",
        'Game Of Thrones: Winter Is Coming Stark Knitted Christmas Jumper',
        "Spider-Man: 'Tis The Season To Be Spidey Knitted Christmas Sweater",
        'Batman: Goodwill In Gotham Christmas Sweater',
        'Xbox: Christmas Unlocked Knitted Sweater',
        'Harry Potter: Gryffindor Knitted Christmas Sweater',
        'Game Of Thrones: Winter Is Coming Stark Knitted Christmas Sweater',
        'Marvel: Avengers Knitted Christmas Sweater/Jumper',
        'Star Wars: Happy Hoth-idays Knitted Christmas Sweater',
        "Nightmare Before Christmas: 'What's This?' Knitted Christmas Sweater/Jumper Preorder",
        "Harry Potter: I'd Rather Stay at Hogwarts Christmas Sweater",
        'Jurassic Park: Knitted Christmas Sweater',
        'Harry Potter: Hufflepuff Knitted Christmas Sweater',
        'Star Wars: I Find Your Lack Of Cheer Disturbing Knitted Christmas Sweater',
        'Harry Potter: Slytherin Knitted Christmas Sweater',
        'Wonder Woman: The Most Wonder-ful Time Of The Year Knitted Christmas Sweater',
        'Superman: Seasonal Suit Up Knitted Christmas Sweater',
        'Star Wars: The Season To Be Jolly It Is Christmas Sweater',
        'Friends: The One With The Holiday Armadillo Knitted Christmas Sweater',
        'Star Wars: X-Wing v TIE Fighter Knitted Christmas Sweater',
        'Captain Marvel: Festive Is A Good Look For You Knitted Christmas Jumper',
        'Wonder Woman: Winter Wonder-land Knitted Christmas Sweater',
        'The Little Mermaid: Part Of Your Holidays Knitted Christmas Sweater',
        'Captain America: Red White And Blue Knitted Christmas Jumper',
        'Deadpool: Once Upon A Deadpool Knitted Christmas Jumper',
        'Star Wars: Happy Hoth-idays Knitted Christmas Jumper',
        'Thor: Merry Mjölnir Knitted Christmas Sweater',
        'The Little Mermaid: Part Of Your Holidays Knitted Christmas Jumper',
        'Mary Poppins: Have A Supercalifragilisticexpialidocious Christmas Knitted Sweater',
        'Batman: Goodwill In Gotham Christmas Jumper',
        'Friends: The One With The Holiday Armadillo Knitted Christmas Jumper',
        'Jurassic Park: Knitted Christmas Jumper',
        "Spider-Man: 'Tis The Season To Be Spidey Knitted Christmas Jumper",
        'Venom: Season of the Symbiote Knitted Christmas Sweater',
    ];

    const sellingFastProducts = [
        'Venom: Season of the Symbiote Knitted Christmas Sweater',
        'Mary Poppins: Have A Supercalifragilisticexpialidocious Christmas Knitted Jumper',
        'Harry Potter: Ravenclaw Knitted Christmas Sweater',
        "Spider-Man: Swingin' Through The Snow Knitted Christmas Sweater",
        'Xbox: Christmas Unlocked Knitted Jumper',
        "Harry Potter: Wintertime Weasleys 'R' Replica Christmas Sweater",
        'Harry Potter: Gryffindor Knitted Christmas Jumper',
        'Star Wars: Rebel Invaders Christmas Knitted Sweater',
        'Star Wars: Frosty Falcon Knitted Christmas Sweater',
        'Star Wars: All I Want For Christmas Is R2 Knitted Christmas Sweater',
        'Beauty and the Beast: Merry Beastmas Knitted Christmas Sweater',
        'Jurassic Park: Knitted Christmas Sweater/Jumper',
        'Aladdin: We WISH You A Merry Christmas Knitted Christmas Sweater',
        'Harry Potter: Slytherin Knitted Christmas Jumper',
        "Harry Potter: Part Of The Family 'H' Replica Christmas Sweater",
        'Beauty and the Beast: Merry Beastmas Knitted Christmas Jumper',
        'Rick and Morty: Get Schwifty Knitted Christmas Sweater',
        'Harry Potter: Ravenclaw Knitted Christmas Jumper',
        'Superman: Seasonal Suit Up Knitted Christmas Jumper',
        'Wonder Woman: The Most Wonder-ful Time Of The Year Knitted Christmas Jumper',
        'Legend of Zelda: Tinsel and Triforces Knitted Christmas Sweater',
        'Batman: Jo Jo Jo-ker Christmas Knitted Sweater',
        'Star Wars: X-Wing v TIE Fighter Knitted Christmas Jumper',
        'Star Wars: Trench Run Knitted Christmas Sweater',
        'Thor: Merry Mjölnir Knitted Christmas Jumper',
        'Lion King: Hakuna Holidays Knitted Christmas Sweater',
        'The Flash: Central City Celebrations Christmas Sweater',
        "Harry Potter: Rockin' Ravenclaw Knitted Christmas Jumper",
        'Game Of Thrones: Fire & Blood Targaryen Knitted Christmas Sweater',
        "Harry Potter: Rockin' Ravenclaw Knitted Christmas Sweater",
        'Aquaman: Atlantean Tidings Christmas Sweater Jumper'
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
        } /*else {
            badge.classList.add(`${ID}_goodStock_wrapper`);
            badge.innerHTML = `
            <div class="${ID}-goodStockBadge">
            <div class="${ID}-icon"></div>
                <span>Good stock</span>
            </div>`;
            element.querySelector('.product-image-container').appendChild(badge);
        }*/
    }
}