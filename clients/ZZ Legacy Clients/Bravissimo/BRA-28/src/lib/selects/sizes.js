import { h, render, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";
import { Choice } from './choice'; 

const CHOICE_STYLES = {
    wrap: {
        position: "relative",
        width: "32px",
        height: "32px",
        border: "2px solid pink",
        borderRadius: "16px",
        backgroundColor: "transparent",
        transition: "ease all .2s",
        flex: "1",
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
}

export const CupSizes = (props) => {
    const { updateCup, country = 'US' } = props;

    const [USChecked, setUSChecked] = useState(false);

    const [active, setActive] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
    });

    // useEffect(() => {
    //     return Object.keys(active).map((key) => {
    //         active[key] = false;
    //     });
    // }, [active]);

    const toggle = (index) => {
        // Set others to false   
        let tempObj = active;

        Object.keys(active).map((key) => {
            tempObj[key] = false;
        });

        
        tempObj[index] = true;

        setActive({...active, ...tempObj});
    }
    
    return <div className="BV-sizes">
        <p>Now choose your cup size</p>
 
        {country === 'US' ? 
        <div>
            <Choice size="AA" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={0} isChecked={active[0] === true ? true : false} />
            <Choice size="A" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={1} isChecked={active[1] === true ? true : false} />
            <Choice size="B" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={2} isChecked={active[2] === true ? true : false} />
            <Choice size="C" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={3} isChecked={active[3] === true ? true : false} />
            <Choice size="D" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={4} isChecked={active[4] === true ? true : false} />
            <Choice size="DD" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={5} isChecked={active[5] === true ? true : false} />
            <Choice size="E" fakeSize="DDD" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={6} isChecked={active[6] === true ? true : false} />
            <Choice size="F" fakeSize="DDDD" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={7} isChecked={active[7] === true ? true : false} />
            <Choice size="E" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={8} isChecked={active[8] === true ? true : false} />
            <Choice size="F" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={9} isChecked={active[9] === true ? true : false} />
            <Choice size="FF" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={10} isChecked={active[10] === true ? true : false} />
            <Choice size="G" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={11} isChecked={active[11] === true ? true : false} />
            <Choice size="H" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={12} isChecked={active[12] === true ? true : false} />
            <Choice size="I" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={13} isChecked={active[13] === true ? true : false} />
            <Choice size="J" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={14} isChecked={active[14] === true ? true : false} />
            <Choice size="JJ" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={15} isChecked={active[15] === true ? true : false} />
            <Choice size="K" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={16} isChecked={active[16] === true ? true : false} />
            <Choice size="KK" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={17} isChecked={active[17] === true ? true : false} />
            <Choice size="L" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={18} isChecked={active[18] === true ? true : false} />
            <Choice size="M" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={19} isChecked={active[19] === true ? true : false} />
            <Choice size="N" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={20} isChecked={active[20] === true ? true : false} />
            <Choice size="O" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={21} isChecked={active[21] === true ? true : false} />
        </div>
        :
        <div>
            <Choice size="AA" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={0} isChecked={active[0] === true ? true : false} />
            <Choice size="A" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={1} isChecked={active[1] === true ? true : false} />
            <Choice size="B" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={2} isChecked={active[2] === true ? true : false} />
            <Choice size="C" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={3} isChecked={active[3] === true ? true : false} />
            <Choice size="D" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={4} isChecked={active[4] === true ? true : false} />
            <Choice size="DD" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={5} isChecked={active[5] === true ? true : false} />
            <Choice size="E" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={6} isChecked={active[6] === true ? true : false} />
            <Choice size="F" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={7} isChecked={active[7] === true ? true : false} />
            <Choice size="FF" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={8} isChecked={active[8] === true ? true : false} />
            <Choice size="G" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={9} isChecked={active[9] === true ? true : false} />
            <Choice size="GG" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={10} isChecked={active[10] === true ? true : false} />
            <Choice size="H" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={11} isChecked={active[11] === true ? true : false} />
            <Choice size="HH" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={12} isChecked={active[12] === true ? true : false} />
            <Choice size="J" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={13} isChecked={active[13] === true ? true : false} />
            <Choice size="JJ" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={14} isChecked={active[14] === true ? true : false} />
            <Choice size="K" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={15} isChecked={active[15] === true ? true : false} />
            <Choice size="KK" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={16} isChecked={active[16] === true ? true : false} />
            <Choice size="L" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={17} isChecked={active[17] === true ? true : false} />
            <Choice size="M" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={18} isChecked={active[18] === true ? true : false} />
            <Choice size="N" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={19} isChecked={active[19] === true ? true : false} />
            <Choice size="O" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateCup(e)} indexNum={20} isChecked={active[20] === true ? true : false} />
        </div>
        }
    </div>
};


export const BackSizes = (props) => {
    const { updateBack } = props;

    const [backActive, setBackActive] = useState({
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
    });

    // useEffect(() => {
    //     return Object.keys(backActive).map((key) => {
    //         backActive[key] = false;
    //     });
    // }, [backActive]);

    const toggle = (index) => {
        // Set others to false   
        let tempObj = backActive;

        Object.keys(backActive).map((key) => {
            tempObj[key] = false;
        });

        
        tempObj[index] = true;

        setBackActive({...backActive, ...tempObj});
    }
 

    
    
    return <div className="BV-sizes BV-sizes_back">
        <p>First choose your back size</p>
        <div>
            <Choice size="28" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={0} isChecked={backActive[0] === true ? true : false} newName="BV-backSize" />
            <Choice size="30" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={1} isChecked={backActive[1] === true ? true : false} newName="BV-backSize" />
            <Choice size="32" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={2} isChecked={backActive[2] === true ? true : false} newName="BV-backSize" />
            <Choice size="34" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={3} isChecked={backActive[3] === true ? true : false} newName="BV-backSize" />
            <Choice size="36" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={4} isChecked={backActive[4] === true ? true : false} newName="BV-backSize" />
            <Choice size="38" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={5} isChecked={backActive[5] === true ? true : false} newName="BV-backSize" />
            <Choice size="40" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={6} isChecked={backActive[6] === true ? true : false} newName="BV-backSize" />
            <Choice size="42" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={7} isChecked={backActive[7] === true ? true : false} newName="BV-backSize" />
            <Choice size="44" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={8} isChecked={backActive[8] === true ? true : false} newName="BV-backSize" />
            <Choice size="44" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={9} isChecked={backActive[9] === true ? true : false} newName="BV-backSize" />
            <Choice size="46" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={10} isChecked={backActive[10] === true ? true : false} newName="BV-backSize" />
            <Choice size="48" toggleFunc={(key) => toggle(key)} sizeFunction={(e) => updateBack(e)} indexNum={11} isChecked={backActive[11] === true ? true : false} newName="BV-backSize" />
        </div>
    </div>
};