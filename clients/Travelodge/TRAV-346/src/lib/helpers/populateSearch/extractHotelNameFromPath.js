
const extractHotelNameFromPath = () => {
    const { pathname } = window.location;
    const pathParts = pathname.split('/');

    return pathParts[3]?.replace(/-/g, ' ') || '';
};
export default extractHotelNameFromPath;
