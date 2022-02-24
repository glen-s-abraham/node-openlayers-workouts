import GeoJSON from 'ol/format/GeoJSON';
import FeatureModel from "../model/Feature";

class FeatureService{
    featureModel = new FeatureModel();
    async saveFeature(feature){
        console.log(feature)
        if(!feature.values_._id){//try getters
            let writer = new GeoJSON();
            let data = writer.writeFeatureObject(feature)
            console.log(data);
            const res=await this.featureModel.saveFeature(data);
            feature.values_._id=res._id
            console.log(feature);
          }
    }

    getFeatures(){
        const features = this.featureModel.getFeatures();
        return features;
    }

    updateFeature(feature){
        const id=feature.values_._id
        const geom={geometry:{
            type:"Polygon",
            coordinates:feature.getGeometry().getCoordinates()
        }}
        this.featureModel.putFeature(id,geom);
    }
}

export default FeatureService;