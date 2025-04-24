import shared from "../../../../../core-files/shared";

/**
 * Get Site from hoestname EJ or HS
 */
 export const getSiteFromHostname = () => {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;
  
    return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
  };