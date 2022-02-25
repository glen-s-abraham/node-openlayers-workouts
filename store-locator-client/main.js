import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import StoreService from './services/StoreService';
import { showAttributeWindow,hideAttributeWindow } from './views/attributeWindow';
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

const storeSelect = new Select({
  source:storeSource
})

map.addInteraction(storeDraw);
map.addInteraction(storeModify);
map.addInteraction(storeSelect);

storeSource.on('addfeature',(evt)=>{
  showAttributeWindow();
  document.querySelector('#attribute-submit').addEventListener("click",()=>{
    let data={}
    data['name']=document.querySelector('#name').value
    data['owner']=document.querySelector('#owner').value
    data['contact']=document.querySelector('#contact').value
    console.log(data);
    hideAttributeWindow();
    
    storeService.addStore(evt.feature,data);
  })
  document.querySelector('#attribute-cancel').addEventListener("click",()=>{
    const f = new Feature({
      geometry:evt.feature.getGeometry()
    })
    hideAttributeWindow();
  })
  
})

//Layer additions
map.addLayer(storelayer);