import { h, render, Component } from 'preact';
import { useState, useEffect, useRef } from "preact/hooks";
import Controls from '../controls/index';
import { sizeMap } from '../controls/sizeMap';
import { BrandList } from '../selects/brands';
import { Shapes } from '../selects/shapes';
import { Buttons } from '../selects/buttons';
import { CupSizes, BackSizes } from '../selects/sizes';
import { Tooltip } from '../tooltips/index';
import { Banner } from '../components/Banner';
import { 
    findNextCup,
    findPrevCup, 
    findNextBack, 
    findPrevBack, 
    switchCountry,
    runConfetti,
} from '../helpers';
import settings from '../shared';
import { events, getCookie, setCookie, deleteCookie } from '../../../../../../lib/utils';


const { ID, VARIATION } = settings;

export const Stages = (props) => {

    const { storedSizes, reset } = props;

    const [brandCupChange, setBrandCupChange] = useState(0);
    const [brandBackChange, setBrandBackChange] = useState(0);

    const [cupSize, setCupSize] = useState(storedSizes ? storedSizes.cup : null);
    const [backSize, setBackSize] = useState(storedSizes ? storedSizes.back : null);
    const [finalSize, setFinalSize] = useState(null);

    const refWrap = useRef(null);


    // console.log('Changes: ', {
    //     brandBackChange,
    //     brandCupChange,
    //     cupSize,
    //     backSize
    // })

    // Determine country
    let { href } = window.location;
    let countryToUse = 'UK';
    if (href) {
        if (href.indexOf('/us/') > -1) {
            countryToUse = 'US';
        } else {
            countryToUse = 'UK';
        }
    }

    const [country, setCountry] = useState(countryToUse);

    const [stageNumber, setStageNumber] = useState(0);

    const [brand, setBrand] = useState(null);

    
    if (reset) {
        setStageNumber(0);
        setCupSize(null);
        setBackSize(null);
    }



    // Show tooltip?
    const [showTooltip, setShowTooltip] = useState(null);
    const closeTooltip = () => setShowTooltip(null);

    // Store Answers
    const [answers, setAnswers] = useState({
        sixA: null,
        tenA: null,
    });
    
    const [passStages, setPassStages] = useState({
        passStageThree: false,
        passStageFour: false,
        passStageFive: false,
        passStageSix: false,
        passStageSeven: false,
        passStageEight: false,
        passStageEightPartTwo: false, // Q2 / 2
        passStageNine: false,
        passStageNinePartTwo: false, // Q2 / 2
        passStageTen: false,
        passStageTenPartTwo: false, // Q2 / 2
        passStageEleven: false,
    });

    const [secondStage, setSecondStage] = useState(false);

    let eventString = 'BRA-28 Completes Stage ' + stageNumber;
    let labelString = 'BRA-28 User passed stage ' + stageNumber;

    let eventSizeString = 'BRA-28 Size ' + backSize + cupSize;
    let labelSizeString = 'BRA-28 User size is ' + backSize + cupSize;


    let phoneNumberString = "";
    let phoneNumberLink = "";
    let emailHref = "";
    let faqHref = "";
    let phoneTimes = "";

    if(countryToUse == "UK") {
        phoneNumberString = "01926 459 859";
        phoneNumberLink = "tel:01926459859";
        emailHref = "/contact/";
        faqHref = "/help";
        phoneTimes = "Give us a call Monday to Friday 8.30am to 10pm and Saturday and Sunday 9am to 7pm";
    } else {
        phoneNumberString = "+1 8 77 826 3857";
        phoneNumberLink = "tel:+18778263857";
        emailHref = "/us/contact/";
        faqHref = "/us/help";
        phoneTimes = "Give us a call Monday to Friday 8.30am to 10pm and Saturday and Sunday 9am to 5pm.";
    }

    const sendStageEvent = (stageNum) => {
        
        events.send(ID, eventString, labelString);
        if (stageNumber === 11 || stageNumber === 3) { // Final stage
            events.send(ID, eventSizeString, labelSizeString);
        }
        
        
        return;
    }

    // Control Buttons
    const Next = ({text, disabled, customFunc}) => <button className={disabled ? 'BV-disabled BV-button' : 'BV-show BV-button'} onClick={() => {
        sendStageEvent(stageNumber);
        if (customFunc) {
            customFunc();
            !disabled && Controls.next(setStageNumber);
        } else {
            !disabled && Controls.next(setStageNumber);
        }

        setTimeout(() => {
            refWrap.current ? refWrap.current.scrollTop = 0 : null;
        }, 500);

    }}>{text ? text : 'Next'}</button>
    
    const Back = () => <button className="BV-back" onClick={() => {
        Controls.prev(setStageNumber);
        if (stageNumber <= 2) {
            setStageNumber(1);
            setCupSize(null);
            setBackSize(null);
            setBrandCupChange(0);
            setBrandBackChange(0);
        }

    }}>Previous question</button>
    
    const Close = () => {
        Controls.close(setStageNumber);
        setStageNumber(0);
    }
    

    
    /**
     * @description fetches the size config, defaults to US if 'UK' is not passed
     */
    let countrySizes = sizeMap(country);

    
    /**
     * @description The following will incriment/decrease the current cup/back
     * @param {String} currentCup 
     */
    const upCup = (currentCup) => findNextCup(currentCup, countrySizes);
    const upBack = (currentBack) => findNextBack(cupSize, currentBack, countrySizes, setCupSize);

    const downCup = (currentCup) => findPrevCup(currentCup, countrySizes);
    const downBack = (currentBack) => findPrevBack(cupSize, currentBack, countrySizes, setCupSize);


    /**
     * @description The following all update state in specific stages
     * @param {String} chosenCup 
     */
    const updateCup = (chosenCup) => {
        // Reset
        setCupSize(null);    
        
            
        // Has Brand Increase?
        let initCup = chosenCup;
        if (brandCupChange !== 0) {
            if (brandCupChange > 0) {
                // set and go up
                const sizeUp = upCup(chosenCup);
                
                if (typeof sizeUp === 'string') {
                    setCupSize(sizeUp);
                } else {
                    sizeUp.then((res) => setCupSize(res));
                }
                // setCupSize(sizeUp);
            } else {
                // Set and go down
                const sizeDown = downCup(chosenCup);
                

                if (typeof sizeDown === 'string') {
                    setCupSize(sizeDown);
                } else {
                    sizeDown.then((res) => setCupSize(res));
                }
            }
        } else { // Just set
            setCupSize(chosenCup);
        }
        
        
    }
    const updateBack = (chosenBack) => {
        // Reset
        setBackSize(null);
        

        setBackSize(chosenBack);
        
    }
    const updateBrand = (chosenBrand) => setBrand(chosenBrand);

    /**
     * @description Stores brand base settings
     * @param {Element} el 
     */
    const updateBrandSizes = (el) => {
        const target = el;
        if (!target) return;

        if (target.getAttribute('data-cup')) {
            setBrandCupChange(parseInt(target.dataset.cup, 10));
        }

        if (target.getAttribute('data-back')) {
            setBrandBackChange(parseInt(target.dataset.back, 10));
        }
    }



    // Toggle country
    const toggleCountry = () => {
        setCountry(switchCountry(country));
    }
    

    // Progress bar
    const Progress = () => <div className={`BV-stage_bar w-${stageNumber}`}><span>{stageNumber === 8 || stageNumber === 9 ? <span className="BV-nearly">Nearly there!</span> : ''}{stageNumber === 7 ? <span className="BV-nearly">Halfway there!</span> : ''}{stageNumber}/11</span></div>

    // let hasUserSeenQuiz = false;
    // if(getCookie('bra-size-finder-completed')) {

    //     let completedData = JSON.parse(getCookie('bra-size-finder-completed'));
    //     console.log(completedData);

    //     let nowDate = Date.now();
    //     let completedDate = completedData[0].date;

    //     let msec = nowDate - completedDate;
    //     let mins = Math.floor(msec / 60000);
    //     let hrs = Math.floor(mins / 60);
    //     let days = Math.floor(hrs / 24);

    //     let completedDateFormatted = new Date(completedDate);

    //     console.log("Quiz taken: "+completedDateFormatted.getDate()+"-"+completedDateFormatted.getMonth()+"-"+completedDateFormatted.getFullYear());
    //     console.log("time difference: days: "+days+" hours: "+hrs+" mins: "+mins);
    //     console.log("previous bra size: "+completedData[0].quizResult);

    // }
    
    const displayStage = () => {
        switch (stageNumber) {
            case 0:
                
                return <div className="BV-stage BV-stage-1">
                    <div className="BV-wrap">
                        <img class="BV-header-image" src="data:image/jpg;base64,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" alt="bra icon"></img>

                        <h2>We can support you in finding the best size for you!</h2>
    
                        <p>Take our 2 minute quiz to find out what bra size may work best for you.</p>

                        <p><span class="BV-redtext">1.</span> Pop on your favourite, best fitting everyday bra to get the most accurate results</p>
                        <p><span class="BV-redtext">2.</span> Answer questions about how this bra fits you</p>
                        <p><span class="BV-redtext">3.</span> Get your results and enjoy shopping for your best fitting bra!</p>


                        <Next text="Let's Get Started" />
                    </div>
                </div>
                break;
            case 1:
                return <div className="BV-stage BV-stage-2">
                    <Progress />
                    <div className="BV-wrap">
                        <h5>What brand is the bra that you are wearing?</h5>
    
                        <BrandList chooseBrand={updateBrand} updateSizes={updateBrandSizes} />
    
                        <Next disabled={brand ? false : true} />
                        {/* <Back /> */}
                    </div>
                </div>
                break;
            case 2:
                return <div className="BV-stage BV-stage-3">
                    <Progress />
                    <div className="BV-wrap">
                        <h5>What size is it?</h5>
    
                        <BackSizes updateBack={(e) => updateBack(e)} />
    
                        <CupSizes updateCup={(e) => updateCup(e)} country={country} />
    
                        <button className="BV-switch" onClick={toggleCountry}>Switch to {country === 'UK' ? 'US' : 'UK/International'} cup sizes</button>
    
                        <Next disabled={cupSize && backSize ? false : true} customFunc={() => {
                            // Has Brand Increase?

                            events.send(ID, 'BRA-28 Completes Stage 3', 'BRA-28 User passed stage 3 and selected cup size: '+cupSize+' back size: '+backSize);

                            if (brandBackChange !== 0) {
                                if (brandBackChange > 0) {
                                    // set and go up
                                    const sizeUp = upBack(backSize);
                                    setBackSize(sizeUp);
                                    
                                } else {
                                    // Set and go down
                                    const sizeDown = downBack(backSize);
                                    setBackSize(sizeDown);
                                }
                            } 
                        }} />
                        <Back />
                    </div>
                </div>
                break;
            // case 3:
            //     return <div ref={refWrap} className="BV-stage BV-stage-4">
            //         <Progress />
            //         <div className="BV-wrap">
            //             <h5>What shape is it?</h5>
    
            //             <Shapes />
    
            //             <Next />
            //             <Back />
            //         </div>
            //     </div>
            //     break;
            case 3:
                return <div className="BV-stage BV-stage-4">
                    <Progress />
                    <div className="BV-wrap">
                        <h5>Do you ever notice that the backband of your bra rides up?</h5>
                        {!showTooltip && <button className="BV-tooltipBtn" onClick={() => {
                            setShowTooltip(Tooltip('ridesup', closeTooltip));
                        }}>I'd like to see an example</button>}
    
                        {!showTooltip && stageNumber === 3 ? <Buttons key={1} buttonData={[
                            {value: 'Yes',
                            func: () => setPassStages({passStageFour: true})},
                            {value: 'No',
                            func: () => setPassStages({passStageFour: true})}
                        ]} />
                        :
                        showTooltip}
    
                        {!showTooltip && 
                        <div>
                            <Next disabled={passStages.passStageFour ? false : true} />
                            <Back />
                        </div>}
                    </div>
                </div>
                break;
            case 4:
                return <div className="BV-stage BV-stage-5">
                    <Progress />
    
                    <div className="BV-wrap">
                        <p>If you lifted your arms above your head, would the underwires (underneath your boobs) lift away from your body at all?</p>
    
                        {!showTooltip && <button className="BV-tooltipBtn" onClick={() => {
                            setShowTooltip(Tooltip('underwires', closeTooltip));
                        }}>I'd like to see an example</button>}
    
                        {!showTooltip && stageNumber === 4 ? <Buttons key={2} buttonData={[
                            {value: 'Yes',
                            func: () => setPassStages({passStageFive: true})},
                            {value: 'No',
                            func: () => setPassStages({passStageFive: true})}
                        ]} reset={true} />
                        :
                        showTooltip}
    
                        {!showTooltip && 
                        <div>
                            <Next disabled={passStages.passStageFive ? false : true} />
                            <Back />
                        </div>}
                    </div>
                </div>
                break;
            case 5:
                return <div className="BV-stage BV-stage-6">
                    <Progress />
    
                    <div className="BV-wrap">
                        <p>Place your fingers into the backband of the bra underneath your armpit and pull it away from you as far as you can. How far can you pull the bra out?</p>
    
                        <Buttons key={3} buttonData={[
                            {value: '1 inch/2.5cm',
                            func: () => setPassStages({passStageSix: true})}, // Does nothing
                            {value: '2 inch/5cm', // Back -1
                            func: () => {
                                setPassStages({passStageSix: true});
                                if (brandBackChange > -1) {
                                    setBrandBackChange(-1); // Store ref
                                    const thisSetDownBack = downBack(backSize);
                                    if (typeof thisSetDownBack === 'string') {
                                        setBackSize(thisSetDownBack);
                                    } else {
                                        
                                        setBackSize(downBack(backSize));
                                    }
                                }
                            }},
                            {value: '3 inches/7.5cm or more', // Back -2
                            func: () => {
                                setPassStages({passStageSix: true});
                                if (brandBackChange > -2) {
                                    setBrandBackChange(-2); // Store ref
                                    const thisSetDownBack = downBack(backSize);
                                    
                                    if (typeof thisSetDownBack === 'string') {
                                        
                                        let tempBack = downBack(thisSetDownBack);
                                        setBackSize(tempBack);
                                    } else {
                                        setBackSize(downBack(backSize).then((res) => {
                                            setBackSize(downBack(res));
                                        }));
                                    }
                                }
                            }}
                        ]} />
    
                        
                        <Next disabled={passStages.passStageSix ? false : true} customFunc={() => Promise.resolve(backSize).then((res) => setBackSize(res))} />
                        <Back />
                    </div>
                </div>
                break;
            case 6:
                return <div className="BV-stage BV-stage-7">
                    <Progress />
    
                    <div className="BV-wrap">
                        {backSize && <div className="BV-backSuccess">
                            <p>Thank you for your answers! We think the best back size for you is</p>
                            <Banner message={backSize} />
    
                            <p>Now, let’s find out your cup size…</p>
    
                        </div>}
                        <Next text="Okay" disabled={false} />
                        <Back />
                    </div>
                </div>
                break;
            case 7:
                return <div className="BV-stage BV-stage-8">
                    <Progress />
                    
                    <div className="BV-wrap">
                        <p>Look down at the wires in the centre-front of your bra, do they sit flat on your breastbone?</p>
                        {!showTooltip && <button className="BV-tooltipBtn" onClick={() => {
                            setShowTooltip(Tooltip('sitflat', closeTooltip));
                        }}>I'd like to see an example</button>}
    
    
                        {!showTooltip ? <Buttons buttonData={[
                            {value: 'Yes', // Triggers Changes in following questions
                            func: () => {
                                setAnswers({sixA: true});
                                setSecondStage(true);
                                return setPassStages({passStageSeven: true});
                            }},
                            {value: 'No',
                            func: () => {
                                setAnswers({sixA: false});
                                setSecondStage(false);
                                return setPassStages({passStageSeven: true});
                            }}]} />
                        :
                        showTooltip}
    
                        {!showTooltip && 
                        <div>
                            <Next disabled={passStages.passStageSeven ? false : true} />
                            <Back />
                        </div>}
                    </div>
                    
                </div>
                break;
            case 8:
                return <div className="BV-stage BV-stage-8">
                    <Progress />
                    
                    <div className="BV-wrap">
                        {passStages.passStageEightPartTwo || answers.sixA ? 
                        
                        <div>
                            <p>Place your fingers on the end of the underwire (close to your armpit) and press the wires against you gently. Does this feel like you are pressing into your boob or onto your ribs?</p>
    
                            {!showTooltip && <button className="BV-tooltipBtn" onClick={() => {
                                setShowTooltip(Tooltip('pressing', closeTooltip));
                            }}>I'd like to see an example</button>}
    
    
                            {!showTooltip ? <Buttons buttonData={[
                                {value: 'Boobs',
                                func: () => {
                                    if (answers.sixA) {
                                        if (!brandCupChange >= 1) {
                                            setBrandCupChange(brandCupChange + 1);
                                            setCupSize(upCup(cupSize));
                                        }
                                    }
                                    return setPassStages({
                                        passStageEight: true,
                                        passStageEightPartTwo: true
                                    });
                                }},
                                {value: 'Ribs',
                                func: () => setPassStages({
                                    passStageEight: true,
                                    passStageEightPartTwo: true
                                })}
                            ]} /> :
                            showTooltip}
    
                        </div>
                        
                        : // Answered No
                        
                        <div>
                            <p>How far out are they?</p>
    
                            <Buttons buttonData={[
                                {value: '1 inch/2.5cm',
                                func: () => {
             
                                    if (brandCupChange <= 0 || brandCupChange < 1) {
                                        setBrandCupChange(brandCupChange + 1);
                                        setCupSize(upCup(cupSize));
                                    }
                                    return setSecondStage(true)
                                }}, // Cup +1
                                {value: '2 inch/5cm', // Cup +2
                                func: () => {
                               
                                    if (brandCupChange <= 0 || brandCupChange < 2) {
                                        setBrandCupChange(brandCupChange + 2);
                                        let tempSet = upCup(cupSize);
                                        if (typeof tempSet === 'string') {
                                            let tempCup = upCup(tempSet); // Twice
                                            setCupSize(tempCup);
                                        } else {
                                            setCupSize(upCup(cupSize).then((res) => {
                                                return setCupSize(upCup(res));
                                            }));
                                        }
                                    }
                                    return setSecondStage(true)
                                }},
                                {value: '3 inches/7.5cm or more', // Cup +3
                                func: () => {
                                    if (brandCupChange <= 0 || brandCupChange < 3) {
                                        setBrandCupChange(3);

                                        let goUpCup = upCup(cupSize); // Up first time
                                        if (typeof goUpCup === 'string') {
                                            let tempCup = upCup(goUpCup);
                                            tempCup = upCup(tempCup); // Go up three times.
                                            setCupSize(tempCup);
                                        } else {
                                            setCupSize(upCup(cupSize).then((res) => {
                                                setCupSize(upCup(res).then((resTwo) => {
                                                    return setCupSize(upCup(resTwo));
                                                }));
                                            }));
                                        }
                                    }
                                    return setSecondStage(true)
                                }}
                            ]} />
    
                            <button className={!secondStage ? 'BV-disabled BV-button' : 'BV-show BV-button'} onClick={() => setPassStages({passStageEightPartTwo: true})}>Next</button>
                            <Back />
                        </div>
                        }
    
    
                        {!showTooltip && passStages.passStageEightPartTwo && 
                        <div>
                            <Next disabled={passStages.passStageEight ? false : true} />
                            <Back />
                        </div>}
                    </div>
                </div>
                break;
            case 9:
                return <div className="BV-stage BV-stage-9">
                    <Progress />
    
                    <div className="BV-wrap">
                        <p>Look at how the cups are fitting you. Can you see any of your boob overflowing over the edge of the cups?</p>
    
                        <Buttons key={4} buttonData={[
                            {value: 'Yes',
                            func: () => {
                                if (answers.sixA) {
                                    if (!brandCupChange >= 1) {
                                        setBrandCupChange(brandCupChange + 1);
                                        setCupSize(upCup(cupSize));
                                    }
                                }
                                return setPassStages({passStageNinePartTwo: true});
                            }},
                            {value: 'No',
                            func: () => {
                                return setPassStages({passStageNine: true});
                            }},
                        ]} />
    
    
                        {passStages.passStageNinePartTwo && <div>
                            <p>By how much?</p>
                            <Buttons key={5} buttonData={[
                                {value: 'Small overflow',
                                func: () => {
                                    if (answers.sixA) {
                                        if (!brandCupChange >= 1) {
                                            setBrandCupChange(brandCupChange + 1);
                                            setCupSize(upCup(cupSize));
                                        }
                                    }
                                    return setPassStages({passStageNine: true});
                                }},
                                {value: 'Noticeable overflow',
                                func: () => {
                                    if (answers.sixA) {
                                        if (!brandCupChange >= 2) {
                                            setBrandCupChange(brandCupChange + 2);
                                            setCupSize(upCup(cupSize));
                                            setCupSize(upCup(cupSize));
                                        }
                                    }
                                    return setPassStages({passStageNine: true});
                                }}
                            ]}/>
                        </div>}
                        
                        <Next disabled={passStages.passStageNine ? false : true} />
                        <Back />
                    </div>
                </div>
                break;
            case 10:
                return <div className="BV-stage BV-stage-10">
                    <Progress />
                    
                    <div className="BV-wrap">
                        <p>Still looking at the cups, can you see any wrinkling?</p>
    
                        {!showTooltip && <button className="BV-tooltipBtn" onClick={() => {
                            setShowTooltip(Tooltip('wrinkling', closeTooltip));
                        }}>I'd like to see an example</button>}
    
                        {!showTooltip ? <div>
                            <Buttons buttonData={[
                                {value: 'Yes',
                                func: () => {
                                    return setPassStages({passStageTenPartTwo: true});
                                }},
                                {value: 'No',
                                func: () => {
                                    return setPassStages({passStageTen: true});
                                }},
                            ]} />
    
    
                            {passStages.passStageTenPartTwo && <div>
                                {/* <Tip /> */}
                                <p>By how much?</p>
                                <span className="BV-highlight">Tip: Pinch the loose fabric</span>
                                <Buttons buttonData={[
                                    {value: 'Half inch/1cm',
                                    func: () => {
                                        if (answers.sixA) {
                                            if (!brandCupChange <= -1) {
                                                setBrandCupChange(brandCupChange - 1);
                                                setCupSize(downCup(cupSize));
                                            }
                                        }
                                        return setPassStages({passStageTen: true});
                                    }},
                                    {value: '1 inch/2cm',
                                    func: () => {
                                        if (answers.sixA) {
                                            if (!brandCupChange >= 2) {
                                                setBrandCupChange(brandCupChange - 2);
                                                setCupSize(downCup(cupSize));
                                                setCupSize(downCup(cupSize));
                                            }
                                        }
                                        return setPassStages({passStageTen: true});
                                    }}
                                ]}/>
                            </div>}            
                        </div> : showTooltip}
                        
                        {!showTooltip && 
                        <div>
                            <Next disabled={passStages.passStageTen ? false : true} customFunc={() => {

                                
                                let resCupSize = Promise.resolve(cupSize);

                                resCupSize.then((res) => {

                                    // Check final sizes are within the sold sizes
                                    if (res == 'AA' || res == 'A' || res == 'B' || res == 'C') {
                                        setStageNumber(-1);
                                    }
                                    if (backSize >= 40) {
                                        setStageNumber(-1);
                                    }
                                });
                            }} />
                            <Back />
                        </div>}
                    </div>
                </div>
                break;
            case 11:
                events.send(ID, 'BRA-28 Completes Stage 11', 'BRA-28 User passed stage 11');
                let cupSizeToUse = null;
                
                if (brandBackChange !== 0 && brandCupChange === 0) {
                    if (brandBackChange > 0) { // Up Back = -1 cup
                        cupSizeToUse = downCup(cupSize);
                    }
                    if (brandBackChange < 0) { // Down Back = +1 cup
                        cupSizeToUse = upCup(cupSize);
                    }
                } else {
                    cupSizeToUse = cupSize;
                }

                if(getCookie('bra-size-finder-completed')) {
                    deleteCookie('bra-size-finder-completed');
                } 

                let completedSize = backSize + cupSizeToUse;
                let bsizeData = [{date: Date.now(), quizResult: completedSize}];
                setCookie('bra-size-finder-completed', JSON.stringify(bsizeData), 150);
                
                
                return <div className="BV-stage BV-stage-11 BV-final">
                    <div className="BV-wrap"> 
                        {/* <h2>Hooray!</h2> */}
    
                        <p>Based on your answers, we recommend the best bra size for you to try is:</p>
    
                        <div className="BV-successImg">
                            <span className="BV-confetti">&nbsp;</span>
    
                            <img src="data:image/jpeg;base64,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" />
    
                            <span className="BV-confetti">&nbsp;</span>
                        </div>
    
                        <Banner message={[backSize, cupSizeToUse]} animation={true} />
    
                        <p>If you need any further help with sizing, please do get in touch – our friendly and experienced fitters are here to help you. Shop the latest lingerie styles in your size and feel uplifted in every way!</p>
    
                        
                        <Next disabled={false} text="Shop My Size" customFunc={
                            () => {
                                Promise.resolve(cupSizeToUse).then((cupRes) => {
    
                                    Promise.resolve(backSize).then((backRes) => {
                                        const mapDualSizes = {
                                            'd': 'ddd',
                                            'dd': 'ddd',
                                            'e': 'ef',
                                            'f': 'ef',
                                            'ff': 'ffg',
                                            'g': 'ffg',
                                            'gg': 'ggh',
                                            'h': 'ggh',
                                            'hh': 'hhj',
                                            'j': 'hhj',
                                            'jj': 'jjk',
                                            'k': 'jjk',
                                            'kk': 'kkl',
                                            'l': 'kkl'
                                        };
                                        let newString = `https://www.bravissimo.com/collections/all-lingerie/?limit=48&page=1&sortBy=default&f_size[]=${backRes}${mapDualSizes[cupRes.toLowerCase()]}`;
                                        
                                        let string = `https://www.bravissimo.com/${country === 'US' ? 'us/' : ''}collections/all-lingerie/?limit=48&page=1&sortBy=default&f_size[]=${backRes}${cupRes.toLowerCase()}`;
                                        setStageNumber(13);
                                        return string;
                                    }).then((str) => window.location.href = str); 
                                });
                            }
                        } />
    
    
                        <p>If you need any extra help…</p>
                        <div className="l-grid l-grid--wraps">
                            <div className="l-grid__unit">
                                <a id="3TaiGed7wQcsay8caeKYe" label="Phone link" href={phoneNumberLink}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/41lSFn4Pu8kO62KSISgsU4/f471d4b0184c8fb938f24e47ec8185c5/Phone.png?q=80" alt="Phone illustration" height="48"/>
                                            <h2 className="c-channel__title">Phone</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>{phoneTimes}</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="3TaiGed7wQcsay8caeKYe" label="Phone link" className="c-button-link c-button-link--filled c-button-link--small">Call {phoneNumberString}</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                            <div className="l-grid__unit">
                                <a id="3JZaZt0m7YOaY02IcEsmWE" label="Contact link" href={emailHref}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/5ApQWZ3MyIMqEAswSyWAkA/c97d68f0c7240025ff62cfa469aedb3c/email.png?q=80" alt="Email illustration" height="48"/>
                                            <h2 className="c-channel__title">Email</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>Drop us a line and we’ll get back to you as quickly as we can.</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="3JZaZt0m7YOaY02IcEsmWE" label="Contact link" className="c-button-link c-button-link--filled c-button-link--small">Send us an email</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                            <div className="l-grid__unit">
                                <a id="a21vZzSWKk4UEU08ES2U0" label="Faq link" href={faqHref}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/256YvJckWk02sgACemoIsg/41d1f22300e5eaa4ee20cb52cc75b3a5/FAQ.png?q=80" alt="Faqs illustration" height="48"/>
                                            <h2 className="c-channel__title">Faqs</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>All the info you should need about delivery, returns and a whole lot more.</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="a21vZzSWKk4UEU08ES2U0" label="Faq link" className="c-button-link c-button-link--filled c-button-link--small">Browse Faqs</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                break;

            case 12:
                return <div className="BV-stage BV-stage-11">
                    <Progress />
                    
                    <div className="BV-wrap">
                        <h2> Redirecting you... </h2>
                    </div>

                </div>
                break;

            default:
                events.send(ID, 'BRA-28 Completed', 'No results');

                


                return <div className="BV-stage BV-stage-default">
                    <div className="BV-wrap">
                        <h2>We’re Sorry!</h2>
        
                        <p>Based on your answers, we couldn’t work out the best bra size for you this time…</p>

                        <p>We’re confident that we can help you find a bra that’ll fit and support you well, so you can feel uplifted in every way! Please get in touch with our experienced and friendly fitters on {phoneNumberString}, via Live Chat or by email.</p>

                        <div className="l-grid l-grid--wraps">
                            <div className="l-grid__unit">
                                <a id="3TaiGed7wQcsay8caeKYe" label="Phone Link" href={phoneNumberLink}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/41lSFn4Pu8kO62KSISgsU4/f471d4b0184c8fb938f24e47ec8185c5/Phone.png?q=80" alt="Phone illustration" height="48"/>
                                            <h2 className="c-channel__title">Phone</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>{phoneTimes}</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="3TaiGed7wQcsay8caeKYe" label="Phone link" className="c-button-link c-button-link--filled c-button-link--small">Call {phoneNumberString}</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                            <div className="l-grid__unit">
                                <a id="3JZaZt0m7YOaY02IcEsmWE" label="Contact link (test)" href={emailHref}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/5ApQWZ3MyIMqEAswSyWAkA/c97d68f0c7240025ff62cfa469aedb3c/email.png?q=80" alt="Email illustration" height="48"/>
                                            <h2 className="c-channel__title">Email</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>Drop us a line and we’ll get back to you as quickly as we can.</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="3JZaZt0m7YOaY02IcEsmWE" label="Contact link" className="c-button-link c-button-link--filled c-button-link--small">Send us an email</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                            <div className="l-grid__unit">
                                <a id="a21vZzSWKk4UEU08ES2U0" label="Faq link (test)" href={faqHref}>
                                    <section className="c-channel">
                                        <header className="c-channel__header">
                                            <img className="c-channel__img" src="//images.ctfassets.net/bz0fvtkbk5r1/256YvJckWk02sgACemoIsg/41d1f22300e5eaa4ee20cb52cc75b3a5/FAQ.png?q=80" alt="Faqs illustration" height="48"/>
                                            <h2 className="c-channel__title">Faqs</h2>
                                            <div className="c-channel__desc">
                                                <div className="c-markdown">
                                                    <p>All the info you should need about delivery, returns and a whole lot more.</p>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="c-channel__actions">
                                            <div id="a21vZzSWKk4UEU08ES2U0" label="Faq link" className="c-button-link c-button-link--filled c-button-link--small">Browse Faqs</div>
                                        </div>
                                    </section>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                break;
        };
    }

    return <div>
        {displayStage()}
    </div>
}
