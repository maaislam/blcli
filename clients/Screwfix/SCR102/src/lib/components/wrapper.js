const wrapper = (id) => {
  const html = `
        <div class="${id}__wrapper">
            <a class="${id}__signIn" href="https://my.screwfix.com/login?goto=https%3A%2F%2Fid.screwfix.com%3A443%2Fam%2Foauth2%2Fauthorize%3FhideFooter%3Dtrue%26response_type%3Dcode%26client_id%3DSFXUIClientUK%26redirect_uri%3Dhttps%3A%2F%2Fwww.screwfix.com%2Fauth%2Fcallback%26scope%3Dopenid%2520profile%2520sfx%26state%3DEAF828EwYuVq1%252BWM0UPqMb3Z">Sign in</a>
            <a class="${id}__register" href="https://my.screwfix.com/registration?goto=https%3A%2F%2Fid.screwfix.com%3A443%2Fam%2Foauth2%2Fauthorize%3FhideFooter%3Dtrue%26response_type%3Dcode%26client_id%3DSFXUIClientUK%26redirect_uri%3Dhttps%3A%2F%2Fwww.screwfix.com%2Fauth%2Fcallback%26scope%3Dopenid%2520profile%2520sfx%26state%3DEAF828EwYuVq1%252BWM0UPqMb3Z">New? Register today</a>
        </div>
    `;
  return html.trim();
};

export default wrapper;
