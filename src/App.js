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
  const linjat = [
    { name: 'Linja 1', linja: linja1, color: 'black' },
    { name: 'Linja 2', linja: linja2, color: 'darkblue' },
    { name: 'Linja 3', linja: linja3, color: 'darkgreen' },
    { name: 'Linja 4', linja: linja4, color: 'darkcyan' },
    { name: 'Linja 5', linja: linja5, color: 'darkred' },
    { name: 'Linja 6', linja: linja6, color: 'darkmagenta' },
    { name: 'Linja 7', linja: linja7, color: 'yellow' },
    { name: 'Linja 8', linja: linja8, color: 'gray' },
    { name: 'Linja 10', linja: linja10, color: 'darkgrey' },
    { name: 'Linja 11', linja: linja11, color: 'blue' },
    { name: 'Linja 12', linja: linja12, color: 'green' },
    { name: 'Linja 13', linja: linja13, color: 'cyan' },
    { name: 'Linja 14', linja: linja14, color: 'red' },
    { name: 'Linja 15', linja: linja15, color: 'magenta' }
  ];

  return (
    <div className="App">
      <Map linjat={linjat} />
      <Legend linjat={linjat} />
    </div>
  );
}

export default App;
