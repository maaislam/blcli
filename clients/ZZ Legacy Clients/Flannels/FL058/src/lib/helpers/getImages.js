import imageMap from '../config/imageMap';

export default {
  prefix(imgString) {
    let imgUrl;
    if (imgString) {
      imgUrl = `https://storage.googleapis.com/ucimagehost/flannelsimg/${imgString}`;
    }
    return imgUrl;
  },
  fetchThumbs(obj) {
    if (!obj) return;
    const { thumbs } = obj;
    const thumbImages = thumbs.map((thumb) => this.prefix(thumb));
    return thumbImages;
  },
  fetchMain(obj, deviceType) {
    if (!obj) return;
    const images = obj[deviceType];
    const mainImages = images.map((img) => this.prefix(img));
    return mainImages;
  },
  fetchModel(obj) {
    if (!obj) return;
    const { model } = obj;
    const modelHtml = `
      <div class="FL058-size-model infoPage featurestext col-xs-12 sdtabBody">
        <h3>Model Details</h3>
        <div class="acc-content FL058-model--wrap infoTabPage">
          <p><strong>Build:</strong> ${model.measurements}</p>
          <p><strong>Size:</strong> ${model.size}</p>
        </div>
      </div>
    `;
    return modelHtml;
  }
} 