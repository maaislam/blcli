import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID } = shared;

export default class DealBuilder {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }
  create() {
    const element = document.createElement("div");
    element.classList.add(`${ID}-dealBuilder`);
    element.classList.add('show');
    element.innerHTML = `
    <div class="${ID}-close"></div>
    <div class="${ID}-container">
      <div class="${ID}-header">
        <h3>Make it a deal</h3>
        <p>Mix & match with 3 for 2 on selected No7 products. </p>
      </div>
      <div class="${ID}-amountAdded"></div>
      <div class="${ID}-products">   
        <div class="${ID}-product first no-product">
          <span class="${ID}-question">?</span>
          <a class="${ID}-cta" href="https://www.boots.com/no7-shop-all#facet:-1050494951535058513210211111432503211111032115101108101991161011003278111553265103101326810110212110511010332831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&">Add to deal</a>
        </div> 
        <span class="plus"></span>
        <div class="${ID}-product second no-product">
          <span class="${ID}-question">?</span>
          <a class="${ID}-cta" href="https://www.boots.com/no7-shop-all#facet:-1050494951535058513210211111432503211111032115101108101991161011003278111553265103101326810110212110511010332831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&">Add to deal</a>
        </div> 
        <span class="plus"></span>
        <div class="${ID}-product third no-product">
          <span class="${ID}-question">?</span>
          <a class="${ID}-cta" href="https://www.boots.com/no7-shop-all#facet:-1050494951535058513210211111432503211111032115101108101991161011003278111553265103101326810110212110511010332831071051109997114101324532991041019711210111511632102114101101&productBeginIndex:0&orderBy:&pageView:grid&minPrice:&maxPrice:&pageSize:&">Add to deal</a>
        </div> 
      </div>
    </div>
    
  `;
    this.component = element;
  }
  bindEvents() {
    const { component } = this;

    component.querySelector(`.${ID}-close`).addEventListener("click", () => {
      component.remove();
      document.documentElement.classList.remove(`${ID}-noScroll`);
      document.querySelector(`.${ID}-overlay`).classList.remove("show");
    });

    document.querySelector(`.${ID}-overlay`).addEventListener("click", () => {
      component.remove();
      document.documentElement.classList.remove(`${ID}-noScroll`);
      document.querySelector(`.${ID}-overlay`).classList.remove("show");
    });

    const allAddToDeals = component.querySelectorAll(`.${ID}-cta`);
    for (let index = 0; index < allAddToDeals.length; index += 1) {
      const element = allAddToDeals[index];
      element.addEventListener("click", () => {
        fireEvent('Clicked add to deal CTA');
      });
    }

  }
  render() {
    const { component } = this;
    document.body.appendChild(component);
  }
}
