import { useState, useEffect } from 'react';
import './App.css';
import { Legend } from './components/legend/legend';
import { Map } from './components/map/map';
import { linja1, linja2, linja3, linja4, linja5, linja6, linja7, linja8, linja9, linja10, linja11, linja12, linja13, linja14, linja15 } from './json';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);

  const [linjat, setLinjat] = useState([
    { name: 'Linja 1', linja: linja1, color: 'black', show: true },
    { name: 'Linja 2', linja: linja2, color: 'darkblue', show: true },
    { name: 'Linja 3', linja: linja3, color: 'darkgreen', show: true },
    { name: 'Linja 4', linja: linja4, color: 'darkcyan', show: true },
    { name: 'Linja 5/A', linja: linja5, color: 'darkred', show: true },
    { name: 'Linja 6', linja: linja6, color: 'darkmagenta', show: true },
    { name: 'Linja 7', linja: linja7, color: 'yellow', show: true },
    { name: 'Linja 8', linja: linja8, color: 'gray', show: true },
    { name: 'Linja 9', linja: linja9, color: 'lightgrey', show: true },
    { name: 'Linja 10', linja: linja10, color: 'darkgrey', show: true },
    { name: 'Linja 11', linja: linja11, color: 'blue', show: true },
    { name: 'Linja 12', linja: linja12, color: 'green', show: true },
    { name: 'Linja 13', linja: linja13, color: 'cyan', show: true },
    { name: 'Linja 14', linja: linja14, color: 'red', show: true },
    { name: 'Linja 15', linja: linja15, color: 'magenta', show: true }
  ]);
  let linjatCopy = JSON.parse(JSON.stringify(linjat));

  const onChange = (name, value) => {
    const newLinjat = linjat.map((linja) => {
      if (linja.name === name) {
        linja.show = value;
      }
      return linja;
    });
    setLinjat(newLinjat);
    linjatCopy = JSON.parse(JSON.stringify(linjat));
  }

  const onCheckAll = () => {
    const newLinjat = linjat.map((linja) => {
      linja.show = true;
      return linja;
    });
    setLinjat(newLinjat);
    linjatCopy = JSON.parse(JSON.stringify(linjat));
  }

  const onUncheckAll = () => {
    const newLinjat = linjat.map((linja) => {
      linja.show = false;
      return linja;
    });
    setLinjat(newLinjat);
    linjatCopy = JSON.parse(JSON.stringify(linjat));
  }

  const onHover = (name) => {
    const newLinjat = linjat.map((linja) => {
      if (linja.name === name) {
        linja.show = true;
      } else {
        linja.show = false;
      }
      return linja;
    });
    setLinjat(newLinjat);
  }

  const onLeave = () => {
    setLinjat(JSON.parse(JSON.stringify(linjatCopy)));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCurrentLocation([location.coords.latitude, location.coords.longitude]);
    });
    setInterval(
      () => {
        navigator.geolocation.getCurrentPosition((location) => {
          setCurrentLocation([location.coords.latitude, location.coords.longitude]);
        });
      }, 5000);
  }, []);

  return (
    <div className="App">
      <Map linjat={linjat} onHover={onHover} onLeave={onLeave} currentLocation={currentLocation} />
      <Legend linjat={linjat} onChange={onChange} onCheckAll={onCheckAll} onUncheckAll={onUncheckAll} />
    </div>
  );
}

export default App;
