import { Storage } from './helpers';
import { events } from '../../../../../lib/utils';

export const wishlist = (ref) => {
    if (!ref) return;
    // Clear the old dropdown to update.
    console.log('called wishlist, ', ref);

    // Fetch new
    Storage.fetch((res) => {
        if (!res) {
            return;
        }

        // Filter any falsy variables
        let filteredRes = res.filter(Boolean);

        let pos = 'afterend';
        
        if (document.querySelector('.MP-wishDropdown')) {
            console.log('remove old dropdown')
            let thisDropdown = document.querySelector('.MP-wishDropdown');
            thisDropdown.parentNode.removeChild(thisDropdown);
        }
        
        console.log('insert new');
        // Has array
        ref.insertAdjacentHTML(pos, `
            <div class="MP-wishDropdown">
                <a href="#" class="MP-wishDropdown--toggle ${window.innerWidth <= 649 ? 'mobile' : 'desktop'}">
                    ${window.innerWidth <= 649 ? `<p class="wishlist-mobile"> Wishlist </p>` : ''}
                    <div class="heart-holder">
                        <button class="MP-heart"></button>
                        <span class="MP-number">${filteredRes.length}</span>
                        <span class="MP-wishlist-name">Wishlist</span>
                    </div>
                </a>

                <div class="MP-wishDropdown--content">
                    <div class="MP-wishDropdown--close">
                        <i class="ico ico-cross close-btn closeBtn"></i>
                    </div>

                    <h2>My Wishlist</h2>

                    <div class="MP-wishDropdown--banner">
                        ${filteredRes.length ? `<p>${filteredRes.length} items saved to wishlist</p>` : '<p>You have 0 items in your wish list </p>'}
                    </div>

                    <div class="MP-wishDropdown--list">
                        ${filteredRes.map((obj) => `
                            ${obj && `
                            <div class="MP-wish-item">
                                
                                <div class="MP-ib">
                                    <img src="${obj.img}" alt="${obj.name}"/>
                                </div>
                                <div class="MP-ib">
                                    <h4>${obj.name}</h4>
                                    ${obj.price ? `<h5>${obj.price}</h5>` : ''}
                                    <a href="${obj.url}" class="MP-btn MP-view">View Item</a>
                                    <a href="#" data-href="${obj.url}" class="MP-btn MP-remove">Remove</a>
                                </div>
                                
                            </div>
                            `}
                        `).join(' ')}
                    </div>
                </div>
            </div>
        `);


        events.send('MP189', 'MP189 Shown', 'MP189 Wishlist added');


        // Const add events
        const wishContainer = document.querySelector('.MP-wishDropdown');
        const toggleWishlist = document.querySelector('.MP-wishDropdown--toggle');
        const close = document.querySelector('.MP-wishDropdown--close');

        if (toggleWishlist && wishContainer) {
            toggleWishlist.addEventListener('click', () => {
                
                wishContainer.classList.toggle('MP-show');
                document.getElementById('shopSlider').scrollTop = 0;
                wishContainer.scrollTop = 0;

                events.send('MP189', 'MP189 Click', 'MP189 Wishlist viewed from menu or header');
            });
        }
        if (close) {
            close.addEventListener('click', () => wishContainer.classList.remove('MP-show'));
        }

        // Click WL links
        const wishlistLinks = document.querySelectorAll('.MP-wishDropdown .MP-wish-item a');
        if (wishlistLinks.length) {
            Array.from(wishlistLinks).map((link) => {
                link ? link.addEventListener('click', () => {
                    events.send('MP189', 'MP189 Click', 'MP189 Products viewed from wishlist to PDP');
                }) : null;
            })
        }


    });
}