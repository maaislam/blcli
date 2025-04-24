import { closeSVG } from '../assets/icons';

const gifitingModal = (ID) => {
  const html = `
    <div class="${ID}-ways-to-pay-slide" data-model="gifting">
      <div class="${ID}-ways-to-pay-slide-close">
        ${closeSVG}
      </div>
      <div class="${ID}-ways-to-pay-slide-content">
        <h2>Luxury Gifting</h2>
        <p class="${ID}-following-options">We know the importance of making every detail perfect. Add a final flourish to your chocolate gifts with elegant gift bags, complimentary chocolate box gift sleeves and more.</p>
        
        <div class="${ID}-payment-options">
          <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/personal-message.png">
          <div class="${ID}-brief">
          <h3 class="${ID}-sub-heading">Personalised Message</h3>
          <p class="${ID}-following-options">Witty or sentimental. Complimentary or congratulatory. You choose the words, we’ll provide the means, courtesy of a message card. They’re complimentary with every online order and there’s space for up to 200 characters (that’s about 30 words).A gift message option is available at checkout.</p><br><span class="${ID}-free">Free<span>
         </div>
        
        </div>
            <div class="${ID}-payment-options">
          <div class="${ID}-brief">
          <h3 class="${ID}-sub-heading">Signature Gift Bag and Box</h3>
          <p class="${ID}-following-options">Ensure your gifts arrive in style by choosing to present them in a chic, ribbon-tied box or bag. Simply select one of these options at checkout.<br><ul><li style="margin-bottom:0px;">Gift Bag: £3.00</li><li>Gift Box: £5.00</li></ul></p>
          </div>
          <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/git-box.png" alt="git-box">
         
        </div>
    

        <div class="${ID}-payment-options">
         <img  src="https://assets-manager.abtasty.com/deb3630b862e6561a9786af7a3f94baf/gift-card.png" alt="gift-card">
         <div class="${ID}-brief">
          <h3 class="${ID}-sub-heading">Gift Cards</h3>
          <p class="${ID}-following-options">Need something last-minute or not sure what they'd like? Send a Hotel Chocolat gift card, either through the post or instantly via email.<br><a target="_blank" href="https://www.hotelchocolat.com/uk/gift-card.html"><u>Explore Gift Card Options</u></a></p>
          </div>
          
        </div>

        <div class="${ID}-payment-options">

        </div>
        
        
        </div>
        <div class="${ID}-continue-shopping">
          <a >return to shopping bag</a>
        </div>
    </div>`;

  return html.trim();
};

export default gifitingModal;
