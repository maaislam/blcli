import { h, render, Compnt } from 'preact';
import { useState, useEffect, useRef } from "preact/hooks";

export const Buttons = (props) => {
    const { buttonData } = props;

    const buttonRef = useRef();

    const [active, setActive] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
    });

    // useEffect(() => {
    //     setActive({
    //         0: false,
    //         1: false,
    //         2: false,
    //         3: false,
    //     });
    // })

    const toggle = (index) => {
        // Set others to false  
        Object.keys(active).map((key) => {
            active[key] = false;
        })
        active[index] = true;
    }


    return <div className="BV-buttons" ref={buttonRef}>
        {buttonData.map((data, index) => (<button key={index} className={active[index] === true ? 'BV-show' : 'BV-disabled'} onClick={(e) => {
            toggle(index);
            return data.func(e);
        }}>{data.value}</button>))}
    </div>
};