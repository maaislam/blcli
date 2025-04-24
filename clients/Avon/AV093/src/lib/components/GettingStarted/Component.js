/* eslint-disable react/style-prop-object */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

export const Component = (props) => {
  const { blockData } = props;
  return (
    <div className="container-fluid" id="getting-started">
      <div className="text-center">
        <h3 className="PBot2">{blockData.extraText[0].gettingStartedTitle}</h3>
        <p>
          {blockData.extraText[0].gettingStartedText}
        </p>
      </div>
      <div className="grid2x2 text-center">
        <div className="box">
          <img
            className="img--margin"
            src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/1.png?v=1628674007"
            alt="1"
          />
          <h4 className="block__title">{blockData.blockOne[0].blockTitle}</h4>
          <p className="text-center">
            {blockData.blockOne[0].blockContent}
            <br />
            <b>{blockData.blockOne[0].blockContentBold}</b>
          </p>
        </div>
        <div className="box">
          <img
            className="img--margin"
            src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/2.png?v=1628674007"
            alt="2"
          />
          <h4 className="block__title">{blockData.blockTwo[0].blockTitle}</h4>
          <p className="text-center">
            {blockData.blockTwo[0].blockContent}
            <br />
            <b>{blockData.blockTwo[0].blockContentBold}</b>
          </p>
        </div>
        <div className="box">
          <img
            className="img--margin"
            src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/3.png?v=1628674007"
            alt="3"
          />
          <h4 className="block__title">{blockData.blockThree[0].blockTitle}</h4>
          <p className="text-center">
            {blockData.blockThree[0].blockContent}
            <br />
            <b>{blockData.blockThree[0].blockContentBold}</b>
          </p>
        </div>
        <div className="box">
          <img
            className="img--margin"
            src="https://cdn.shopify.com/s/files/1/0327/1498/1421/files/4.png?v=1628674007"
            alt="4"
          />
          <h4 className="block__title">{blockData.blockFour[0].blockTitle}</h4>
          <p className="text-center">
            {blockData.blockFour[0].blockContent}
            <br />
            <b>{blockData.blockFour[0].blockContentBold}</b>
          </p>
        </div>
      </div>
    </div>
  );
};
