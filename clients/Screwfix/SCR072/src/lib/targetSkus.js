const targetSkus = [
  '668KP',
  '614FL',
  '3712K',
  '230FL',
  '3712k',
  '639FL',
  '156FL',
  '707jg',
  '707JG',
  '2874K',
  '469KP',
  '850KP',
  '5961k',
  '6363k',
  '3208k',
  '830JG',
  '668kp',
  '231jg',
  '4066K',
  '841FL',
  '294kp',
  '860JG',
  '860kp',
  '8810k',
  '5547k',
  '677PR',
  '956jg',
  '4009K',
  '583KP',
  '494kp',
  '529fl',
  '5173K',
  '5173k',
  '7665k',
  '137jn',
  '326JN',
  '746jn',
  '9771k',
  '161KP',
  '912KP',
  '2874k',
  '283JG',
  '4009k',
  '549fl',
  '335pr',
  '746JN',
  '8397k',
  '792pp',
  '67364',
  '635FL',
  '762fl',
  '283jg',
  '1495k',
  '965pp',
  '6620k',
  '529kv',
  '704pp',
  '521pp',
  '830jg',
  '6254k',
  '581jn',
  '449PR',
  '449pr',
  '3744K',
  '944KV',
  '299KP',
  '4172k',
  '3053k',
  '3744k',
  '66917',
  '925KV',
  '894PP',
  '4066k',
  '1515k',
  '886FL',
  '335PR',
  '6453k',
  '56928',
  '860jg',
  '3090X',
  '434kp',
  '6254K',
  '986fl',
  '482jg',
  '8296X',
  '3208K',
  '84658',
  '8810K',
  '571pr',
  '596KP',
  '434KP',
  '294KP',
  '384fl',
  '435jn',
  '9297K',
  '737jn',
  '6453K',
  '775fl',
  '737JN',
  '4200k',
  '674fl',
  '161kp',
  '887kp',
  '8805k',
  '886fl',
  '273fl',
  '3090x',
  '237kp',
  '735pp',
  '106kp',
  '827KP',
  '639fl',
  '677pr',
  '9370k',
  '8122k',
  '862JN',
  '392KP',
  '944kv',
  '481FL',
  '433KP',
  '7114K',
  '3043k',
  '184jg',
  '106fl',
  '956JG',
  '851fl',
  '745kp',
  '1016k',
  '862JN',
  '231JG',
  '3588k',
  '7690k',
  '6064k',
  '2300x',
  '537KP',
  '9297k',
  '7665K',
  '8029k',
  '469kp',
  '299kp',
  '5473k',
  '925kv',
  '1699k',
  '8545k',
  '9771K',
  '850kp',
  '106FL',
  '482JG',
  '435JN',
  '912kp',
  '598kp',
  '2661k',
  '359kp',
  '827kp',
  '3492k',
  '9938k',
  '237KP',
  '5407k',
  '652kp',
  '986KP',
  '1983k',
  '529KV',
  '956JG',
  '508fl',
  '762FL',
  '820fl',
  '380pr',
  '8296x',
  '118kp',
  '719kp',
  '5678k',
  '887KP',
  '5919k',
  '643kp',
  '107JN',
  '107jn',
  '745KP',
  '717jn',
  '701kp',
  '3790K',
  '860JG',
  '476fl',
  '628fl',
  '614fl',
  '798pp',
  '540PP',
  '967pr',
  '835pr',
  '537kp',
  '291KP',
  '41876',
  '392kp',
  '312KP',
  '3790k',
  '5961K',
  '2203k',
  '5378k',
  '489fl',
  '326jn',
  '337KP',
  '1016K',
  '4619k',
  '596kp',
  '657kp',
  '531fl',
  '288fl',
  '559fl',
  '635fl',
  '955fl',
  '540pp',
  '433kp',
  '553kp',
  '581JN',
  '7504k',
  '50455',
  '986kp',
  '7697k',
  '6363K',
  '559FL',
  '630FL',
  '696FL',
  '696fl',
  '207fl',
  '127fl',
  '273FL',
  '357fl',
  '305JG',
  '305jg',
  '3090X',
  '337kp',
  '682kp',
  '137JN',
  '1984k',
  '442kp',
  '92504',
  '7812k',
  '701KP',
  '359KP',
  '6083k',
  '2021k',
  '454fl',
  '577FL',
  '577fl',
  '971fl',
  '895FL',
  '780FL',
  '811fl',
  '504fl',
  '321pp',
  '798PP',
  '894pp',
  '735PP',
  '291kp',
  '868kp',
  '486kp',
  '4116k',
  '4619K',
  '5051k',
  '83803',
  '106KP',
  '373kp',
  '1644k',
  '2125k',
  '5732k',
  '3235k',
  '4200K',
  '922fl',
  '746fl',
  '995fl',
  '481fl',
  '558fl',
  '156fl',
  '265FL',
  '820FL',
  '649pr',
  '7114k',
  '9857k',
  '88380',
  '23483',
  '90876',
  '949fl',
  '792fl',
  '922FL',
  '851FL',
  '746FL',
  '970fl',
  '983fl',
  '727FL',
  '841fl',
  '676fl',
  '778PP',
  '643pp',
  '704PP',
  '2300X',
  '494KP',
  '583kp',
  '8545K',
  '4729k',
  '442KP',
  '82389',
  '657KP',
  '373KP',
  '1557k',
  '847fl',
  '244fl',
  '368fl',
  '727fl',
  '384FL',
  '479FL',
  '780fl',
  '145FL',
  '676FL',
  '265fl',
  '504FL',
  '778pp',
  '643PP',
  '785kp',
  '553KP',
  '868KP',
  '719KP',
  '1016K',
  '1016k',
  '47909',
  '5215k',
  '8122K',
  '6064K',
  '9938K',
  '454FL',
  '894FL',
  '894fl',
  '860jg',
  '678fl',
  '508FL',
  '630fl',
  '726fl',
  '287FL',
  '287fl',
  '824fl',
  '674FL',
  '649PR',
  '967PR',
  '380PR',
  'search',
  '2300X',
  '283jg',
  '583KP',
  '6335K',
  '3208k',
  '717JN',
  '50455',
  '7504K',
  '8029K',
  '32711',
  '312kp',
  '1163k',
  '7690K',
  '8805K',
  '971FL',
  '981fl',
  '368FL',
  '661fl',
  '660FL',
  '747fl',
  '622fl',
  '479fl',
  '207FL',
  '230fl',
  '127FL',
  '357FL',
  '184JG',
  '8296X',
  '830jg',
  '118KP',
  '5678K',
  '3053K',
  '8397K',
  '5407K',
  '1495K',
  '6335k',
  '4116K',
  '652KP',
  '5173k',
  '6453K',
  '5051k',
  '7690k',
  '5215K',
  '2125K',
  '1515K',
  '3235K',
  '7697K',
  '3492K',
  '949FL',
  '489FL',
  '860JG',
  '144fl',
  '718fl',
  '981FL',
  '792FL',
  '135FL',
  '135fl',
  '678FL',
  '995FL',
  '983FL',
  '661FL',
  '660fl',
  '747FL',
  '726FL',
  '824FL',
  '628FL',
  '775FL',
  '529FL',
  '955FL',
  '3712K',
  '571PR',
];

export default targetSkus;
