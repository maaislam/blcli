const getRepData = () => {
  return fetch(`/api/sessionapi/getsessionhash?_=${Date.now()}`)
    .then((res) => res.json())
    .then((sessionData) => sessionData.Data.Representative)
    .then((repSessionId) => fetch(`/api/sessionapi/getcurrentrepresentativeformodule?cb=${repSessionId}`))
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
export default getRepData;
