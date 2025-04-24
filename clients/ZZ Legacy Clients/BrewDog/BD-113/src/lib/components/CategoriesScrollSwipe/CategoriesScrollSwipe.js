import { h } from 'preact';

const CategoriesScrollSwipe = ({ data }) => {
  return (
    <div className="CategoriesScrollSwipe">
      <div className="CategoriesScrollSwipe__inner">
        {data.map(d => (
          <a href={d.link} className="CategoriesScrollSwipe__link">
            <strong 
              className="CategoriesScrollSwipe__img"
              style={'background-image: url(' + d.image + ')'}></strong>
            <span
              className="CategoriesScrollSwipe__name"
              >{d.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
export { CategoriesScrollSwipe };
