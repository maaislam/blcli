/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';
import { showOnMobileAndTablet } from '../../../../../../../lib/utils/mobileDetection';

import { beautyBossDataDesktop } from '../../data';

const DesktopDesign = (
  <div className='background-wrapper'>
    <div className='PTop'>
      <div className='WMNRow PBot'>
        <div className='coll-12'>
          <h3 className='font-weight--600 PBot text-center'>{beautyBossDataDesktop[0].title}</h3>
        </div>
        <div className='coll-12'>
          <p className='text-center width75MarginAuto'>{beautyBossDataDesktop[0].text}</p>
        </div>
      </div>
      <div className='flex-grid-thirds'>
        <div className='col text-center first-block'>
          <div className='col-inner-wrapper PTop'>
            <img
              className='PBot3'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/brochure_54430425-398b-4ed1-b1e7-2a53ca1541de.svg?v=1631615942'
              alt=''
            />
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500 PBot1'>{beautyBossDataDesktop[1].title}</h4>
              <p>{beautyBossDataDesktop[1].text}</p>
            </div>
          </div>
        </div>
        <div className='col text-center second-block'>
          <div className='col-inner-wrapper PTop'>
            <img
              className='PBot3'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/online-shop.svg?v=1631530072'
              alt=''
            />
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500 PBot1'>{beautyBossDataDesktop[2].title}</h4>
              <p>{beautyBossDataDesktop[2].text}</p>
            </div>
          </div>
        </div>
        <div className='col text-center third-block'>
          <div className='col-inner-wrapper PTop'>
            <img
              className='PBot3'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/social-media.svg?v=1631530072'
              alt=''
            />
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500 PBot1'>{beautyBossDataDesktop[3].title}</h4>
              <p>{beautyBossDataDesktop[3].text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='WMNRow PTop'>
        <div className='coll-12'>
          <p className='text-center width75MarginAuto'>
            <h4 className='font-weight--500 PBot2'>{beautyBossDataDesktop[4].title}</h4>
            <p>{beautyBossDataDesktop[4].text}</p>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MobileDesign = (
  <div className='background-wrapper'>
    <div className='PTop PBot'>
      <div className='WMNRow'>
        <div className='coll-12'>
          <h3 className='font-weight--600 PBot text-center'>
            How to Become a
            <br />
            Beauty Boss
          </h3>
        </div>
        <div className='coll-12'>
          <p className='PBot text-center width75MarginAuto'>
            Welcome to the world of flexible working. How much you earn is completely up to you; whether you just want some extra
            cash or fancy making this your full-time business.
          </p>
        </div>
      </div>
      <div className='flex-grid-thirds'>
        <div className='col text-center PBot2'>
          <div className='col-inner-wrapper'>
            <img
              className='col-left'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/brochure_54430425-398b-4ed1-b1e7-2a53ca1541de.svg?v=1631615942'
              alt=''
            />
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500'>Brochure, Now Online</h4>
              <p>Use our iconic printed brochure to sell in person.</p>
              <p>Now available as a digital brochure to maximise your sales.</p>
            </div>
          </div>
        </div>
        <div className='col text-center PBot2'>
          <div className='col-inner-wrapper'>
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500'>Your Own Website</h4>
              <p>Use your unique URL to let your customers shop online</p>
              <p>Relax at home while we safely deliver to your customers for you.</p>
            </div>
            <img
              className='col-right PBot'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/online-shop.svg?v=1631530072'
              alt=''
            />
          </div>
        </div>
        <div className='col text-center PBot2'>
          <div className='col-inner-wrapper'>
            <img
              className='col-left'
              src='https://cdn.shopify.com/s/files/1/0327/1498/1421/files/social-media.svg?v=1631530072'
              alt=''
            />
            <div className='col-text-wrapper'>
              <h4 className='font-weight--500'>Social Media Reach</h4>
              <p>Use our dedicated rep app to organise your social media posts</p>
              <p>Keep your customers in the know about all about our products.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='WMNRow PTop'>
        <div className='coll-12'>
          <p className='PBot text-center width75MarginAuto'>
            <h4 className='font-weight--500 PBot2'>Keep Learning and Improving</h4>
            <p>
              Learn all about our latest tools, products and sales tools using our online courses, so you are always one step
              ahead of the game.
            </p>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const BeautyBoss = () => <div id='beauty-boss'>{showOnMobileAndTablet ? MobileDesign : DesktopDesign}</div>;
