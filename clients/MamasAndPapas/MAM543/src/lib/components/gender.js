const gender = (id) => {
  const htmlStr = `<div class='${id}__genderDropdown'>
        <select id="gender" name="gender">
            <option value="girls">Girl</option>
            <option value="boys">Boy</option>
            <option value="unisex">Unisex</option>
        </select>
    </div>`;

  return htmlStr;
};
export default gender;
