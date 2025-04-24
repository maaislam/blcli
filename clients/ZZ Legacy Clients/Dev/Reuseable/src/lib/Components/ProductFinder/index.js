import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

export const ProductFinder = ({ schema }) => {
  function Product({ image, title, price }) {
    return (
      <li className="product">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <span>£{price}</span>
      </li>
    );
  }

  function View({ view }) {
    return (
      <div className="view">
        {view.products ? (
          <ul className="view-product-list">
            {view.products.map((p) => (
              <Product
                key={p.title}
                image={p.image}
                title={p.title}
                price={p.price}
              />
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>
    );
  }

  function getRouteById(obj, id) {
    let result = null;

    for (let i = 0; i < obj.length; i += 1) {
      if (obj[i].id === id) {
        result = obj[i];
        break;
      }

      if (obj[i].routes) {
        result = getRouteById(obj[i].routes, id);

        if (result) break;
      }
    }

    return result;
  }

  const [currentRoute, setCurrentRoute] = useState(schema[0]);

  function setActiveView(id) {
    setCurrentRoute(() => getRouteById(schema, id));
  }

  return (
    <div className="App">
      <h1>Product Finder</h1>
      <p>Use our product finder to find your perfect product.</p>
      {currentRoute.id !== '0' ? (
        <button onClick={() => setActiveView(currentRoute.parentId)}>
          Back
        </button>
      ) : (
        ''
      )}
      <h2>{currentRoute.title}</h2>
      <div className="route-list">
        {currentRoute.routes?.map((s) => {
					return (
						<div key={s.title} className='route-list-wrapper'>
              <span className='route-list__container' onClick={() => setActiveView(s.id)}>
                {s.image && <img src={s.image} alt={s.title} />}
                <div className='route-list__container__title'>{s.title}</div>
              </span>
            </div>
          );
        })}
      </div>
      {currentRoute ? <View view={currentRoute} /> : ''}
    </div>
  );
};
