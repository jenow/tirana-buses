import './map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const currentLocationMarker = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const Map = ({ linjat, onHover, onLeave, currentLocation }) => {
  const onStationClicked = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(feature.properties.name);
      if (feature.geometry.type === 'LineString') {
        layer.on('mouseover', function (e) {
          onHover(feature.properties.name);
        });
        layer.on('mouseout', function (e) {
          onLeave();
        });
      }
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
      {
        linjat.map((linja) => {
          return (
            linja.show &&
            <GeoJSON key={linja.name} data={linja.linja} style={{ color: linja.color }} onEachFeature={onStationClicked} />
          );
        })
      }
      { currentLocation && <Marker position={currentLocation} icon={currentLocationMarker}></Marker> }
    </MapContainer>
  );
};