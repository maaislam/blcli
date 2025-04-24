const howDoesItWork = (id) => {
    const htmlStr = `<div class="${id}__how-does-it-work_container">
                        <div class="${id}__how-does-it-work_wrapper container">
                            <div class="${id}__how-does-it-work_title">How does it work</div>
                            <div class="${id}__how-does-it-work_content">
                                <div class="${id}__content_wrapper">
                                    <img src="https://content.specsavers.com/sib/content-pages/img/split/dispense-step1-SIB-asset02-960x700.jpg"></img>
                                    <div class="${id}__content_details">
                                        <span>Step 1</span>
                                        <p>One of our dispensing opticians will check that your prescription is less than two years old – it’s not valid if it’s older than that. They’ll also talk you through lens options and our latest in-store offers.</p>
                                    </div>
                                </div>
                                <div class="${id}__content_wrapper">
                                    <img src="https://content.specsavers.com/sib/content-pages/img/split/dispense-step2-SIB-asset02-960x700.jpg"></img>
                                    <div class="${id}__content_details">
                                        <span>Step 2</span>
                                        <p>A frame stylist will now help you choose your perfect pair. We’ve got hundreds to suit all shapes, tastes and pockets, so try as many as you like.
                                        </p>                                       
                                        <p>Before your visit you can also browse our latest frames online, virtually try them on, and create a list of your favourites on your mobile device to bring to your appointment.</p>
                                        <div class="${id}__browse_online_btn">
                                            <a href="https://www.specsavers.co.uk/glasses/my-favourite-glasses">Browse glasses online</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="${id}__content_wrapper">
                                    <img src="https://content.specsavers.com/sib/content-pages/img/split/dispense-step3-SIB-asset02-960x700.jpg"></img>
                                    <div class="${id}__content_details">
                                        <span>Step 3</span>
                                        <p>We’ll take all the measurements we need to tailor your new glasses to your prescription and face shape. With a perfect fit in place, we’ll complete your purchase and order your glasses. You’ll leave the store with an appointment to collect them.All you’ve got to do now is count down the days to your shiny new glasses.</p>
                                        <div class="${id}__appointment_btn">
                                            <a href="https://www.specsavers.co.uk/book/location">Book your buy & fit appointment</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>`;
  
    return htmlStr.trim();
  };
  export default howDoesItWork;
  