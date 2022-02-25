import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import FeatureController from './services/FeatureService';
import FeatureService from './services/FeatureService';
import AmplifierService from './services/AmplifierService';
import Point from 'ol/geom/Point';
import { amplifierStyle } from './styles/styles';

const featureService = new FeatureService();
const amplifierService = new AmplifierService();
const geometryType = document.getElementById("type");




const  getAllAmplifiers=async ()=>{
  let savedAmplifiers = await amplifierService.getAmplifiers();
  savedAmplifiers.forEach(a=>{
    const amplifier = new Feature({
      geometry:new Point(a.geometry.coordinates),
      type:a.type,
      _id:a._id
    })
    //amplifier.setStyle(amplifierStyle);
    amplifierSource.addFeature(amplifier);
  })
}

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

window.addEventListener("load",async (e)=>{
  let savedFeatures = await featureService.getFeatures();
  
  savedFeatures.forEach(f=>{
    const feature = new Feature({
      geometry:new Polygon(f.geometry.coordinates),
      type:f.type,
      _id:f._id
    })
    vectorSource.addFeature(feature);
  })
  //getAllAmplifiers();
  
})


const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source:vectorSource
});

const amplifierSource = new VectorSource();
const amplifierLayer = new VectorLayer({
  source:amplifierSource
})

let draw;
function addInteraction(){
  if(geometryType.value!="None"){
      if(geometryType.value=="Polygon")
        draw = new Draw({
          source:vectorSource,
          type:geometryType.value
        });
      else if(geometryType.value=="Point")
        draw = new Draw({
          source:amplifierSource,
          type:geometryType.value
        })
      map.addInteraction(draw);
    }
}

const featuremodify = new Modify({
  source:vectorSource
});

const ampmodify = new Modify({
  source:amplifierSource
});

const featureSelect = new Select({
  source:vectorSource
})

map.addInteraction(featureSelect);
map.addInteraction(featuremodify);
map.addInteraction(ampmodify);

featureSelect.on("select",async (e)=>{
  if(e.selected[0].getProperties()._id){
    const amplifiers = await amplifierService.getAmplifiersByFence(e.selected[0])
    amplifierSource.clear();
    amplifiers.forEach(a=>{
      const amplifier = new Feature({
        geometry:new Point(a.geometry.coordinates),
        type:a.type,
        _id:a._id
      })
      amplifier.setStyle(amplifierStyle);
      amplifierSource.addFeature(amplifier);
    })
  }
    
})



featuremodify.on("modifyend",e=>{
  const modifiedfeature=e.features.getArray()[0];
  featureService.updateFeature(modifiedfeature);
})

ampmodify.on("modifyend",e=>{
  const modifiedfeature=e.features.getArray()[0];
  amplifierService.updateAmplifier(modifiedfeature)
})

vectorSource.on("addfeature",e=>{
  const featureType = e.feature.getGeometry().getType().toUpperCase()
  featureService.saveFeature(e.feature);
  
})

amplifierSource.on("addfeature",e=>{
  const featureType = e.feature.getGeometry().getType().toUpperCase()
  amplifierService.saveAmplifier(e.feature)
  
})



map.addLayer(vectorLayer);
map.addLayer(amplifierLayer);

geometryType.addEventListener("change",(e)=>{
  console.log(e);
  map.removeInteraction(draw);
  addInteraction();
});




