import { h, render, Component } from 'preact';

const QuoteItem = (props) => {
  return (
    <blockquote class="quote-item">
      <span class="quote-item__quote-text">
        {props.children}
      </span>
      {
        !props.author || (
          <span class="quote-item__quote-author">{props.author}</span>
        )
      }
    </blockquote>
  );
};

QuoteItem.propTypes = {
  
};

export default QuoteItem;
