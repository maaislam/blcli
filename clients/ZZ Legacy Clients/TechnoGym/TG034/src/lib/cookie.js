const newCookie = () => {
    let html = `
        <div class="tg34-cookie-wrap">
            <div class="tg34-cookie-form">
                <form>
                    <div class="tg34-ib">
                        <label>${firstTrans}:</label>
                    </div>

                    <div class="tg34-ib">
                        <input type="radio" name="business" value="business" id="tg34-business">
                        <label for="tg34-business">Interested in equipment for my business or gym</label>
                    </div>

                    <div class="tg34-ib">
                        <input type="radio" name="personal" value="personal" id="tg34-personal">
                        <label for="tg34-personal">Interested in equipment for home</label>
                    </div>
                    
                    <div class="tg34-ib">
                        <input type="submit" value="OK">
                    </div>

                </form>
            </div>
        </div>
    `;

    return html;
};

export default newCookie;