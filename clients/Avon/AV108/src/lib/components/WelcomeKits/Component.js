/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

export const Component = (props) => {
  const { image, imageAlt, centerText, recommended, title, subtitle, price, salePrice, extraCost } = props;
  const createParagraphs = (paragraphs) => {
    const items = paragraphs;
    const keys = Object.keys(items);

    return (
      <div className='PTop2'>
        {keys.map((key) => (
          <p className='text-center'>{items[key]}</p>
        ))}
      </div>
    );
  };

  return (
    <div className='WMNcolumn column-wrapper'>
      <div className='img-container'>
        {/* {recommended && <div className='recommended__img-tag'>Recommended</div>} */}
        <img src={image} className='d-block img-fluid' alt={imageAlt} />
      </div>
      <h4 className='PTop2'>{title}</h4>
      <h4>
        {price} {salePrice ? <span className=''>{salePrice}</span> : null}
        <span className='PTop__subtitle'>{subtitle}</span>
      </h4>

      {createParagraphs(centerText)}
      <div>
        <p className='text-center'>
          You can also get your Ultimate Welcome Kit
          <b> {extraCost} </b>
          without the brochures and sales tools.
        </p>
        <p className='text-center'>
          *For T&Cs{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://rep.avon.uk.com/FLDSuite/static/downloads/campaignly/Joining-offer-TCs.pdf'
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
};
