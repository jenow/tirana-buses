import './App.css';
import { Legend } from './components/legend/legend';
import { Map } from './components/map/map';
import { linja8, linja10, linja11 } from './json';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function App() {
  const linjat = [
    { name: 'Linja 8', linja: linja8, color: 'red' },
    { name: 'Linja 10',  linja: linja10, color: 'blue' },
    { name: 'Linja 11', linja: linja11, color: 'green' }
  ];

  return (
    <div className="App">
      <Map linjat={linjat} />
      <Legend linjat={linjat} />
    </div>
  );
}

export default App;
