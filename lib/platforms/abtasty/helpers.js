/**
 * Get last visited page from local storage
 */
export const getLastVisitedPage = () => {
  const data = JSON.parse(localStorage.getItem('ABTastyData') || '{}');

  return data?.VisitedPages?.[data?.VisitedPages?.length - 1];
};
