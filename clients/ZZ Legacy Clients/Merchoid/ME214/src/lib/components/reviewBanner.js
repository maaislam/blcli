import shared from "../shared";

export default () => {
     const { ID, VARIATION } = shared;

    let review;
    let author;

    if(VARIATION === '1') {
        review = 'Bomb-ass Xmas sweaters!';
        author = 'Bryan R';
    } else if(VARIATION === '2') {
        review = 'The internet’s best kept secret, let’s keep it that way';
        author = 'Anonymous';
    } else if(VARIATION === '3') {
        review = 'Best Christmas jumpers on the planet';
        author = 'Kevin J';
    }

     const newReview = document.createElement('div');
     newReview.classList.add(`${ID}-xmasReview`);
     newReview.innerHTML = 
     `<div class="${ID}-reviewText">"${review}"</div>
         <div class="${ID}-author">
            <span class="${ID}-stars"></span> 
            <span class="${ID}-review-author">- ${author}</span>
        </div>`;

    const reviewBar = document.querySelector('.review-banner .review-banner-conveyor-belt');
    reviewBar.appendChild(newReview);
}