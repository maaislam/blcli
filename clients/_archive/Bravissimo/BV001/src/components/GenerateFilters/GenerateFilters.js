import settings from '../../lib/settings';

const { ID } = settings;

export default class GenerateFilters{
    constructor(options){
        const opts = options || {};
        this.data = opts.data;
        this.create();
        this.bindEvents;
        this.render();
    }

    create(){
        const element = document.createElement('div');
        element.classList.add(`${ID}_removeFiltersWrap`);
        element.innerHTML = `
            <div class="${ID}_removeFilters">
                <div class="c-facet-token">
                    <span class="c-facet-token__label">${this.data.fullSize}</span>
                    <div class="c-facet-token__action" data-cupSize="${this.data.cupSize}" data-backSize="${this.data.backSize}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 200 200" role="img">
                        <path d="M182 42c8-8 8-20 2-26s-18-6-26 2l-58 58-58-58c-8-8-20-8-26-2s-6 18 2 26l58 58-58 58c-8 8-8 20-2 26s18 6 26-2l58-58 58 58c8 8 20 8 26 2s6-18-2-26l-58-58 58-58z"></path>
                    </svg>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents(){

    }

    render(){

    }
}