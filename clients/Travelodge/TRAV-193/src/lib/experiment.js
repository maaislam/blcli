/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

let allHotels = [
    {
      "hotelcode": "GB0123",
      "hotelname": "Aberdeen Airport",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0114",
      "hotelname": "Aberdeen Bucksburn",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0112",
      "hotelname": "Aberdeen Central",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0847",
      "hotelname": "Aldershot",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0538",
      "hotelname": "Alfreton",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0705",
      "hotelname": "Alton Four Marks",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0250",
      "hotelname": "Altrincham Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0805",
      "hotelname": "Amesbury Stonehenge",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0876",
      "hotelname": "Andover",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0707",
      "hotelname": "Arundel Fontwell",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1201",
      "hotelname": "Arundel Fontwell Park",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0948",
      "hotelname": "Ashbourne",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0756",
      "hotelname": "Ashford",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB2002",
      "hotelname": "Ashford Town Centre",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0331",
      "hotelname": "Ashton Under Lyne",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0862",
      "hotelname": "Aylesbury",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0124",
      "hotelname": "Ayr",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0407",
      "hotelname": "Bangor",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "ES2012",
      "hotelname": "Barcelona Fira",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "ES2014",
      "hotelname": "Barcelona Poblenou",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0526",
      "hotelname": "Barnsley",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0828",
      "hotelname": "Barnstaple",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0536",
      "hotelname": "Barrow In Furness",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0602",
      "hotelname": "Barton Mills",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0702",
      "hotelname": "Barton Stacey",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0759",
      "hotelname": "Basildon",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB1202",
      "hotelname": "Basildon Wickford",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0711",
      "hotelname": "Basingstoke",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0818",
      "hotelname": "Bath Central",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0886",
      "hotelname": "Bath City Centre",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0836",
      "hotelname": "Bath Waterside",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB1203",
      "hotelname": "Beaconsfield Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0808",
      "hotelname": "Beckington",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0775",
      "hotelname": "Bedford",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1204",
      "hotelname": "Bedford Goldington Road",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0709",
      "hotelname": "Bedford Marston Moretaine",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0750",
      "hotelname": "Bedford Wyboston",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0900",
      "hotelname": "Belfast Central",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0328",
      "hotelname": "Berwick upon Tweed",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0523",
      "hotelname": "Bicester",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0532",
      "hotelname": "Bicester Cherwell Valley M40",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0708",
      "hotelname": "Billingshurst Five Oaks",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0584",
      "hotelname": "Birmingham Airport",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1213",
      "hotelname": "Birmingham Castle Bromwich",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0551",
      "hotelname": "Birmingham Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0576",
      "hotelname": "Birmingham Central Broadway Plaza",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0524",
      "hotelname": "Birmingham Central Bull Ring",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0585",
      "hotelname": "Birmingham Central Moor Street",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0951",
      "hotelname": "Birmingham Central Newhall Street",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0516",
      "hotelname": "Birmingham Dudley",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0568",
      "hotelname": "Birmingham Fort Dunlop",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0542",
      "hotelname": "Birmingham Frankley M5 Southbound",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0520",
      "hotelname": "Birmingham Halesowen",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0547",
      "hotelname": "Birmingham Hilton Park M6 Southbound",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1218",
      "hotelname": "Birmingham Kingswinford",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0574",
      "hotelname": "Birmingham Maypole",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0504",
      "hotelname": "Birmingham Oldbury",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0559",
      "hotelname": "Birmingham Perry Barr",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1206",
      "hotelname": "Birmingham Sheldon",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1205",
      "hotelname": "Birmingham Streetly",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0530",
      "hotelname": "Birmingham Sutton Coldfield",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0553",
      "hotelname": "Birmingham Yardley",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0226",
      "hotelname": "Blackburn M65",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0239",
      "hotelname": "Blackpool South Promenade",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0237",
      "hotelname": "Blackpool South Shore",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0541",
      "hotelname": "Blyth A1 (M)",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0827",
      "hotelname": "Bodmin Roche",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0243",
      "hotelname": "Bolton Central River Street",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0933",
      "hotelname": "Borehamwood",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1207",
      "hotelname": "Borehamwood Studio Way",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2088",
      "hotelname": "Boston",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0721",
      "hotelname": "Bournemouth",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB1208",
      "hotelname": "Bournemouth Cooper Dean",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0837",
      "hotelname": "Bournemouth Seafront",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0739",
      "hotelname": "Bracknell",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0932",
      "hotelname": "Bracknell Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0321",
      "hotelname": "Bradford",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0367",
      "hotelname": "Bradford Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0701",
      "hotelname": "Brentwood East Horndon",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0404",
      "hotelname": "Bridgend Pencoed",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0823",
      "hotelname": "Bridgwater M5",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0720",
      "hotelname": "Brighton",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0953",
      "hotelname": "Brighton Seafront",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB2090",
      "hotelname": "Bristol Avonmouth",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0819",
      "hotelname": "Bristol Central",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0832",
      "hotelname": "Bristol Central Mitchell Lane",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0807",
      "hotelname": "Bristol Cribbs Causeway",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2004",
      "hotelname": "Bristol Emersons Green",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0833",
      "hotelname": "Bristol Filton",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0814",
      "hotelname": "Bristol Severn View M48",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0245",
      "hotelname": "Bromborough",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1209",
      "hotelname": "Bromsgrove Marlbrook",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0777",
      "hotelname": "Buckingham",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0725",
      "hotelname": "Burford Cotswolds",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0201",
      "hotelname": "Burnley",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0503",
      "hotelname": "Burton A38 Northbound",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0515",
      "hotelname": "Burton A38 Southbound",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0548",
      "hotelname": "Burton M6 Northbound",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0229",
      "hotelname": "Bury",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0423",
      "hotelname": "Caernarfon",
      "searcharea": "Caernarfon"
    },
    {
      "hotelcode": "GB0402",
      "hotelname": "Caerphilly",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0780",
      "hotelname": "Camberley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0959",
      "hotelname": "Camberley Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0884",
      "hotelname": "Camborne Redruth",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0615",
      "hotelname": "Cambridge Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0613",
      "hotelname": "Cambridge Fourwentways",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0617",
      "hotelname": "Cambridge Newmarket Road",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0616",
      "hotelname": "Cambridge Orchard Park",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0610",
      "hotelname": "Cambridge Swavesey",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0340",
      "hotelname": "Canterbury Chaucer Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0718",
      "hotelname": "Canterbury Whitstable",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1212",
      "hotelname": "Cardiff Airport",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0419",
      "hotelname": "Cardiff Atlantic Wharf",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0413",
      "hotelname": "Cardiff Central",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0425",
      "hotelname": "Cardiff Central Queen Street",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0405",
      "hotelname": "Cardiff Llanedeyrn",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0408",
      "hotelname": "Cardiff M4",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB1211",
      "hotelname": "Cardiff Whitchurch",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0209",
      "hotelname": "Carlisle Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0210",
      "hotelname": "Carlisle M6",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0218",
      "hotelname": "Carlisle Todhills",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0787",
      "hotelname": "Caterham Whyteleafe",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0874",
      "hotelname": "Chatham Maritime",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0945",
      "hotelname": "Chelmsford",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0821",
      "hotelname": "Cheltenham",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0868",
      "hotelname": "Chertsey",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0252",
      "hotelname": "Cheshire Oaks",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0797",
      "hotelname": "Cheshunt",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0410",
      "hotelname": "Chester Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2006",
      "hotelname": "Chester Central Bridge Street",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0406",
      "hotelname": "Chester Northop Hall",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB1214",
      "hotelname": "Chester Warrington Road",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1219",
      "hotelname": "Chester-le-Street",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0525",
      "hotelname": "Chesterfield",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0771",
      "hotelname": "Chichester Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0723",
      "hotelname": "Chichester Emsworth",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1255",
      "hotelname": "Chippenham",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0811",
      "hotelname": "Chippenham Leigh Delamere M4 Eastbound",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0820",
      "hotelname": "Chippenham Leigh Delamere M4 Westbound",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0873",
      "hotelname": "Christchurch",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0822",
      "hotelname": "Cirencester",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0842",
      "hotelname": "Clacton-on-Sea Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0236",
      "hotelname": "Cockermouth",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0744",
      "hotelname": "Colchester Feering",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0424",
      "hotelname": "Colwyn Bay",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "IE1001",
      "hotelname": "Cork Airport",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB1216",
      "hotelname": "Coventry Binley",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0677",
      "hotelname": "Crawley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0230",
      "hotelname": "Crewe",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0207",
      "hotelname": "Crewe Barthomley",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0727",
      "hotelname": "Croydon Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0676",
      "hotelname": "Darlington",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0758",
      "hotelname": "Dartford",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1217",
      "hotelname": "Derby Chaddesden",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0569",
      "hotelname": "Derby Cricket Ground",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0580",
      "hotelname": "Derby Pride Park",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0803",
      "hotelname": "Devizes",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0519",
      "hotelname": "Doncaster",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0336",
      "hotelname": "Doncaster Lakeside",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0317",
      "hotelname": "Doncaster M18/M180",
      "searcharea": "Doncaster"
    },
    {
      "hotelcode": "GB0706",
      "hotelname": "Dorking",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0341",
      "hotelname": "Dover",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0505",
      "hotelname": "Droitwich",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "IE1002",
      "hotelname": "Dublin Airport North 'Swords'",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "IE1008",
      "hotelname": "Dublin Airport South",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "IE1007",
      "hotelname": "Dublin City Centre, Rathmines",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "IE1003",
      "hotelname": "Dublin Phoenix Park",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB1256",
      "hotelname": "Dudley Town Centre",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0100",
      "hotelname": "Dumbarton",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0103",
      "hotelname": "Dumfries",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0122",
      "hotelname": "Dundee Central",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0133",
      "hotelname": "Dundee Strathmore Avenue",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0121",
      "hotelname": "Dunfermline",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0323",
      "hotelname": "Durham",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0839",
      "hotelname": "East Grinstead",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1220",
      "hotelname": "Eastbourne Willingdon Drove",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0849",
      "hotelname": "Eastleigh Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0101",
      "hotelname": "Edinburgh Airport Ratho Station",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0131",
      "hotelname": "Edinburgh Cameron Toll",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0113",
      "hotelname": "Edinburgh Central",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0134",
      "hotelname": "Edinburgh Central Queen Street",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0128",
      "hotelname": "Edinburgh Central Rose Street",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0129",
      "hotelname": "Edinburgh Central Waterloo Place",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0102",
      "hotelname": "Edinburgh Dreghorn",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0935",
      "hotelname": "Edinburgh Haymarket",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB2051",
      "hotelname": "Edinburgh Park",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0865",
      "hotelname": "Egham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0978",
      "hotelname": "Elgin",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0608",
      "hotelname": "Ely",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0448",
      "hotelname": "Epsom Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0815",
      "hotelname": "Exeter M5",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0125",
      "hotelname": "Falkirk",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB2052",
      "hotelname": "Faringdon Oxfordshire",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0946",
      "hotelname": "Farnborough Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1221",
      "hotelname": "Fleet",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0136",
      "hotelname": "Fort William",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB1210",
      "hotelname": "Frimley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB2011",
      "hotelname": "Gainsborough",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "IE1006",
      "hotelname": "Galway City",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0330",
      "hotelname": "Gateshead",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0788",
      "hotelname": "Gatwick Airport Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0115",
      "hotelname": "Glasgow Airport",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0934",
      "hotelname": "Glasgow Braehead",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0111",
      "hotelname": "Glasgow Central",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB2012",
      "hotelname": "Glasgow Govan",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0107",
      "hotelname": "Glasgow Paisley Road",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0137",
      "hotelname": "Glasgow Queen Street",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0829",
      "hotelname": "Glastonbury",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0119",
      "hotelname": "Glenrothes",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0449",
      "hotelname": "Glossop",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0809",
      "hotelname": "Gloucester",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2013",
      "hotelname": "Gosport",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0509",
      "hotelname": "Grantham A1",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0543",
      "hotelname": "Grantham Colsterworth",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0510",
      "hotelname": "Grantham South Witham",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0897",
      "hotelname": "Gravesend",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0925",
      "hotelname": "Great Yarmouth",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0604",
      "hotelname": "Great Yarmouth Acle",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0786",
      "hotelname": "Guildford",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0319",
      "hotelname": "Halifax",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0400",
      "hotelname": "Halkyn",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0772",
      "hotelname": "Harlow",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0326",
      "hotelname": "Harrogate",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0371",
      "hotelname": "Harrogate West Park",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0534",
      "hotelname": "Hartlebury",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0370",
      "hotelname": "Hartlepool Marina",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0792",
      "hotelname": "Hastings",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0732",
      "hotelname": "Hatfield Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB1242",
      "hotelname": "Havant Rowlands Castle",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0678",
      "hotelname": "Haverhill",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0204",
      "hotelname": "Haydock St. Helens",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0826",
      "hotelname": "Hayle",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0746",
      "hotelname": "Heathrow Heston M4 Eastbound",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0737",
      "hotelname": "Heathrow Heston M4 Westbound",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1223",
      "hotelname": "Helensburgh Seafront",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0715",
      "hotelname": "Hellingly Eastbourne",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0747",
      "hotelname": "Hemel Hempstead",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0850",
      "hotelname": "Hemel Hempstead Gateway",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0572",
      "hotelname": "Hereford",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0579",
      "hotelname": "Hereford Grafton",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0722",
      "hotelname": "Hickstead",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0846",
      "hotelname": "High Wycombe Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB2046",
      "hotelname": "Highbridge Burnham-on-Sea",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0417",
      "hotelname": "Holyhead",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0841",
      "hotelname": "Horsham Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0335",
      "hotelname": "Huddersfield",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0944",
      "hotelname": "Hull Central",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0305",
      "hotelname": "Hull South Cave",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0605",
      "hotelname": "Huntingdon Fenstanton",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0806",
      "hotelname": "Ilminster",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0116",
      "hotelname": "Inverness",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0138",
      "hotelname": "Inverness City Centre",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0120",
      "hotelname": "Inverness Fairways",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0674",
      "hotelname": "Ipswich",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0612",
      "hotelname": "Ipswich Beacon Hill",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0606",
      "hotelname": "Ipswich Capel St Mary",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0603",
      "hotelname": "Ipswich Stowmarket",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB1224",
      "hotelname": "Keighley",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0565",
      "hotelname": "Kendal",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2056",
      "hotelname": "Kendal Town Centre",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0557",
      "hotelname": "Kettering",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0527",
      "hotelname": "Kettering Thrapston",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0567",
      "hotelname": "Kidderminster",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0105",
      "hotelname": "Kilmarnock",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0587",
      "hotelname": "Kings Lynn",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0522",
      "hotelname": "Kings Lynn Long Sutton",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0956",
      "hotelname": "Kingston upon Thames Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0108",
      "hotelname": "Kinross M90",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0221",
      "hotelname": "Knutsford M6",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0211",
      "hotelname": "Lancaster M6",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1244",
      "hotelname": "Langley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0767",
      "hotelname": "Leatherhead",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0327",
      "hotelname": "Leeds Bradford Airport",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0315",
      "hotelname": "Leeds Central",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0333",
      "hotelname": "Leeds Central Vicar Lane",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0324",
      "hotelname": "Leeds Colton",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB1225",
      "hotelname": "Leeds Morley",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0561",
      "hotelname": "Leicester Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB2015",
      "hotelname": "Leicester City Centre",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1226",
      "hotelname": "Leicester Hinckley Road",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0544",
      "hotelname": "Leicester Markfield",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0887",
      "hotelname": "Letchworth Garden City",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "IE1009",
      "hotelname": "Limerick Castletroy",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "IE1005",
      "hotelname": "Limerick Ennis Road",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB2016",
      "hotelname": "Lincoln City Centre",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0552",
      "hotelname": "Lincoln Thorpe on the Hill",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0728",
      "hotelname": "Littlehampton Rustington",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1228",
      "hotelname": "Liverpool Aigburth",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0225",
      "hotelname": "Liverpool Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0368",
      "hotelname": "Liverpool Central Exchange Street",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0246",
      "hotelname": "Liverpool Central The Strand",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0227",
      "hotelname": "Liverpool Docks",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2047",
      "hotelname": "Liverpool Edge Lane",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0979",
      "hotelname": "Liverpool John Lennon Airport",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0244",
      "hotelname": "Liverpool Stonedale Park",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1227",
      "hotelname": "Liverpool Stoneycroft",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0118",
      "hotelname": "Livingston",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0450",
      "hotelname": "Llandudno",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0445",
      "hotelname": "Llanelli Central",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0403",
      "hotelname": "Llanelli Cross Hands",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0891",
      "hotelname": "London Acton",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0851",
      "hotelname": "London Balham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0917",
      "hotelname": "London Barking",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0738",
      "hotelname": "London Battersea",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2018",
      "hotelname": "London Beckton",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0878",
      "hotelname": "London Belvedere",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0852",
      "hotelname": "London Bethnal Green",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0880",
      "hotelname": "London Brent Cross",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0972",
      "hotelname": "London Bromley",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0937",
      "hotelname": "London Central Aldgate East",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0793",
      "hotelname": "London Central Bank",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0913",
      "hotelname": "London Central City Road",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2021",
      "hotelname": "London Central Elephant and Castle",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0912",
      "hotelname": "London Central Euston",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0769",
      "hotelname": "London Central Kings Cross",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0782",
      "hotelname": "London Central Marylebone",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0920",
      "hotelname": "London Central Southwark",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0949",
      "hotelname": "London Central Tower Bridge",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0914",
      "hotelname": "London Central Waterloo",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0779",
      "hotelname": "London Chessington Tolworth",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1215",
      "hotelname": "London Chigwell",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0965",
      "hotelname": "London City",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0778",
      "hotelname": "London City Airport",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0853",
      "hotelname": "London Clapham Junction",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0783",
      "hotelname": "London Covent Garden",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0916",
      "hotelname": "London Cricklewood",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0961",
      "hotelname": "London Crystal Palace",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2020",
      "hotelname": "London Dagenham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0964",
      "hotelname": "London Dagenham East",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0960",
      "hotelname": "London Ealing",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0754",
      "hotelname": "London Edmonton",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0854",
      "hotelname": "London Enfield",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0856",
      "hotelname": "London Excel",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0789",
      "hotelname": "London Farringdon",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0795",
      "hotelname": "London Feltham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0875",
      "hotelname": "London Finchley",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0877",
      "hotelname": "London Finsbury Park",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0924",
      "hotelname": "London Fulham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0857",
      "hotelname": "London Greenwich",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0872",
      "hotelname": "London Greenwich High Road",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0871",
      "hotelname": "London Hackney",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0896",
      "hotelname": "London Harrow",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0791",
      "hotelname": "London Hounslow",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0760",
      "hotelname": "London Ilford",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0724",
      "hotelname": "London Ilford Gants Hill",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0761",
      "hotelname": "London Kew Bridge",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0785",
      "hotelname": "London Kings Cross Royal Scot",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0762",
      "hotelname": "London Kingston Upon Thames",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0755",
      "hotelname": "London Liverpool Street",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2025",
      "hotelname": "London Manor House",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2026",
      "hotelname": "London Mile End",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1234",
      "hotelname": "London Northolt",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0749",
      "hotelname": "London Park Royal",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0870",
      "hotelname": "London Raynes Park",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0855",
      "hotelname": "London Richmond Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0768",
      "hotelname": "London Romford",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0879",
      "hotelname": "London Romford The Quadrant",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0858",
      "hotelname": "London Sidcup",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1245",
      "hotelname": "London Snaresbrook",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1246",
      "hotelname": "London South Croydon",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB1247",
      "hotelname": "London Southgate",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0892",
      "hotelname": "London Stockley Park Hayes",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0799",
      "hotelname": "London Stratford",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0859",
      "hotelname": "London Teddington",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0962",
      "hotelname": "London Twickenham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0860",
      "hotelname": "London Vauxhall",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0926",
      "hotelname": "London Walthamstow",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0798",
      "hotelname": "London Wembley",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0866",
      "hotelname": "London Wembley High Road",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0770",
      "hotelname": "London Whetstone",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0714",
      "hotelname": "London Wimbledon Morden",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0881",
      "hotelname": "London Wood Green",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0915",
      "hotelname": "London Woolwich",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0861",
      "hotelname": "Loughborough Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0609",
      "hotelname": "Lowestoft",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0577",
      "hotelname": "Ludlow",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0521",
      "hotelname": "Ludlow Woofferton",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1425",
      "hotelname": "Luton",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0741",
      "hotelname": "Lutterworth",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0251",
      "hotelname": "Lytham St Annes",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0205",
      "hotelname": "Macclesfield Adlington",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0208",
      "hotelname": "Macclesfield Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "ES2015",
      "hotelname": "Madrid Alcala",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "ES2011",
      "hotelname": "Madrid Torrelaguna",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0955",
      "hotelname": "Maidenhead Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0941",
      "hotelname": "Maidstone Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB2066",
      "hotelname": "Maldon",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0228",
      "hotelname": "Manchester Ancoats",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0206",
      "hotelname": "Manchester Birch M62 Eastbound",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0215",
      "hotelname": "Manchester Birch M62 Westbound",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0213",
      "hotelname": "Manchester Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0248",
      "hotelname": "Manchester Central Arena",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0224",
      "hotelname": "Manchester Didsbury",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0255",
      "hotelname": "Manchester Piccadilly",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0256",
      "hotelname": "Manchester Sale",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0242",
      "hotelname": "Manchester Salford Quays",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0233",
      "hotelname": "Manchester Sportcity",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0238",
      "hotelname": "Manchester Trafford Park",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0247",
      "hotelname": "Manchester Upper Brook Street",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0564",
      "hotelname": "Mansfield",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB2067",
      "hotelname": "Mansfield Town Centre",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0773",
      "hotelname": "Margate Westwood",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0337",
      "hotelname": "Market Harborough",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0893",
      "hotelname": "Marlow",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0719",
      "hotelname": "Medway M2",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0975",
      "hotelname": "Melksham",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0939",
      "hotelname": "Merthyr Tydfil",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0307",
      "hotelname": "Middlesbrough",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0216",
      "hotelname": "Middlewich",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1253",
      "hotelname": "Milton Keynes at The Hub",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0743",
      "hotelname": "Milton Keynes Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0765",
      "hotelname": "Milton Keynes Old Stratford",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1229",
      "hotelname": "Milton Keynes Shenley Church End",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0366",
      "hotelname": "Morecambe",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2031",
      "hotelname": "Newark-on-Trent",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0736",
      "hotelname": "Newbury Chieveley M4",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0844",
      "hotelname": "Newbury London Road",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0748",
      "hotelname": "Newbury Tot Hill",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1230",
      "hotelname": "Newcastle Airport",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0320",
      "hotelname": "Newcastle Central",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB1231",
      "hotelname": "Newcastle Gosforth",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0883",
      "hotelname": "Newcastle Quayside",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0314",
      "hotelname": "Newcastle Seaton Burn",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0300",
      "hotelname": "Newcastle Whitemare Pool",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0231",
      "hotelname": "Newcastle-Under-Lyme Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0420",
      "hotelname": "Newport Central",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0418",
      "hotelname": "Newport Isle of Wight",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0942",
      "hotelname": "Newquay Seafront",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0583",
      "hotelname": "Northampton Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1232",
      "hotelname": "Northampton Round Spinney",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0513",
      "hotelname": "Northampton Upton Way",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1233",
      "hotelname": "Northampton Wootton",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0235",
      "hotelname": "Northwich Lostock Gralam",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0618",
      "hotelname": "Norwich Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0620",
      "hotelname": "Norwich Central Riverside",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0611",
      "hotelname": "Norwich Cringleford",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0562",
      "hotelname": "Nottingham Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0556",
      "hotelname": "Nottingham EM Airport Donington Park M1",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0555",
      "hotelname": "Nottingham Riverside",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0546",
      "hotelname": "Nottingham Trowell M1",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1235",
      "hotelname": "Nottingham Wollaton Park",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0535",
      "hotelname": "Nuneaton",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0514",
      "hotelname": "Nuneaton Bedworth",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0800",
      "hotelname": "Okehampton Sourton Cross",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0810",
      "hotelname": "Okehampton Whiddon Down",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB1236",
      "hotelname": "Oldham Chadderton",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0500",
      "hotelname": "Oswestry",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0927",
      "hotelname": "Oxford Abingdon Road",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1169",
      "hotelname": "Oxford Peartree",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0712",
      "hotelname": "Oxford Wheatley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0831",
      "hotelname": "Paignton Seafront",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0318",
      "hotelname": "York Central",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0416",
      "hotelname": "Pembroke Dock",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0200",
      "hotelname": "Penrith",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1237",
      "hotelname": "Perth A9",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0117",
      "hotelname": "Perth Broxden Junction",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB1238",
      "hotelname": "Perth Central",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0600",
      "hotelname": "Peterborough Alwalton",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0619",
      "hotelname": "Peterborough Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0614",
      "hotelname": "Peterborough Eye Green",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0824",
      "hotelname": "Plymouth",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB1239",
      "hotelname": "Plymouth Derriford",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB1240",
      "hotelname": "Plymouth Roborough",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0309",
      "hotelname": "Pontefract Ferrybridge A1 M62",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0446",
      "hotelname": "Poole",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2070",
      "hotelname": "Poole North",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0936",
      "hotelname": "Porthmadog",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0752",
      "hotelname": "Portsmouth",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB2033",
      "hotelname": "Portsmouth City Centre",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1241",
      "hotelname": "Portsmouth Hilsea",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0234",
      "hotelname": "Preston Central",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0212",
      "hotelname": "Preston Chorley",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0717",
      "hotelname": "Ramsgate Seafront",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0751",
      "hotelname": "Reading Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0733",
      "hotelname": "Reading M4 Eastbound",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0740",
      "hotelname": "Reading M4 Westbound",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0710",
      "hotelname": "Reading Whitley",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB1243",
      "hotelname": "Redhill",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0885",
      "hotelname": "Redhill Town Centre",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0507",
      "hotelname": "Retford Markham Moor",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB2034",
      "hotelname": "Rhyl Seafront",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0763",
      "hotelname": "Ringwood",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0976",
      "hotelname": "Rochdale",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2035",
      "hotelname": "Rochester",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0582",
      "hotelname": "Rugby Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0511",
      "hotelname": "Rugby Dunchurch",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0502",
      "hotelname": "Rugeley",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0452",
      "hotelname": "Ryde Isle of Wight",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0812",
      "hotelname": "Saltash",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2073",
      "hotelname": "Sandwich",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0921",
      "hotelname": "Scarborough St Nicholas",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0312",
      "hotelname": "Scotch Corner A1 Southbound",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0301",
      "hotelname": "Scotch Corner Skeeby",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0329",
      "hotelname": "Scunthorpe",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0308",
      "hotelname": "Sedgefield",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0571",
      "hotelname": "Sheffield Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0581",
      "hotelname": "Sheffield Meadowhall",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0537",
      "hotelname": "Sheffield Richmond",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0566",
      "hotelname": "Shrewsbury Battlefield",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0540",
      "hotelname": "Shrewsbury Bayston Hill",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB2036",
      "hotelname": "Sittingbourne",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0302",
      "hotelname": "Skipton",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0528",
      "hotelname": "Sleaford",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0766",
      "hotelname": "Slough",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0974",
      "hotelname": "Solihull",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0745",
      "hotelname": "Southampton",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0869",
      "hotelname": "Southampton Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0713",
      "hotelname": "Southampton Eastleigh",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0774",
      "hotelname": "Southend on Sea",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0253",
      "hotelname": "Southport",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0573",
      "hotelname": "Spalding",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0825",
      "hotelname": "St Austell",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0412",
      "hotelname": "St Clears Carmarthen",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB2075",
      "hotelname": "St Albans City Centre",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0950",
      "hotelname": "Stafford Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0550",
      "hotelname": "Stafford M6",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0796",
      "hotelname": "Stansted Great Dunmow",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0140",
      "hotelname": "Stirling City Centre",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0109",
      "hotelname": "Stirling M80",
      "searcharea": "Scotland"
    },
    {
      "hotelcode": "GB0257",
      "hotelname": "Stockport",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0539",
      "hotelname": "Stoke Talke",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1248",
      "hotelname": "Stoke-on-Trent Trentham",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0816",
      "hotelname": "Stonehouse",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0757",
      "hotelname": "Stoney Cross Lyndhurst",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0554",
      "hotelname": "Stratford Alcester",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0930",
      "hotelname": "Stratford Upon Avon",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0922",
      "hotelname": "Sunbury M3",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0325",
      "hotelname": "Sunderland Central",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0911",
      "hotelname": "Swansea Central",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0409",
      "hotelname": "Swansea M4",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0790",
      "hotelname": "Swindon Central",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0898",
      "hotelname": "Swindon West",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0586",
      "hotelname": "Tamworth Central",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0545",
      "hotelname": "Tamworth M42",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0817",
      "hotelname": "Taunton",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0589",
      "hotelname": "Telford",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0518",
      "hotelname": "Telford Shawbirch",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0843",
      "hotelname": "Tewkesbury",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0731",
      "hotelname": "Thame",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0560",
      "hotelname": "The Regent Hotel Leamington Spa",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0607",
      "hotelname": "Thetford",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0834",
      "hotelname": "Thurrock Lakeside",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0801",
      "hotelname": "Tiverton",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0735",
      "hotelname": "Toddington M1 Southbound",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB0804",
      "hotelname": "Torquay",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0512",
      "hotelname": "Towcester Silverstone",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0952",
      "hotelname": "Tunbridge Wells",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "ES2013",
      "hotelname": "Valencia Aeropuerto",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0970",
      "hotelname": "Wadebridge",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0311",
      "hotelname": "Wakefield Woolley Edge M1 Northbound",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0322",
      "hotelname": "Wakefield Woolley Edge M1 Southbound",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0339",
      "hotelname": "Wallasey New Brighton",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2040",
      "hotelname": "Walsall",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB1250",
      "hotelname": "Walton-On-Thames",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0813",
      "hotelname": "Warminster",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0217",
      "hotelname": "Warrington",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0249",
      "hotelname": "Warrington Gemini",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB1251",
      "hotelname": "Warrington Lowton",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0313",
      "hotelname": "Washington A1(M) Northbound",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0310",
      "hotelname": "Washington A1Services Southbound",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "IE1004",
      "hotelname": "Waterford",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB0781",
      "hotelname": "Watford Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB0533",
      "hotelname": "Wellingborough Rushden",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0838",
      "hotelname": "Wellington Somerset",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2041",
      "hotelname": "Welwyn Garden City",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "GB1254",
      "hotelname": "West Bromwich",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0830",
      "hotelname": "Weston-super-Mare",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0214",
      "hotelname": "Widnes",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0845",
      "hotelname": "Wincanton",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB2080",
      "hotelname": "Winchester",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0784",
      "hotelname": "Windsor Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0867",
      "hotelname": "Winnersh Triangle",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0203",
      "hotelname": "Wirral Eastham",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB2044",
      "hotelname": "Witney",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0863",
      "hotelname": "Woking Central",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0563",
      "hotelname": "Worcester",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB2081",
      "hotelname": "Workington",
      "searcharea": "North%20West"
    },
    {
      "hotelcode": "GB0531",
      "hotelname": "Worksop",
      "searcharea": "Midlands"
    },
    {
      "hotelcode": "GB0840",
      "hotelname": "Worthing Seafront",
      "searcharea": "South%20East"
    },
    {
      "hotelcode": "GB0401",
      "hotelname": "Wrexham",
      "searcharea": "Wales"
    },
    {
      "hotelcode": "GB0802",
      "hotelname": "Yeovil Podimore",
      "searcharea": "South%20West"
    },
    {
      "hotelcode": "GB0332",
      "hotelname": "York Central Layerthorpe",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0304",
      "hotelname": "York Central Micklegate",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB1252",
      "hotelname": "York Hull Road",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB2045",
      "hotelname": "York Monks Cross",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB0306",
      "hotelname": "York Tadcaster",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB2049",
      "hotelname": "Newcastle Cobalt Business Park",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB2079",
      "hotelname": "Walton-on-Thames Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2048",
      "hotelname": "Braintree",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "IE1011",
      "hotelname": "Dublin City Centre",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB2023",
      "hotelname": "London Lewisham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2102",
      "hotelname": "London Docklands Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2027",
      "hotelname": "London Peckham",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2087",
      "hotelname": "Hexham",
      "searcharea": "North%20East"
    },
    {
      "hotelcode": "GB2029",
      "hotelname": "London Wimbledon Central",
      "searcharea": "Greater%20London"
    },
    {
      "hotelcode": "GB2014",
      "hotelname": "Ipswich Central",
      "searcharea": "East%20of%20England"
    },
    {
      "hotelcode": "ES2016",
      "hotelname": "Madrid Coslada Aeropuerto",
      "searcharea": "#N/A"
    },
    {
      "hotelcode": "GB2121",
      "hotelname": "Wellingborough",
      "searcharea": "Midlands"
    }
  ];

