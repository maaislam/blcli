// Geet massive object with loads of data based on industry
const arrays = {
    accounting: [
        "Axis Recruitment - Office Support",
        "Accountancy Elite",
        "iMultiply - Finance and Executive Search",
        "TwentyFour Recruitment Group",
        "Oakhill Recruitment - Accountancy & Finance Specialists ",
        "Anne Jagger Recruitment LTD",
        "Sellick Partnership",
        "Accountancy Resourcing Group",
        "Duval Associates",
        "Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS"
    ],

    admin: [
        "Axis Recruitment - Office Support",
        "Get Recruited - UK",
        "Berry Recruitment - Commercial Division",
        "PA London Ltd",
        "Anne Jagger Recruitment LTD",
        "Resolve Recruitment Services - Commercial Division",
        "Duval Associates",
        "Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS",
        "Intro Recruitment Limited",
        "TwentyFour Recruitment Group"
    ],

    agriculture: [
        "All Personnel Recruitment Ltd",
        "Team Support Midlands Ltd",
        "Pure Staff Ltd",
        "LSS Recruitment Services Ltd - construction Division",
        "Vima Professional Placements Ltd",
        "Highbury Recruitment",
        "Richards Events & Recruitment Services Limited",
        "Flexible Solutionz Limited",
        "Multitask Recruitment Solutions",
        "Minstrell Recruitment Ltd "
    ],

    arts: [
        "Get Recruited - Sales & Marketing",
        "Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS",
        "Team Support Midlands Ltd",
        "Absolute Sales & Marketing Specialists",
        "PA London Ltd",
        "Aurora Recruitment",
        "Attic Recruitment Limited",
        "Glu Recruit LTD",
        "Alma Personnel",
        "Executive Headhunters Ltd"
    ],

    automotive: [
        "Electus Recruitment Solutions",
        "D & P Associates",
        "Challender Recruitment - Automotive Specialist",
        "The Advocate Group - Supply Chain Division",
        "Adam Butler Consultancy - Executive Search",
        "Robert Alan Partnership Ltd",
        "Aeropeople Limited",
        "Elite Employee - Technical and Commercial",
        "Recruit Mint Ltd",
        "All Personnel Recruitment Ltd"
    ],

    aviation: [
        "Electus Recruitment Solutions",
        "Aeropeople Limited",
        "D & P Associates",
        "E3 Recruitment (UK) LLP",
        "Intec (UK) Ltd",
        "FINTEC recruit Limited - Engineering & Technical specialists",
        "The Advocate Group - Supply Chain Division",
        "Robert Alan Partnership Ltd",
        "Elite Employee - Technical and Commercial",
        "The Best Connection"
    ],

    banking: [
        'Oakhill Recruitment - Accountancy & Finance Specialists ',
        'Accountancy Resourcing Group',
        'Berry Recruitment - Commercial Division',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'Alma Personnel',
        'PB RECRUITMENT CONSULTANTS LTD',
        'Vima Professional Placements Ltd',
        'Sellick Partnership'
    ],

    biotechnology: [
        'Scintillant Life Sciences',
        'Atom Recruitment Ltd.',
        'Network Scientific Ltd.',
        'ProClinical',
        'Vector Recruitment Limited',
        'Cranleigh Scientific',
        'HW  IT Search & Selection Ltd',
        'Electus Recruitment Solutions',
        'MP Resourcing LTD',
        'The Advocate Group - Supply Chain Division'
    ],

    custservcallcentre: [
        'Get Recruited - UK',
        'Berry Recruitment - Commercial Division',
        'Executive Sales & Marketing Recruitment',
        'Anne Jagger Recruitment LTD',
        'Axis Sales & Marketing Recruitment',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Intro Recruitment Limited',
        'Reiver Recruitment',
        'MP Resourcing LTD',
        'Active Recruiting Consultants Ltd (ARC)'
    ],

    catering: [
        'Berry Recruitment - Catering & Hospitality Division',
        'Catermatch Solutions',
        'Contract Options Catering Division',
        'Ellis Mack Catering',
        'Hospitality & Retail Specialists',
        'Brookes Recruitment Ltd - Hospitality Division',
        'C2 Hospitality Recruitment',
        'KSB Recruitment Consultants Ltd',
        'Ferguson Recruitment - Catering & Hospitality Division',
        'The Best Connection',
        'CEIS Business and Recruitment Services Limited'
    ],

    charity: [
        'Reuben Sinclair - Sales & Marketing Specialists',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Berry Recruitment - Commercial Division',
        'CEIS Business and Recruitment Services Limited',
        'PA London Ltd',
        'JT Recruit Ltd',
        'LinkPoint Resources Limited',
        'RSE Group Ltd',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited'
    ],

    childcare: [
        'Janus Childcare Recruitment ',
        'KPI Care',
        '121 SOCIAL CARE',
        'Top Notch Nannies & Staffing',
        'Service Care - Health & Social Care Division',
        'JEM Childcare Solutions',
        'Flexible Solutionz Limited',
        'Peritus Plus',
        'Le Breton Recruitment - Childcare Specialists ',
        'Team Support Healthcare'
    ],

    construction: [
        'Berry Recruitment - construction & Asbestos Division',
        'Multi Trades Recruitment Ltd',
        'Ram & Sons - construction & Civil Engineer Recruitment',
        'All Personnel Recruitment Ltd',
        'Le Breton Recruitment - construction specialists ',
        'TOK construction Limited',
        'Apex Engineering Solutions Ltd',
        'JSM Specialist Services Limited - construction & Engineering Specialist ',
        'First Choice construction ',
        'LNS construction Recruitment'
    ],

    consulting: [
        'The Advocate Group',
        'Premier Technical Recruitment',
        'Deerfoot IT Recruitment Specialists',
        'The Advocate Group - Headhunting and Senior Appointments',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'HW  IT Search & Selection Ltd',
        'Langley James IT Recruitment',
        'Electus Recruitment Solutions',
        'Reiver Recruitment',
        'MP Resourcing LTD'
    ],

    creative: [
        'Careers In Design (Recruitment) Ltd',
        'VentureTec Ltd - IT Specialist',
        'A1 People',
        'The Advocate Group - FMCG & Fashion Division',
        'TwentyFour - Digital & Creative Division',
        'HW  IT Search & Selection Ltd',
        'Langley James IT Recruitment',
        'construction & Property Recruitment ',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division'
    ],

    defence: [
        'Electus Recruitment Solutions',
        'The Advocate Group - Supply Chain Division',
        'Multi Trades Recruitment Ltd',
        'Elite Employee - Technical and Commercial',
        'Recruit Mint Ltd',
        'Catfoss Engineering Recruitment Ltd',
        'Mana Resourcing Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'Apex Engineering Solutions Ltd'
    ],

    digital: [
        'Deerfoot IT Recruitment Specialists',
        'Langley James IT Recruitment',
        'VentureTec Ltd - IT Specialist',
        'A1 People',
        'Challender IT',
        'Duval Associates',
        'TwentyFour - Digital & Creative Division',
        'HW  IT Search & Selection Ltd',
        'MP Resourcing LTD',
        'Get Recruited - UK'
    ],

    driving: [
        'Berry Recruitment - Driving Division',
        'Multi Trades Recruitment Ltd',
        'EXTRASTAFF LIMITED',
        'The Best Connection',
        'Haul-It Nationwide Ltd',
        'Top Team Personnel',
        'The Best Connection',
        'All Personnel Recruitment Ltd',
        'Jon Morrissey LTD - Driver Recruitment',
        'Totally Recruitment - Industrial & Transport'

    ],

    education: [
        'First 4 Education (UK) Ltd',
        'Mana Resourcing Ltd',
        'Protocol Education',
        'Lynx Education Recruitment Ltd',
        'Milk Education ',
        'Education Staffing Solutions',
        'Beacon Education Ltd',
        'LinkPoint Resources Limited',
        'KPA Recruitment Ltd',
        'Vima Professional Placements Ltd'
    ],

    electronics: [
        'Electus Recruitment Solutions',
        'Elite Employee - Technical and Commercial',
        'Premier Technical Recruitment',
        'Vector Recruitment Limited',
        'MP Resourcing LTD',
        'The Advocate Group - Supply Chain Division',
        'Robert Alan Partnership Ltd',
        'The Best Connection',
        'Berry Technical & I.T. Division',
        'Recruit Mint Ltd'
    ],

    energy: [
        'Electus Recruitment Solutions',
        'Berry Technical & I.T. Division',
        'All Personnel Recruitment Ltd',
        'Catfoss Engineering Recruitment Ltd',
        'Team Support Midlands Ltd',
        'Mana Resourcing Ltd',
        'CEIS Business and Recruitment Services Limited',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd'
    ],

    engineering: [
        'Connect 4 Automotive Recruitment',
        'Aeropeople Limited',
        'Elite Employee - Technical and Commercial',
        'D & P Associates',
        'Premier Technical Recruitment',
        'JSM Specialist Services Limited - construction & Engineering Specialist ',
        'E3 Recruitment (UK) LLP',
        'Manufacturing Recruitment Ltd',
        'Intec (UK) Ltd',
        'FINTEC recruit Limited - Engineering & Technical specialists'
    ],

    environ: [
        'Electus Recruitment Solutions',
        'All Personnel Recruitment Ltd',
        'Team Support Midlands Ltd',
        'CMD RECRUITMENT LIMITED',
        'JT Recruit Ltd',
        'Apex Engineering Solutions Ltd',
        'Network Scientific Ltd.',
        'A1 Jobs',
        'Vima Professional Placements Ltd',
        'Intec (UK) Ltd'
    ],

    executive: [
        'The Advocate Group - Headhunting and Senior Appointments',
        'The Advocate Group',
        'iMultiply - Finance and Executive Search',
        'Vector Recruitment Limited',
        'Executive Headhunters Ltd',
        'The Advocate Group - FMCG & Fashion Division',
        'Duval Associates',
        'Innova Search - (Engineering & Manufacturing Recruitment Specialist)',
        'Reuben Sinclair - Sales & Marketing Specialists',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS'
    ],

    facilitiesmanagement: [
        'Premier Technical Recruitment',
        'The Advocate Group - Supply Chain Division',
        'construction & Property Recruitment ',
        'The Best Connection',
        'Berry Technical & I.T. Division',
        'Recruit Mint Ltd',
        'Totally Recruitment - Industrial & Transport',
        'City Site Solutions Ltd',
        'Team Support Midlands Ltd',
        'Staffstore UK Ltd'
    ],

    fashion: [
        'The Advocate Group - FMCG & Fashion Division',
        'Get Recruited - UK',
        'Berry Recruitment - Commercial Division',
        'Aurora Recruitment',
        'Ellis Mack Catering',
        'Hospitality & Retail Specialists',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'C2 Retail Recruitment',
        'Deluxe Recruitment Ltd',
        'TALENT i Ltd'
    ],

    financialservices: [
        'Accountancy Elite',
        'Active Recruiting Consultants Ltd (ARC)',
        'Get Recruited - UK',
        'Oakhill Recruitment - Accountancy & Finance Specialists ',
        'Accountancy Resourcing Group',
        'Axis Recruitment - Office Support',
        'MP Resourcing LTD',
        'Adam Butler Consultancy - Executive Search',
        'Recruit Mint Ltd',
        'Team Support Midlands Ltd'
    ],

    fmcg: [
        'The Advocate Group - FMCG & Fashion Division',
        'The Advocate Group',
        'Duval Associates',
        'The Advocate Group - Headhunting and Senior Appointments',
        'Axis Recruitment - Office Support',
        'Axis Recruitment - Manufacturing',
        'Innova Search - (Engineering & Manufacturing Recruitment Specialist)',
        'The Best Connection',
        'Berry Technical & I.T. Division',
        'Recruit Mint Ltd'
    ],

    food: [
        'Atom Recruitment Ltd.',
        'Cranleigh Scientific',
        'Food Careers (Food Manufacturing Recruitment) Ltd',
        'The Advocate Group - FMCG & Fashion Division',
        'TwentyFour Recruitment Group',
        'The Advocate Group - Supply Chain Division',
        'The Best Connection',
        'Team Support Midlands Ltd',
        'Pure Staff Ltd',
        'Mana Resourcing Ltd'
    ],

    government: [
        'Axis Recruitment - Office Support',
        'Elite Employee - Technical and Commercial',
        'The Best Connection',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'LSS Recruitment Services Ltd - construction Division',
        'A1 Jobs'
    ],

    graduate: [
        'Get Recruited - UK',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'MP Resourcing LTD',
        'Active Recruiting Consultants Ltd (ARC)',
        'The Advocate Group - Supply Chain Division',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'JT Recruit Ltd',
        'Westray Recruitment Consultants Ltd',
        'Attic Recruitment Limited'
    ],

    headhunting: [
        'The Advocate Group - Headhunting and Senior Appointments',
        'The Advocate Group',
        'Executive Headhunters Ltd',
        'Get Recruited - Sales & Marketing',
        'Electus Recruitment Solutions',
        'Adam Butler Consultancy - Executive Search',
        'Multi Trades Recruitment Ltd',
        'Elite Employee - Technical and Commercial',
        'JT Recruit Ltd',
        'Aurora Recruitment'
    ],

    healthsafety: [
        'Premier Technical Recruitment',
        'Electus Recruitment Solutions',
        'The Advocate Group - Supply Chain Division',
        'construction & Property Recruitment ',
        'Berry Technical & I.T. Division',
        'Recruit Mint Ltd',
        'All Personnel Recruitment Ltd',
        'Totally Recruitment - Industrial & Transport',
        'Team Support Midlands Ltd',
        'Staffstore UK Ltd'
    ],

    health: [
        '1Stop Healthcare ',
        'KPI Care',
        'Vetro Recruitment - Specialist Nursing',
        'Care & Education recruiter',
        'Social Care Direct Recruitment ',
        'Third Hand Healthcare Ltd',
        '121 SOCIAL CARE',
        'RIG Healthcare Recruit',
        'Team Support Healthcare',
        'Innovation Healthcare Recruitment Ltd',
        'Brookes Recruitment Ltd - Healthcare Division'
    ],

    housebuilding: [
        'All Personnel Recruitment Ltd',
        'CEIS Business and Recruitment Services Limited',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'Tradeline Recruitment Ltd',
        'JT Recruit Ltd',
        'Norse Contracting Ltd',
        'Pascal Recruitment Ltd - Procurement',
        'Supply Chain and Logistics',
        'Bromak Recruitment - construction and Housing Specialists',
        'Vima Professional Placements Ltd',
        'FINTEC recruit Limited - Engineering & Technical specialists'
    ],

    industrial: [
        'Berry Recruitment - Industrial and GLA Division',
        'Multi Trades Recruitment Ltd',
        'EXTRASTAFF LIMITED',
        'The Best Connection',
        'Haul-It Nationwide Ltd',
        'Staffbase Recruitment ',
        'Ferguson Recruitment - Catering & Hospitality Division',
        'The Advocate Group - Headhunting and Senior Appointments',
        'Axis Recruitment - Manufacturing',
        'Intro Recruitment Limited'
    ],

    informationindustry: [
        'MP Resourcing LTD',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Mana Resourcing Ltd',
        'Badger Associates Ltd',
        'JT Recruit Ltd',
        'Alma Personnel',
        'AH Recruitment Ltd',
        'Vima Professional Placements Ltd'
    ],

    insurance: [
        'Axis Recruitment - Office Support',
        'Get Recruited - UK',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'LinkPoint Resources Limited',
        'Westray Recruitment Consultants Ltd',
        'Glu Recruit LTD',
        'Alma Personnel'
    ],

    IT: [
        'Deerfoot IT Recruitment Specialists',
        'HW  IT Search & Selection Ltd',
        'Langley James IT Recruitment',
        'IT Recruit UK',
        'Berry Technical & I.T. Division',
        '100% IT Recruitment Ltd',
        'IS Recruitment - IT Specialists',
        'TAG IT Recruitment',
        'VentureTec Ltd - IT Specialist',
        'A1 People'
    ],

    legal: [
        'Service Care - Legal Division',
        'Sellick Partnership',
        'MP Resourcing LTD',
        'Berry Recruitment - Commercial Division',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'LinkPoint Resources Limited',
        'Westray Recruitment Consultants Ltd',
        'Alma Personnel'
    ],

    logistics: [
        'Berry Recruitment - Driving Division',
        'D & P Associates',
        'Premier Technical Recruitment',
        'Logistics Support Network',
        'Haul-It Nationwide Ltd',
        'Pascal Recruitment Ltd - Procurement',
        'Supply Chain and Logistics',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Intro Recruitment Limited',
        'MP Resourcing LTD',
        'The Advocate Group - Supply Chain Division'
    ],

    manufacture: [
        'The Advocate Group',
        'Berry Recruitment - Industrial and GLA Division',
        'Aeropeople Limited',
        'Elite Employee - Technical and Commercial',
        'D & P Associates',
        'Premier Technical Recruitment',
        'Manufacturing Recruitment Ltd',
        'Vector Recruitment Limited',
        'FINTEC recruit Limited - Engineering & Technical specialists',
        'Staffbase Recruitment '
    ],

    marketresearch: [
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Absolute Sales & Marketing Specialists',
        'Badger Associates Ltd',
        'JT Recruit Ltd',
        'Aurora Recruitment',
        'Westray Recruitment Consultants Ltd',
        'Alma Personnel',
        '118 Recruitment Solutions',
        'RSE Group Ltd'
    ],

    marketing: [
        'Axis Sales & Marketing Recruitment',
        'Get Recruited - Sales & Marketing',
        'The Advocate Group',
        'Reuben Sinclair - Sales & Marketing Specialists',
        'Absolute Sales & Marketing Specialists',
        'Aurora Recruitment',
        'Executive Sales & Marketing Recruitment',
        'Resolve Recruitment Services - Commercial Division',
        'Duval Associates',
        'The Advocate Group - Headhunting and Senior Appointments'
    ],

    mediapr: [
        'Absolute Sales & Marketing Specialists',
        'TwentyFour - Digital & Creative Division',
        'MP Resourcing LTD',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Mana Resourcing Ltd',
        'Badger Associates Ltd',
        'JT Recruit Ltd',
        'LinkPoint Resources Limited',
        'Aurora Recruitment'
    ],

    multilingual: [
        'Get Recruited - Sales & Marketing',
        'Appointments Bi-Language',
        'Anne Jagger Recruitment LTD',
        'Intro Recruitment Limited',
        'Berry Recruitment - Commercial Division',
        'JT Recruit Ltd',
        'Aurora Recruitment',
        'Attic Recruitment Limited',
        'Alma Personnel',
        'Manufacturing Recruitment Ltd'
    ],

    notforprofit: [
        'Reuben Sinclair - Sales & Marketing Specialists',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Berry Recruitment - Commercial Division',
        'JT Recruit Ltd',
        'Lynx Employment Ltd',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'Peritus Plus',
        'JMR Consultants',
        'OPR Resourcing'
    ],

    hr: [
        'Get Recruited - UK',
        'Berry Recruitment - Commercial Division',
        'Anne Jagger Recruitment LTD',
        'Amanda Wright Recruitment Ltd',
        'Axis Recruitment - Office Support',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'TwentyFour Recruitment Group',
        'Reiver Recruitment',
        'MP Resourcing LTD',
        'Adam Butler Consultancy - Executive Search'
    ],


    pharm: [
        'Scintillant Life Sciences',
        'Atom Recruitment Ltd.',
        'Network Scientific Ltd.',
        'ProClinical',
        'Cranleigh Scientific',
        'Electus Recruitment Solutions',
        'MP Resourcing LTD',
        'The Advocate Group - Supply Chain Division',
        'The Best Connection',
        'Berry Technical & I.T. Division'
    ],

    pr: [
        'TwentyFour - Digital & Creative Division',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'CMD RECRUITMENT LIMITED',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'Aurora Recruitment',
        'Glu Recruit LTD',
        'Reuben Sinclair - Digital and PR division'
    ],

    printing: [
        'MP Resourcing LTD',
        'The Best Connection',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'Totally Recruitment - Industrial & Transport',
        'Team Support Midlands Ltd',
        'Pure Staff Ltd',
        'Mana Resourcing Ltd',
        'CMD RECRUITMENT LIMITED',
        'JT Recruit Ltd'
    ],


    projectmanagement: [
        'The Advocate Group',
        'D & P Associates',
        'Premier Technical Recruitment',
        'Vector Recruitment Limited',
        'Deerfoot IT Recruitment Specialists',
        'The Advocate Group - Headhunting and Senior Appointments',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'HW  IT Search & Selection Ltd',
        'Electus Recruitment Solutions',
        'MP Resourcing LTD'
    ],

    property: [
        'construction & Property Recruitment ',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'Apex Engineering Solutions Ltd',
        'Attic Recruitment Limited',
        'Alma Personnel',
        'Bromak Recruitment - construction and Housing Specialists',
        'FINTEC recruit Limited - Engineering & Technical specialists',
        'Joanne Finnerty Recruitment Ltd '
    ],


    purchasing: [
        'The Advocate Group',
        'D & P Associates',
        'Premier Technical Recruitment',
        'Pascal Recruitment Ltd - Procurement',
        'Supply Chain and Logistics',
        'Sellick Partnership',
        'Duval Associates',
        'Axis Recruitment - Office Support',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Electus Recruitment Solutions',
        'Reiver Recruitment'
    ],

    rail: [
        'The Advocate Group - Supply Chain Division',
        'Multi Trades Recruitment Ltd',
        'All Personnel Recruitment Ltd',
        'Team Support Midlands Ltd',
        'CEIS Business and Recruitment Services Limited',
        'JT Recruit Ltd',
        'Vima Professional Placements Ltd',
        'Intec (UK) Ltd',
        'Proactive Personnel Ltd',
        'The Advocate Group - Manufacturing Division'
    ],

    recruitment: [
        'Amanda Wright Recruitment Ltd',
        'Absolute Sales & Marketing Specialists',
        'JT Recruit Ltd',
        'Executive Sales & Marketing Recruitment',
        '118 Recruitment Solutions',
        'TSRN UK',
        'Mango Solutions Recruitment Ltd',
        'Flexible Solutionz Limited',
        'VentureTec Ltd - IT Specialist',
        'Proactive Personnel Ltd'
    ],

    retail: [
        'The Advocate Group - FMCG & Fashion Division',
        'Get Recruited - UK',
        'Ellis Mack Catering',
        'Hospitality & Retail Specialists',
        'C2 Retail Recruitment',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'The Advocate Group - Supply Chain Division',
        'The Best Connection',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'CEIS Business and Recruitment Services Limited'
    ],

    sales: [
        'Axis Sales & Marketing Recruitment',
        'Duval Associates',
        'Get Recruited - Sales & Marketing',
        'Reuben Sinclair - Sales & Marketing Specialists',
        'CD Sales Recruitment',
        'Absolute Sales & Marketing Specialists',
        'Aurora Recruitment',
        'Executive Sales & Marketing Recruitment',
        'Resolve Recruitment Services - Commercial Division',
        'The Advocate Group - FMCG & Fashion Division'
    ],

    science: [
        'Scintillant Life Sciences',
        'Network Scientific Ltd.',
        'ProClinical',
        'Cranleigh Scientific',
        'Electus Recruitment Solutions',
        'MP Resourcing LTD',
        'Recruit Mint Ltd',
        'Team Support Midlands Ltd',
        'Mana Resourcing Ltd',
        'Atom Recruitment Ltd.'
    ],

    security: [
        'Electus Recruitment Solutions',
        'The Advocate Group - Supply Chain Division',
        'CEIS Business and Recruitment Services Limited',
        'JT Recruit Ltd',
        'A1 Jobs',
        '118 Recruitment Solutions',
        'RSE Group Ltd',
        'Richards Events & Recruitment Services Limited',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited'
    ],

    shipping: [
        'Axis Recruitment - Manufacturing',
        'Think Specialist Recruitment - OFFICE SUPPORT STAFF EXPERTS',
        'Intro Recruitment Limited',
        'Axis Recruitment - Logistics / Shipping / Supply Chain',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'Team Support Midlands Ltd',
        'Prodrive Recruitment',
        'JT Recruit Ltd',
        'Westray Recruitment Consultants Ltd'
    ],

    socialcare: [
        '1Stop Healthcare ',
        'turro Ltd - Social Care (Senior & Executive Level)',
        'KPI Care',
        'Berry Recruitment - Care Division',
        'Social Care Direct Recruitment ',
        'Third Hand Healthcare Ltd',
        '121 SOCIAL CARE',
        'Team Support Healthcare',
        'Innovation Healthcare Recruitment Ltd',
        'Brookes Recruitment Ltd - Healthcare Division'
    ],

    spabeauty: [
        'Spa Elite - Spa',
        'Medical Aesthetic & Leisure Recruitment',
        'Beauty Recruitment ',
        'SalonSpa Solutions',
        '118 Recruitment Solutions',
        '4Leisure Recruitment Ltd',
        'Denby Professionals ',
        'KSB Recruitment Consultants Ltd',
        'VPss',
        'Veblen International',
        'Otter Recruitment'
    ],

    spaceandsatellite: [
        'Aeropeople Limited',
        'Recruit Mint Ltd',
        'Mana Resourcing Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'Connect Appointments',
        'Stratus Selection Limited',
        'The Works Staffing Solutions',
        'The IC Partnership'
    ],

    sport: [
        'Spa Elite - Spa',
        'Medical Aesthetic & Leisure Recruitment',
        'Beauty Recruitment ',
        'SalonSpa Solutions',
        'JT Recruit Ltd',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'Peritus Plus',
        'Glue Resourcing',
        '4Leisure Recruitment Ltd',
        'HiHo Recruitment Consultants Ltd'
    ],

    tax: [
        'Oakhill Recruitment - Accountancy & Finance Specialists ',
        'Accountancy Resourcing Group',
        'TwentyFour Recruitment Group',
        'Badger Associates Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'PB RECRUITMENT CONSULTANTS LTD',
        'Vima Professional Placements Ltd',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'Peritus Plus'
    ],

    telecoms: [
        'Electus Recruitment Solutions',
        'Axis IT Recruitment',
        'Reuben Sinclair - Sales & Marketing Specialists',
        'The Advocate Group - Supply Chain Division',
        'Berry Technical & I.T. Division',
        'Recruit Mint Ltd',
        'Team Support Midlands Ltd',
        'Hardy Recruitment - Permanent & Contract Staffing Solutions',
        'JT Recruit Ltd',
        'IS Recruitment - IT Specialists'
    ],

    trainingandlearning: [
        'Electus Recruitment Solutions',
        'Recruit Mint Ltd',
        'Berry Recruitment - Commercial Division',
        'Mana Resourcing Ltd',
        'Aurora Recruitment',
        'Westray Recruitment Consultants Ltd',
        'Alma Personnel',
        'Janus Childcare Recruitment ',
        '118 Recruitment Solutions',
        'TSRN UK'
    ],

    travel: [
        'Get Recruited - UK',
        'Axis Recruitment - Office Support',
        'Berry Recruitment - Commercial Division',
        'JT Recruit Ltd',
        'Sarah Harvey Recruitment  Limited',
        'Joanne Finnerty Recruitment Ltd ',
        'Flexible Solutionz Limited',
        'Peritus Plus',
        'Connect Appointments',
        '4Leisure Recruitment Ltd'
    ]
}

export default arrays;