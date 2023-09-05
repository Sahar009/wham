import React from 'react';
import './infobox.scss';

const Infobox = ({text,bgColor, count, icon}) => {
  return (
    <div className={`info-box ${bgColor}`}>
    <span className="info-icon --color-white">{icon}</span>
    <span className="info-text">
      <p>{text}</p>
      <h4>{count}</h4>
    </span>
  </div>
  )
}

export default Infobox