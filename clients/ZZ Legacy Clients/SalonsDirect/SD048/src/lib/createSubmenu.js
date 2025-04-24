import recursiveSubmenu from './recursiveSubmenu';

export default function(data) {
    var li = document.createElement('LI');
    li.className = 'SD048_level0-link';
    
    var a = document.createElement('A');
    a.href = data.link ? data.link : '#';
    a.innerText = data.name;

    li.appendChild(a);

    var innerHTML, customClass, itemsPerColumn;
    
    innerHTML = recursiveSubmenu(data.sub);
    if (innerHTML) li.innerHTML += innerHTML;

    return li;
}