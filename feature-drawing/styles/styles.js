import Style from 'ol/style/Style';
import Icon from  'ol/style/Icon';
export const amplifierStyle = new Style({
    image: new Icon({
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../icons/amplifier.png',
      
    }),
  });