import shared from '../../../../../core-files/shared';
const { ID } = shared;

export const getTickBoxSVG = (color) =>
  `<svg style="color:${color}" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" class=""></path></svg>`;

export const renderSingleItemReduce = (acc, currentStep) =>
  acc +
  `
 <div class="${ID}-item-wrapper">
	 ${
     currentStep.premiumText
       ? `<div class="${ID}-premium-item-step" style="background:${currentStep.color}">${currentStep.premiumText}</div>`
       : `<div class="${ID}-premium-item-step-placeholder"></div>`
   }
	 <div class="${ID}-item">
		 <img src="${currentStep.image}" class="${ID}-item__img"></img>
		 ${
       currentStep.freeMonthsText
         ? `<p class="${ID}-item__free-months" style="background:${currentStep.color}">${currentStep.freeMonthsText}</p>`
         : ''
     }
		 <h4 class="${ID}-item__name">${currentStep.name}</h4>
		 ${
       currentStep.nameBelowText
         ? `<p class="${ID}-item__name-below-text">${currentStep.nameBelowText}</p>`
         : ''
     }
		 <p class="${ID}-item__price" style="color:${currentStep.color}">${
    currentStep.priceBefore
      ? `<span class="${ID}-item__price--before">${currentStep.priceBefore}</span>`
      : ''
  } ${currentStep.price}</p>
		 ${
       currentStep.priceBelowText
         ? `<p class="${ID}-item__price-below-text">${currentStep.priceBelowText}</p>`
         : ''
     }
     ${
       currentStep.aboveDescriptionCopy
         ? `<p class="${ID}-item__above-description-copy">${currentStep.aboveDescriptionCopy}</p>`
         : ''
     }
		 <div class="${ID}-item__descriptions">
			 ${currentStep.descriptions.reduce(
         (acc, currentDescription) =>
           acc +
           `
				 <div class="${ID}-item__descriptions--single">
					<div class="${ID}-item__descriptions--single-svg">
						${getTickBoxSVG(currentStep.color)}
					</div>
					<p class="${ID}-item__descriptions--single-text">${currentDescription}</p>
				 </div>
			 `,
         ``
       )}
		 </div>
		 ${
       currentStep.descriptionsBelowText
         ? `<p class="${ID}-item__descriptions-below-text">${currentStep.descriptionsBelowText}</p>`
         : ''
     }
		 ${
       currentStep.tvImages?.length
         ? `<div class="${ID}-item__images"
          onclick="document.querySelector('#options').__vue__.$root.$options.methods.changePackage('${
            currentStep.name
          }', ${currentStep.id > 3 ? "'Internet-TV'" : null})"
          data-toggle="modal" data-target="#modal-channels" data-package="${
            currentStep.name
          }">
			 ${currentStep.tvImages.reduce(
         (acc, currentTvImage) =>
           acc +
           `<img class="${ID}-item__images--single" src=${currentTvImage}></img>`,
         ``
       )}
		 </div>`
         : ''
     }
		 <button class="${ID}-item__cta" data-url="${
    currentStep.ctaUrl ? currentStep.ctaUrl : ''
  }" data-itemid="${currentStep.id}">${currentStep.ctaText}</button>
	 </div>
 </div>
`;
