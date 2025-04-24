import { h } from 'preact';
import { fireEvent } from '../../../../../../core-files/services';
import { pollerLite } from '../../../../../../lib/utils';

export const PulloutModal = () => {
  let mobileDevices =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const closeNav = () => {
    document.getElementById('mySidenav').style.transform = 'translateX(-100%)';
    document.getElementById('mySidenav').style.transitionTimingFunction =
      'ease-in';
    document.querySelector('.pullOutModel-overlay').style.opacity = '0';
    document.querySelector('.pullOutModel-overlay').style.display = 'none';
    if (mobileDevices) {
      document.getElementById('mySidenav').style.transform = 'translateY(100%)';
    }
  };

  const SideNav = () => (
    <div id="mySidenav" className="sidenav">
      <div className="sidenav__container">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={() => {
            closeNav();
            fireEvent('User Interacted with the X');
          }}
        >
          &times;
        </a>
        <div className="sidenav-title">Spedizione</div>
        <p>
          Avon Cosmetics, tramite il Sito di e-commerce, accetta ordini con
          consegna su tutto il territorio della Repubblica Italiana ad eccezione
          della Repubblica di San Marino, Livigno e Campione d’Italia.
        </p>
        <p>I tempi di consegna approssimativi sono:</p>

        <div className="AWE015-delivery-pulloutCol">
          <div className="content">
            <h5> Standard (spedizione)</h5>
            <p>4 - 5 giorni lavorativi</p>
          </div>
          <div className="content mt-15 grid-right">
            <p style="text-align: right!important; font-weight: 600; ">
              € 3.90
            </p>
            <span className="AWE015-purple" style="text-align: right">
              {' '}
              (Gratis per ordini a partire da € 29)
            </span>
          </div>
        </div>
        <div className="AWE015-delivery-pulloutCol" style="margin-top:20px">
          <div className="content mt-0">
            <h5>Express (spedizione)</h5>
            <p>2 - 3 giorni lavorativi</p>
          </div>
          <div className="content mt-15 grid-right">
            <p style="font-weight: 600;">€ 4.90</p>
          </div>
        </div>
        <p className="AWE015-sp AWE015-black AWE015-delivery-pulloutPara">
          Ad esclusione degli ordini destinati in Calabria, Sicilia, Sardegna ed
          Isole minori per le quali località potrebbero essere necessarie 24 ore
          aggiuntive.
        </p>
      </div>
    </div>
  );
  return <SideNav />;
};
