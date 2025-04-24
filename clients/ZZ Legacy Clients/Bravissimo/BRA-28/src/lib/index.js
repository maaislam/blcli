import { h, render, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";
import Controls from './controls/index';
import { Stages } from './stages/index';


const Quiz = (storedSizes) => {

    const [show, setShow] = useState(true);
    
    useEffect(() => {
        return setShow(true);
    });

    const Header = () => (
        <div className="BV-stage_header">
            <h1>Bra Fit Finder</h1>

            <button class="c-action BV-stage_close" onClick={() => { Controls.close(setShow); document.body.classList.remove('BV-noscroll'); }}><span class="c-icon c-icon--dismiss--large c-icon--label-after"><svg class="c-icon__glyph" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 240 240" role="img"><g transform="rotate(45, 120, 120)"><rect x="-20" y="110" width="280" height="24" rx="12"></rect><rect x="110" y="-20" width="24" height="280" rx="12"></rect></g></svg><span class="c-icon__label"><span>Close</span></span></span></button>
        </div>
    )

    
    
    return(
        <div className={show ? 'BRA-28-quiz' : 'BRA-28-quiz BV-Hide'} style={{display: "none"}}>
            <Header />
        
            <Stages reset={!show && true} />
        </div>
    )
}

export const init = (ref) => {
    

    // Check storage


    // Got previously stored size?


    // Dont show again?


    // Detect Country, default to US


    render(<Quiz />, ref);
}

// export default init;