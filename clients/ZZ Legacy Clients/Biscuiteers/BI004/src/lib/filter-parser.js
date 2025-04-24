import {slugify} from '../../../../../lib/utils';

/**
 * Flag elements and mark up to make it easier to query the filters
 * and to be able to define mappings between any of our own custom HTML
 */
export const parse = () => {
    const filters = [];

    const blocks = document.querySelectorAll('.block-filters');
    [].forEach.call(blocks, (item) => {
        item.classList.add('bi4-filters__block');

        const filterHeading = item.querySelector('.block-filters__header');

        if(!filterHeading) {
            return;
        }

        const headingText = filterHeading.innerText,
            headingSlug = slugify(headingText);

        filterHeading.classList.add('bi4-filters__heading');

        const filterContent = item.querySelector('.block-filters__content');
        filterContent.classList.add('bi4-filters__content');

        const block = {
            title: headingText.trim(),
            identifier: headingSlug,
            links: []
        };

        const filterLinkDivs = filterContent.children;
        [].forEach.call(filterLinkDivs, (filterLinkDiv) => {
            if(filterLinkDiv.nodeName.toLowerCase() == 'div') {
                const filterLink = (filterLinkDiv.firstElementChild || {}).firstElementChild || filterLinkDiv.firstElementChild;

                if(filterLink) {
                    filterLink.classList.add('bi4-filters__link');

                    const linkText = filterLink.textContent,
                        linkSlug = slugify(linkText),
                        identifier = headingSlug + '__' + linkSlug;

                    filterLink.dataset['bi4slug'] = identifier;
                    filterLink.classList.add('bi4-target--' + identifier);

                    block.links.push({
                        identifier: identifier,
                        text: linkText,
                        active: !!filterLink.classList.contains('checked'),
                        element: filterLink
                    });
                }
            }
        });

        filters.push(block);
    });

    return filters;
};

/**
 * Take menu and generate HTML in nested lists
 */
export const generateHorizontalLinks = (menu) => {
    if(menu.length == 0) {
        return '';
    }

    let html = `
        <h2 class="bi4-hfilters-heading">find the perfect gift:</h2>
        <ul class="bi4-hfilters">
    `;

    menu.forEach(function(item) {
        const id = item.identifier,
            links = item.links,
            title = item.title;

        html += `<li class="bi4-hfilters__item" data-bi4id="${id}">`;
            html += `
                <a class="bi4-link" data-bi4id="${id}">
                    <span class="bi4-link__title">${title}</span>
                    <i class="icon-down-dir lh-18"></i>
                </a>
            `;
            html += `<div class="bi4-submenu-wrap">`;
            html += `<ul class="bi4-submenu">`;

                links.forEach(function(link) {
                    html += `<li>
                        <a class="bi4-submenu__link ${link.active ? 'bi4-submenu__link--active' : ''}" 
                            data-bi4id="${link.identifier}"
                        >
                            <span class="icon-checkbox-unchecked"></span>
                            ${link.text}
                        </a>
                    </li>`;
                });

            html += `</ul>`;
            html += `</div>`;

        html += `</li>`;
    });

    html += `
        <li class="bi4-actions">
            <a class="bi4-actions__clear col-pink">
                Clear all 
                <i class="icon-remove"></i>
            </a>
        </li>
    `;

    html += '</ul>';

    return html;
}
