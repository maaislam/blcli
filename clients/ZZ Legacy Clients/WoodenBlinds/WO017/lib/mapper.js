/**
 * When an action is performed on one element, do the same to a corresponding
 * element as mapped
 */
class Mapper {
    /**
     * Constructor
     */
    constructor(container){
        this.container = container;
    }

    map(element1) {
        var elm = $(element1)
            , target = elm.attr('data-wo17-map-target');
    }
}

export default Mapper;
