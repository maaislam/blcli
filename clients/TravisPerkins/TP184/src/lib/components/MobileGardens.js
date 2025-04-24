import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class MobileGardens extends Component {
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
            events.send(shared.ID, 'gardens-landscaping-expanded');
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
            events.send(shared.ID, 'gardens-landscaping-view-more');
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
                                <img src={'http://sb.monetate.net/img/1/581/3364820.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364367.png'} />
                            )}

                            <p className={ this.state.isExpanded ? `${shared.ID}__mobile__category__inner__text--active` : `${shared.ID}__mobile__category__inner__text`}>Gardens and Landscaping</p>

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
                                <a href='/product/gardens-and-landscaping/paving-and-walling/c/1500121/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Paving & Walling</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/sheds-and-storage/garden-sheds/c/1500134/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Sheds & Storage</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/fencing-and-trellis/fence-panels/c/1500100/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Fence Panels</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/aggregates/decorative-stones-and-gravel/c/1500053/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Decorative Stones & Gravel</p>
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
                                <a href='/product/gardens-and-landscaping/decking/c/1500107/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Decking</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/driveways/c/1500116/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Driveways</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/garden-buildings-and-features/c/1513003/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Garden Buildings</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/lawns-planting-and-growing/c/1530000/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Lawns, Planting & Growing</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/gates-and-railings/timber-gates/c/1500112/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Gates & Railing</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/garden-power-tools/c/1570000/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Garden Power Tools</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/timber-sleepers/c/1500128/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Timber Sleepers</p>
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