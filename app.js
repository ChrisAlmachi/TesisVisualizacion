import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';


const MAPA_CUENCA =
  'parser_network.geojson';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json',
  center: [-79.005813, -2.901830],
  zoom: 12,
  bearing: 0,
  pitch: 30
});

const deckOverlay = new DeckOverlay({
  layers: [
    new GeoJsonLayer({
      id: 'NODES',
      data: MAPA_CUENCA,
      // Styles
      filled: true,
      pointRadiusMinPixels: 1,
      pointRadiusScale: 0,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [50, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info =>
        // eslint-disable-next-line
        info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    }),
    new ArcLayer({
      id: 'LINKS',
      data: MAPA_CUENCA,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-79.005813, -2.901830], 
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});

map.addControl(deckOverlay);
map.addControl(new mapboxgl.NavigationControl());