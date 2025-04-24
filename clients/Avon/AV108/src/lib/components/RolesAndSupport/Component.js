/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

export const Component = (props) => {
  const {
    image, imageAlt, title, subTitle, content, centerText,
  } = props;
  const createParagraphs = (paragraphs) => {
    const items = paragraphs;
    const keys = Object.keys(items);

    return (
      <div className="PTop2">
        {keys.map(key => (<p className="text-center colour--purple">{items[key]}</p>)) }
      </div>
    );
  };

  return (
    <div className="WMNcolumn roles-and-support__wrapper">
      <div className="title__wrapper">
        <div className="title_block">
          <h4>
            {title}
          </h4>
          <p>
            {subTitle}
          </p>
        </div>
      </div>
      <hr />
      {createParagraphs(centerText)}
      <div>
        <p className="text-center PTop2">
          {content}
        </p>
      </div>
    </div>
  );
};
