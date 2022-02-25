import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import StoreService from './services/StoreService';
import { showAttributeWindow } from './views/attributeWindow';
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

//Store placement logic
const storeService = new StoreService();
const storeSource = new VectorSource();
const storelayer = new VectorLayer({
  source:storeSource
});

const storeDraw = new Draw({
  type:'Point',
  source:storeSource
})

const storeModify = new Modify({
  source:storeSource
})

map.addInteraction(storeDraw);
map.addInteraction(storeModify);

storeSource.on('addfeature',(evt)=>{
  showAttributeWindow();
  storeService.addStore(evt.feature);
})

//Layer additions
map.addLayer(storelayer);