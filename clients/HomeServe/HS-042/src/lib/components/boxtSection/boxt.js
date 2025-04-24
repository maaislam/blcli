import { boxtImage } from '../../assets/icons';

export const boxt = (id) => {
  const html = `
    <div class="${id}__boxtConatiner">
        <div class="row ${id}__boxt">
            <div class="col card-left-container">
                <div class="boxt-image" style="background-image: url(&quot;https://www.homeserve.co.uk/-/media/heating/homepage-newboiler/boxt-house.png?bc=transparent&amp;db=web&amp;h=130&amp;thn=1&amp;w=130&quot;);"></div>
            </div>
            <div class="col card-right-container">
                <h2>Need a new boiler? HomeServe and BOXT have you covered</h2>
                <p class="first-subheading">When it comes to choosing a new boiler, we know how important it is to get it right. That’s why HomeServe and BOXT are working together – combining over 30 years’ home assistance experience with one of the largest boiler installation companies in the UK – we'll help you get the best boiler for your home and your budget.</p>
                <p class="second-subheading">Plus, HomeServe customers also get an exclusive £200 off*1. To find out more, call BOXT on <a href="tel:08001937777" class="phone">0800 193 7777</a> or click the links below.</p>
                <div class="${id}__buttons">
                    <a class="${id}__buttons-boxt" href="https://www.boxt.co.uk/boilers?utm_source=homeserve&utm_medium=partnership&utm_campaign=homeserve_customer&promo=p1jozfkw9t">Get a quote from BOXT</a>
                    <a class="${id}__buttons-learn" href="/heating">Learn more about BOXT</a>
                </div>
            </div>
        </div>
    </div>
  `;
  return html.trim();
};

export default boxt;
