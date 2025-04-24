import { h } from 'preact';


const FinderBanner = ({ title, content, onClick, backgroundImg }) => {
  return (
    <div className="finder-banner" style={{ backgroundImage: "url('"+backgroundImg+"')"}}>
      <div className="content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="primary" onClick={onClick}>Get started</button>
      </div>
    </div>
  );
};

export default FinderBanner;
