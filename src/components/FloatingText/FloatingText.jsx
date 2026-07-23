import React from 'react';
import './FloatingText.css';

const FloatingText = ({ items }) => {
  return (
    <div className="floating-text-container">
      {items.map((item) => (
        <div key={item.id} className={`floating-text ${item.type}`}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingText;
