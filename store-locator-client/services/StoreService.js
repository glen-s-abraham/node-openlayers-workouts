import {build} from '../utils/featureBuilder';
import {storeStyle} from '../styles/featureStyles';
import ApiService from './ApiService';
import GeoJSON from  'ol/format/GeoJSON';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
class StoreService{
    api = new ApiService()
    storeUrl = 'http://127.0.0.1:8000/api/store'
    async addStore(store,data){
        if(!store.values_._id){//try getters
            let writer = new GeoJSON();
            const geom = writer.writeFeatureObject(store)
            let storeReq = {
                ...data,
                location:geom.geometry
            }
            const storeRes = await this.api.postData(this.storeUrl,storeReq)
            store.setProperties({_id:storeRes._id})
            build(store,storeStyle)
          }
    }

    async getStores(){
        const stores = await this.api.getData(this.storeUrl)
        const storeFeatures=stores.map(store=>{
            return this.storeFeatureBuilder(store);
        })

        return storeFeatures

    }

    storeFeatureBuilder(store){
        const feature = new Feature({
            geometry:new Point(store.location.coordinates)
        })
        feature.setProperties(
            {
                _id:store._id,
                name:store.name,
                owner:store.owner,
                contact:store.contact
            }
        )
        feature.setStyle(storeStyle);
        return feature;
    }
}

export default StoreService;