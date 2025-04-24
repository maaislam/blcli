import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class MobileTools extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            panel: 1,
            panel1: 'Building Materials',
            panel2: 'Gardens and Landscaping',
            panel3: 'Timber',
            visitedCats: [],
            isExpanded: false,
            viewMore: false,
        };

        this.expandMenu = this.expandMenu.bind(this);
        this.viewMore = this.viewMore.bind(this);
    };

    componentWillMount() {

    };

    expandMenu() {
        if (this.state.isExpanded === false) {
            this.setState({
                isExpanded: true
            })
            events.send(shared.ID, 'tools-workwear-expanded');
        } else {
            this.setState({
                isExpanded: false,
                viewMore: false,
            })
        }
    };

    viewMore() {
        if (this.state.viewMore === false) {
            this.setState({
                viewMore: true
            })
            events.send(shared.ID, 'tools-workwear-view-more');
        } else {
            this.setState({
                viewMore: false,
            })
        }
    }

    render() {
        return (
            <div>
                    <div onClick={this.expandMenu} className={ this.state.isExpanded ? `${shared.ID + '__mobile__category--active'}` : `${shared.ID}__mobile__category`}>
                       <div className={shared.ID + `__mobile__category__inner`}>

                            { this.state.isExpanded ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364847.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364844.png'} />
                            )}

                            <p className={ this.state.isExpanded ? `${shared.ID}__mobile__category__inner__text--active` : `${shared.ID}__mobile__category__inner__text`}>Tools & Workwear</p>

                            { this.state.isExpanded ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364346.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                            )}

                       </div> 
                    </div>
                    <div className={ this.state.isExpanded ? `${shared.ID + '__lower-wrap--active'}` : `${shared.ID}__lower-wrap`}>
                        { this.state.isExpanded ? (
                            <div className={shared.ID + `__mobile__category__main`}>
                                <a href='/product/tools-and-workwear/power-tools/c/1500471/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Power Tools</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/hand-tools/c/1500499/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Hand Tools</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/safety-workwear/c/1500451/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Safety Workwear</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/site-equipment/c/1500467/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Site Equipment</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <div onClick={this.viewMore} className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p className={shared.ID + `__mobile__category__main__item__inner__view-more`}>View more</p>
                                        { this.state.viewMore ? (
                                            <img src={'http://sb.monetate.net/img/1/581/3364353.png'} />
                                        ) : (
                                            <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                        { this.state.viewMore ? (
                            <div className={shared.ID + `__mobile__category__main`}>
                                <a href='/product/tools-and-workwear/tools-storage-and-workbenches/tool-boxes/c/1500528/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Tools, Storage & Workbenches</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/tarpaulins-and-rubble-sacks/c/1501000/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Tarpaulins & Rubble Sacks</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/ladders/c/1500533/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Ladders</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/safety/c/1558001/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Safety</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/site-lighting/c/1500598/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Site Lighting</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/automotive/c/1500537/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Automotive</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/tools-and-workwear/wheelbarrows-and-hand-trucks/c/1500525/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Wheelbarrows</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                            </div>
                        ) : ''}
                    </div>
            </div>
        )
    }
};