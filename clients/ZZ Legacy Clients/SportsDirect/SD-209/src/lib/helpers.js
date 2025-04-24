
export const getPageData = () => {

    let dataObject;
    for (let i = 0; i < window.dataLayer.length; i += 1) {
      const data = window.dataLayer[i];
      if (typeof data === 'object' && data.event && data.event === 'SD_onLoad') {
        dataObject = data;
        break;
      }
    }
    return dataObject;
  
  }