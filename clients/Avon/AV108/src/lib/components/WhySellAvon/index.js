/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import { h } from 'preact';

import { FAQComponent } from '../FAQ/Component';
import { dataWhySellAvon, whySellAvonMain } from '../../data';

export const WhySellAvon = () => (
  <div className="container-fluid" id="why-sell-avon">
    <div className="PBot text-center">
      <h3 className="PBot">{whySellAvonMain.title}</h3>
      <p className="PBot">{whySellAvonMain.content}</p>
    </div>
    <FAQComponent
      accordionTitle={dataWhySellAvon.accordionOne[0].accordionTitle}
      imageBlock={dataWhySellAvon.accordionOne[1]}
    />
    <FAQComponent
      accordionTitle={dataWhySellAvon.accordionTwo[0].accordionTitle}
      imageBlock={dataWhySellAvon.accordionTwo[1]}
    />
    <FAQComponent
      accordionTitle={dataWhySellAvon.accordionThree[0].accordionTitle}
      imageBlock={dataWhySellAvon.accordionThree[1]}
    />
    <FAQComponent
      accordionTitle={dataWhySellAvon.accordionFour[0].accordionTitle}
      imageBlock={dataWhySellAvon.accordionFour[1]}
    />
  </div>
);
