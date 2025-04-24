import { h } from 'preact';

const Option = ({ name, onClick, image = false, icon = false}) => {
  return (
    <li key={name} className={`option no-image ${image ? 'with-image' : ''} ${icon ? 'with-icon' : ''}`} onClick={onClick}>
      { image ? 
      <div className="image">
        <img src={image} alt=""/>
      </div> : ''}
      { icon ? <div className="icon" style={{ backgroundImage: "url('"+icon+"')"}}></div> : ''}
      <p>{name}</p>
    </li>
  );
};




export { Option };
