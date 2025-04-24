import { h, render, Component } from "preact";
import shared from '../../../../../../core-files/shared';
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events, getCookie } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';

export default class ReactComponent extends Component {
    constructor() {
        super();
        this.state = {
            test: 'test',
        };

        // Bind methods here
        this.testFunction = this.testFunction.bind(this);
    };

    // Lifecycle methods & others here

    componentDidMount() {
        this.testFunction();
    };

    testFunction() {
        console.log('Test function fired');
    };


    // Render method
    render() {
        return (
            <div className={`${shared.ID}__component`}>
                React Component
            </div>
        )
    }
};
