import shared from "../../../../../../core-files/shared";


const renderCartModal = () => {    
	//modal 
    const htmlStr = `
    <div class="${shared.ID}__delivery-modal">
		<div class="${shared.ID}__close-btn-wrapper">
			<button class="${shared.ID}__close-btn">CANCEL</button>
		</div>
		<div class="wrp wrp__modal atb__top ">
			<div class="inner">
				<div class="item-added bulk-saving-popup">
					<div class="row">
						<div class="lg-4 md-4 sm-hide cols">
							<div class="">
								<span class="icon-ok icon--round icon--big"></span>
							</div>
						</div>
						<div class="lg-19 lg-offset-0 md-19 md-offset-0 sm-22 sm-offset-1 cols">
							<div class="row" id="overlayGeneralText">
								
								<h2 tabindex="0">1 <span aria-hidden="true">x</span> DeWalt DCD796P2-GB 18V 2 x 5.0Ah Li-Ion XR Brushless Cordless Combi Drill added to basket <span class="h2">for delivery</span></h2>
											
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="lg-19 lg-offset-4 md-18 md-offset-4 sm-24">
							
						</div>
					</div>
					
					<div class="row">
						<div class="lg-19 lg-offset-4 md-18 md-offset-4 sm-24" id="overlayDeliveryDescription">
							<ul><li>Delivery available Next Day* (<a href="/help/delivery" target="_blank">restrictions apply</a>)</li>
							<li>Free weekday Delivery on orders over £50 </li></ul>
							<input id="collectionQuantity" type="hidden" value="">
							<input id="continueShoppingUrl" type="hidden" value="/">
							
							<div id="checkout_now" class="lg-10 md-12 sm12 cols">
								<button type="button" class="btn btn--lg btn--primary fill" id="checkout_now_btn">Checkout Now</button>
							</div>

							<div id="button" class="lg-10 md-12 sm12 cols">
								<button type="button" class="btn btn--lg btn--continue fill js--close-Lightbox" id="continue_button_btn">Continue shopping</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
      `;
	  //insert modal
    document.querySelector("body").insertAdjacentHTML('afterbegin', htmlStr);
	//add class to display overlay
	document.querySelector(`.${shared.ID}__overlay`).classList.add(`${shared.ID}__show-overlay`);
	
  };
  export default renderCartModal;
  