const gender = (id) => {
    const htmlStr = `<div class="select-box ${id}__genderDropdown">
        <div class="options-container">          
            <div class="option ${id}__genderOption">
                <input
                    type="radio"
                    class="radio"
                    id="male"
                    name="gender"
                />
                <label for="male">
                    <p>Male</p> 
                </label>
            </div>

            <div class="option ${id}__genderOption">
                <input type="radio" class="radio" id="female" name="gender" />
                <label for="female">
                    <p>Female</p> 
                </label>
            </div>

            <div class="option ${id}__genderOption">
                <input type="radio" class="radio" id="unknown" name="gender" />
                <label for="unknown">
                    <p>Unknown</p> 
                </label>
            </div>
            <div class="option ${id}__genderOption">
                <input type="radio" class="radio" id="notToSay" name="gender" />
                <label for="notToSay">
                    <p>Prefer not to say</p> 
                </label>
            </div>
        </div>
        <div class="selected ${id}__selectedGender">
            <p>Gender</p> 
        </div> 
    </div>`;

    return htmlStr;
};
export default gender;