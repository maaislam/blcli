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
        this.scrollTo = this.scrollTo.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    };

    // Lifecycle methods & others here

    componentDidMount() {
    };

    scrollTo(destination) {

        if(destination === 'versus') {
            var element = document.querySelectorAll('.HH071_findYourCarer')[1];
            if(element) {
                // element.scrollIntoView({behavior: "smooth", block: "start"});
                if (window.innerWidth <= 450) {
                    document.body.scrollTo({
                        top: element.offsetTop - 200,
                        behavior: 'smooth'
                    })
                } else {
                    window.scrollTo({
                        top: element.offsetTop - 200,
                        behavior: 'smooth'
                    });
                }
                var overlay = document.querySelector(`.${shared.ID}__overlay`);
                overlay ? (
                    overlay.style.top = "100%"
                ) : null;
                fireEvent(`clicked-${destination}`);
            }
        } else if(destination === 'coralWrapper') {
            var element = document.querySelector('.HH071_sliderLiveIn');
            if (element) {
                if (window.innerWidth <= 450) {
                    document.body.scrollTo({
                        top: element.offsetTop + 300,
                        behavior: 'smooth'
                    })
                } else {
                    window.scrollTo({
                        top: element.offsetTop + 200,
                        behavior: 'smooth'
                    });
                }
                var overlay = document.querySelector(`.${shared.ID}__overlay`);
                overlay ? (
                    overlay.style.top = "100%"
                ) : null;
                fireEvent(`clicked-${destination}`); 
            }  
        } else {
            var element = document.querySelector(`.HH071_${destination}`);
            // window.scroll({ top: element, behavior: "smooth"});
            // element.scrollIntoView({behavior: "smooth", block: "start"});
            console.log(element)

            if (window.innerWidth <= 450) {
                document.body.scrollTo({
                    top: element.offsetTop - 200,
                    behavior: 'smooth'
                })
            } else {
                window.scrollTo({
                    top: element.offsetTop - 200,
                    behavior: 'smooth'
                });
            }

            // var previousSibling = element.previousElementSibling;
            // console.log(previousSibling);
            // previousSibling.scrollIntoView({behaviour: "smooth", block: "end"})

            var overlay = document.querySelector(`.${shared.ID}__overlay`);
            overlay ? (
                overlay.style.top = "100%"
            ) : null;
            fireEvent(`clicked-${destination}`);
        }
    };

    closeMenu() {
        var overlay = document.querySelector(`.${shared.ID}__overlay`);
        overlay ? (
            overlay.style.top = "100%"
        ) : null;
    }


    // Render method
    render() {
        return (
            <div className={`${shared.ID}__quick-links`}>
                <div className={`${shared.ID}__quick-links__title`} onClick={this.closeMenu}>
                    <div className={`${shared.ID}__quick-links__title__text`}>Quick Links</div>
                </div>
                <div className={`${shared.ID}__quick-links__main`}>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('whatIsLiveInCare')}}>
                       <span>What is live-in care?</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('costs')}}>
                       <span>Costs of live-in care</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('coralWrapper')}}>
                       <span>What services can we provide?</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('whoAreWe')}}>
                       <span>About Helping Hands</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('findYourCarer')}}>
                       <span>Finding your perfect carer</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('versus')}}>
                       <span>Live-in care vs. care homes</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('conditions')}}>
                       <span>Conditions we care for</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('howToArrange')}}>
                       <span>How to arrange live-in care</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('faqs')}}>
                       <span>Frequently asked questions</span>
                    </div>
                    <div className={`${shared.ID}__quick-links__main__link`} onClick={()=>{this.scrollTo('jobs')}}>
                       <span>Live-in care jobs</span>
                    </div>
                </div>
            </div>
        )
    }
};
