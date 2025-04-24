import { h, render, Component } from 'preact';
import Modal from '../Modal';
import QuoteItem from './Item';

class QuoteContainer extends Component {
  constructor() {
      super();
      // set initial time:
      this.state = {
        quoteText: 'Loading...',
        time: Date.now()
      };
  }

  componentDidMount() {
    fetch('https://api.quotable.io/random')
      .then((response) => {
        if(!response.ok) {
          'Failed to load quote. Please try again.';
        }

        return response.json();
      })
      .then((json) => {
        this.setState({
          quoteText: json.content,
        });
      });
  }

  render(props, state) {
    return (
      <Modal>
        <QuoteItem>
        {this.state.quoteText}
        </QuoteItem>
      </Modal>
    );
  }
}
 
export default QuoteContainer;
