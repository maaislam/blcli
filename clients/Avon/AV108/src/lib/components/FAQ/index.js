/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

import { FAQComponent } from './Component';
import { dataFAQ } from '../../data';

export const FAQ = () => (
  <div className="container-fluid" id="faq">
    <div className="PBot text-center">
      <h3 className="PBot">{dataFAQ.FAQ[0].title}</h3>
      <p>
        {dataFAQ.FAQ[0].text}
      </p>
    </div>
    <FAQComponent
      accordionTitle={dataFAQ.accordionOne[0].accordionTitle}
      imageBlock={dataFAQ.accordionOne[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionTwo[0].accordionTitle}
      imageBlock={dataFAQ.accordionTwo[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionThree[0].accordionTitle}
      imageBlock={dataFAQ.accordionThree[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionFour[0].accordionTitle}
      imageBlock={dataFAQ.accordionFour[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionFive[0].accordionTitle}
      imageBlock={dataFAQ.accordionFive[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionSix[0].accordionTitle}
      imageBlock={dataFAQ.accordionSix[1]}
    />
    <FAQComponent
      accordionTitle={dataFAQ.accordionSeven[0].accordionTitle}
      imageBlock={dataFAQ.accordionSeven[1]}
    />
  </div>
);
