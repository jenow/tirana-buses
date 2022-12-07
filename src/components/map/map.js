import './map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';

export const Map = ({ linjat }) => {
  const onStationClicked = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(feature.properties.name);
    }
  };

  return (
    <MapContainer
      className="map"
      center={[41.341826913336725, 19.865019321441654]}
      zoom={15}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[41.341826913336725, 19.865019321441654]}>
        <Popup>
          Home
        </Popup>
      </Marker>
      {
        linjat.map((linja) => {
          return (
            linja.show &&
            <GeoJSON key={linja.name} data={linja.linja} style={{ color: linja.color }} onEachFeature={onStationClicked} />
          );
        })
      }
    </MapContainer>
  );
};