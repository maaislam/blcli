const extractHotelNameFromPath = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[3]?.replace(/-/g, ' ') || '';
};
export default extractHotelNameFromPath;
