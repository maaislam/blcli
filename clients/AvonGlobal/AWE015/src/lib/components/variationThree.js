import { Fragment, h } from 'preact';
import { fireEvent } from '../../../../../../core-files/services';
import { PulloutModal } from '../components/pullOutMenu';

export const VariationThree = () => {
  function openNav() {
    document.getElementById('mySidenav').style.padding = '25px 10px';
    document.getElementById('mySidenav').style.transform = 'translateX(0)';
    document.getElementById('mySidenav').style.transitionTimingFunction =
      'ease-out';
    document.querySelector('.pullOutModel-overlay').style.opacity = '0.49';
    document.querySelector('.pullOutModel-overlay').style.display = 'block';
    if (window.innerWidth < 768) {
      document.getElementById('mySidenav').style.transform = 'translateY(0)';
    }
  }

  const closeNav = () => {
    document.getElementById('mySidenav').style.transform = 'translateX(-100%)';
    document.getElementById('mySidenav').style.transitionTimingFunction =
      'ease-in';
    document.querySelector('.pullOutModel-overlay').style.opacity = '0';
    document.querySelector('.pullOutModel-overlay').style.display = 'none';
    if (window.innerWidth < 768) {
      document.getElementById('mySidenav').style.transform = 'translateY(100%)';
    }
  };

  const DeliverySection = () => (
    <div
      onClick={() => {
        openNav();
        fireEvent('User Interacted with the delivery cta');
      }}
      className="delivery-section"
    >
      <div className="delivery-section__header">
        Gratis per ordini a partire da €29*
      </div>
    </div>
  );

  return (
    <Fragment>
      <DeliverySection />
      <PulloutModal />
      <div
        onClick={() => {
          closeNav();
          fireEvent('User closes the overlay without using the X');
        }}
        className="pullOutModel-overlay"
      />
    </Fragment>
  );
};
