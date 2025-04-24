/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';
import { showOnMobileAndTablet } from '../../../../../../../lib/utils/mobileDetection';
import { generateBulletsAndMountGlide } from '../../../../../../../lib/utils/Glide/glideInitialisation';
import { observerMutation } from '../../../../../../../lib/utils/observer';

import { dataRolesAndSupport } from '../../data';

import { Component } from './Component';

export const RolesAndSupport = () => {
  observerMutation(
    '#root',
    generateBulletsAndMountGlide,
    '#roles-and-support',
    [showOnMobileAndTablet],
  );

  const MobileDesign = (
    <div className="background-wrapper">
      <div className="PTop PBot">
        <div className="WMNRow container-fluid">
          <div className="coll-12">
            <h3 className="font-weight--600 PBot text-center">
              {dataRolesAndSupport[2].rolesAndSupportOpportunityTitle}
            </h3>
          </div>
          <div className="coll-12">
            <p className="PBot text-center">
              {dataRolesAndSupport[2].rolesAndSupportOpportunityText}
            </p>
          </div>
        </div>
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide">
                <Component
                  image={dataRolesAndSupport[0].imageUrl}
                  imageAlt={dataRolesAndSupport[0].imageAlt}
                  title={dataRolesAndSupport[0].title}
                  subTitle={dataRolesAndSupport[0].subTitle}
                  content={dataRolesAndSupport[0].content}
                  centerText={dataRolesAndSupport[0].centerText}
                />
              </li>
              <li className="glide__slide">
                <Component
                  image={dataRolesAndSupport[1].imageUrl}
                  imageAlt={dataRolesAndSupport[1].imageAlt}
                  title={dataRolesAndSupport[1].title}
                  subTitle={dataRolesAndSupport[1].subTitle}
                  content={dataRolesAndSupport[1].content}
                  centerText={dataRolesAndSupport[1].centerText}
                />
              </li>
            </ul>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]" />
        </div>
      </div>
    </div>
  );

  const DesktopDesign = (
    <div className="background-wrapper">
      <div className="PTop PBot">
        <div className="WMNRow">
          <div className="coll-12">
            <h3 className="font-weight--600 PBot text-center">
              {dataRolesAndSupport[2].rolesAndSupportOpportunityTitle}
            </h3>
          </div>
          <div className="coll-12">
            <p className="PBot text-center">
              {dataRolesAndSupport[2].rolesAndSupportOpportunityText}
            </p>
          </div>
        </div>
        <div className="WMNcolumn-group WMNtwo WMNtwoSup">
          <Component
            image={dataRolesAndSupport[0].imageUrl}
            imageAlt={dataRolesAndSupport[0].imageAlt}
            title={dataRolesAndSupport[0].title}
            subTitle={dataRolesAndSupport[0].subTitle}
            content={dataRolesAndSupport[0].content}
            centerText={dataRolesAndSupport[0].centerText}
          />
          <Component
            image={dataRolesAndSupport[1].imageUrl}
            imageAlt={dataRolesAndSupport[1].imageAlt}
            title={dataRolesAndSupport[1].title}
            subTitle={dataRolesAndSupport[1].subTitle}
            content={dataRolesAndSupport[1].content}
            centerText={dataRolesAndSupport[1].centerText}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div id="roles-and-support">
      {showOnMobileAndTablet ? MobileDesign : DesktopDesign}
    </div>
  );
};
