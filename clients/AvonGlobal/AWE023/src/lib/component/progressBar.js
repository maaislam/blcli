import { stepMark } from '../assets/svg';

const progressBar = (ID, totalAmount) => {
  const htmlStr = `
    <div class="${ID}__basketUpsellSection">
        <p class='${ID}__sampleText'>Scegli il tuo campioncino</p>
        <p id="message" class='${ID}__message'>Ti mancano ${totalAmount}€ per sbloccare la spedizione gratuita.</p>
        <div id="progressBar">
            <div class="stepMark" style="left: 50%;">${stepMark}</div>
            <div class="stepMark" style="left: 78%;">${stepMark}</div>
            <div class="stepMark" style="left: 100%; transform: translateX(-100%);">${stepMark}</div>
            <div id="progress"></div>
            <div class="stepMarkTop" style="left: 50%;">25€</div>
            <div class="stepMarkTop" style="left: 78%;">39€</div>
            <div class="stepMarkTop" style="left: 100%; transform: translateX(-100%);">50€</div>
        </div>
    </div> 
    `;

  return htmlStr;
};
export default progressBar;
