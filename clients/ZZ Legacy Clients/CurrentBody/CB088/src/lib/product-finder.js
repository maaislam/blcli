import config from '../lib/config.js';
import clarisonicHtml from '../html/product-finder/clarisonic.js';
import hairHtml from '../html/product-finder/hair.js';

const $ = window.jQuery;

export default class ProductFinder {
    /**
     * Constructor
     */
    constructor(testType, closeCallback, eventSender) {
        this.testType = testType;
        this.closeCallback = closeCallback;

        this.currentStep = 1;

        this.eventSender = eventSender;
    }

    /**
     * Helper get test type
     */
    getTestType() {
        return this.testType;
    }

    /**
     * Helper get current slide
     */
    getCurrentSlide() {
        return this.currentSlide;
    }

    /**
     * Build product finder
     */
    buildProductFinder() {
        let productFinderHtml = null;
        switch(this.getTestType()) {
            case 'clarisonic':
                productFinderHtml = clarisonicHtml;
                break;
            case 'hair':
                productFinderHtml = hairHtml;
                break;
        }

        if(!!productFinderHtml) {
            const pfElm = $(productFinderHtml);
            $('body').prepend(pfElm);
            this.productFinderElement = pfElm;
        }

        return this;
    }

    /**
     * Close product finder
     */
    closeProductFinder() {
        this.productFinderElement.removeClass('cb88-product-finder--active');

        if(typeof this.closeCallback === 'function') {
            this.closeCallback.call();
        }

        this.eventSender.send(null, 'did-close-product-finder', this.getCurrentSlide());
    }

    /**
     * Init product finder - brings into view
     */
    openProductFinder () {
        this.productFinderElement.addClass('cb88-product-finder--active');

        this.eventSender.send(null, 'did-open-product-finder', this.getTestType());

        this.currentSlide = 1;
    }

    /**
     * Record answer and move on to next slide
     */
    recordAnswer(answerElm) {
        $(answerElm).addClass('cb88-answer--chosen');
        $(answerElm).siblings().removeClass('cb88-answer--chosen');

        const curSlide = $(answerElm).parents('.cb88-product-finder__slide:first');

        // Move onto next slide
        const nextSlideIndex = parseInt(curSlide.attr('data-identifier'), 10) + 1;
        const nextSlide = this.goToSlide(nextSlideIndex);

        if(nextSlide.hasClass('cb88-product-finder__summary')) {
            this.buildSummarySlide();
        }
    };

    /**
     * Go to slide
     */
    goToSlide(targetSlideIndex) {
        const targetSlide = $(`.cb88-product-finder__slide[data-identifier=${targetSlideIndex}]`);

        // Hide all previous slides
        $('.cb88-product-finder__slide').removeClass('cb88-product-finder__slide--active');

        // Move onto target slide
        targetSlide.addClass('cb88-product-finder__slide--active');

        // Update header icons
        $('.cb88-product-finder__header-icon').removeClass('cb88-product-finder__header-icon--active');

        const targetIcon = $(`.cb88-product-finder__header-icon[data-identifier=${targetSlideIndex}]`);

        targetIcon.addClass('cb88-product-finder__header-icon--active');
        targetIcon.prevAll().addClass('cb88-product-finder__header-icon--active');

        this.currentSlide = parseInt(targetSlideIndex);

        return targetSlide;
    };

    /**
     * Helper generate recommended produc
     */
    generateRecommendedProduct(productLink, productImage, productName, productDesc, productPrice) {
        const productHtml = `
            <div class="cb88-product-finder__summary-product">
                <a class="cb88-product-finder__summary-product-image-wrap" href="${productLink}">
                    <img class="cb88-product-finder__summary-product-image" src="${productImage}" />
                </a>
                <a href="${productLink}" class="cb88-product-finder__summary-product-title">
                    ${productName}
                </a>
                <div class="cb88-product-finder__summary-product-desc cb88-max-width-2-5 cb88-mcenter">
                    ${productDesc}
                </div>
                <p class="cb88-product-finder__summary-product-price">
                    ${productPrice}
                </p>
            </div>
        `;

        return $(productHtml);
    };

    /**
     * Helper get all answers given for relevant questions
     */
    getAnswersGiven() {
        const answersGiven = [];
        $('.cb88-answer--chosen').each(function() {
            if(!$(this).hasClass('cb88-answer--unused')) {
                answersGiven.push($(this).attr('data-cb88-answer').trim());
            }
        });

        return answersGiven;
    };

