export const videoSection = (id) => {

    const htmlStr = `<div class="${id}__video-section">
        <iframe width="550" height="325" src="https://www.youtube.com/embed/1H4h2Dl2rbA" title="Lifestyle Fitness shares their “brilliant” onboarding experience with GoCardless" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>`;
    return htmlStr.trim();
};