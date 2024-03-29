import { useState, useEffect } from 'react'
import './App.css'
import { Legend } from './components/legend/legend'
import { Map } from './components/map/map'
import { linja1, linja2, linja3, linja4, linja5, linja6, linja7, linja8, linja9, linja10, linja11, linja12, linja13, linja14, linja15 } from './json'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)

  const [linjat, setLinjat] = useState([
    { name: 'Linja 1', linja: linja1, color: '#14532d', show: true },
    { name: 'Linja 2', linja: linja2, color: '#164e63', show: true },
    { name: 'Linja 3', linja: linja3, color: '#1e3a8a', show: true },
    { name: 'Linja 4', linja: linja4, color: '#581c87', show: true },
    { name: 'Linja 5/A', linja: linja5, color: '#701a75', show: true },
    { name: 'Linja 6', linja: linja6, color: '#9f1239', show: true },
    { name: 'Linja 7', linja: linja7, color: '#ec4899', show: true },
    { name: 'Linja 8', linja: linja8, color: '#d946ef', show: true },
    { name: 'Linja 9', linja: linja9, color: '#8b5cf6', show: true },
    { name: 'Linja 10', linja: linja10, color: '#3b82f6', show: true },
    { name: 'Linja 11', linja: linja11, color: '#06b6d4', show: true },
    { name: 'Linja 12', linja: linja12, color: '#14b8a6', show: true },
    { name: 'Linja 13', linja: linja13, color: '#22c55e', show: true },
    { name: 'Linja 14', linja: linja14, color: '#84cc16', show: true },
    { name: 'Linja 15', linja: linja15, color: '#eab308', show: true },
  ])
  let linjatCopy = JSON.parse(JSON.stringify(linjat))

  const onChange = (name, value) => {
    const newLinjat = linjat.map((linja) => {
      if (linja.name === name) {
        linja.show = value
      }
      return linja
    })
    setLinjat(newLinjat)
    linjatCopy = JSON.parse(JSON.stringify(linjat))
    setMobileOpen(false)
  }

  const onCheckAll = () => {
    const newLinjat = linjat.map((linja) => {
      linja.show = true
      return linja
    })
    setLinjat(newLinjat)
    linjatCopy = JSON.parse(JSON.stringify(linjat))
    setMobileOpen(false)
  }

  const onUncheckAll = () => {
    const newLinjat = linjat.map((linja) => {
      linja.show = false
      return linja
    })
    setLinjat(newLinjat)
    linjatCopy = JSON.parse(JSON.stringify(linjat))
    setMobileOpen(false)
  }

  const onHover = (name) => {
    const newLinjat = linjat.map((linja) => {
      if (linja.name === name) {
        linja.show = true
      } else {
        linja.show = false
      }
      return linja
    })
    setLinjat(newLinjat)
  }

  const onLeave = () => {
    setLinjat(JSON.parse(JSON.stringify(linjatCopy)))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setCurrentLocation([location.coords.latitude, location.coords.longitude])
    })
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((location) => {
        setCurrentLocation([location.coords.latitude, location.coords.longitude])
      })
    }, 5000)
  }, [])

  return (
    <div className={`App${mobileOpen ? ' mobile-menu-open' : ''}`}>
      <Map linjat={linjat} onHover={onHover} onLeave={onLeave} currentLocation={currentLocation} />

      <button type="button" className="legend-mobile-burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Show lines filters">
        {mobileOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        )}
      </button>
      <Legend linjat={linjat} onChange={onChange} onCheckAll={onCheckAll} onUncheckAll={onUncheckAll} />
    </div>
  )
}

export default App
