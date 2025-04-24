import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class MobileBuildingMaterials extends Component {
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
            events.send(shared.ID, 'building-materials-expanded');
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
            events.send(shared.ID, 'building-materials-view-more');
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
                                <img src={'http://sb.monetate.net/img/1/581/3364330.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364332.png'} />
                            )}

                            <p className={ this.state.isExpanded ? `${shared.ID}__mobile__category__inner__text--active` : `${shared.ID}__mobile__category__inner__text`}>Building Materials</p>

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
                                <a href='/product/building-materials/aggregates/c/1500039/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Aggregates</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/bricks-and-blocks/c/1500030/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Bricks & Blocks</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/plaster-and-plasterboards/c/1500220/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Plaster & Plasterboards</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/civils-and-drainage/c/1500054/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Civils & Drainage</p>
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
                                <a href='/product/building-materials/cements/c/1591033/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Cements</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/insulation/c/1500212/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Insulation</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/building-chemicals/c/1529000/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Building Chemicals</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/roofing/c/1500072/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Roofing</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/guttering/c/1500083/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Guttering</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/builders-metalwork/c/1500090/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Builders Metalwork</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/lintels/c/1500068/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Lintels</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/building-materials/render/c/1500041/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Render</p>
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