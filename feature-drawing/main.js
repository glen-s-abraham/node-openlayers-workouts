import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import GeoJSON from 'ol/format/GeoJSON';

const sendToServer = (data)=>{
  fetch('http://127.0.0.1:8000/api/uploadShape', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});


const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source:vectorSource
});

map.addInteraction(new Draw({
  type:'Polygon',
  source:vectorSource
}))

vectorSource.on("addfeature",e=>{
  const feature = e.feature;
  let writer = new GeoJSON();
  let data = writer.writeFeatureObject(feature)
  sendToServer(data);
})

map.addLayer(vectorLayer);
