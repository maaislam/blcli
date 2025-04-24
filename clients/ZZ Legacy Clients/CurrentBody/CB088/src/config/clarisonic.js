export default function() {

    const numberofproducts = '30';
    const deviceoptions = 'Clarisonic';
    const mia_price = parseFloat(((document.querySelector('.CL-MIA2') || {}).dataset || {})['price']).toFixed(2);
    const aria_price = parseFloat(((document.querySelector('.CL-ARIA') || {}).dataset || {})['price']).toFixed(2);
    const pedi_price = parseFloat(((document.querySelector('.Clarisonic Pedi') || {}).dataset || {})['price']).toFixed(2);
    const fit_price = parseFloat(((document.querySelector('.CL-MIAF') || {}).dataset || {})['price']).toFixed(2);
    const alpha_price = parseFloat(((document.querySelector('.CL-ALF-GRY') || {}).dataset || {})['price']).toFixed(2);
    const smart_price = parseFloat(((document.querySelector('.CL-SMART') || {}).dataset || {})['price']).toFixed(2);
    const smart_uplift_price = parseFloat(((document.querySelector('.CL-SMART-UPLIFT') || {}).dataset || {})['price']).toFixed(2);
    const lunaNO_price = parseFloat(((document.querySelector('.FO-LUNA2-F5968-NO') || {}).dataset || {})['price']).toFixed(2);
    const lunaOL_price = parseFloat(((document.querySelector('.FO-LUNA2-F5982-OL') || {}).dataset || {})['price']).toFixed(2);
    const lunaSE_price = parseFloat(((document.querySelector('.FO-LUNA2-F5951-SE') || {}).dataset || {})['price']).toFixed(2);
    const lunaCO_price = parseFloat(((document.querySelector('.FO-LUNA2-F5975-CO') || {}).dataset || {})['price']).toFixed(2);
    const luna_mini_price = parseFloat(((document.querySelector('.FO-MN-LUNA2') || {}).dataset || {})['price']).toFixed(2);
    const luna_men_price = parseFloat(((document.querySelector('.FO-LUNA2-F5999-MEN') || {}).dataset || {})['price']).toFixed(2);
    const bareface_price = parseFloat(((document.querySelector('.RN-ML02P') || {}).dataset || {})['price']).toFixed(2);
    const monty_price = parseFloat(((document.querySelector('.RN-MP03') || {}).dataset || {})['price']).toFixed(2);
    const sweep_price = parseFloat(((document.querySelector('.RN-MAG-SWEEP') || {}).dataset || {})['price']).toFixed(2);
    const pmd_pers_price = parseFloat(((document.querySelector('.PM-INT') || {}).dataset || {})['price']).toFixed(2);
    const pmd_men_price = parseFloat(((document.querySelector('.PM-INT-1004-UK-BLA') || {}).dataset || {})['price']).toFixed(2);
    const tria_4x_price = parseFloat(((document.querySelector('.TR-HLR4X') || {}).dataset || {})['price']).toFixed(2);
    const tria_price = parseFloat(((document.querySelector('.TR-HRLP') || {}).dataset || {})['price']).toFixed(2);
    const touch_price = parseFloat(((document.querySelector('.IL-TOUCH-FG70701UK') || {}).dataset || {})['price']).toFixed(2);
    const precise_price = parseFloat(((document.querySelector('.IL-HU-FG01171UK') || {}).dataset || {})['price']).toFixed(2);
    const bare_price = parseFloat(((document.querySelector('.CD-CA001194-SSBARE-CONFIG') || {}).dataset || {})['price']).toFixed(2);
    const gold_price = parseFloat(((document.querySelector('.CD-CA00') || {}).dataset || {})['price']).toFixed(2);
    const glide_price = parseFloat(((document.querySelector('.SN-GLU2PE1001-UNI') || {}).dataset || {})['price']).toFixed(2);
    const glide_xpress_price = parseFloat(((document.querySelector('.SN-GLIDE-EX') || {}).dataset || {})['price']).toFixed(2);
    const infinity_price = parseFloat(((document.querySelector('.SN-INF1PE1001') || {}).dataset || {})['price']).toFixed(2);
    const jewel_price = parseFloat(((document.querySelector('.SN-JW1PE1001') || {}).dataset || {})['price']).toFixed(2);
    const iluminage_price = parseFloat(((document.querySelector('.IL-HU-FG00691UK') || {}).dataset || {})['price']).toFixed(2);

    return {
        '1,1,1': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
        '1,1,2': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,1,3': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
        '1,1,4': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,1,5': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,1,6': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,2,1': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,2,2': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,2,3': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },    
        '1,2,4': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,2,5': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        }, 
        '1,2,6': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,3,1': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,3,2': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,3,3': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,3,4': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },  
        '1,3,5': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
        '1,3,6': {
         productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,4,1': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,4,2': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,4,3': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,4,4': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,4,5': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
        '1,4,6': {
         productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },    
        '1,5,1': {
         productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        }, 
        '1,5,2': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
          '1,5,3': {
         productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        },
        '1,5,4': {
          productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },
        '1,5,5': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''

        }, 
        '1,5,6': {
           productName: 'Clarisonic Alpha Fit',
          productPrice: '£' + alpha_price + '',
          productDesc:'Designed for men. Removes dirt, sweat and oil, leaving your skin clearer and softer.',
          productImage: '//cdn.optimizely.com/img/3320600494/48e91493081f4e0f8ef4d58b4394cb70.png',
          productLink: 'https://www.currentbody.com/clarisonic-alpha-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/793e187ce41149429b5cee77f677f6fc.png',
          recommendedProduct1Title: 'FOREO LUNA 2 for Men',
          recommendedProduct1Tagline: 'Cleanses, protects and lower-frequency pulsations reduce the signs of aging.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-2-for-men-3-in-1-face-brush.html', 
          recommendedProduct1Price: '£' +luna_men_price + ''
        },    

        /*FEMALE CLICK RESULT*/
        '2,1,1': {
          productName: 'Clarisonic Smart Profile Uplift',
          productPrice: '£' + smart_uplift_price + '',
          productDesc:'Unbeatable cleansing with self-adjusting power to optimise the brush speed. Options for face and body.',
          productDesc:'Tones, lifts and tightens the skin. Revitalizing cleanse brush head with 4 speeds to optimise your treatment.',
          productImage: 'https://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-uplift.jpg',
          productLink: 'https://www.currentbody.com/clarisonic-smart-profile-uplift-anti-ageing-massage-and-cleansing.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          recommendedProduct1Title: 'Clarisonic Mia Fit',
          recommendedProduct1Tagline: 'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Price: '£' + fit_price + ''

        },
        '2,1,2': {
          productName: 'FOREO LUNA 2 Sensitive',
          productPrice: '£' + lunaSE_price + '',
          productDesc:"Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          productImage: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          productLink: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          recommendedProduct1Title: 'Clarisonic Mia 2 ',
          recommendedProduct1Tagline: 'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Price: '£' + mia_price + ''

        },
        '2,1,3': {
          productName: 'Clarisonic Mia 2',
          productPrice: '£' + mia_price + '',
          productDesc:'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          productImage: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,1,4': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        },
        '2,1,5': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        },
        '2,1,6': {
          productName: 'Clarisonic Smart Profile Uplift',
          productPrice: '£' + smart_uplift_price + '',
          productDesc:'Unbeatable cleansing with self-adjusting power to optimise the brush speed. Options for face and body.',
          productDesc:'Tones, lifts and tightens the skin. Revitalizing cleanse brush head with 4 speeds to optimise your treatment.',
          productImage: 'https://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-uplift.jpg',
          productLink: 'https://www.currentbody.com/clarisonic-smart-profile-uplift-anti-ageing-massage-and-cleansing.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/98cc7c83ecc04bb8b2cafc7937598354.png',
          recommendedProduct1Title: 'FOREO Luna 2 Oily',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5982-OL', 
          recommendedProduct1Price: '£' + lunaOL_price + ''


        },
        '2,2,1': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''


        },
        '2,2,2': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        },
        '2,2,3': {
          productName: 'FOREO LUNA 2 Sensitive',
          productPrice: '£' + lunaSE_price + '',
          productDesc:"Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          productImage: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          productLink: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html',
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/12e20153591541029f95bcdadadc023c.png',
          recommendedProduct1Title: 'Clarisonic Mia Fit',
          recommendedProduct1Tagline: 'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Price: '£' + fit_price + ''

        },    
        '2,2,4': {
          productName: 'Clarisonic Mia 2',
          productPrice: '£' + mia_price + '',
          productDesc:'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          productImage: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/9a76ab516cdd427b833ac3761f704377.png',
          recommendedProduct1Title: 'FOREO LUNA Mini 2',
          recommendedProduct1Tagline: 'Durable silicone means no need to replace brush heads. Suitable for all skin types.',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/foreo-luna-mini-2-t-sonic-facial-cleansing-brush.html', 
          recommendedProduct1Price: '£' + luna_mini_price + ''
        },
        '2,2,5': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: 'https://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-uplift.jpg',
          recommendedProduct1Title: 'Clarisonic Smart Profile Uplift',
          recommendedProduct1Tagline: 'Tones, lifts and tightens the skin. Revitalizing cleanse brush head with 4 speeds to optimise your treatment.',
          recommendedProduct1Link: 'https://www.currentbody.com/clarisonic-smart-profile-uplift-anti-ageing-massage-and-cleansing.html', 
          recommendedProduct1Price: '£' + smart_uplift_price + ''
        }, 
        '2,2,6': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/188fea66b2314cb2abee8478465ffe75.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Combination',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5975-CO', 
          recommendedProduct1Price: '£' + lunaCO_price + ''
        },
        '2,3,1': {
          productName: 'Clarisonic Smart Profile Uplift',
          productPrice: '£' + smart_uplift_price + '',
          productDesc:'Unbeatable cleansing with self-adjusting power to optimise the brush speed. Options for face and body.',
          productDesc:'Tones, lifts and tightens the skin. Revitalizing cleanse brush head with 4 speeds to optimise your treatment.',
          productImage: 'https://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-uplift.jpg',
          productLink: 'https://www.currentbody.com/clarisonic-smart-profile-uplift-anti-ageing-massage-and-cleansing.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        },
        '2,3,2': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/557d47a7955549e0b08b5c0e3d8dca39.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Normal',
          recommendedProduct1Tagline: '2 minute cleansing routine produces clearer, fresher, cleaner skin in as little as 3 days.',
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5968-NO', 
          recommendedProduct1Price: '£' + lunaNO_price + ''

        },
        '2,3,3': {
          productName: 'Clarisonic Mia 2',
          productPrice: '£' + mia_price + '',
          productDesc:'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          productImage: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/98cc7c83ecc04bb8b2cafc7937598354.png',
          recommendedProduct1Title: 'FOREO Luna 2 Oily',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5982-OL', 
          recommendedProduct1Price: '£' + lunaOL_price + ''

        },
        '2,3,4': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
           recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/98cc7c83ecc04bb8b2cafc7937598354.png',
          recommendedProduct1Title: 'FOREO Luna 2 Oily',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5982-OL', 
          recommendedProduct1Price: '£' + lunaOL_price + ''

        },  
        '2,3,5': {
           productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/557d47a7955549e0b08b5c0e3d8dca39.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Normal',
          recommendedProduct1Tagline: '2 minute cleansing routine produces clearer, fresher, cleaner skin in as little as 3 days.',
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5968-NO', 
          recommendedProduct1Price: '£' + lunaNO_price + ''

        },
        '2,3,6': {
          productName: 'FOREO LUNA 2 Oily',
          productPrice: '£' + lunaOL_price + '',
          productDesc:"Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          productImage: '//cdn.optimizely.com/img/3320600494/98cc7c83ecc04bb8b2cafc7937598354.png',
          productLink: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5982-OL', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          recommendedProduct1Title: 'Clarisonic Mia 2 ',
          recommendedProduct1Tagline: 'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Price: '£' + mia_price + ''

        },
        '2,4,1': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,4,2': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,4,3': {
            productName: 'FOREO LUNA 2 Sensitive',
          productPrice: '£' + lunaSE_price + '',
          productDesc:"Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          productImage: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          productLink: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          recommendedProduct1Title: 'Clarisonic Mia 2 ',
          recommendedProduct1Tagline: 'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Price: '£' + mia_price + ''

        },
        '2,4,4': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,4,5': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html',  
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,4,6': {
          productName: 'Clarisonic foreo',
          productPrice: '£' + mia_price + '',
          productDesc:'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          productImage: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html',  
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/188fea66b2314cb2abee8478465ffe75.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Combination',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5975-CO', 
          recommendedProduct1Price: '£' + lunaCO_price + ''

        },    
        '2,5,1': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html',  
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        }, 
        '2,5,2': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/557d47a7955549e0b08b5c0e3d8dca39.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Normal',
          recommendedProduct1Tagline: '2 minute cleansing routine produces clearer, fresher, cleaner skin in as little as 3 days.',
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5968-NO', 
          recommendedProduct1Price: '£' + lunaNO_price + ''

        },
        '2,5,3': {
           productName: 'FOREO LUNA 2 Sensitive',
          productPrice: '£' + lunaSE_price + '',
          productDesc:"Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          productImage: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          productLink: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE',
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          recommendedProduct1Title: 'Clarisonic Mia 2 ',
          recommendedProduct1Tagline: 'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          recommendedProduct1Link: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html', 
          recommendedProduct1Price: '£' + mia_price + ''

         
        },
        '2,5,4': {
          productName: 'Clarisonic Mia 2',
          productPrice: '£' + mia_price + '',
          productDesc:'A deep cleansing brush, sweeps away oil and removes dirt. Minimises pores and tackles acne. Includes gel cleanser!',
          productImage: '//cdn.optimizely.com/img/3320600494/bba16247f27546bfb9e3a25fd0db98cf.png',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-2-facial-cleanser.html',  
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/3c95379318404ac0977dc23da4b4b5b9.png',
          recommendedProduct1Title: 'FOREO LUNA 2 Sensitive',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5951-SE', 
          recommendedProduct1Price: '£' + lunaSE_price + ''

        },
        '2,5,5': {
          productName: 'Clarisonic Smart Profile Uplift',
          productPrice: '£' + smart_uplift_price + '',
          productDesc:'Unbeatable cleansing with self-adjusting power to optimise the brush speed. Options for face and body.',
          productDesc:'Tones, lifts and tightens the skin. Revitalizing cleanse brush head with 4 speeds to optimise your treatment.',
          productImage: 'https://www.currentbody.com/media/catalog/product/cache/1/thumbnail/358x/9df78eab33525d08d6e5fb8d27136e95/c/l/cl-smart-uplift.jpg',
          productLink: 'https://www.currentbody.com/clarisonic-smart-profile-uplift-anti-ageing-massage-and-cleansing.html', 
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/6cf21b37882a41adabef0e3648929bb2.png',
          recommendedProduct1Title: 'PMD Personal Microderm Device',
          recommendedProduct1Tagline: 'The PMD personal microdermabrasion device is a non-invasive, affordable solution for brightening your skin, reducing the appearance of wrinkles and smoothing away dead skin cells using exfoliation.',
          recommendedProduct1Link: '//www.currentbody.com/pmd-personal-microdermabrasion-facial-exfoliating-device.html', 
          recommendedProduct1Price: '£' + pmd_pers_price + ''

        }, 
        '2,5,6': {
          productName: 'Clarisonic Mia Fit',
          productPrice: '£' + fit_price + '',
          productImage: '//cdn.optimizely.com/img/3320600494/4e2fa820edb6457ca6706cd8deed4e53.png',
          productDesc:'Chic and portable with the same patented sonic technology for brilliantly clean skin.',
          productLink: '//www.currentbody.com/face/skin-cleansers/clarisonic-mia-fit-facial-cleanser.html',  
          recommendedProduct1Image: '//cdn.optimizely.com/img/3320600494/98cc7c83ecc04bb8b2cafc7937598354.png',
          recommendedProduct1Title: 'FOREO Luna 2 Oily',
          recommendedProduct1Tagline: "Taking just two minutes of your time, this handheld device's T-Sonic pulsations are designed to give you a deep yet gentle cleansing experience that's much better than traditional cleansing with wipes or face cloths.",
          recommendedProduct1Link: '//www.currentbody.com/foreo-luna-2-personalised-facial-cleansing-brush-anti-ageing-device.html?sku=FO-LUNA2-F5982-OL', 
          recommendedProduct1Price: '£' + lunaOL_price + ''
        } 
    };
};
