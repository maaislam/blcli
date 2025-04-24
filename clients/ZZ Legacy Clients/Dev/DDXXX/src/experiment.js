import { h, render, Component } from 'preact';

class Clock extends Component {
    constructor() {
        super();
        // set initial time:
        this.state = {
            loading: true,
            data: [],
        };
    }
 
    componentDidMount() {
        fetch('someAPI_Url')
          .then((res) => {
            this.setState({
              data: res, // or res.json() || .text()
            });
          })
    }
 
    componentWillUnmount() {
        this.setState({
          loading: true,
          data: [], // Empty if need be.
        })
    }
 
    render() {
      const { data } = this.state;
        return(
          <div className="preact-elem">
            {data.map((item) => <div>{item}</div>)}
          </div>
        )
    }

}


export const notClock = (props) => {

  const [data, addData] = useState([]);
    
  fetch('someAPI_Url')
    .then((res) => {
      addData(res); // Call addData function, passing res.
    })

  return( // JSX again
    <div className="preact-elem not-a-clock">
      {data.map((item) => <div>{item}</div>)}
    </div>
  )
}

 


// render an instance of Clock into <body>:
render(<Clock />, document.body);
