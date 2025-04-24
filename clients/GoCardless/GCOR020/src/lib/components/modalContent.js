import { closeBtn } from '../assets';
import { wistiaId } from '../helpers/addWistia';

const modalContent = (id) => {
  const htmlStr = `
    <div class="${id}__modalcontainer">
        <div class="${id}__modalcontainer--close">${closeBtn}</div>
        <div class="${id}__modalcontainer--wistiaplayer">
            <div class="wistia_responsive_padding"
                style="padding:56.25% 0 0 0;position:relative;">
                <div class="wistia_responsive_wrapper"
                    style="height:100%;left:0;position:absolute;top:0;width:100%;">
                    <div class="wistia_embed wistia_async_${wistiaId()} seo=false videoFoam=true autoPlay=false endVideoBehavior=loop"
                        style="height:100%;position:relative;width:100%">
                        <div class="wistia_swatch"
                            style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
                            <img src="https://fast.wistia.com/embed/medias/${wistiaId()}/swatch"
                                style="filter:blur(5px);height:100%;object-fit:contain;width:100%;"
                                alt=""
                                aria-hidden="true"
                                onload="this.parentNode.style.opacity=1;" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default modalContent;
