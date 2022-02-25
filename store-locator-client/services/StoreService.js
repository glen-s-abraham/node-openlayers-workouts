import {build} from '../utils/featureBuilder';
import {storeStyle} from '../styles/featureStyles';

class StoreService{
    addStore(store,data){
        store.setProperties(data);
        console.log(store);
        build(store,storeStyle);
    }
}

export default StoreService;