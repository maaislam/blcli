import { fullStory, events } from '../../../../lib/utils';


/**
 * {{NH040}} - {{Predictive Search}}
 */

const Run = () => {
  // National Holidays trackername
  events.setTrackerName('tracker2');
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'NH040',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const searchInput = docVar.getElementById('ctl00_ctl02_txtKeyword');
      const searchElementParent = docVar.getElementById('ctl00_ctl02_pnlKeyword');
      // searchKey and retrieved data reassigned when searching for predicitve terms
      let searchKey;
      // Reassigned when storing array of words
      // eslint-disable-next-line
      let retrievedData = [];
      // Reassigned after markup is added
      let predictedOptions;
      let predictedOptionsContainer;

      return {
        docVar,
        bodyVar,
        searchInput,
        retrievedData,
        searchKey,
        searchElementParent,
        predictedOptions,
        predictedOptionsContainer,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Insert markup
        Exp.render.predictedWordsContainer();
        // Markup added, store selectors
        Exp.cache.predictedOptions = Exp.cache.bodyVar.querySelectorAll('.NH040_Predicted_Word');
        Exp.cache.predictedOptionsContainer = Exp.cache.bodyVar.querySelector('.NH040_Predicted_Words_Container');
        // Add Functionality to predicted words
        Exp.predictSearchTerms.searchTermFunction();
        // Add search term prediction
        Exp.predictSearchTerms.generateSearchKey();
      },
    },
    render: {
      predictedWordsContainer() {
        Exp.cache.searchElementParent.insertAdjacentHTML('beforeend', `
        <div class="NH040_Predicted_Words_Container">
          <span class="NH040_Predicted_Word NH040_Active" data-NH040-Active="0"></span>
          <span class="NH040_Predicted_Word" data-NH040-Active="1"></span>
          <span class="NH040_Predicted_Word" data-NH040-Active="2"></span>
        </div>
        `);
      },
    },
    predictSearchTerms: {
      generateSearchKey() {
        Exp.cache.searchInput.addEventListener('keyup', (e) => {
          // Store value as search term
          const searchTerm = e.target.value.toUpperCase();
          const keyboardCode = e.keyCode;
          /* Create temp search key using first character of input,
          if cached key is different from temp key, reassign cached key
          and if temp key matches regex for alphabet characters
          Retrieve array of words starting with tempSearchKey
          Only update the array if search key changes
          */
          const tempSearchKey = searchTerm.charAt([0]).toUpperCase();
          // Validate temp search key, used in multiple conditions
          let validAlphabetCharacter = false;
          if (/^[A-Z]$/.test(tempSearchKey)) {
            validAlphabetCharacter = true;
          }
          if (Exp.cache.searchKey !== tempSearchKey && validAlphabetCharacter) {
            // Reassign cached key and retrieve array of predicted words
            Exp.cache.searchKey = tempSearchKey;
            Exp.predictSearchTerms.retrievePredictedWords(Exp.cache.searchKey);
            /* Predicted words will not be generated unless all three occur
            The search term is greater than 3 characters
            The retrieved data array is greater than 0
            The first character is a valid alphabet character
            */
            // Next line exceeds length
            // eslint-disable-next-line
          } else if (searchTerm.length > 2 && Exp.cache.retrievedData.length > 0 && validAlphabetCharacter) {
            this.createPredictedWords(searchTerm);
            this.handleKeyboardEvent(keyboardCode);
            // Display word predictions
            Exp.cache.predictedOptionsContainer.classList.add('NH040_Show_Prediction');
            // If search term length is less than 3 then hide the predicted search words
          } else if (searchTerm.length <= 2) {
            Exp.cache.predictedOptionsContainer.classList.remove('NH040_Show_Prediction');
            // Clear previous predictions
            this.resetPreviousPredictions();
          }
        });
      },
      retrievePredictedWords(generatedSearchKey) {
        const searchTerms = {
          A: ['A TASTE OF THE OCEAN', 'A NIGHT AT THE WOOLPACK', 'A TASTE OF OCEAN CRUISING', 'ABBAMANIA', 'ABERDEEN', 'ADAM LAMBERT', 'ADELPHI HOTEL', 'AIR SHOW', 'ALADDIN', 'ALFIE', 'ALTON TOWERS', 'ALTON TOWERS SUMMER SPECTACULAR', 'AMSTERDAM', 'ANDERTON BOAT LIFT', 'ANDORRA', 'ANDRE', 'AUSTRIA', 'AUSTRIA AND SWITZERLAND', 'AUSTRIAN TYROL', 'AYRSHIRE COAST'],
          B: ['BARRY MANILOW', 'BARRY STEELE AS ROY ORBISON TRIBUTE', 'BATH', 'BATH OXFORD', 'BBC GOOD FOOD', 'BEAMISH', 'BEAMISH HOLY ISLAND', 'BEATLES TRIBUTE', 'BEATLES TRIBUTE NIGHT. ADELPHI HOTEL', 'BEAUTIFUL BROADWAY', 'BEAUTIFUL SCOTLAND', 'BEAUTIFUL LAKE COMO INCLUSIVE SPECTACULAR', 'BELGIUM', 'BENIDORM', 'BERLIN', 'BLACK FOREST', 'BLACKPOOL', 'BLACKPOOL ILLUMINATIONS', 'BLACKPOOL SAVOY', 'BLACKPOOL AIR SHOW', 'BLETCHLEY PARK', 'BLUE PLANET', 'BLUEBELL', 'BON JOVI', 'BOSWORTH HALL', 'BOURNEMOUTH', 'BRIGHOUSE', 'BRIGHTON', 'BRITAIN', 'BRITISH TOURING CAR CHAMPIONSHIP', 'BRITNEY SPEARS', 'BRUGES', 'BRUSSELS', 'BUCKINGHAM PALACE', 'BUDAPEST', 'BURSTIN HOTEL', 'BURY MARKET', 'BURY MARKET MORECOMBAY', 'BUXTON', 'BUXTON AT THE PALACE'],
          C: ['CADBURYS', 'CANNON', 'CARNIVAL', 'CBEEBIES LAND ', 'CHATSWORTH', 'CHESTER', 'CHESTER ZOO', 'CHOCOLATE LOVERS WEEKEND', 'CHRISTMAS', 'CHRISTMAS MARKETS', 'CLAYMORE', 'COLOGNE', 'CORNWALL', 'CORONATION STREET', 'COSFORD', 'COSTA BRAVA', 'COTSWOLDS', 'COUNTRYFILE', 'CRAFTS FOR CHRISTMAS'],
          D: ['DIANA', 'DIKSMUIDE', 'DISNEYLAND PARIS', 'DUBLIN', 'DURHAM', 'DURHAM AND WHITBY'],
          E: ['EASTBOURNE SUMMER SPECIAL', 'EDINBURGH', 'EDINBURGH TATTOO', 'EDINBURGH ZOO', 'ELVIS', 'EMMERDALE STUDIO EXPERIENCE', 'ENGLAND', 'ETERNAL ROME', 'EUROPE'],
          F: ['F1 SPECTACULAR', 'FAITH', 'FARNBOROUGH AIR SHOW', 'FESTIVAL OF QUILTS', 'FLAMINGO LAND', 'FLOWER FESTIVAL', 'FLYING SCOTSMAN', 'FLYWHEEL', 'FOLKESTONE', 'FOLKESTONE BRUGES', 'FOODIES', 'FRANCE'],
          G: ['GERMANY', 'GIN', 'GLACIER EXPRESS', 'GOODWOOD', 'GRAND NATIONAL', 'GRASSINGTON', 'GREATEST SHOW', 'GUERNSEY'],
          H: ['HAMPTON COURT FLOWER SHOW', 'HARRY POTTER', 'HAWORTH', 'HEREFORD', 'HIGHLAND SPECTACULAR', 'HIGHLAND STEAM', 'HIGHLANDS', 'HOBBYCRAFT', 'HORSE OF THE YEAR 2018'],
          I: ['IL DIVO', 'ILFRACOMBE INCLUSIVE SPECIAL', 'INCLUSIVE', 'IRELAND', 'IRONBRIDGE GORGE', 'ISLE OF BUTE', 'ISLE OF WHITE', 'ITALIAN RIVIERA', 'ITALY'],
          J: ['JANE MCDONALD', 'JERSEY', 'JOHN EDWARD'],
          K: ['KINKY', 'KNEBWORTH CLASSIC CAR SHOW', 'KNITTING', 'KYLIE', 'KYNREN'],
          L: ['LAK GARDA', 'LAKE COMO', 'LAKE GARDA', 'LAKES', 'LEAMINGTON SPA', 'LEEDS', 'LEEDS CITY BREAK', 'LEGO', 'LEGOLAND', 'LIBERTY', 'LION KING', 'LIONEL', 'LIONEL RICHIE', 'LITTLE MIX', 'LIVERPOOL', 'LIVERPOOL FC STADIUM TOUR', 'LLANDUDNO', 'LLORET DE MAR', 'LOCH LOMOND', 'LONDON', 'LONGLEAT'],
          M: ['MADNESS', 'MAGIC MIKE', 'MAMMA MIA', 'MARIAH CAREY', 'MATILDA', 'MATLOCK BATH ILLUMINATIONS', 'MELROSE SPECTACULAR', 'MINI CRUISE', 'MOTOWN THE MUSICAL', 'MYSTERY WEEKEND SPECIAL'],
          N: ['NEW YEAR', 'NEWCASTLE', 'NEWQUAY', 'NILE RODGER', 'NOEL GALLAGHER', 'NORBREK', 'NORFOLK', 'NORTH YORK MOORS', 'NOTTINGHAM CITY'],
          O: ['OBAN', 'OPERATION MARKET GARDEN', 'OXFORD', 'OYSTER FESTIVAL'],
          P: ['PARIS', 'PEAK DISTRICT', 'PEPPA PIG WORLD', 'PHANTOM', 'PHANTOM OF THE OPERA', 'PIRATE', 'POLAND', 'PRAGUE', 'PRAGUE BUDAPEST', 'PRIX DE', 'PROSECCO', 'PUB IN THE PARK', 'PUB IN'],
          Q: ['QUEEN'],
          R: ['RHINE', 'RHYL', 'RICK ASTLEY', 'ROME', 'ROSAS', 'ROYAL INTERNATIONAL'],
          S: ['SAFARI', 'SAN MARINO', 'SANDOWN', 'SANDRINGHAM', 'SANTA SUSANNA', 'SCARBOROUGH', 'SCHOOL OF ROCK', 'SCOTLAND', 'SHANIA', 'SHANKLIN', 'SHANKLIN BEACH', 'SHANKLIN BEACH HOTEL', 'SKEGNESS', 'SKIPTON', 'SOUTH SHIELDS', 'SOUTHPORT', 'SOUTHPORT FLOWER SHOW', 'SPAIN', 'ST IVES HOTEL', 'STEPS', 'STRATFORD', 'STRICTLY', 'SWITZERLAND'],
          T: ['TASTE OF ITALY', 'TATTON PARK FLOWER SHOW', 'TAYLOR SWIFT', 'TENBY', 'TERRACOTTA', 'TERRACOTTA WARRIORS', 'THE GREAT BRITISH FOOD FESTIVAL', 'THE GREAT YORKSHIRE', 'THE GREAT YORKSHIRE SHOW', 'THE GREATEST SHOW', 'THE LAKES', 'THE LION KING', 'THE ROYAL ESPLANADE HOTEL', 'THE GREAT BRITISH FOOD FESTIVAL', 'THE GREATEST', 'THE LAKES', 'THORPE PARK', 'THURSFORD', 'THURSFORD', 'TINA', 'TOM KERRIDGE', 'TORQUAY', 'TUSCAN', 'TUSCAN INCLUSIVE', 'TUSCANY COAST', 'TWIXMAS', 'TWYCROSS ZOO'],
          V: ['VALKENBURG', 'VERONA', 'VERONA OPERA AND LAKE GARDA', 'VERSAILLES'],
          W: ['WALES', 'WARTIME FESTIVAL', 'WARWICK', 'WARWICK CASTLE', 'WATERFORD', 'WEMBLEY', 'WESTON', 'WESTON SUPER MARE', 'WEYMOUTH', 'WHITBY', 'WHITBY REGATTA', 'WINDSOR', 'WOLVERHAMPTON'],
          X: ['XMAS MARKETS'],
          Y: ['YARMOUTH', 'YARMOUTH NORFOLK BROADS', 'YORK', 'YORKSHIRE DALES'],
          Z: ['ZOO'],
        };
        // Check if key matches search terms, assign blank array if not
        if (searchTerms[generatedSearchKey]) {
          Exp.cache.retrievedData = searchTerms[generatedSearchKey];
        } else {
          Exp.cache.retrievedData = [];
        }
      },
      resetPreviousPredictions() {
        // Remove display styling class to prevent outdated words displaying
        // reset active predictive word
        for (let i = 0; i < Exp.cache.predictedOptions.length; i += 1) {
          Exp.cache.predictedOptions[i].classList.remove('NH040_Predicted_Word_Display');
          Exp.cache.predictedOptions[i].classList.remove('NH040_Active');
          Exp.cache.predictedOptions[i].textContent = '';
        }
        // Add active class to first element
        Exp.cache.predictedOptions[0].classList.add('NH040_Active');
      },
      clearPreviousPredictions() {
        // Remove display styling class to prevent outdated words displaying
        for (let i = 0; i < Exp.cache.predictedOptions.length; i += 1) {
          Exp.cache.predictedOptions[i].classList.remove('NH040_Predicted_Word_Display');
          Exp.cache.predictedOptions[i].textContent = '';
        }
      },
      createPredictedWords(searchTerm) {
        // Clear previous searches
        this.clearPreviousPredictions();
        // Define filter
        // Filter retrieved array
        const filteredWords = Exp.cache.retrievedData.filter((el) => {
          const isPredictedWord = el.indexOf(searchTerm) > -1;
          return isPredictedWord;
        });
        // Update text content of markup
        for (let i = 0; i < filteredWords.length; i += 1) {
          // Only have 3 options maximum
          if (i === 3) {
            break;
          } else {
            // Toggle styling class to display predicted text
            Exp.cache.predictedOptions[i].classList.add('NH040_Predicted_Word_Display');
            Exp.cache.predictedOptions[i].textContent = filteredWords[i];
          }
        }
      },
      searchTermFunction() {
        // Adds onblur event to search box to hide predicted words container
        Exp.cache.searchInput.addEventListener('blur', () => {
          // Add set timeout incase a predicted word is clicked
          setTimeout(() => {
            Exp.cache.predictedOptionsContainer.classList.remove('NH040_Show_Prediction');
          }, 150);
        });
        // Adds event listener to each search term
        // Assigns search input value to clicked word text
        for (let i = 0; i < Exp.cache.predictedOptions.length; i += 1) {
          Exp.cache.predictedOptions[i].addEventListener('click', () => {
            Exp.cache.searchInput.value = Exp.cache.predictedOptions[i].textContent;
            // Hide search terms box
            Exp.cache.predictedOptionsContainer.classList.remove('NH040_Show_Prediction');
            // Send event
            events.send(`${Exp.settings.ID}`, 'Clicked', 'Predictive search element', { sendOnce: true });
          });
        }
      },
      handleKeyboardEvent(pressedKey) {
        // Keys and corresponding keycodes
        // 13 = enter
        // 38 = up
        // 40 = down
        const currentActiveNode = Exp.cache.bodyVar.querySelector('.NH040_Active');
        const currentActiveValue = parseInt(currentActiveNode.getAttribute('data-NH040-Active'), 10);
        if (pressedKey === 13) {
          // Set value - if not blank
          const setActiveValue = currentActiveNode.textContent;
          if (setActiveValue) {
            Exp.cache.searchInput.value = setActiveValue;
            // Use blur to Hide predictive search
            Exp.cache.searchInput.blur();
          }
          // Handle direction, if up vs down key pressed
        } else if (pressedKey === 38) {
          this.handleKeyDirection(currentActiveValue, currentActiveNode, true);
        } else if (pressedKey === 40) {
          this.handleKeyDirection(currentActiveValue, currentActiveNode, false);
        }
      },
      handleKeyDirection(activeValue, activeNode, moveUp) {
        // Set up to get the next node based on direction
        let nextValue = activeValue + 1;
        if (moveUp) {
          nextValue = activeValue - 1;
        }
        // Reassigned if key is up/down
        let nextNode;
        // If next value is greater than length of containers then default to first word
        if (nextValue >= Exp.cache.predictedOptions.length) {
          // toggle classes
          activeNode.classList.remove('NH040_Active');
          Exp.cache.predictedOptions[0].classList.add('NH040_Active');
          // If next value is less than 0 call function find next available prediction
        } else if (nextValue < 0) {
          activeNode.classList.remove('NH040_Active');
          nextNode = this.findPreviousPrediction();
          nextNode.classList.add('NH040_Active');
          // If next value is within range of predicted words, find next available word
        } else if (nextValue < Exp.cache.predictedOptions.length) {
          activeNode.classList.remove('NH040_Active');
          nextNode = this.findNextPrediction(nextValue);
          nextNode.classList.add('NH040_Active');
        }
      },
      findPreviousPrediction() {
        // Default to first predicted word
        let endPoint = Exp.cache.predictedOptions[0];
        // Loop backwards through all predicted words, next word with text is returned
        for (let i = Exp.cache.predictedOptions.length - 1; i >= 0; i -= 1) {
          if (Exp.cache.predictedOptions[i].textContent) {
            endPoint = Exp.cache.predictedOptions[i];
            break;
          }
        }
        return endPoint;
      },
      findNextPrediction(startPoint) {
        // Default to first predicted word
        let endPoint = Exp.cache.predictedOptions[0];
        // Loop through all predicted word, next word with text is returned
        for (let i = startPoint; i < Exp.cache.predictedOptions.length; i += 1) {
          if (Exp.cache.predictedOptions[i].textContent) {
            endPoint = Exp.cache.predictedOptions[i];
            break;
          }
        }
        return endPoint;
      },
    },
  };

  Exp.init();
};

export default Run;
