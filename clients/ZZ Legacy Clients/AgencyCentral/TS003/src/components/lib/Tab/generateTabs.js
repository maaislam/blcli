import settings from '../../../lib/settings';

const {
    ID,
} = settings;

function generateTabs(opts) {
    const {
        elements,
        uniqueName,
        mode,
    } = opts || {};

    let blocks = '';
    let tabHeaderItems = '';
    let tabs = '';
    const dataLength = elements.length;
    switch(mode){
        case 'tab':
            for (let i = 0; i < dataLength; i += 1) {
                tabHeaderItems += `
                    <div class="${ID}_tab__headerItem">
                        <label for="${uniqueName}" class="${ID}_tab__headerContent active" data-tab="${elements[i].id}">${elements[i].title}</label>
                    </div>
                    <!--End item-->
                `;
                tabs += `
                    <div class="${ID}_tab ${i === 0 ? 'active' : ''}" data-mode="${mode}" id="${elements[i].id}">
                        <div class="${ID}_tab__body">
                            ${elements[i].content}
                        </div>
                        <!--End body-->
                    </div>
                    <!--End tab-->
                `;
            }
            blocks += `
                <div class="${ID}_tab__header">
                    ${tabHeaderItems}
                </div>
                <!--End header-->
                ${tabs}
            `;
            break;
        case 'accordion':
            for (let i = 0; i < dataLength; i += 1) {
                blocks += `
                <div class="${ID}_tab ${i === 0 ? 'active' : ''}" data-mode="${mode}" id="${elements[i].id}">
                    <div class="${ID}_tab__header">
                        <div class="${ID}_tab__headerItem">
                            <label for="${uniqueName}" class="${ID}_tab__headerContent active" data-tab="${elements[i].id}">${elements[i].title}</label>
                        </div>
                        <!--End item-->
                    </div>
                    <!--End header-->
        
                    <div class="${ID}_tab__body">
                        ${elements[i].content}
                    </div>
                    <!--End body-->
                </div>
                <!--End tab-->
            `;
            }
            break;
        default:
            break;        
    }
    return blocks;
}

export default generateTabs;
