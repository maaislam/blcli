import { Storage } from './helpers';

export const wishlist = (ref) => {
    if (!ref) return;

    // Clear the old dropdown to update.
    if (document.querySelector('.MP-wishDropdown')) {
        let thisDropdown = document.querySelector('.MP-wishDropdown');
        thisDropdown.parentNode.removeChild(thisDropdown);
    }

    // Fetch new
    Storage.fetch((res) => {
        if (!res) {
            console.log('MP no wishlist items');
            return;
        }

        // Filter any falsy variables
        let filteredRes = res.filter(Boolean);

        // Has array
        ref.insertAdjacentHTML('beforeend', `
            <div class="MP-wishDropdown">
                <div class="MP-wishDropdown--toggle">
                <3
                </div>

                <div class="MP-wishDropdown--list">
                    ${filteredRes.map((obj) => `
                        ${obj && `
                        <div class="MP-wish-item">
                            <a href="${obj.url}"></a>
                            <h4>${obj.name}</h4>
                            <img src="${obj.image}" alt="${obj.name}"/>
                        </div>
                        `}
                    `).join(' ')}
                </div>
            </div>
        `);
    });
}

