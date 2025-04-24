import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';
import MobileBuildingMaterials from './MobileBuildingMaterials';
import MobileGardens from './MobileGardens';
import MobileTimber from './MobileTimber';
import MobileDoors from './MobileDoors';
import MobileTools from './MobileTools';

export default class MobileComponent extends Component {
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
        this.getCategories = this.getCategories.bind(this);
    };

    componentWillMount() {
        setTimeout(() => {
            this.getCategories();
        }, 2000);
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

    render() {
        return (
            <div className={shared.ID + `__mobile-wrap`}>
                <h2>Top Categories</h2>
                <div className={shared.ID + `__mobile__wrapper`}>

                    <div className={shared.ID + `__mobile__wrapper__panel`}>
                    { this.state.panel1 === 'Building Materials' ? (
                            <MobileBuildingMaterials />
                        ): ''}

                        { this.state.panel1 === 'Gardens & Landscaping' ? (
                            <MobileGardens />
                        ): ''}

                        { this.state.panel1 === 'Timber' ? (
                            <MobileTimber />
                        ): ''}

                        { this.state.panel1 === 'Doors, Windows & Joinery' ? (
                            <MobileDoors />
                        ): ''}

                        { this.state.panel1 === 'Tools & Workwear' ? (
                            <MobileTools />
                        ): ''}
                    </div>

                    <div className={shared.ID + `__mobile__wrapper__panel`}>
                    { this.state.panel2 === 'Building Materials' ? (
                            <MobileBuildingMaterials />
                        ): ''}

                        { this.state.panel2 === 'Gardens & Landscaping' ? (
                            <MobileGardens />
                        ): ''}

                        { this.state.panel2 === 'Timber' ? (
                            <MobileTimber />
                        ): ''}

                        { this.state.panel2 === 'Doors, Windows & Joinery' ? (
                            <MobileDoors />
                        ): ''}

                        { this.state.panel2 === 'Tools & Workwear' ? (
                            <MobileTools />
                        ): ''}
                    </div>

                    <div className={shared.ID + `__mobile__wrapper__panel`}>
                    { this.state.panel3 === 'Building Materials' ? (
                            <MobileBuildingMaterials />
                        ): ''}

                        { this.state.panel3 === 'Gardens & Landscaping' ? (
                            <MobileGardens />
                        ): ''}

                        { this.state.panel3 === 'Timber' ? (
                            <MobileTimber />
                        ): ''}

                        { this.state.panel3 === 'Doors, Windows & Joinery' ? (
                            <MobileDoors />
                        ): ''}

                        { this.state.panel3 === 'Tools & Workwear' ? (
                            <MobileTools />
                        ): ''}
                    </div>

                    
                </div>
            </div>
        )
    }
};