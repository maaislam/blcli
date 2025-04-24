import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';
import BuildingMaterials from './BuildingMaterials';
import GardensLandscaping from './GardensLandscaping';
import Timber from './Timber';
import DoorsWindows from './DoorsWindows';
import ToolsWorkwear from './ToolsWorkwear';

export default class CategoryComponent extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            panel: 1,
            panel1: 'Building Materials',
            panel2: 'Gardens & Landscaping',
            panel3: 'Timber',
            visitedCats: [],
        };

        this.selectPanelOne = this.selectPanelOne.bind(this);
        this.selectPanelTwo = this.selectPanelTwo.bind(this);
        this.selectPanelThree = this.selectPanelThree.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.hideOldCategories = this.hideOldCategories.bind(this);
    };

    componentWillMount() {
        setTimeout(() => {
            this.getCategories();
        }, 2000);
        this.hideOldCategories();
    };

    hideOldCategories() {
       const oldCatTitle = document.querySelector('[class*="TopCategory__TitleText"]');
       if(oldCatTitle) {
           oldCatTitle.style.display="none";
       };
       const oldCategories = document.querySelector('[class^="TopCategory__TopCategoriesList"]');
       if (oldCategories) {
           oldCategories.style.display="none";
       }
    };

    getCategories() {
        let categories = localStorage.getItem('UCCatTrk');
        if (categories) {
            categories = JSON.parse(categories);
            categories = categories.filter(c => {
                return ['Building Materials', 'Gardens & Landscaping', 'Timber & Sheet Materials', 'Doors, Windows & Joinery', 'Tools & Workwear'].indexOf(c) > -1;
              }).reverse().slice(0,3)

            categories = categories.map(c => {
                return c.replace(' & Sheet Materials', '')
              });

            let resultOrder = ['Building Materials','Gardens & Landscaping','Timber'];
           
            if(categories[0]) {
              resultOrder.unshift(categories[0]);
            }
            if(categories[1]) {
              resultOrder.unshift(categories[1]);
            }
            if(categories[2]) {
              resultOrder.unshift(categories[2]);
            }

            resultOrder = [...new Set(resultOrder)];
            resultOrder = resultOrder.slice(0,3);

            const result = {
                panel1: resultOrder[0],
                panel2: resultOrder[1],
                panel3: resultOrder[2],
            };

            if(Object.keys(result).length) {
              this.setState(result);
            }
        }
    }

    selectPanelOne() {
        this.setState({
            panel: 1,
        })
    };

    selectPanelTwo() {
        this.setState({
            panel: 2,
        })
    };

    selectPanelThree() {
        this.setState({
            panel: 3
        })
    };

    render() {
        return (
            <div>
                <h3 class="TP184__title">Top Categories</h3>
                <div className={shared.ID + `__categories`}>
                    <div className={shared.ID + `__categories__top`}>
                        <div onClick={this.selectPanelOne} className={ this.state.panel === 1 ? `${shared.ID + '__categories__top__category--selected'}` : `${shared.ID}__categories__top__category`}>

                            { this.state.panel === 1 ? (

                                <div style={'height:35px; margin-right:10px;'}>
                                    { this.state.panel1 === 'Building Materials' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364330.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Gardens & Landscaping' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364820.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Timber' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364826.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Doors, Windows & Joinery' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364834.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Tools & Workwear' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364847.png'}/>
                                    ) : ''}
                                </div>

                            ) : (
                                <div style={'height:35px; margin-right:10px;'}>
                                    { this.state.panel1 === 'Building Materials' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364332.png'} />
                                    ) : ''}
                                    { this.state.panel1 === 'Gardens & Landscaping' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364367.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Timber' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364372.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Doors, Windows & Joinery' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364833.png'}/>
                                    ) : ''}
                                    { this.state.panel1 === 'Tools & Workwear' ? (
                                        <img src={'http://sb.monetate.net/img/1/581/3364844.png'}/>
                                    ) : ''}
                                </div>
                            )}

                            {this.state.panel1}
                        </div>
                        <div onClick={this.selectPanelTwo} className={ this.state.panel === 2 ? `${shared.ID + '__categories__top__category--selected'}` : `${shared.ID}__categories__top__category middle-cat`}>

                        { this.state.panel === 2 ? (

                        <div style={'height:35px; margin-right:10px;'}>
                            { this.state.panel2 === 'Building Materials' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364330.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Gardens & Landscaping' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364820.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Timber' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364826.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Doors, Windows & Joinery' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364834.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Tools & Workwear' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364847.png'}/>
                            ) : ''}
                        </div>

                        ) : (
                        <div style={'height:35px; margin-right:10px;'}>
                            { this.state.panel2 === 'Building Materials' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364332.png'} />
                            ) : ''}
                            { this.state.panel2 === 'Gardens & Landscaping' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364367.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Timber' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364372.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Doors, Windows & Joinery' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364833.png'}/>
                            ) : ''}
                            { this.state.panel2 === 'Tools & Workwear' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364844.png'}/>
                            ) : ''}
                        </div>
                        )}

                            {this.state.panel2}
                        </div>
                        <div onClick={this.selectPanelThree} className={ this.state.panel === 3 ? `${shared.ID + '__categories__top__category--selected'}` : `${shared.ID}__categories__top__category`}>

                        { this.state.panel === 3 ? (

                        <div style={'height:35px; margin-right:10px;'}>
                            { this.state.panel3 === 'Building Materials' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364330.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Gardens & Landscaping' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364820.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Timber' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364826.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Doors, Windows & Joinery' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364834.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Tools & Workwear' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364847.png'}/>
                            ) : ''}
                        </div>

                        ) : (
                        <div style={'height:35px; margin-right:10px;'}>
                            { this.state.panel3 === 'Building Materials' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364332.png'} />
                            ) : ''}
                            { this.state.panel3 === 'Gardens & Landscaping' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364367.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Timber' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364372.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Doors, Windows & Joinery' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364833.png'}/>
                            ) : ''}
                            { this.state.panel3 === 'Tools & Workwear' ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364844.png'}/>
                            ) : ''}
                        </div>
                        )}

                            {this.state.panel3}
                        </div>
                    </div>

                    { this.state.panel === 1 ? (
                        <div className={shared.ID + `__panel-1`}>
                            { this.state.panel1 === 'Building Materials' ? (
                                <BuildingMaterials />
                            ): ''}

                            { this.state.panel1 === 'Gardens & Landscaping' ? (
                                <GardensLandscaping />
                            ): ''}

                            { this.state.panel1 === 'Timber' ? (
                                <Timber />
                            ): ''}

                            { this.state.panel1 === 'Doors, Windows & Joinery' ? (
                                <DoorsWindows />
                            ): ''}

                            { this.state.panel1 === 'Tools & Workwear' ? (
                                <ToolsWorkwear />
                            ): ''}

                        </div>
                    ) : ''}

                    { this.state.panel === 2 ? (
                        <div className={shared.ID + `__panel-1`}>

                            { this.state.panel2 === 'Building Materials' ? (
                                <BuildingMaterials />
                            ): ''}

                            { this.state.panel2 === 'Gardens & Landscaping' ? (
                                <GardensLandscaping />
                            ): ''}

                            { this.state.panel2 === 'Timber' ? (
                                <Timber />
                            ): ''}

                            { this.state.panel2 === 'Doors, Windows & Joinery' ? (
                                <DoorsWindows />
                            ): ''}

                            { this.state.panel2 === 'Tools & Workwear' ? (
                                <ToolsWorkwear />
                            ): ''}

                        </div>
                    ) : ''}

                    { this.state.panel === 3 ? (
                        <div className={shared.ID + `__panel-1`}>
                            { this.state.panel3 === 'Building Materials' ? (
                                <BuildingMaterials />
                            ): ''}

                            { this.state.panel3 === 'Gardens & Landscaping' ? (
                                <GardensLandscaping />
                            ): ''}

                            { this.state.panel3 === 'Timber' ? (
                                <Timber />
                            ): ''}

                            { this.state.panel3 === 'Doors, Windows & Joinery' ? (
                                <DoorsWindows />
                            ): ''}

                            { this.state.panel3 === 'Tools & Workwear' ? (
                                <ToolsWorkwear />
                            ): ''}
                        </div>
                    ) : ''}


                    {/* <div className={ this.state.panel === 1 ? `${shared.ID + '__categories__top__category--selected'}` : `${shared.ID}__categories__top__category`}>

                    </div> */}
                </div>

            </div>
        )
    }
};