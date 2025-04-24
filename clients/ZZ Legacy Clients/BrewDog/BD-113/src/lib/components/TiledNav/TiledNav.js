import { h } from 'preact';

const TiledNav = ({ data, containerClass = '' }) => {
  return (
    <div className={ 'TiledNav ' + containerClass}>
      <div className="TiledNav__inner">
        {data.map(d => (
          <a href={d.link} className="TiledNav__link">
            
            <span><img src={d.image} /> {d.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export { TiledNav };
