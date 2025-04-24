const mapTerm = (term, gender) => {
  if (!term) return null;
  let returnedTerm = null;
  // Mens
  const mensMapping = () => {
    const outerwear = /\b(coat)\b|\b(jacket)\b|\b(parka)\b|\b(gilet)\b|\b(over\sshirt)\b|\b(overshirt)\b|\b(sweatshirt)\b|\b(long\ssleeved\stop)\b|\b(windbreaker)\b|\b(blazer)\b|\b(track\stop)\b|\b(mac)\b|\b(raincoat)\b|\b(cape)\b|\b(anorak)\b|\b(poncho)\b|\b(peacoat)\b|\b(fleece)\b|\b(cardigan)\b|\b(sportcoat)\b/gmi;
    const topsAndKnitwear = /\b(jacket)\b|\b(sweatshirt)\b|\b(poncho)\b|\b(cardigan)\b|\b(jumper)\b|(polo\sshirt)\b/gmi;
    const casualShirts = /\b(vest)\b|\b(sweatshirt)\b|\b(top$)\b|\b(sleeved\stop)\b|(polo\sshirt)\b|\b(t\sshirts)\b|\b(t\sshirt)\b|\b(long\ssleeve)\b|\b(short\ssleeved\sshirt)\b/gmi;
    const trousers = /\b(chinos)\b|\b(jogging\sbottoms)\b|\b(pants)\b|\b(trousers)\b|\b(jeans)\b/gmi;
    const socks = /\b(socks)\b|\b(trainer\ssocks)\b/gmi;
    const jeans = /\b(jeans)\b/gmi;
    const footwear = /\b(boots)\b|\b(boot)\b|\b(loafers)\b|\b(trainers)\b|\b(drivers)\b|\b(yardbird)\b|\b(shoes)\b|\b(brogues)\b|\b(mules)\b|\b(mocassins)\b|\b(sliders)\b|\b(sandals)\b|\b(slides)\b|\b(flops)\b|\b(espadrilles)\b|\b(slippers)\b|\b(runners)\b|\b(trainer)\b|\b(sneakers)\b/gmi;
    const tailoring = /\b(blazer)\b|\b(suit)\b/gmi;
    const hats = /\b(cap)\b|\b(beanie)\b|\b(snapback)\b/gmi;
    const swimAndUnderwear = /\b(boxers)\b|\b(brief)\b|\b(shorts)\b|\b(trunks)\b|\b(swim\sshorts)\b|\b(briefs)\b/gmi;
    const belts = /\b(belt)\b|\b(belts)\b/gmi;
    const gloves = /\b(gloves)\b/gmi;
    
    // Match against the biggest term first.
    if (term.match(outerwear)) {
      // Use outerwear
      returnedTerm = ['outerwear'];
    } else if (term.match(topsAndKnitwear)) {
      returnedTerm = ['topsAndKnitwear'];

    } else if (term.match(casualShirts)) {
      // Use casual shirts
      returnedTerm = ['casualShirts'];
    } else if (term.match(jeans)) {
      returnedTerm = ['jeans'];

    } else if (term.match(trousers)) {
      // Use trousers
      returnedTerm = ['trousers'];
    } else if (term.match(socks)) {
      returnedTerm = ['socks'];
    } else if (term.match(footwear)) {
      returnedTerm = ['footwear'];
    } else if (term.match(tailoring)) {
      returnedTerm = ['tailoring'];
    } else if (term.match(hats)) {
      returnedTerm = ['hats'];
    } else if (term.match(swimAndUnderwear)) {
      returnedTerm = ['swimAndUnderwear'];
    } else if (term.match(belts)) {
      returnedTerm = ['belts'];
    } else if (term.match(gloves)) {
      returnedTerm = ['gloves'];
    }

  }

  const womensMapping = () => {
    const all = /\b(Jumpsuit)\b|\b(Dress)\b|\b(Top)\b|\b(t\sshirt)\b|\b(Playsuit)\b|\b(Blouse)\b|\b(Skirt)\b|\b(Jacket)\b|\b(Gilet)\b|\b(Parka)\b|\b(Coat)\b|\b(Blazer)\b|\b(Anorak)\b|\b(Cardigan)\b|\b(Sweatshirt)\b|\b(Jumper)\b|\b(Poncho)\b|\b(Cape)\b|\b(Shorts)\b|\b(Culottes)\b|\b(Tee)\b|\b(Tights)\b|\b(Trousers)\b|\b(Leggings)\b|\b(Bottoms)\b|\b(Pants)\b/gmi;
    const footwear = /\b(pumps)\b|\b(slingbacks)\b|\b(flats)\b|\b(slip\sons)\b|\b(boots)\b|\b(boot)\b|\b(loafers)\b|\b(trainers)\b|\b(drivers)\b|\b(yardbird)\b|\b(shoes)\b|\b(brogues)\b|\b(mules)\b|\b(mocassins)\b|\b(sliders)\b|\b(sandals)\b|\b(slides)\b|\b(flops)\b|\b(espadrilles)\b|\b(slippers)\b|\b(runners)\b|\b(trainer)\b|\b(sneakers)\b|\b(Pumps)\b|\b(wedges)\b|\b(heels)\b|\b(slipper)\b|\b(moccasins)\b/gmi;
    const belts = /\b(belt)\b|\b(belts)\b/gmi;
    const gloves = /\b(gloves)\b/gmi;
    const jeans = /\b(chinos)\b|\b(jogging\sbottoms)\b|\b(pants)\b|\b(trousers)\b|\b(jeans)\b/gmi;
    
    // Match against the biggest term first.
    if (term.match(all)) {
      // Use all
      returnedTerm = ['all'];
      // if (term.match(topsAndKnitwear)) {
      //   returnedTerm = ['outerwear', 'topsAndKnitwear'];
      // }
    } else if (term.match(footwear)) {
      returnedTerm = ['footwear'];
    } else if (term.match(belts)) {
      returnedTerm = ['belts'];
    } else if (term.match(gloves)) {
      returnedTerm = ['gloves'];
    } else if (term.match(jeans)) {
      returnedTerm = ['jeans'];
    }
  }
  // Some terms may fall under multiple categories
  if (gender === 'Men' || gender === 'Unisex') {
    mensMapping();
  } 
  if (gender === 'Women') {
    womensMapping();
  }

  if (returnedTerm) {
    return returnedTerm;
  } else {
    return null;
  }
};

const getTerm = () => {
  // Only on PDP.
  const { productName } = window.dataLayer[1];
  const { productGender } = window.dataLayer[1];
  
  const termToUse = mapTerm(productName, productGender);
  if (termToUse) {
    return termToUse;
  } else {
    return null;
  }
};

export default getTerm;

