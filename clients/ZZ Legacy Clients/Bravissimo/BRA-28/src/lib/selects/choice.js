import { h, render, Component } from 'preact';
import { useState, useEffect, useRef } from "preact/hooks";

const CHOICE_STYLES = {
    wrap: {
        position: "relative",
        // width: "32px",
        // height: "32px",
        border: "2px solid pink",
        // borderRadius: "16px",
        backgroundColor: "transparent",
        transition: "ease all .2s",
        // flex: "1",
        // "&:hover": {
        //     backgroundColor: "pink", // Doesn't work but it would be damn good if it did!
        // }
    },
    abs: {
        position: "absolute",
        appearance: "none",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    label: {
        fontSize: "12px",
        textAlign: "center",
        paddingTop: "6px",
        // "&:hover": {
        //     color: "#fff",
        // }
    },
    shape: {
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
    }
}



export const Choice = (props) => {
    const [checked, setChecked] = useState(false);
    const { size, sizeFunction, newName, image, indexNum, toggleFunc, isChecked, isCheckedBack, fakeSize } = props;
    

    setChecked(isChecked);


    const toggle = (e) => {
        if (!e.target) return;
        const { value } = e.target;
        const key = e.target.getAttribute('data-key');
    
        
        if (value) {
            sizeFunction ? sizeFunction(value) : null;
        }
        
        
        toggleFunc(key);

        // Send event of Size/Value
    }

    
    let labelStyles;
    if (image) {
        labelStyles = Object.assign( {}, CHOICE_STYLES.abs, CHOICE_STYLES.label, CHOICE_STYLES.shape );
    } else {
        labelStyles = Object.assign( {}, CHOICE_STYLES.abs, CHOICE_STYLES.label );
    }

    return <div className={checked ? 'BV-button BV-checked' : 'BV-button'}>
        <label for={size}>
            {image ? <img src={image} alt={size} /> : ''}
            <span class="choice-text">{!image && fakeSize ? fakeSize : size}</span>
        </label>
        <input style={CHOICE_STYLES.abs} onChange={toggle} data-key={indexNum} name={newName ? newName : 'BV-radio'} type="radio" className="BV-radio" value={size} />
        {image && <p>{size}</p>}
    </div>;
}