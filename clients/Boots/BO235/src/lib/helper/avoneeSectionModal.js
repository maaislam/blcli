import icon from "../assets/icon";
import links from "../assets/links";
import shared from "../../../../../../core-files/shared";

const { avoneeLong, avoneeLongShort, avoneePDP, hero_cta } = links;
const { cross } = icon;
const { ID } = shared;
export const avoneeSectionModal = () => `<div class="${ID}-avoneeSectionModal">
<div class="${ID}-avoneeSectionModal-overlay"></div>
<div class="${ID}-avoneeSectionModal-wrapper">
    <div class="${ID}-avoneeSectionModal-crossButton"><a href="javascript:void(0)">${cross}</a></div>
    <div class="${ID}-avoneeSectionModal-imagePrimary">
        <img class="image-bigScreen" src="${avoneeLong}"/>
        <img class="image-smallScreen" src="${avoneeLongShort}"/>
    </div>
    <div class="${ID}-avoneeSectionModal-textContent">
        <h2 class="${ID}-avoneeSectionModal-textContent-heading">AVEENO® Baby Daily Care Gentle Bath & Wash</h2>
        <div class="${ID}-avoneeSectionModal-textContent-ctas">
            <a href="${hero_cta}" class="join-now-cta">JOIN TODAY</a>
            <a href="${avoneePDP}" class="product-details-cta">PRODUCT DETAILS</a>
        </div>
        <p class="${ID}-avoneeSectionModal-textContent-bodyContent">
            <span class="bodyContent-heading">Terms and conditions:</span>
            <span class="bodyContent-text-wrapper">
                <span class="bodyContent-text">
                    8 points per £1 on baby products is available on products in the baby area. Boots reserves the right to determine which products should be in this offer and it excludes infant milks (up to six months), prescriptions and gift vouchers/cards.
                </span>
                <span class="bodyContent-text">
                    *Sign up to Boots Parenting Club between Saturday 1 October and Monday 31 October to be in with a chance to win your basket of Mothercare items to the value of £150.00. All customers who sign up to Boots Parenting Club in October will be automatically entered into the draw. To opt out of being entered into this competition please contact clubs.competitions@boots.co.uk. Purchase not necessary. You must be aged 18+ and a resident in the UK and eligible to sign up to Boots Parenting Club. Employees and the immediate family of Boots UK Limited, their agents, or anyone professionally connected with this prize are ineligible to enter. You must still be a member of Parenting Club with a valid linked email address at the beginning of November to be in with a chance of winning. The winner will be randomly selected after Monday 14 November 2022. One entry per person and per email address.  Responsibility will not be accepted for the loss, delay or corruption of any product in transit, or in the incomplete nature of any entries to the prize draw. Prizes cannot be exchanged for a cash alternative. The winner will be notified by Friday 18 November 2022. The winner will be notified by email. This must be acknowledged by the winner, by email, within 72 hours. Failure to respond to this email means an alternative winner and runners up will be selected from all valid entries received. Please make sure your email address is on your boots.com account. Responsibility will not be accepted for the loss, delay or any damage to prizes while being delivered.  Entrants will be deemed to have accepted these rules and to agree to be bound by them. The judge’s decision is final. No correspondence will be entered into. The promoter of the prize draw is Boots UK Limited, 1 Thane Road, Nottingham NG90 1BS. The promoter will, on request, make available details of winner (surname and county of residence). If you object to your surname and county being made available on request in the event of winning, you must notify the promoter by contacting boots.customercare_team@boots.co.uk. The winners details will be obtained from Boots database. For a list of prize winners, please write to boots@winnerslist.co.uk after Monday 31 October 2022.
                </span>
                <span class="bodyContent-text">
                    **Free gifts are subject to availability. To redeem, Parenting Club members must download the Boots app and activate the offers. Please allow up to three weeks for offers to be visible in the app. Free gifts can be redeemed in store only. One item per customer. While stock lasts. Subject to availability.
                </span>
            </span>
      </p>
    </div>
</div>
</div>
`;
