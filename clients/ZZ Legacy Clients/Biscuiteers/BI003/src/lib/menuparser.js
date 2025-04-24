import * as utils from '../../../../../lib/utils';

export default class MenuParser {
    constructor() {
        this.identifyLevels();
    }

    /**
     * Top level links are identified by the slug name of the link
     *
     * Essentially modify the mark up in order for it to be easier to
     * map a new menu structure against
     */
    identifyLevels() {
        const topLevelLinks = document.querySelectorAll('.meganav__container > .flex > .meganav__item');
        [].forEach.call(topLevelLinks, (item) => {
            const linkText = item.querySelector('.meganav__link').textContent;
            item.classList.add('bi3-level0--' + this.slugify(linkText));
            item.dataset['bi3title'] = linkText;

            const submenus = item.querySelectorAll('.meganav__item-dropdown__section--links-list');
            [].forEach.call(submenus, (item) => {
                const p = item.querySelector('.col-pink');
                if(p) {
                    const linkText = p.textContent.trim();
                    item.dataset['bi3title'] = linkText;
                    item.classList.add('bi3-level1--' + this.slugify(linkText));
                }
            });
        });
    }

    /**
     * Grab menu
     *
     * This goes through our menu definition and queries the DOM to extract 
     * menu elements
     *
     * @param {Object} menuObject   An object containing  menu structure definition
     */
    parseMenu(menuObject) {
        const results = [],
            menuItems = Object.keys(menuObject);

        menuItems.forEach((identifier, key) => {
            let result = {},
                level0Title = '';

            // Get the top level item and relevant attributes
            const level0Item = this.findLevel0Link(identifier);
            if(level0Item) {
                level0Title = level0Item.dataset['bi3title'];
            }

            // Get submenus and top level overrides
            let submenus = menuObject[identifier];
            if(submenus.constructor === Object) {
                // Overrides the top level
                if(submenus.title) {
                    level0Title = submenus.title;
                }
                submenus = menuObject[identifier].items;
            }

            result['title'] = level0Title;
            result.identifier = identifier;
            result.link = 'javascript:void(0)';
            result.sub = [];

            // Get submenus
            submenus.forEach((item, key) => {
                let level1Title = '',
                    level1Result = {},
                    level1Identifier = null,
                    level2Links = [];

                if(typeof item == 'string') {
                    level1Identifier = item;
                } else if(item.identifier) {
                    level1Identifier = item.identifier;
                }

                if(level1Identifier) {
                    // Grab the DOM element associated with given identifier
                    const level1Item = this.findLevel1Link(level1Identifier);
                    level1Title = item.title || level1Item.dataset['bi3title'];

                    const linkElms = level1Item.querySelectorAll('.meganav__item-dropdown__item');
                    [].forEach.call(linkElms, (item, idx) => {
                        const title = item.textContent.trim();
                        level2Links.push({
                            title: title,
                            link: (item.querySelector('a') || {}).href
                        });
                    });
                } else {
                    // Custom menu links
                    level1Title = item.title;
                    level2Links = item.links;
                }

                level1Result['title'] = level1Title;
                level1Result.link = 'javascript:void(0)';
                level1Result.sub = level2Links;

                result.sub.push(level1Result);
            });

            results.push(result);
        });

        return results;
    }

    findLevel0Link(identifier) {
        return document.querySelector('.bi3-level0--' + identifier);
    }

    findLevel1Link(identifier) {
        return document.querySelector('.bi3-level1--' + identifier);
    }

    /**
     * Builds the markup for a navigation with subnavigations
     *
     * @see sd048
     */
    menuJsonToHtml(data) {
        // Will increment and decrement as necessary to keep track of the menu depth
        var level = 1;

        // Recursively build sub navigations
        var _buildLevel = function(data) {
            // Wrap with div if submenu
            var html = '<div class="bi3_menu-list bi3_menu-list__level' + level + '">';
            html += '<ul class="bi3_level bi3_level' + level + '">';

            for (var i = 0; i < data.length; i++) {
                var activeClass = '';
                if(level == 2 && i == 0) {
                    activeClass += ' bi3_level2-link--active '
                }

                var identifier = '';
                if(data[i].identifier) {
                    identifier += data[i].identifier;
                }
                html += '<li class="bi3_level' + level + '-link ' + activeClass 
                    + '" data-bi3ident="' + identifier + '">';

                if (typeof(data[i].sub) === 'object') {
                    html += '<a href="' + data[i].link + '">' + data[i].title + '</a>';
                    // Next level deep - increment level number
                    level++;
                    // Build next level markup
                    html += _buildLevel(data[i].sub);
                    // Back to previous level - decrement level number
                    level--;
                } else {
                    html += '<a href="' + data[i].link + '">' + data[i].title + '</a>';
                }

                html += '</li>';
            }

            html += '</ul>';
            html += '</div>';
            return html;
        };

        return _buildLevel(data);
    }

    /**
     * Convert to alphanumeric no spaces lower case string
     */
    slugify(text) {
        return text.replace(/[^A-Z0-9]/ig, '').toLowerCase();
    }
}
