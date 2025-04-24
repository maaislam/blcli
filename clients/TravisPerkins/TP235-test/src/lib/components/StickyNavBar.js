
import {  h, render, Component, createRef } from "preact";
import shared from '../../../../../../core-files/shared';
import { pollerLite } from "../../../../../../lib/uc-lib";
import { fireEvent } from '../../../../../../core-files/services';
import e from "cors";

export default class StickyNav extends Component {
    constructor() {
        super();
        this.state = {
            overView: false,
            techSpecs: false,
            review: false
        };

        //Bind methods here
        this.overViewClick = this.overViewClick.bind(this);
        this.techSpecsClick = this.techSpecsClick.bind(this);
        this.reviewClick = this.reviewClick.bind(this);
    };

    
   
    overViewClick() {
      if(this.state.overView===false){

        this.setState({
            overView: true,
            techSpecs: false,
            review: false
        }) 

          //click to scroll
          const id = `${shared.ID}__overview`;
          const yOffset = -60; 
          const element = document.getElementById(id);
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  
          window.scrollTo({top: y, behavior: 'smooth'});

      }else{
        this.setState({
            overView: false,
        })
      }
        
    };

    techSpecsClick() {
        if(this.state.techSpecs===false){

          
          this.setState({              
              techSpecs: true,
              review: false,
              overView: false
          })

          //click to scroll
          const id = `${shared.ID}__tech-specifications`;
          const yOffset = -50; 
          const element = document.getElementById(id);
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({top: y, behavior: 'smooth'});
          
        }else{
          this.setState({
            techSpecs: false,
          })
        }
          
      };

      reviewClick() {
        if(this.state.review===false){
 
          this.setState({            
              review: true,
              overView: false,
              techSpecs: false,
          })

             //click to scroll
             const id = `${shared.ID}__review`;
             const yOffset = -50; 
             const element = document.getElementById(id);
             const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
 
             window.scrollTo({top: y, behavior: 'smooth'}); 
        }else{
          this.setState({
            review: false,
          })
        }
          
      };

        // Render method
        render() {   
           
            return (                
                <div className={`${shared.ID}__stickyNav`}>                                       
                    <div className={`${this.state.techSpecs ? `stickyNav--item--clicked` : `stickyNav--item`}`} onClick={()=>{this.techSpecsClick()}}>
                        Tech Specs
                        <svg id={`${shared.ID}__techSpecs--tab`} className={`${this.state.techSpecs ? `stickyNav--item--clicked--indicator` : `stickyNav--item--indicator`}`} xmlns="http://www.w3.org/2000/svg" width="16" height="6" viewBox="0 0 16 6" fill="none">
                            <path d="M8 6L0.205773 -5.14524e-07L15.7942 8.48262e-07L8 6Z" fill="#36705A"/>
                        </svg>
                    </div>
                    <div className={`${this.state.overView ? `stickyNav--item--clicked` : `stickyNav--item`}`} onClick={()=>{this.overViewClick()}}>
                        Overview
                        <svg id={`${shared.ID}__overview--tab`} className={`${this.state.overView ? `stickyNav--item--clicked--indicator` : `stickyNav--item--indicator`}`} xmlns="http://www.w3.org/2000/svg" width="16" height="6" viewBox="0 0 16 6" fill="none">
                            <path d="M8 6L0.205773 -5.14524e-07L15.7942 8.48262e-07L8 6Z" fill="#36705A"/>
                        </svg>
                    </div>
                    <div  className={`${this.state.review ? `stickyNav--item--clicked` : `stickyNav--item`}`} onClick={()=>{this.reviewClick()}}>
                        Reviews
                        <svg id={`${shared.ID}__review--tab`} className={`${this.state.review ? `stickyNav--item--clicked--indicator` : `stickyNav--item--indicator`}`} xmlns="http://www.w3.org/2000/svg" width="16" height="6" viewBox="0 0 16 6" fill="none">
                            <path d="M8 6L0.205773 -5.14524e-07L15.7942 8.48262e-07L8 6Z" fill="#36705A"/>
                        </svg>
                    </div>
                           
                </div>

                
            )
        }
};
