import './App.css';
import { Legend } from './components/legend/legend';
import { Map } from './components/map/map';

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function App() {
  return (
    <div className="App">
      <Map />
      <Legend />
    </div>
  );
}

export default App;
