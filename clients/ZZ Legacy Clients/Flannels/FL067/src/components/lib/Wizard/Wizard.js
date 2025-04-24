/*
Usage
-----
new Wizard({
    target: 'body',
    injectPosition: 'afterbegin',
    data: OBJ - See exData.json,
});
OR
let wizard;
wizard = new Wizard({
            target: 'body',
            injectPosition: 'afterbegin',
            data: OBJ - See exData.json,
            });
-----
*/

import settings from '../../../lib/settings';
import generateElements from './generateElements';
const {
    ID,
    VARIATION
} = settings;

export default class Wizard {
    constructor(options) {
        const opts = options || {};
        this.target = opts.target;
        this.injectPosition = opts.injectPosition;
        this.data = opts.data;
        this.create();
        this.bindEvents();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}_wizardWrap`);
        element.innerHTML = `
            <form class="${ID}_wizard">
                <header class="${ID}_wizard__header">
                    ${this.data.wizardtitle ? `<h3 class="${ID}_wizard__title">${this.data.wizardtitle}</h3>` : ''}
                    ${this.data.steps ? generateElements('steps', this.data.wizardsteps.length) : ''}
                </header>
                <div class="${ID}_wizard__body">
                    ${generateElements('wizard', this.data.wizardsteps)}
                </div>
                ${this.data.dots ? generateElements('dots', this.data.wizardsteps.length) : ''}
            </form>
        `;
        this.component = element;
    }

    bindEvents() {
        const elements = this.component.querySelectorAll(`.${ID}_wizard__element`);
        const dots = this.component.querySelectorAll(`.${ID}_wizard__dots .${ID}_wizard__listItem`);
        const steps = this.component.querySelectorAll(`.${ID}_wizard__steps .${ID}_wizard__listItem`);
        const buttons = this.component.querySelectorAll(`.${ID}_wizard__button`);

        [].forEach.call(buttons, function(button){
            button.addEventListener('click', function(e){
                const target = e.target.getAttribute('data-target');
                [].forEach.call(elements, function(element){
                    element.classList.remove('active');
                });
                [].forEach.call(dots, function(curDot){
                    curDot.classList.remove('active');
                });
                [].forEach.call(steps, function(curstep){
                    curstep.classList.remove('active');
                });
                const bindedEl = document.querySelectorAll(`[data-bind-step="${target}"]`);
                [].forEach.call(bindedEl, function(curEl){
                    curEl.classList.add('active');
                });
                document.querySelector(`[data-step-id="${target}"]`).classList.add('active');
            });
        });

        if(this.data.dots){
            if(this.component.querySelectorAll(`.${ID}_wizard__dots .${ID}_wizard__listItem`)){
                [].forEach.call(dots, function(dot){
                    dot.addEventListener('click', function(e){
                        const target = e.target.getAttribute('data-bind-step').trim();
                        [].forEach.call(elements, function(element){
                            element.classList.remove('active');
                        });
                        [].forEach.call(dots, function(curDot){
                            curDot.classList.remove('active');
                        });
                        e.target.classList.add('active');
                        document.querySelector(`[data-step-id="${target}"]`).classList.add('active');
                    });
                });
            }
        }

        if(this.data.steps){
            if(this.component.querySelectorAll(`.${ID}_wizard__steps .${ID}_wizard__listItem`)){
                [].forEach.call(steps, function(step){
                    step.addEventListener('click', function(e){
                        const target = e.target.getAttribute('data-bind-step').trim();
                        [].forEach.call(elements, function(element){
                            element.classList.remove('active');
                        });
                        [].forEach.call(steps, function(curstep){
                            curstep.classList.remove('active');
                        });
                        e.target.classList.add('active');
                        document.querySelector(`[data-step-id="${target}"]`).classList.add('active');
                    });
                });
            }
        }
    }

    render() {
        document.querySelector(this.target).insertAdjacentElement(this.injectPosition, this.component);
    }
}
