import { hidePasswordIcon, revealPasswordIcon } from "../assets/svg";

const passwordVisibility = (id) => {
    const passwordInput = document.querySelector('#dwfrm_profile_login_password');
    const passwordIcon = document.querySelector(`.${id}__passwordIcon`);

    if (passwordInput.getAttribute('type') === 'password') {
        passwordInput.setAttribute('type', 'text');
        passwordIcon.innerHTML = hidePasswordIcon;
    } else {
        passwordInput.setAttribute('type', 'password');
        passwordIcon.innerHTML = revealPasswordIcon;
    }
};
export default passwordVisibility;