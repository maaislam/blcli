import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class MobileDoors extends Component {
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
            events.send(shared.ID, 'doors-expanded');
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
            events.send(shared.ID, 'doors-view-more');
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
                                <img src={'http://sb.monetate.net/img/1/581/3364834.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364833.png'} />
                            )}

                            <p className={ this.state.isExpanded ? `${shared.ID}__mobile__category__inner__text--active` : `${shared.ID}__mobile__category__inner__text`}>Doors, Windows & Joinery</p>

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
                                <a href='/product/doors-windows-and-joinery/internal-doors/c/1500153/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Internal Doors</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/exterior-doors/c/1500160/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>External Doors</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/windows/c/1500200/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Windows</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/ironmongery-and-security/c/1500168/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Ironmongery & Security</p>
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
                                <a href='/product/doors-windows-and-joinery/roof-windows/velux-roof-windows-and-flashings/c/1520002/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Roof Windows</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/door-frames-linings-and-casings/c/1500177/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Door frames, linings & casings</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/fire-doors/c/1500165/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Fire Doors</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/garage-doors/c/1512000/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Garage Doors</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/stairs/stair-accessories/c/1500207/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Stairs</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/doors-windows-and-joinery/worktops-and-accessories/c/1502005/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Worktops & Accessories</p>
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