    /**
     * Get additional 'perfect for' html, appends to mainProduct
     */
    getPerfectForHtml() {
        let perfectForHtml = null;

        if(this.getTestType() == 'clarisonic') {
            const slideSkinType = $('.cb88-product-finder__slide--3'),
                skinAnswerGivenElm = $('[data-cb88-question=3].cb88-answer--chosen'),
                skinAnswerGivenText = skinAnswerGivenElm.find('.cb88-answer__text').text().trim(),
                skinAnswerGivenImage = skinAnswerGivenElm.find('.cb88-answer__image').attr('src');

            const slideConcernType = $('.cb88-product-finder__slide--4'),
                concernAnswerGivenElm = $('[data-cb88-question=4].cb88-answer--chosen'),
                concernAnswerGivenText = concernAnswerGivenElm.find('.cb88-answer__text').text().trim(),
                concernAnswerGivenImage = concernAnswerGivenElm.find('.cb88-answer__image').attr('src');
            
            perfectForHtml = `
                <div class="cb88-product-finder__summary-product-perfect-for">
                    <strong>Perfect for:</strong>
                    <ul>
                        <li>
                            <img src="${concernAnswerGivenImage}">
                            ${concernAnswerGivenText}
                        </li>
                        <li>
                            <img src="${skinAnswerGivenImage}">
                            ${skinAnswerGivenText} skin
                        </li>
                    </ul>
                </div>
            `;

        } else if(this.getTestType() == 'hair') {
            const slideBodyArea = $('.cb88-product-finder__slide--2'),
                bodyAnswerGivenElm = $('[data-cb88-question=2].cb88-answer--chosen'),
                bodyAnswerGivenText = bodyAnswerGivenElm.find('.cb88-answer__text').text().trim(),
                bodyAnswerGivenImage = bodyAnswerGivenElm.find('.cb88-answer__image').attr('src');

            const slideSkinColour = $('.cb88-product-finder__slide--3'),
                skinColourAnswerGivenElm = $('[data-cb88-question=3].cb88-answer--chosen'),
                skinColourAnswerGivenText = skinColourAnswerGivenElm.find('.cb88-answer__text').text().trim(),
                skinColourAnswerGivenImage = skinColourAnswerGivenElm.find('.cb88-answer__image').attr('src');
            
            perfectForHtml = `
                <div class="cb88-product-finder__summary-product-perfect-for">
                    <strong>Perfect for:</strong>
                    <ul>
                        <li>
                            <img src="${bodyAnswerGivenImage}">
                            ${bodyAnswerGivenText}
                        </li>
                        <li>
                            <img src="${skinColourAnswerGivenImage}">
                            ${skinColourAnswerGivenText} skin
                        </li>
                    </ul>
                </div>
            `;
        }

        return perfectForHtml;
    }

    /**
     * Helper get CSV representation of config
     */
    getConfigCsv(type) {
        let answersMap = null;
        switch(type) {
            case 'clarisonic':
                answersMap = config.getClarisonic();
                break;
            case 'hair':
                answersMap = config.getHair();
                break;
        }

        let s = '"answers","main_product","main_product_link","secondary_product","secondary_product_link"\n';
        for(var k in answersMap) {
            s += `"${k}","${answersMap[k].productName}","${answersMap[k].productLink}","${answersMap[k].recommendedProduct1Title}","${answersMap[k].recommendedProduct1Link}"` + '\n';
        }

        console.log(s);
    }

    /**
     * Build the summary slide
     */
    buildSummarySlide() {
        // Use answers to build summary product
        const answersGiven = this.getAnswersGiven();

        let answersMap = null;
        switch(this.getTestType()) {
            case 'clarisonic':
                answersMap = config.getClarisonic();
                break;
            case 'hair':
                answersMap = config.getHair();
                break;
        }

        if(answersMap) {
            // Get the answer from config based on answers given
            const answersGivenString = answersGiven.join(','),
                answer = answersMap[answersGivenString];

            // Primary product recommendation
            const mainProduct = this.generateRecommendedProduct(
                answer.productLink, answer.productImage, answer.productName, answer.productDesc, answer.productPrice
            );

            // Empty products each time we land on the slide
            let summaryProducts = $('.cb88-product-finder__summary-products');
            if(summaryProducts.hasClass('slick-initialized')) {
                summaryProducts.slick('destroy');
            }

            summaryProducts[0].innerHTML = '';

            // 'Perfect for' HTML append to main product
            const perfectForHtml = this.getPerfectForHtml();
            if(perfectForHtml) {
                mainProduct.append(perfectForHtml);
            }
            
            // Append main product recommendation
            summaryProducts.append(mainProduct);

            let numProducts = 1;

            // Add the extra products
            if(typeof answer['recommendedProduct1Image'] != 'undefined') {
                const extraProduct1 = this.generateRecommendedProduct(
                    answer['recommendedProduct1Link'],
                    answer['recommendedProduct1Image'],
                    answer['recommendedProduct1Title'],
                    answer['recommendedProduct1Tagline'],
                    answer['recommendedProduct1Price']
                );

                summaryProducts.append(extraProduct1);

                numProducts++;
            }

            // Total num products
            $('.cb88-product-finder__summary .cb88-product-finder__question .cb88-product-finder__question-of').remove();
            $('.cb88-product-finder__summary .cb88-product-finder__question').append(`
                <span class="cb88-product-finder__question-of">
                    <span class="cb88-num">1</span> of ${numProducts}
                </span>
            `);

            function doSlick() {
                summaryProducts.slick({
                    dots: false
                }).on('afterChange', function(slick, currentSlide) {
                    $('.cb88-product-finder__question-of .cb88-num').text(currentSlide.currentSlide + 1);
                });
            }

            // Run slick slider on products
            if(typeof window.jQuery.fn.slick == 'undefined') {
                $.getScript('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', function() {
                    doSlick();
                });
            } else {
                doSlick();
            }

        }

        this.eventSender.send(null, 'did-complete-product-finder');
    }
};
