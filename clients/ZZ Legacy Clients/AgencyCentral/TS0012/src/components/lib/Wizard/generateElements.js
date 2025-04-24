import settings from '../../../lib/settings';

const {
    ID,
} = settings;

function generateElements(option, data){
    let content = '';
    let loop = '';
    switch(option){
        case 'steps':
            for(let i = 0; i < data; i += 1){
                loop += `
                <li class="${ID}_wizard__listItem ${i === 0 ? 'active' : ''}" 
                data-step="${i + 1}"
                tabindex="${i}" 
                role="button"
                data-bind-step="step-${i + 1}">Step ${i + 1}</li>
                <!--End Item-->
                `;
            }
            content += `
                <div class="${ID}_wizard__steps">
                    <ul class="${ID}_wizard__list">
                        ${loop}
                    </ul>
                </div>
            `;
            return content;
        case 'dots':
            for(let i = 0; i < data; i += 1){
                loop += `
                <li class="${ID}_wizard__listItem ${i === 0 ? 'active' : ''}" 
                data-dot="${i + 1}" 
                tabindex="${i}"
                role="button"
                data-bind-step="step-${i + 1}">Step ${i + 1}</li>
                <!--End Item-->
                `;
            }
            content += `
                <footer class="${ID}_wizard__footer">
                    <div class="${ID}_wizard__dots">
                        <ul class="${ID}_wizard__list">
                            ${loop}
                        </ul>
                    </div>
                </footer>
            `;
            return content;
        case 'wizard':
            for(let i = 0; i < data.length; i += 1){
                let curIndex = i;
                content += `
                <div class="${ID}_wizard__element ${i === 0 ? 'active' : ''}" data-step-id="step-${i + 1}">
                    ${data[i].headertitle ? `
                        <header class="${ID}_wizard__header">
                            <h4 class="${ID}_wizard__title">${data[i].headertitle}</h4>
                        </header>
                    ` : ''}
                    <div class="${ID}_wizard__elementBody">
                        ${data[i].bodycontent}
                    </div>
                    <footer class="${ID}_wizard__footer">
                        ${i === 0 ? `
                            <div class="${ID}_wizard__buttonWrap">
                                <div class="${ID}_wizard__button" role="button" data-target="step-${i + 2}">Next</div>
                            </div>
                            <!--End Button-->
                        ` : `
                            ${i === (data.length -1) ? `
                            <div class="${ID}_wizard__buttonWrap">
                                <div class="${ID}_wizard__button" role="button" data-target="step-${i + 1 - 1}">Prev</div>
                            </div>
                            <!--End Button-->
                            <div class="${ID}_wizard__buttonWrap">
                                <button class="${ID}_wizard__button">Submit</buton>
                            </div>
                            <!--End Button-->
                            ` : `
                            <div class="${ID}_wizard__buttonWrap">
                                <div class="${ID}_wizard__button" role="button" data-target="step-${i + 1 - 1}">Prev</div>
                            </div>
                            <!--End Button-->
                            <div class="${ID}_wizard__buttonWrap">
                                <div class="${ID}_wizard__button" role="button" data-target="step-${i + 2}">Next</div>
                            </div>
                            <!--End Button-->
                            `}
                        `}
                    </footer>
                </div>
                <!--End Element-->
                `;
            }
            return content;   
        default: 
        break;
    }
}

export default generateElements;