import { h, render, Component } from 'preact';
import QuoteContainer from './components/Quote/Container';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body'], () => {
  document.body.classList.add('REX001');

  // Create div after body
  const quoteContainerDiv = document.createElement('div');
  quoteContainerDiv.classList.add('REX001-app');

  document.body.insertAdjacentElement('afterbegin', quoteContainerDiv);
   
  // Render React component into target container div
  render(<QuoteContainer />, quoteContainerDiv);
});
