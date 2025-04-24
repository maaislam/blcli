import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import watches from './data/watches';
import filters from './data/filters';

import Container from './components/Container';
import Banner from './components/Banner';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import NavTab from './components/NavTab';
import Carousel from './components/Carousel/Carousel';
import WatchCard from './components/WatchCard';

const App = ({ id }) => {
  const [filteredWatches, setFilteredWatches] = useState([]);

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);

  const [bannerTitle, setBannerTitle] = useState('Find your perfect watch');

  const [finderStarted, setFinderStarted] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);

  const [watchesDisplay, setWatchesDisplay] = useState(false);

  const handleAddFilter = (e) => {
    if (currentTab === 0) {
      if (selectedFeatures.includes(e.target.value)) {
        return setSelectedFeatures(selectedFeatures.filter((filter) => filter !== e.target.value));
      }
      return setSelectedFeatures([...selectedFeatures, e.target.value]);
    }
    if (currentTab === 1) {
      if (selectedSeries.includes(e.target.value)) {
        return setSelectedSeries(selectedSeries.filter((filter) => filter !== e.target.value));
      }
      return setSelectedSeries([...selectedSeries, e.target.value]);
    }
    if (currentTab === 2) {
      if (selectedPrice.includes(e.target.value)) {
        return setSelectedPrice(selectedPrice.filter((filter) => filter !== e.target.value));
      }
      return setSelectedPrice([...selectedPrice, e.target.value]);
    }
  };

  const handleDeleteFilter = (text) => {
    if (selectedFeatures.includes(text)) {
      setSelectedFeatures(selectedFeatures.filter((filter) => filter !== text));
    }
    if (selectedSeries.includes(text)) {
      setSelectedSeries(selectedSeries.filter((filter) => filter !== text));
    }
    if (selectedPrice.includes(text)) {
      setSelectedPrice(selectedPrice.filter((filter) => filter !== text));
    }
  };

  const handleResetFilters = () => {
    setSelectedFeatures([]);
    setSelectedSeries([]);
    setSelectedPrice([]);
    setWatchesDisplay(false);
    setCurrentTab(0);
  };

  const handleShowWatches = () => {
    setBannerTitle('Perfect for you...');
    setWatchesDisplay(true);
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleFindWatches = () => {
    const result = watches.filter(
      (watch) =>
        (!selectedFeatures.length > 0 ||
          selectedFeatures.every((feature) => watch.features.includes(feature))) &&
        (!selectedSeries.length > 0 || selectedSeries.includes(watch.series)) &&
        (!selectedPrice.length > 0 || selectedPrice.includes(watch.priceBracket))
    );

    setFilteredWatches(result);
  };

  useEffect(() => {
    handleFindWatches();
  }, [selectedFeatures, selectedSeries, selectedPrice]);

  return (
    <Fragment>
      <Banner
        title={bannerTitle}
        filters={[selectedFeatures, selectedSeries, selectedPrice].flat()}
        id={id}
        onClick={() => setFinderStarted(true)}
        onDelete={handleDeleteFilter}
        finderStarted={finderStarted}
        watchesDisplay={watchesDisplay}
      />
      {finderStarted && (
        <Container smallPadding dark={watchesDisplay} shadow id={id}>
          <div className={`${id}-filter-nav-container`}>
            {!watchesDisplay ? (
              <Fragment>
                <nav className={`${id}-filter-nav-tabs`}>
                  <ul>
                    {filters.map((filter, idx) => (
                      <NavTab
                        title={filter.title}
                        active={currentTab === idx}
                        onClick={() => setCurrentTab(idx)}
                        id={id}
                        key={`${id}-filter-nav-tab-${idx}`}
                      />
                    ))}
                  </ul>
                </nav>
                <div className={`${id}-filter-options`}>
                  {filters[currentTab].options.map((option, idx) => (
                    <Checkbox
                      label={option}
                      onClick={(e) => handleAddFilter(e)}
                      checked={[selectedFeatures, selectedSeries, selectedPrice]
                        .flat()
                        .includes(option)}
                      disabled={
                        ![selectedFeatures, selectedSeries, selectedPrice]
                          .flat()
                          .includes(option) &&
                        ((currentTab === 0 && selectedFeatures.length >= 3) ||
                          (currentTab === 1 && selectedSeries.length >= 3) ||
                          (currentTab === 2 && selectedPrice.length >= 3))
                      }
                      id={id}
                      key={`${id}-filter-tab-data-${idx}`}
                    />
                  ))}
                </div>
              </Fragment>
            ) : (
              <div>
                <Carousel rendered={watchesDisplay} gutter={20} id={id}>
                  {filteredWatches.map((watch, idx) => (
                    <WatchCard
                      title={`${watch.series} ${watch.name}`}
                      price={watch.price}
                      url={watch.url}
                      image={watch.image}
                      id={id}
                      key={`${idx}-filtered-watch`}
                    />
                  ))}
                </Carousel>
              </div>
            )}
            <div className={`${id}-filter-cta ${watchesDisplay ? 'transparent' : ''}`}>
              <div
                className={`${id}-filter-cta-count ${
                  [selectedFeatures, selectedSeries, selectedPrice].flat().length > 0 &&
                  !watchesDisplay
                    ? 'open'
                    : ''
                }`}
              >
                {[selectedFeatures, selectedSeries, selectedPrice].flat().length > 0 && (
                  <p>
                    {!watchesDisplay && (
                      <Fragment>
                        <strong>{filteredWatches.length}</strong>{' '}
                        {filteredWatches.length === 1 ? 'watch' : 'watches'} currently fitting your
                        needs
                      </Fragment>
                    )}
                  </p>
                )}
              </div>
              {!watchesDisplay && (
                <Button
                  darkOutline
                  onClick={() => {
                    handleShowWatches();
                    handleFindWatches();
                    scrollToTop();
                  }}
                  disabled={
                    [selectedFeatures, selectedSeries, selectedPrice].flat().length === 0 ||
                    filteredWatches.length === 0
                  }
                  id={id}
                >
                  Find my watch
                </Button>
              )}
              {([selectedFeatures, selectedSeries, selectedPrice].flat().length > 0 ||
                watchesDisplay) && (
                <Button
                  onClick={() => {
                    handleResetFilters();
                    setBannerTitle('Find your perfect watch');
                    scrollToTop();
                  }}
                  plainBlackText={!watchesDisplay}
                  underlined={!watchesDisplay}
                  id={id}
                >
                  Reset Search
                </Button>
              )}
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default App;
