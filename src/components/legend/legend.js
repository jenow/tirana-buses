import './legend.css';

export const Legend = ({ linjat }) => {
  return (
    <div className="legend">
      {linjat.map((linja) => {
        return (
          <div className="legend-item" key={linja.name}>
            <div className="legend-item-color" style={{ backgroundColor: linja.color }} />
            <div className="legend-item-text">{linja.name}</div>
          </div>
        );
      })
      }
    </div>
  );
};