const startExperiment = (destination) => {

  document.documentElement.classList.add(`${ID}-experiment-started`);

  let originalHotelRequested = destination;
  originalHotelRequested = originalHotelRequested.replace('Travelodge', '').toLowerCase().trim();

  console.log(originalHotelRequested);

  // let areaToSearch = destination.toLowerCase().replaceAll('travelodge', '');
  // areaToSearch = areaToSearch.split(' ')[0];
  // let encodedAreaToSearch = encodeURIComponent(areaToSearch);

  // console.log("ATC"+areaToSearch);

  let originalHotelRequestedHotelCode = '';
  // allHotels.find(hotel => {
   
  //   if(hotel[1].toLowerCase().indexOf(areaToSearch) > -1) {
  //     originalHotelRequestedHotelCode = hotel[0];
  //   }
    
  // })

  //let allHotelsFiltered = allHotels.filter(hotel => hotel["hotelname"].toLowerCase() == originalHotelRequested);

  let allHotelsFiltered = allHotels.filter((hotel) => {

    if(hotel["hotelname"].toLowerCase() == originalHotelRequested) {
      return true;
    }
    
  });

  console.log(allHotelsFiltered);

  // if(allHotelsFiltered.length > 0) {
  //   allHotelsFiltered = allHotels.filter((hotel) => {
  //     if(hotel[1].toLowerCase() == originalHotelRequested.toLowerCase().replace('travelodge', '').trim()) {
  //       return true;
  //     }
  //   });
  // }
  
  originalHotelRequestedHotelCode = allHotelsFiltered[0].hotelcode;

  console.log("ORG: ",originalHotelRequestedHotelCode);

  // var productApiRequestUrl =
  //   "https://d3a3137ptsskfl.cloudfront.net/getallgroups";

  // let xhr = new XMLHttpRequest();

  // xhr.open('GET', productApiRequestUrl);

  // xhr.responseType = 'json';

  // xhr.send();

  // // the response is {"message": "Hello, world!"}
  // xhr.onload = function () {
  //   let responseObj = xhr.response;
  //   console.log(responseObj);
  // };

  let priceFinderURL = `https://d3a3137ptsskfl.cloudfront.net/group_all/${allHotelsFiltered[0].searcharea}/10-01-2023/10-30-2023`;

  console.log(priceFinderURL);

  let xhr2 = new XMLHttpRequest();

  xhr2.open('GET', priceFinderURL);

  xhr2.responseType = 'json';

  xhr2.send();

  xhr2.onload = function () {
    let responseObj = xhr2.response;
    console.log(responseObj);

    let hotels = responseObj;
    let theHotel = hotels.filter(hotel => hotel.gbCode == originalHotelRequestedHotelCode);

    let theSaverRates = theHotel[0].prices.filter(price => price.rateCode == 'SAV');
    let theBarFlexRates = theHotel[0].prices.filter(price => price.rateCode == 'BAR');

    theSaverRates = theSaverRates.filter(price => price.roomCode == "DBL");
    theSaverRates = theSaverRates.filter(price => price.stopSell == false);

    theSaverRates = theSaverRates.sort((a, b) => { a.date - b.date });

    console.log(theSaverRates);

    let octSeventh = theSaverRates.filter(price => price.date == "2023-10-07T00:00:00");

    console.log("OCT SEVENTH PRICING", octSeventh);

    if(VARIATION == 1) {

      let allCalendarDays = document.querySelectorAll('.ui-datepicker-calendar td[data-handler="selectDay"]:not(.ui-datepicker-other-month)');

      allCalendarDays.forEach((element) => {

        let currDay = element.querySelector('a').innerText;
        if(currDay.length == 1) {
          currDay = '0'+currDay;
        }

        // let currPrice = theSaverRates.find((rate) => { 
        //   console.log(rate);
        //   let rateDay = rate.date.replace('T00:00:00', '').replace('2023-08-', '');
        //   if (rateDay == currDay) {
        //     return rate.price;
        //   }
        // });

        let currPrice = theSaverRates.filter((rate) => {
          let newDate = new Date(rate.date);
          let rateDay = newDate.getDate();
          if (rateDay == currDay) {
            return true;
          } else {
            return false;
          }
        });

        if(currPrice.length > 1) {

          currPrice = currPrice.sort((a, b) => { b.price - a.price });
  
        }

        element.classList.add(`${ID}-priceupdate`);
        if(currPrice.length > 0) {
          element.classList.add(`${ID}-has-rate`);
          element.insertAdjacentHTML('afterbegin', `<span class="${ID}-rate">£${Math.round(currPrice[0].price)}</span>`);
        } else {
          element.classList.add(`${ID}-no-rate`);
          element.insertAdjacentHTML('afterbegin', `<span class="${ID}-rate">N/A</span>`);
        }

        

      });

    }
    

  };

}

export default () => {

  console.log("HELLO2");
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...


 

  document.body.addEventListener("click", function (e) {

    if(e.target.closest('.js-date-picker.fieldCheckIn') || e.target.classList.contains('fieldCheckIn')) {

      let destination = document.querySelector('input[name="location"]').value;
      startExperiment(destination);

    }

  });

  
};
