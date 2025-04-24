import { makeCalaimIcon, telephoneIcon } from '../../assets/icons';

const claimComponent = (id) => {
  const html = `
    <div class="${id}__claimComponent"> 
        <div class="${id}__container"> 
            <div class="text-section">  
                <h1>Claim online in a matter of minutes</h1>  
                <p>If you're a HomeServe policy holder you can book one of our Home Experts through your My HomeServe account. Alternatively, give us a call and we'll be happy to help.</p>  
            </div>  
            <div class="button-section">  
                <div class="claimWrapper">
                    <h2>
                        <span>
                            ${makeCalaimIcon}
                        </span>
                        Make a claim online
                    </h2>  
                    <div class="${id}__buttons">
                        <a class="${id}__buttons-claim" href="/uk/LoggedIn/claims-proxy">Make a claim</a>
                        <a class="${id}__buttons-account" href="/customer">Create an account</a>
                    </div>
                </div>
                <div class="infoWrapper">
                    <h2>
                        <span>
                            ${telephoneIcon}
                        </span>
                        Speak to us
                    </h2>  
                    <p>Our lines are open 24/7, 365 days a year</p>  
                    <div class="contact-info">  
                        <p>By Phone <a href="tel:03300247002" class="phone">0330 0247 002*</a></p>  
                        <p>By Textphone <a href="tel:1800103300247999" class="textphone">18001 0330 0247 999</a></p>  
                    </div> 
                </div>     
            </div>  
        </div>
    </div>  
  
  `;
  return html.trim();
};

export default claimComponent;
