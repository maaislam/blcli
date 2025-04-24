export const TG010eform = `
<div class="TG010e-overlay"></div>
<div class="TG010e_form"> 
<div class="TG010e-exit">&times;</div>
  <form action="https://www.technogym.com/gb/contacts/index/post/" method="post">
  <div class="TG010e-product_image"></div>
    <input type="hidden" name="form_key" class="TG010e-key" value="" data-gaconnector-tracked="true>
    <input type="hidden" name="reason" id="reason" value="catalogue">
    <input type="hidden" class="TG010e-url" name="catalog-url" value="">
    <input type="hidden" name="product" id="product" title="Product" class="TG010e-productVal" value="">
    <input name="product-name" id="product-name" title="Product Name" value="" type="hidden">
    <div class="TG010e-block TG010e-downloadBox TG010e-block_active TG010e-detailsBox">
      <h3>Want some more information?</h3>
      <p>Download our FREE <span></span> catalogue</p>
      <span class="TG010e-strapline"></span>
      <div class="TG010e-input">
        <input name="email" id="email" title="Email" value="" type="text" placeholder="Email Address*">
      </div>
      <div class="TG010e-next">
        <span>Continue</span>
      </div>
     
    </div>
    <div class="TG010e-block">
      <p>Please provide a few more details to help us understand you a bit more</p>
      <div class="TG010e-input">
        <input name="name" id="name" title="First Name" value="" type="text" placeholder="First Name*">
      </div>
      <div class="TG010e-input">
        <input name="last-name" id="last-name" title="Last Name" value="" type="text" placeholder="Last Name*">
      </div>
      <div class="TG010e-optional">
        <input name="telephone" id="telephone" title="Phone" value=""  type="number" placeholder="Phone Number (optional)">
      </div>
      <div class="TG010e-type">
        <div class="TG010e-reason TG010e-type_active">
          <div class="TG010e-private">
            <span>Personal Use</span>
            <input name="profile" id="private" title="Private individual" value="private_individual" type="radio">
            <input name="need-private" id="private" title="need-private" value="" type="hidden">
          </div>
        </div>
        <div class="TG010e-reason">
          <div class="TG010e-business">
            <span>Business Use</span>
            <input name="profile" id="business" title="Business" value="business" class="input-radio validation-passed" type="radio"">
            <input name="need-business" title="need-business" value="" type="hidden">
          </div>
        </div>
      </div>
      <div class="TG010e-submit_fake button"><span>Request a catalogue</span></span></div>
      <button class="TG010e-submitButton" type="submit" title="Send" class="button"><span><span>Request a catalogue</span></span></button>
    </div>
    
    <div class="TG010e-dots">
      <div class="TG010e-dot TG010e-dot_active"></div>
      <div class="TG010e-dot"></div>
    </div>
    <div class="TG010e-loading">
      <img src="//cdn.optimizely.com/img/8355110909/4a1cb67f2a7c49e69fdd8a3a2b4f6a4c.gif">
    </div>
  </form>
</div>`;
export default TG010eform;
