import './legend.css';

export const Legend = ({ linjat, onChange }) => {
  return (
    <div className="legend">
      {linjat.map((linja) => {
        return (
          <div className="legend-item" key={linja.name}>
            <input className="legend-item-checkbox" type="checkbox" checked={linja.show} onChange={(e) => onChange(linja.name, e.target.checked)} />
            <div className="legend-item-color" style={{ backgroundColor: linja.color }} />
            <div className="legend-item-text">{linja.name}</div>
          </div>
        );
      })
      }
    </div>
  );
};