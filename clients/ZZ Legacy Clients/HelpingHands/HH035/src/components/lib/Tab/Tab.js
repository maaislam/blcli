/*
Usage
-----
new Tabs({
target: 'body',
injectPosition: 'afterbegin',
uniqueName: 'trigger',
data: [{id: '...', title: '...', content: '...'},],
mode: 'tab' || 'accordion',
});
OR
let tabs;
tabs = new Tabs({
            target: 'body',
            injectPosition: 'afterbegin',
            uniqueName: 'trigger',
            data: [{id: '...', title: '...', content: '...'},],
            mode: 'tab' || 'accordion',
            });
-----
*/

import settings from '../../../lib/settings';
import generateTabs from './generateTabs';

const {
    ID,
    VARIATION
} = settings;

export default class Tabs {
    constructor(options) {
        const opts = options || {};
        this.target = opts.target;
        this.injectPosition = opts.injectPosition;
        this.uniqueName = opts.uniqueName || ''; //useful in case you want to use no-js tabs or accordions. Generate N° checkboxes or radio for each element and turn them on and off with css
        this.data = opts.data;
        this.mode = opts.mode;
        this.create();
        this.bindEvents();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}_tabWrap`);
        element.innerHTML = generateTabs({
            elements: this.data,
            uniqueName: this.uniqueName,
            mode: this.mode,
        });
        this.component = element;
    }

    bindEvents() {
        const tabs = this.component.querySelectorAll(`.${ID}_tab__headerContent`);
        const tabsBodies = this.component.querySelectorAll(`.${ID}_tab`);
        [].forEach.call(tabs, function (tab) {
            tab.addEventListener('click', function (e) {
                const target = e.target.getAttribute('data-tab');
                [].forEach.call(tabs, function (curTab) {
                    if (curTab.classList.contains('active')) {
                        curTab.classList.remove('active');
                    }
                });
                e.target.classList.add('active');
                [].forEach.call(tabsBodies, function (body) {
                    if (body.classList.contains('active')) {
                        body.classList.remove('active');
                    }
                });
                this.component.querySelector(`#${target}`).classList.add('active');
            });
        });
    }

    render() {
        document.querySelector(this.target).insertAdjacentElement(this.injectPosition, this.component);
    }
}
