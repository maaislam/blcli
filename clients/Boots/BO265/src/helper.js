const getLastSixLinks = (linksArray) => {
    const totalLinks = linksArray.length;
    const startIndex = Math.max(totalLinks - 6, 0); // Start index to get the last 6 links
    const lastSixLinks = linksArray.slice(startIndex);

    return lastSixLinks?.reverse();
}

export const getPLPData = () =>{
    const uniquePlpPageLinks = new Set();

    // Filter out PLP data and extract unique PLP page links
    window.userObject.pageView.forEach(item => {
        if (item.pageType === 'PLP') {
            uniquePlpPageLinks.add(item.pageURL.split('/').pop());
        }
    });

    // Convert the Set back to an array
    const plpPageLinks = Array.from(uniquePlpPageLinks);

    const lastSixLinks = getLastSixLinks(plpPageLinks);

    return lastSixLinks;
}



export const fetchDataWithParams = async (paramsArray) => {
  const baseURL = 'https://boots-optimisation.co.uk/recent-history-inspired/combined/data/';
  //const baseURL = `https://octopus-app-c6o8t.ondigitalocean.app/recent-history-inspired/combined/data/`;
  try {
    const urlWithParams = `${baseURL}${paramsArray.join(',')}/`;
    console.log(urlWithParams);
    const response = await fetch(urlWithParams);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export const fetchData = async () => {

  let currItemNumber = -1;

  for(var i = 0; i < 3; i++) {
    console.log(currItemNumber + "LOOPING: ", i);
    let param = window.userObject.productViews.slice(currItemNumber)[0].productSAP;
    const baseURL = 'https://boots-optimisation.co.uk/v2/compare-similar-items/';

    const urlWithParams = `${baseURL}${param}/`;
    console.log(urlWithParams);
    const response = await fetch(urlWithParams);
    console.log(response);
    if (!response.ok) {
      console.log(currItemNumber + "NOTHING FOUND, carrying on");
      currItemNumber --;
      continue;
    } else {
      
      const data = await response.json();
      console.log(currItemNumber + "DATA FOUND", data);
      return data;
    }

    

  }

  
  
};

export const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
}





  
  
  
  
  