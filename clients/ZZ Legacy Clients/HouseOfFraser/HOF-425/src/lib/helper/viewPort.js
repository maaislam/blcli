function IsMobileView() {
  var $divMobileView = $('#divMobileView');
  return $divMobileView.length > 0 && $divMobileView.is(':visible');
}

function IsTabletView() {
  var $divTabletView = $('#divTabletView');
  return $divTabletView.length > 0 && $divTabletView.is(':visible');
}

function IsDesktopView() {
  return !(IsMobileView() || IsTabletView());
}

export { IsMobileView, IsTabletView, IsDesktopView };
