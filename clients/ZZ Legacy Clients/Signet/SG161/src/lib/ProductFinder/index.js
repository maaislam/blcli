import { h, render } from 'preact';
import shared from '../../../../../../core-files/shared';
import App from './App';

const { ID } = shared;

const ProductFinder = () => {
  const rootEntry = document.querySelector('.product-listing');
  const rootElement = document.createElement('div');
  rootElement.id = `${ID}-root`;
  rootEntry.parentNode.insertBefore(rootElement, rootEntry);

  render(<App id={ID} />, rootElement);
};

export default ProductFinder;
