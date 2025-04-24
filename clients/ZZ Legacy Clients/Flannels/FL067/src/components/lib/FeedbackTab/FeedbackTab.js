/*
Usage
-----
Required fields --> **
Arbitrary fields --> -- (Must be present at least one)
----
new Feedback({
target: 'body', **
injectPosition: 'afterbegin', **
uniqueName: 'trigger', **
data: {
        position: 'bottom-left' || 'bottom-right' || 'left' || 'right', **
        clientName : '', **
        logo: '', --
        title: '', --
        bgImage: '', --
        bgColor: '', --
        mode: 'modal || feedback', **,
        content: `...`,
        questions: [
            {
                question: '...',
                onClickAction: ''
                subquestions: [
                    {
                        question: ''
                    }
                ]
            }
        ]
    }
});
OR
let feedback;
feedback = new Feedback({
            target: 'body', **
            injectPosition: 'afterbegin', **
            uniqueName: 'trigger', **
            data: {
                    position: 'bottom-left' || 'bottom-right' || 'left' || 'right', **
                    clientName : '', **
                    logo: '', --
                    title: '', --
                    bgImage: '', --
                    bgColor: '', --
                    mode: 'modal || feedback', **,
                    content: `...`,
                    questions: [
                        {
                            question: '...',
                            onClickAction: ''
                            subquestions: [
                                {
                                    question: ''
                                }
                            ]
                        }
                    ]
                }
            });
-----
*/

import settings from '../../../lib/settings';
import builder from './builder';
const {
    ID,
    VARIATION
} = settings;

export default class Feedback {
    constructor(options) {
        const opts = options || {};
        this.target = opts.target;
        this.injectPosition = opts.injectPosition;
        this.uniqueName = opts.uniqueName;
        this.data = opts.data;
        this.position = opts.data.position;
        this.clientName = opts.data.clientName;
        this.logo = options.data.logo || null;
        this.title = opts.data.title || null;
        this.bgImage = opts.data.bgImage || null;
        this.bgColor = opts.data.bgColor || null;
        this.mode = opts.mode;
        this.content = opts.content || '';
        this.questions = opts.questions || [];
        this.create();
        this.bindEvents();
        this.render();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add(`${ID}_feedbackWrap`);
        element.setAttribute('data-position', this.position);
        element.innerHTML = `
            <input type="checkbox" id="${this.uniqueName}" name="${this.uniqueName}">
            <label for="${this.uniqueName}" class="${ID}_feedback__label" ${this.bgColor ? `style="background-color:${this.bgColor}"` : ''}>Feedback</label>
            <div class="${ID}_feedback__modalWrap">
                <div class="${ID}_feedback__modal">
                    <header class="${ID}_feedback__modalHeader" 
                    ${this.bgImage ? `style="background-image:url('${this.bgImage}')" data-bgimage="true"` : ''}
                    ${this.bgColor ? `style="background-color:${this.bgColor}" data-bgcolor="true"` : ''}
                    >
                        ${this.logo ? `<img src="${this.logo}" class="${ID}_feedback__logo" alt="">` : ''}
                        ${this.title ? `<h2 class="${ID}_feedback__title">${this.title}</h2>` : ''}
                        <label for="${this.uniqueName}" class="${ID}_feedback__label" data-icon="close">Close Modal</label>
                    </header>
                    <!--End Header-->
                    <div class="${ID}_feedback__modalBody">
                        ${this.mode === 'modal' ? builder(this.mode, this.content) : builder(this.mode, this.questions)}
                    </div>
                    <!--End Body-->
                    <footer class="${ID}_feedback__modalFooter">
                        powered by <a href="https://www.userconversion.com/" target="_blank">@user conversion</a>
                    </footer>
                </div>
            </div>
        `;
        this.component = element;
    }

    bindEvents() {
        const sendButton = this.component.querySelector(`.${ID}_feedback__button`);
        const feedbackScores = this.component.querySelectorAll(`.${ID}_feedback__radio`);
        const clientName = this.component.querySelector(`.${ID}_feedback__form`).getAttribute('data-client-name');
        const comment = this.component.querySelector(`.${ID}_feedback__textArea`).value;
        let curScore;
        sendButton.addEventListener('click', function (e) {
            e.preventDefault();
            [].forEach.call(feedbackScores, function (score) {
                if (score.checked) {
                    curScore = score.getAttribute('data-score');
                }
            });
        });
    }

    render() {
        document.querySelector(this.target).insertAdjacentElement(this.injectPosition, this.component);
    }
}
