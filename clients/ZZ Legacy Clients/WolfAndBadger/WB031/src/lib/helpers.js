export const isFrontPage = () => {
  return (
    window.location.href.indexOf("?p=") === -1 ||
    window.location.href.indexOf("?p=1") !== -1
  );
};
