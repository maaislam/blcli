export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
    return match && match[2] ? unescape(match[2]) : undefined;
};