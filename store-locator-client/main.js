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

let state = {};

state["mode"]="select";


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

window.addEventListener("load",async (e)=>{
  storeSource.addFeatures(await storeService.getStores())
})

let storeDraw
const setDrawInteraction=()=>{
  if(state.mode==="create"){
    storeDraw = new Draw({
      type:'Point',
      source:storeSource
    })
    map.addInteraction(storeDraw);
  }
    
}

document.querySelector('.controls').addEventListener("click",(evt)=>{
  map.removeInteraction(storeDraw)
  state.mode=evt.target.id
  setDrawInteraction()
})

const storeModify = new Modify({
  source:storeSource
})

const storeSelect = new Select({
  source:storeSource
})


map.addInteraction(storeModify);
map.addInteraction(storeSelect);

storeSelect.on("select",(evt)=>{
  if(state.mode=='select'){
    //showDetails(evt.selected[0].getProperties());
    console.log(evt.selected[0].getProperties())
  }
    
  if(state.mode=='delete'){
     //deleteStore() 
     console.log("feature deletion")
  }

  if(state.mode=='update'){
    //deleteStore() 
    console.log("feature updation")
 }
    
})


storeSource.on('addfeature',(evt)=>{
  console.log("addfeature");
  if(!evt.feature.getProperties().name){
    console.log("new feature")
    showAttributeWindow();
    document.querySelector('#attribute-submit').addEventListener("click",()=>{
      let data={}
      data['name']=document.querySelector('#name').value
      data['owner']=document.querySelector('#owner').value
      data['contact']=document.querySelector('#contact').value
      hideAttributeWindow();
      
      storeService.addStore(evt.feature,data);
    })
    document.querySelector('#attribute-cancel').addEventListener("click",()=>{
      hideAttributeWindow();
    })
  }
  
  
})

//Layer additions
map.addLayer(storelayer);