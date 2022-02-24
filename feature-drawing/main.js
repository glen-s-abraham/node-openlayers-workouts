import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import FeatureController from './services/FeatureService';
import FeatureService from './services/FeatureService';


const featureService = new FeatureService();

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

window.addEventListener("load",async (e)=>{
  const savedFeatures = await featureService.getFeatures();
  console.log(savedFeatures)
  savedFeatures.forEach(f=>{
    const feature = new Feature({
      geometry:new Polygon(f.geometry.coordinates),
      type:f.type,
      _id:f._id
    })
    vectorSource.addFeature(feature);
    
  })
  
})


const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source:vectorSource
});

const draw = new Draw({
  type:'Polygon',
  source:vectorSource
});
const modify = new Modify({
  source:vectorSource
});


map.addInteraction(draw);
map.addInteraction(modify);

modify.on("modifyend",e=>{
  const modifiedfeature=e.features.getArray()[0];
  featureService.updateFeature(modifiedfeature);
})

vectorSource.on("addfeature",e=>{
  featureService.saveFeature(e.feature);
})

map.addLayer(vectorLayer);






