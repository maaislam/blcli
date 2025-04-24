/* eslint-disable react/style-prop-object */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

export const Component = (props) => {
  const { content } = props;
  return (
    <div className='WMNSection color_bar'>
      <div className='WMNContainer' style={{ textAlign: 'center', maxWidth: 'calc(36rem + 30px)' }}>
        <div className='WMNRow'>
          <div className='coll-12'>
            <p className='repBanner__style'>
              <span>{content.blockContent}</span>
            </p>
            <span className='repBanner__name'>{content.blockName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
