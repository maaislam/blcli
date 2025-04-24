/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

/**
 * 
 * @param {object} content : ;
 * @returns 
 */

const createImageBlocks = (content) => {
  const items = content;
  const keys = Object.keys(items);
  const blocks = keys.map(key => (
    items[key].content && items[key].img && items[key].title ? (
      <div className="accordion-imgBlock">
        {items[key].img && (
        <img
          className="img-block"
          src={items[key].img}
          alt={items[key].title}
        />
        )}
        {items[key].title && (
        <h5 className="accordion-innerTitle">
          {items[key].title}
        </h5>
        )}
        <p className="accordion-innerContent">
          {items[key].content}
        </p>
      </div>
    ) : (
      <div className="accordion-imgBlock--fullWidth">
        {items[key].img && (
        <img
          className="img-block"
          src={items[key].img}
          alt={items[key].title}
        />
        )}
        {items[key].title && (
        <h5 className="accordion-innerTitle">
          {items[key].title}
        </h5>
        )}
        <p className="accordion-innerContent">
          {items[key].content}
        </p>
      </div>
    )
  ));

  return (
    blocks
  );
};

export const markup = (accordionTitle, imageBlock) => (
  <div className="accordion-container">
    <div className="accordion-item">
      <div id="accordion-title" className="accordion-title">
        <h3>{accordionTitle}</h3>
        <span className="icon-plusminus" />
      </div>
      {/* accordion-title */}
      <div className="accordion-content">
        <div className="rte">
          {imageBlock
              && (
              <div className="accordion-img-content-wrapper">
                {createImageBlocks(imageBlock)}
              </div>
              )}
        </div>
      </div>
      {/* accordion-content */}
    </div>
  </div>
);
