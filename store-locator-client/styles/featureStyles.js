import Style from 'ol/style/Style';
import Icon from  'ol/style/Icon';

export const storeStyle = new Style({
    image: new Icon({
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../icons/store.png',
    }),
  });