/*
    Builds the markup for a navigation with subnavigations
    data parameter should be JSON format, with the property 'sub'
    for each subnavigation - e.g.:
    [
        {
            'name': 'Level 1 link', 'link': 'javascript:void(0)'
            'sub': [
                { 'name': Level 2 link, 'link': 'http://externallink' },
                { 'name': Level 2 link, 'link': 'http://externallink' }
            ]
        },
        {}
    ]
*/
export default function(data) {
    // Will increment and decrement as necessary to keep track of the menu depth
    var level = 1;

    // Recursively build sub navigations
    var _buildLevel = function(data) {
        // Wrap with div if submenu
        var html = '<div class="SD048_menu-list">';
        html += '<ul class="SD048_level SD048_level' + level + '">';

        for (var i = 0; i < data.length; i++) {
            html += '<li class="SD048_level' + level + '-link">';

            if (typeof(data[i].sub) === 'object') {
                html += '<a href="' + data[i].link + '">' + data[i].name + '</a>';
                // Next level deep - increment level number
                level++;
                // Build next level markup
                html += _buildLevel(data[i].sub);
                // Back to previous level - decrement level number
                level--;
            } else {
                html += '<a href="' + data[i].link + '">' + data[i].name + '</a>';
            }

            html += '</li>';
        }

        html += '</ul>';
        html += '</div>';
        return html;
    };

    return _buildLevel(data);
}