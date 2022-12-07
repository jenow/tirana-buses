import './legend.css';

export const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-item-color" style={{ backgroundColor: 'red' }} />
        <div className="legend-item-text">Linja 8</div>
      </div>
      <div className="legend-item">
        <div className="legend-item-color" style={{ backgroundColor: 'blue' }} />
        <div className="legend-item-text">Linja 10</div>
      </div>
      <div className="legend-item">
        <div className="legend-item-color" style={{ backgroundColor: 'green' }} />
        <div className="legend-item-text">Linja 11</div>
      </div>
    </div>
  );
};