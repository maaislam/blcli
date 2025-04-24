const triggerRatingEvent = (fireBootsEvent, elementIsInView, elementTypes, eventTypes, offerDetailsContainer) => {
    if (elementIsInView(offerDetailsContainer)) {
        fireBootsEvent('PLP star rating seen', true, eventTypes.experience_load, {
            rendered_element: elementTypes.Filters,
            rendered_detail: 'PLP star rating seen',
        });
    }
};
export default triggerRatingEvent;
