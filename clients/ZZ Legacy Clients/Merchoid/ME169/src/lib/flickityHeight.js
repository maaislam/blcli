export default () => {
  Flickity.prototype.setGallerySize = function() {
    if (this.options.setGallerySize ) {
      var height = this.options.adaptiveHeight && this.selectedCell ?
        this.selectedCell.size.outerHeight : this.maxCellHeight;
      this.viewport.style.height = height + 'px';
    }
  };
  
  var select = Flickity.prototype.select;
  Flickity.prototype.select = function() {
    select.apply( this, arguments );
    if ( this.options.adaptiveHeight ) {
      this.setGallerySize();
    }
  };
};
