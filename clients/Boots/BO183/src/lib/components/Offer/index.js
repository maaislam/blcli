import { h } from "preact";
import shared from "../../../../../../../core-files/shared";
import { fireEvent } from "../../../../../../../core-files/services";

const { ID } = shared;

const Offer = ({ title, text, links, background, textColour }) => {
  return (
    <div
      className={`${ID}-offer`}
      onClick={() => fireEvent(`Offer in carousel clicked - ${title}`)}
      style={{ color: textColour, backgroundColor: background }}
    >
      <div className={`${ID}-offer-container`}>
        <h4>{title}</h4>
        <p>{text}</p>
        <div className={`${ID}-offer-cta-container`}>
          {links.map((link, idx) => (
            <a
              href={link.url}
              key={link.text + idx}
              style={{ color: background }}
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offer;
