import './legend.css';
import { useState } from 'react';

export const Legend = ({ linjat, onChange, onCheckAll, onUncheckAll }) => {

  return (
    <div className="legend-container">
      <div className="legend-header">
        <button type='button' onClick={onCheckAll}>Show all</button>
        <button type="button" onClick={onUncheckAll}>Hide all</button>
      </div>
      <div className="legend">
        {linjat.map((linja) => {
          return (
            <label className="legend-item" key={linja.name}>
              <input className="legend-item-checkbox" type="checkbox" checked={linja.show} onChange={(e) => onChange(linja.name, e.target.checked)} />
              <div className="legend-item-color" style={{ backgroundColor: linja.color }} />
              <div className="legend-item-text">{linja.name}</div>
            </label>
          );
        })
        }
      </div>
    </div>
  );
};