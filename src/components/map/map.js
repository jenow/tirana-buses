import './map.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const currentLocationMarker = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><ellipse fill="#FFF" cx="12.072" cy="9.195" rx="5.566" ry="5.566"/><path fill="currentColor" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7m0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 12 4m0 10c-1.67 0-3.14-.85-4-2.15c0-1.32 2.67-2.05 4-2.05s4 .73 4 2.05A4.783 4.783 0 0 1 12 14Z"/></svg>',
  className: 'icon-location',
  iconSize: [64, 64],
  iconAnchor: [32, 64],
  popupAnchor: [1, -32],
})

export const Map = ({ linjat, onHover, onLeave, currentLocation }) => {
  const center = currentLocation || [41.341826913336725, 19.865019321441654]

  const onStationClicked = (linja) => (feature, layer) => {
    if (feature.properties) {
      let content = `<div class="popup-stop">`

      content += `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="${linja.color}" d="M22 7v9c0 .71-.38 1.36-1 1.72v1.53c0 .41-.34.75-.75.75h-.5c-.41 0-.75-.34-.75-.75V18h-7v1.25c0 .41-.34.75-.75.75h-.5c-.41 0-.75-.34-.75-.75v-1.53c-.61-.36-1-1.01-1-1.72V7c0-3 3-3 6.5-3S22 4 22 7m-9 8c0-.55-.45-1-1-1s-1 .45-1 1s.45 1 1 1s1-.45 1-1m7 0c0-.55-.45-1-1-1s-1 .45-1 1s.45 1 1 1s1-.45 1-1m0-8h-9v4h9V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05A2.501 2.501 0 0 0 2 9.6A2.51 2.51 0 0 0 4 12v8h1v-8c1.18-.24 2-1.29 2-2.5Z"/></svg>`

      content += `<div class="popup-stop-info">`
      content += `<div class="popup-stop-line">${linja.name}</div>`
      content += `<div>${feature.properties.name}</div>`
      content += `</div>`

      content += `</div>`

      const popup = layer.bindPopup(content);
      popup.on('popupopen', () => {
        onHover(linja.name);
      })
      popup.on('popupclose', () => {
        onLeave();
      })
    }
  };

  const drawPointMarker = (linja) => (geoJsonPoint, latlng) => {
    return L.marker(latlng, {
      icon: L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="${linja.color}" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7m0 14Z"/><ellipse fill="#FFFFFFBB" cx="12.072" cy="9.195" rx="3" ry="3"/></svg>`,
        className: 'icon-location',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [1, -32],
      })
    });
  }


  return (
    <MapContainer
      className="map"
      center={center}
      zoom={15}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains={'abcd'}
      />
      {
        linjat.map((linja) => {
          return (
            linja.show &&
            <GeoJSON 
              key={linja.name}
              data={linja.linja}
              style={{ color: linja.color }}
              onEachFeature={onStationClicked(linja)}
              pointToLayer={drawPointMarker(linja)}
            />
          );
        })
      }
      { currentLocation && <Marker position={currentLocation} icon={currentLocationMarker} zIndexOffset={100}></Marker> }
    </MapContainer>
  );
};