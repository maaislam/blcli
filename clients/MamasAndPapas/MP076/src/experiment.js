import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as content from './lib/MP076-html';

const MP076 = (() => {
    let $ = null;
    
	const activate = () => {
		document.body.classList.add('MP076');

		const pageWrapper = document.getElementById('page'),
    topBanner = document.querySelectorAll('.yCmsComponent.home-banner')[1];
    //insert the new banner
		const homepageBanner = document.createElement('div');
		homepageBanner.classList.add('MP076-homepageBanner');
		homepageBanner.innerHTML = `<span class="MP076-exit">&times;</span>
		<div class="MP076-innerQuestion"></div>
		<div class="MP076-error"></div>`;
		if(!localStorage.getItem('MP076-banner_removed')){
			pageWrapper.insertBefore(homepageBanner,topBanner.nextElementSibling);
		}

		const exitButton = document.querySelector('.MP076-exit');
		exitButton.addEventListener('click', () => {
			document.querySelector('.MP076-homepageBanner').remove();
			localStorage.setItem('MP076-banner_removed',1);
			utils.events.send('MP076', 'Click', 'MP076 user removed the banner', {sendOnce: true});
		});

		//add the questions
		const innerBanner = homepageBanner.querySelector('.MP076-innerQuestion');
		innerBanner.innerHTML = content.firstQuestion;

		//Click the parent type buttons
		const parentButtons = document.querySelectorAll('.MP076-buttons span');
		for(let i = 0; i < parentButtons.length; i++) {
			parentButtons[i].addEventListener('click', (e) => {
				//remove active from one of the buttons
				for(let j = 0; j < parentButtons.length; j++) {
					parentButtons[j].classList.remove('MP076-button_active');
				}
				//add active to button clicked
				e.currentTarget.classList.add('MP076-button_active');
			});
		}

		//on next click save the parent type
		const nextButton = document.querySelector('.MP076-next');
		const errorMessage = document.querySelector('.MP076-error');

		//poll for the parent choice button to be active
		UC.poller(['.MP076-button_active'], () => {
			const parentType = document.querySelector('.MP076-button_active');

			nextButton.addEventListener('click', () => {
				const selectedChoice = parentType.textContent;
				localStorage.setItem('MP076-type',selectedChoice);
				innerBanner.innerHTML = content.secondQuestion;

				//change the next title to be shown by button clicked
				const nextQuestionTitle = document.querySelector('.MP076-date'),
				datePicked = document.querySelector('.MP076-dateContent');
				if(selectedChoice === 'Parent'){
					nextQuestionTitle.textContent ='Enter your childs birthday';
					datePicked.innerHTML = content.childAge;
				}else{
					nextQuestionTitle.textContent ='Enter your little ones due date?';
					datePicked.innerHTML = content.dueDate;
				}
			});
		});

		//poll of for the second question to exist
		UC.poller(['.MP076-question2'], () => {
			const enterClick = document.querySelector('.MP076-enter');
			enterClick.addEventListener('click', () => {
        const titleText = localStorage.getItem('MP076-type');
        window.scroll(0,0);
				
				//get the date entered
				const dayEntered = document.querySelector('.MP076-day').value,
				monthEntered = document.querySelector('.MP076-month').value,
				yearEntered = document.querySelector('.MP076-year').value;
			
				//check if the date is before or after today
				const dateEntered = new Date(yearEntered + '-' + monthEntered + '-' + dayEntered);
				const d = new Date();

				let ajaxURL,
				headerClass,
        linkTitle,
        buttonOne,
        buttonOneLink,
        buttonTwo,
        buttonTwoLink,
        buttonThree,
        buttonThreeLink;

				//if the user is a parent
				if(localStorage.getItem('MP076-type') === 'Parent'){
					localStorage.setItem('MP076-childAge',dayEntered + '-' + monthEntered + '-' + yearEntered);
					if(d < dateEntered && dayEntered != 'dd'){
						errorMessage.classList.add('MP076-errorShowing');
						errorMessage.textContent = 'Date must be before today';
					}else{
						if(errorMessage.classList.contains('MP076-errorShowing')){
							errorMessage.classList.remove('MP076-errorShowing');
						}
						headerClass = 'MP076-parent';
						ajaxURL = 'https://www.mamasandpapas.com/en-gb/homepage-clothing';
						//change the banner to the thanks banner
						innerBanner.innerHTML = content.finalQuestion;
						buttonOne = 'Shop Clothing',
            buttonOneLink = 'https://www.mamasandpapas.com/en-gb/homepage-clothing';
            buttonTwo = 'Shop Toys',
            buttonTwoLink = 'https://www.mamasandpapas.com/en-gb/c/playtime';
            buttonThree = 'Shop Gifts';
            buttonThreeLink = 'https://www.mamasandpapas.com/en-gb/homepage-gifts';
						utils.events.send('MP076', 'Click', 'MP076 user submitted childs DOB', {
							sendOnce: true
						});
					}
					
				}else{ //if the user is a parent to be
					localStorage.setItem('MP076-dueDate',dayEntered + '-' + monthEntered + '-' + yearEntered);
					if(d > dateEntered && dayEntered != 'dd'){
						errorMessage.classList.add('MP076-errorShowing');
						errorMessage.textContent = 'Date must be after today';
					}else{
						if(errorMessage.classList.contains('MP076-errorShowing')){
							errorMessage.classList.remove('MP076-errorShowing');
						}
						utils.events.send('MP076', 'Click', 'MP076 user submitted due date', {
							sendOnce: true
						});
						//change the banner to the thanks banner
						innerBanner.innerHTML = content.finalQuestion;
						const dueDate = new Date(dateEntered);
						const difference = dueDate - d;
						const days = (difference / (60*60*24*1000)).toFixed(2);

            let trimester;
						if(days < 91){ //trimester 3
							trimester = 3;
							headerClass = 'MP076-newHeader-trimester3';
							ajaxURL = 'https://www.mamasandpapas.com/en-gb/homepage-clothing';
							buttonOne = 'Shop Equipment',
              buttonOneLink = 'https://www.mamasandpapas.com/en-gb/pushchairs-prams';
              buttonTwo = 'Shop Clothing',
              buttonTwoLink = 'https://www.mamasandpapas.com/en-gb/homepage-clothing';
              buttonThree = 'Shop Toys';
              buttonThreeLink = 'https://www.mamasandpapas.com/en-gb/discover';
						}else if(days > 92 && days < 182){ //trimester 2
							trimester = 2;
							headerClass = 'MP076-newHeader-trimester2';
							ajaxURL = 'https://www.mamasandpapas.com/en-gb/homepage-travel';
							buttonOne = 'Shop Pushchairs',
              buttonOneLink = 'https://www.mamasandpapas.com/en-gb/pushchairs-prams';
              buttonTwo = 'Shop Furniture',
              buttonTwoLink = 'https://www.mamasandpapas.com/en-gb/homepage-nursery';
              buttonThree = 'Discover';
              buttonThreeLink = 'https://www.mamasandpapas.com/en-gb/discover';
						}else if(days > 183){ //trimester 1
							trimester = 1;
							headerClass = 'MP076-newHeader-trimester1';
							ajaxURL = 'https://www.mamasandpapas.com/en-gb/homepage-nursery';
              buttonOne = 'Shop Pushchairs',
              buttonOneLink = 'https://www.mamasandpapas.com/en-gb/pushchairs-prams';
              buttonTwo = 'Shop Clothing',
              buttonTwoLink = 'https://www.mamasandpapas.com/en-gb/homepage-clothing';
              buttonThree = 'Discover';
              buttonThreeLink = 'https://www.mamasandpapas.com/en-gb/discover';
						}
					}	
				}
        const currentBanner = topBanner.querySelector('.header.container-fluid');
        topBanner.classList.add(headerClass);
        currentBanner.removeAttribute('style');
				currentBanner.classList.add(headerClass);

				//change the text
				const currentBannerText = currentBanner.querySelector('.col-md-6.text-white .py-7');
				currentBannerText.classList.add('MP076-newText');
        currentBannerText.innerHTML = `<div class="MP076-bannerText">
          <h1>Title here</h1>
          <hr class="MP076-hr">
          <p>subtitle text here</p>
          <div class="MP076-button">
            <a href="${buttonOneLink}">${buttonOne}</a>
            <a href="${buttonTwoLink}">${buttonTwo}</a>
            <a href="${buttonThreeLink}">${buttonThree}</a>
          </div>
        </div>`;
			});
		});

	}

// Audience conditions
const triggers = ((options) => {
	UC.poller([
		'body',
	], () => {
	utils.fullStory('MP076', 'Variation 1');
	activate();
	});
	})();

})();
