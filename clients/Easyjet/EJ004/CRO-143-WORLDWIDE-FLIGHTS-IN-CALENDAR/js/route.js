// trigger on test destinations only
// pull off cached WW availability and check resp is not empty
// match date, to date in calendar
// only if cells not selectable
// only if cells not in the past
// add selectable class
// can EJ and WW cell be selected together?
// checkbox checked/unchecked.
// doesnt trigger on market groups
// hovering after dates have already been selected
// work for outbound and inbound

// ACE=CDG
// &AMS=FAO%7CPMO%7CTFS%7CCTA%7CHRG%7CFUE%7COLB
// &ATH=EDI
// &BCN=GLA%7CBFS
// &BDS=LGW
// &BER=FNC%7CCAG%7CACE%7CLPA%7COLB%7CHRG%7CFUE%7CRAK
// &BFS=GVA%7CBCN%7CACE%7CTFS%7CJER%7CNCE%7CKRK
// &BHX=ALC
// &BOD=VCE%7CHAM%7CACE%7CPMI%7CGLA
// &BRI=OLB
// &BRS=NAP%7CKEF%7CBOD%7CCTA
// &BSL=PMO%7CACE%7CHRG
// &CAG=LGW%7CBER
// &CDG=TFS%7CFUE%7CACE%7COLB
// &CTA=AMS%7CMAN%7CNCE%7CNTE
// &EDI=NAP%7CLIS%7CNCE%7C%20ALC%7CKEF%7CPMI%7CJER%7CVCE%7CATH%7CGIB%7CPFO%7CKRK%7CLYS
// &FAO=AMS
// &FCO=MAN%7CNTE
// &GIB=EDI
// &GLA=BCN%7CAYT%7CPMI%7CFAO%7CGVA%7CBOD%7CBER
// &GVA=TFS%7CBFS%7CFUE%7CHRG%7CAYT%7CGLA%7CLPA%7CMLA%7CATH
// &JER=EDI
// &KEF=EDI
// &LGW=TLV%7CCAG%7CBDS%7CBIQ
// &LIS=EDI
// &LTN=PMO%7COLB
// &LYS=ACE%7CEDI%7CTFS%7CFUE%7CCTA%7CCPH%7CBFS
// &MAN=TLV%7CNCE%7CCTA%7COPO%7CFCO
// &MXP=HRG%7CFUE%7CBRS%7CACE%7CSSH
// &NAP=TFS%7CEDI%7CPMI%7CBRS%7CPRG
// &NCE=TFS%7CEDI%7CCTA%7CFAO%7CPMI
// &NTE=FCO%7CTFS%7CCTA%7CBER%7CBRS%7CCPH
// &OLB=CDG%7CBER
// &ORY=PMO%7CATH
// &PMI=NAP%7CNCE%7CGLA
// &PMO=AMS%7CLTN
// &RAK=LTN%7CBER
// &TFS=AMS%7CNAP%7CCDG%7CGVA
// &TLS=GVA%7CVCE%7CFCO
// &TLV=LGW%7CMAN%7CNCE%7CBOD
// &VCE=TLS%7CBOD%7CEDI


// Used mutation observer, but drawer dom wasn't always defined, when go_experiment triggered.

// window["angularEjRootScope"].$on(AngularEj.Events.Names.Drawer.Opened, (params, options) => {
//     // if (angular.element(document.querySelector(".drawer-outer")).controller()._scope.CurrentSection.Key === "routedatepicker") {
//         // console.log("calendar drawer!!!");
//         // activateABTest();
//     // }
// });

// Listen for tab change
// window["angularEjRootScope"].$on(AngularEj.Events.Names.RouteDatePicker.SearchValid, (params, options) => {
//     console.log("hello 1");
//     activateABTest();
// });