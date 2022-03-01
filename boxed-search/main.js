import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import AmplifierService from './service/AmplifierService';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';


const ampService = new AmplifierService();
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    projection: 'EPSG:4326',
    center: [0, 0],
    zoom: 2
  })
});

const searchSrc = new VectorSource();
const searchLayer = new VectorLayer({
  source:searchSrc
})

const boxDraw = new Draw({
  type:'Polygon',
  source:searchSrc
})

boxDraw.on("drawend",async(evt)=>{
  const amps=await ampService.getAmplifiersByFence(evt.feature)
  amps.forEach(f=>{
    console.log(f);
    const feature = new Feature({
      geometry:new Point(f.geometry.coordinates),
      type:f.type,
      _id:f._id
    })
    searchSrc.addFeature(feature);
  })
})

map.addInteraction(boxDraw);
map.addLayer(searchLayer);