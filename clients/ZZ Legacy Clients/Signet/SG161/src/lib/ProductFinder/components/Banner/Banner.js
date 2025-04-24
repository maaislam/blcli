import { h, Fragment } from 'preact';
import Container from '../Container';
import Button from '../Button';
import Logo from '../Icons/Logo';
import FilterTab from '../FilterTab';

const Banner = ({ title, filters, onClick, onDelete, finderStarted, watchesDisplay, id }) => {
  return (
    <Container dark smallBottomPadding={finderStarted} id={id}>
      <div className={`${id}-banner-logo`}>
        <Logo />
      </div>
      <div className={`${id}-banner`}>
        <div className={`${id}-banner-heading`}>
          <h2>{title}</h2>
        </div>
        {!finderStarted && (
          <Fragment>
            <p className={`${id}-banner-intro`}>
              Use our simple watch finder in order to effortlessly discover the perfect watch for
              you. Simply select what features, series, price or activities are important to you!
            </p>
            <Button onClick={onClick} id={id}>
              Try it now
            </Button>
          </Fragment>
        )}
        {finderStarted && !watchesDisplay && (
          <ul className={`${id}-banner-filter-list`}>
            {filters.map((filter, idx) => (
              <FilterTab
                text={filter}
                id={id}
                key={`${id}-banner-filter-${idx}`}
                onClick={onDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default Banner;
