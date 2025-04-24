import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import type from "./helpers";

const { ID } = shared;

export default class SignUpBanner {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.className = `${ID}_parentingSignUp gigya-layout-cell responsive`;
      element.innerHTML = `
        
       <div class="${ID}-container">
       <div class="${ID}-logo"></div>
        <div class="${ID}-title">
            <h2>${type == 'Register' ? 'Register for a Boots Advantage Card' : 'Sign up to Boots parenting Club'}</h2>
            <p>Parenting Club is exclusive to Boots Advantage Card holders. You must have an Advantage Card before you join parenting Club.</p>
        </div>
        <div class="${ID}-innerContent">
            <p>${type == 'Register' ? 'Join today and receive a <b>FREE</b> Limited Edition Aveeno Baby Daily Care & Body Wash' : 'Join today and receive a <b>FREE</b> Limited Edition Aveeno Baby Daily Care Hair & Bodywash 500ml'}</p>    
            <div class="${ID}-container">
                <div class="${ID}-image">
                  <div class="${ID}-badge"><span>Free gift</span></div>
                </div>
                <div class="${ID}-content">
                    <ul>
                        <li>8 points per £1 on baby products*</li>
                        <li>Free gifts at key stages of your baby's development.</li>
                        <li>Expert Parenting advice.</li>
                        <li>Parenting club offers via the Boots app.</li>
                    </ul>
                </div>
              </div>
              <div class="${ID}-buttons">
                <div class="${ID}-signUpRow">
                  <p>Don’t have an Advantage Card?</p>
                  <a class="${ID}-signUp">Sign up now</a>
                </div>
                <div class="${ID}-loginUpRow">
                  <p>Already have an Advantage Card?</p>
                  <a class="${ID}-login">Sign up to parenting Club now</a>
                </div>
              </div>
          </div>
       </div>
      `;
      this.component = element;
    }
  
    bindEvents() {
      const { component } = this;

      const scrollToElement = (element) => {
        window.scroll({
          behavior: 'smooth',
          left: 0,
          top: element.getBoundingClientRect().top + window.scrollY - 10,
        });
      }

      component.querySelector(`.${ID}-signUp`).addEventListener('click', () => {
          if(type === 'register') {
            fireEvent('Clicked sign up for advantage card');
            document.querySelector('#gigya-login-form .boots-button-secondary.boots-register').click();
          } else {
            fireEvent('Clicked sign up for parenting club');
            window.location.href = 'https://www.boots.com/JoinClub?club=parentingclub&storeId=11352';
          }
      });

      component.querySelector(`.${ID}-login`).addEventListener('click', () => {
        const login = document.querySelector('#gigyaLoginDiv_content .gigya-login-form .gigya-layout-row.with-divider .gigya-layout-cell.responsive.with-social-login');
        if(login) {

          login.classList.add('elActive');
          scrollToElement(login);
        }
         
      });
      
    }
  
    render() {
      const { component } = this;
      if(type === 'register') {
        document.querySelector('#gigya-login-form .gigya-layout-cell.with-site-login').insertAdjacentElement('beforebegin', component);
      } else {
        document.querySelector('.my_account_header').parentNode.insertAdjacentElement('afterend', component);
      }
      
    }
  }
