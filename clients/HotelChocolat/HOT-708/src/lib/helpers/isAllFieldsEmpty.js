const isAllFieldsEmpty = (email, firstName, lastName, phoneNumber) => {
    // Check if all the fields have a length of 0
    return email.length === 0 && firstName.length === 0 && lastName.length === 0 && phoneNumber.length === 0;
}
export default isAllFieldsEmpty;