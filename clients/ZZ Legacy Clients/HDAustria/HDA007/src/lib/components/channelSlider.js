const renderChannelSlider = (id, data) => {
  const channelListSection = document.getElementById('channel-list-new');
  channelListSection.classList.add(`${id}__channel-list-new`);

  const htmlStr = (item) => `
     <div class="${id}__channel-item"><img
         src="${item.imgUrl}" alt="${item.name}"
         class="img-fluid d-table">
    </div>`;

  const sliderNav = `
    <div class="${id}__swiper-button-prev ${id}__prev-channels-arrow"></div>
    <div class="${id}__swiper-button-next ${id}__next-channels-arrow"></div>
    `;

  const channelsContainer = document.querySelector('#channels-list-table-new');
  const channelModal = document.querySelector('.channels-tab');

  channelModal.remove();
  channelsContainer.classList.add(`swiper`, `${id}__channelsContainer`);

  const channelsWrapper = `
    <div class="swiper-wrapper">
        <div class="swiper-slide channels-tab tab-content ${id}__modal-toggle" data-toggle="modal" data-target="#modal-channels">
            ${data.map((item, i) => (i <= 15 ? htmlStr(item) : '')).join('\n')}
        </div>
        <div class="swiper-slide channels-tab tab-content ${id}__modal-toggle" data-toggle="modal" data-target="#modal-channels">
            ${data.map((item, i) => (i > 15 && i <= 31 ? htmlStr(item) : ''))?.join('\n')}
        </div>
        <div class="swiper-slide channels-tab tab-content ${id}__modal-toggle" data-toggle="modal" data-target="#modal-channels">
            ${data.map((item, i) => (i > 31 ? htmlStr(item) : '')).join('\n')}
        </div>
    </div>`;

  channelsContainer.insertAdjacentHTML('afterbegin', channelsWrapper);
  channelsContainer.insertAdjacentHTML('beforeend', sliderNav);
};
export default renderChannelSlider;
