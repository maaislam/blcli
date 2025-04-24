import { h, render, Component } from "preact";
import shared from '../../../../../../core-files/shared';
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events, getCookie } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';
import { womensData, mensData, beautyData, giftsData } from '../data';

export default class ReactComponent extends Component {
    constructor() {
        super();
        this.state = {
            test: 'test',
            pageType: null,
            curations: null,
        };

        // Bind methods here
        this.getPageType = this.getPageType.bind(this);
        this.loadCurations = this.loadCurations.bind(this);
    };

    // Lifecycle methods & others here

    componentDidMount() {
        this.getPageType();
    };

    getPageType() {
       if (window.location.pathname.includes('women')){
           this.setState({
               pageType: 'women',
           }, () => {
               this.loadCurations();
           })
           return;
       }
       if (window.location.pathname.includes('men')){
            this.setState({
                pageType: 'men',
            }, () => {
                this.loadCurations();
            })
            return;
       }
       if (window.location.pathname.includes('homewares')){
            this.setState({
                pageType: 'home-beauty',
            }, () => {
                this.loadCurations();
            })
            return;
       }
       if (window.location.pathname.includes('beauty')){
            this.setState({
                pageType: 'home-beauty',
            }, () => {
                this.loadCurations();
            })
            return;
       }
       if (window.location.pathname.includes('gifts')){
            this.setState({
                pageType: 'gifts',
            }, () => {
                this.loadCurations();
            })
            return;
       }
    };

    loadCurations() {
        if (this.state.pageType === 'women') {
            this.setState({
                curations: womensData
            })
        }
        if (this.state.pageType === 'men') {
            this.setState({
                curations: mensData
            })
        }
        if (this.state.pageType === 'home-beauty') {
            this.setState({
                curations: beautyData
            })
        }
        if (this.state.pageType === 'gifts') {
            this.setState({
                curations: giftsData
            })
        }
    }

    // Render method
    render() {
        return (

            <div>
                { this.state.curations ? (
                    <div className={`${shared.ID}__curation container`}>

                        
                        <h1 className={`${shared.ID}__curation__title`}>CONTINUE BROWSING</h1>
                
                        <a className={`${shared.ID}__curation__item`} href={this.state.curations[0].link} onClick={() => {
                            fireEvent(`click ${this.state.curations[0].title}`)
                        }}>
                            <h1 className={`${shared.ID}__curation__item__title`}>{this.state.curations[0].title}</h1>
                            <img className={`${shared.ID}__curation__item__img`} src={this.state.curations[0].image}/>
                            <div className={`${shared.ID}__curation__item__content`}>{this.state.curations[0].description}</div>
                        </a>
                
                        <a className={`${shared.ID}__curation__item`} href={this.state.curations[1].link} onClick={() => {
                            fireEvent(`click ${this.state.curations[1].title}`)
                        }}>
                            <h1 className={`${shared.ID}__curation__item__title`}>{this.state.curations[1].title}</h1>
                            <img className={`${shared.ID}__curation__item__img`} src={this.state.curations[1].image}/>
                            <div className={`${shared.ID}__curation__item__content`}>{this.state.curations[1].description}</div>
                        </a>
                
                        <a className={`${shared.ID}__curation__item`} href={this.state.curations[2].link} onClick={() => {
                            fireEvent(`click ${this.state.curations[2].title}`)
                        }}>
                            <h1 className={`${shared.ID}__curation__item__title`}>{this.state.curations[2].title}</h1>
                            <img className={`${shared.ID}__curation__item__img`} src={this.state.curations[2].image}/>
                            <div className={`${shared.ID}__curation__item__content`}>{this.state.curations[2].description}</div>
                        </a>
            
                    </div>

                ) : null}
            </div>
        )
    }
};
