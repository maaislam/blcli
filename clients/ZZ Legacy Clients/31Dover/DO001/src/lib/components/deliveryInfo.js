import { currentDelCost } from '../currentDelCost';


export const deliveryInfo = (ref, pos) => {
  console.log('current del vost ', currentDelCost());
  if (!ref) return;

  const cost = currentDelCost() ? currentDelCost() : '79';

  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <section class="DO001-deliverInfo">
      <h4>DELIVERY &amp; Returns</h4>
      <span class="truck">
        <img src="https://storage.googleapis.com/ucimagehost/do001/bluenextday.png" alt="Delivery truck"/>
      </span>
      <p><span>FREE DELIVERY</span> on all orders over £${cost}</p>
      <p><span>OR</span></p>
      <p>Next day delivery (£5.95)</p>
      <p>Nominated day delivery (£5.95)</p>


      <span class="tick">
        <img src="https://storage.googleapis.com/ucimagehost/do001/ribbontick.png" alt="Tick"/>
      </span>

      <p>We think you'll be thrilled with your drinks from 31Dover, but if there's anything you're not 100% happy with - you can have your money back</p>
      <a href="/returns">FIND OUT MORE</a>
    </section>
  `);
}