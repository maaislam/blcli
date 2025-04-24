const colorBlock = (id, deviceType) => {

    const htmlStr = `
    <div class="${id}__colour-block-container ${deviceType}">
        <div class="${id}__colour-block">
            <div class="${id}__colour-block-inner">
                <div class="${id}__colour-block-header">
                    <p>The Glimmerstick: 2 Sold Every Minute*</p>
                </div>
                <div class="${id}__colour-block-body">
                    <div class="${id}__image-block">
                        <div class="main-image">
                            <img src="https://blcro.fra1.digitaloceanspaces.com/AV137/glimmerstick_image.jpg"
                                alt="Avon Glimmerstick Eyeliner" />
                        </div>
                        <div class="block-points">
                            <ul class="product-points">
                                <li class="point">Waterproof</li>
                                <li class="point">Smudge-proof</li>
                                <li class="point">Smooth-Glide</li>
                                <li class="point">Lasts all day</li>
                                <li class="point">Perfect Line work</li>
                                <li class="point">Itense colour</li>
                            </ul>
                        </div>
                    </div>
                    <div class="${id}__review-block">
                        <div class="main-review">
                            <div class="review-body">
                                <span class="make-strong">“Love this,</span> I’ve been using it for years. It stays on well
                                all day. I highly recommend. You’ll never want to change back to your old one.”
                            </div>
                            <div class="reviewer-name">-Teresa-</div>
                            <div class="review-cta">
                                <p class="review-btn">See more reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};

export default colorBlock;  