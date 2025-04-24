/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';
import { showMobile } from '../../../../../../../lib/utils/mobileDetection';
import { generateBulletsAndMountGlide } from '../../../../../../../lib/utils/Glide/glideInitialisation';
import { observerMutation } from '../../../../../../../lib/utils/observer';

import { Component } from './Component';

import { dataWelcomeKit } from '../../data';

export const WelcomeKits = () => {
  observerMutation('#root', generateBulletsAndMountGlide, '#welcome-kits', [showMobile]);

  const MobileDesign = (
    <div className='background-wrapper'>
      <div className='PTop PBot'>
        <div className='WMNRow'>
          <div className='coll-12'>
            <h3 className='font-weight--600 PBot text-center'>{dataWelcomeKit[2].welcomeKitTitle}</h3>
          </div>
          <div className='coll-12'>
            <p className='text-center mobile-padding'>{dataWelcomeKit[2].welcomeKitText}</p>
            <p className='PBot text-center mobile-padding'>
              Plus, you can earn back the cost of your Welcome Kit when you reach your goals!*
            </p>
          </div>
        </div>
        <div className='glide'>
          <div className='glide__track' data-glide-el='track'>
            <ul className='glide__slides'>
              <li className='glide__slide'>
                <Component
                  image={dataWelcomeKit[0].imageUrl}
                  imageAlt={dataWelcomeKit[0].imageAlt}
                  title={dataWelcomeKit[0].title}
                  subtitle={dataWelcomeKit[0].subtitle}
                  price={dataWelcomeKit[0].price}
                  extraCost={dataWelcomeKit[0].extraCost}
                  salePrice={dataWelcomeKit[0].salePrice}
                  centerText={dataWelcomeKit[0].centerText}
                  bottomText={dataWelcomeKit[0].bottomText}
                  recommended={dataWelcomeKit[0].recommended}
                />
              </li>
              <li className='glide__slide'>
                <Component
                  image={dataWelcomeKit[1].imageUrl}
                  imageAlt={dataWelcomeKit[1].imageAlt}
                  title={dataWelcomeKit[1].title}
                  subtitle={dataWelcomeKit[1].subtitle}
                  price={dataWelcomeKit[1].price}
                  extraCost={dataWelcomeKit[1].extraCost}
                  salePrice={dataWelcomeKit[1].salePrice}
                  centerText={dataWelcomeKit[1].centerText}
                  bottomText={dataWelcomeKit[1].bottomText}
                  recommended={dataWelcomeKit[1].recommended}
                />
              </li>
            </ul>
          </div>
          <div className='glide__bullets' data-glide-el='controls[nav]' />
        </div>
      </div>
    </div>
  );

  const DesktopDesign = (
    <div className='background-wrapper'>
      <div className='PTop PBot'>
        <div className='WMNRow'>
          <div className='coll-12'>
            <h3 className='font-weight--600 PBot text-center'>{dataWelcomeKit[2].welcomeKitTitle}</h3>
          </div>
          <div className='coll-12'>
            <p className=' text-center mobile-padding'>{dataWelcomeKit[2].welcomeKitText}</p>
            <p className='PBot text-center mobile-padding'>
              Plus, you can earn back the cost of your Welcome Kit when you reach your goals!*
            </p>
          </div>
        </div>
        <div className='WMNcolumn-group WMNtwo '>
          <Component
            image={dataWelcomeKit[0].imageUrl}
            imageAlt={dataWelcomeKit[0].imageAlt}
            title={dataWelcomeKit[0].title}
            subtitle={dataWelcomeKit[0].subtitle}
            price={dataWelcomeKit[0].price}
            extraCost={dataWelcomeKit[0].extraCost}
            salePrice={dataWelcomeKit[0].salePrice}
            centerText={dataWelcomeKit[0].centerText}
            bottomText={dataWelcomeKit[0].bottomText}
            recommended={dataWelcomeKit[0].recommended}
          />
          <Component
            image={dataWelcomeKit[1].imageUrl}
            imageAlt={dataWelcomeKit[1].imageAlt}
            title={dataWelcomeKit[1].title}
            subtitle={dataWelcomeKit[1].subtitle}
            price={dataWelcomeKit[1].price}
            extraCost={dataWelcomeKit[1].extraCost}
            salePrice={dataWelcomeKit[1].salePrice}
            centerText={dataWelcomeKit[1].centerText}
            bottomText={dataWelcomeKit[1].bottomText}
            recommended={dataWelcomeKit[1].recommended}
          />
        </div>
      </div>
    </div>
  );
  return <div id='welcome-kits'>{showMobile ? MobileDesign : DesktopDesign}</div>;
};
