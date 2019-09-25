import * as XLSX from "xlsx";
import * as dataJson from './../ficha-tecnica-equinox.json';



/**
 *  @input DataJson is created by gulp task (convertXls) from an XLS file (/src/ficha-tecnica-equinox.json) 
 *  @output Return a array wich contain each car object with their respective properties [{ carModel : '2EZ8CO', motor: [ { KMAT : 'X1LS415JNCS' }]}]
 */

function prepareGeneratedJSON(){
    let specs = ['MOTOR', 'TRANSMISIÓN'];
    let cars = [];

    let data = dataJson ;

    /**
     *  DATA[0] first row will return an array of object with key and value.
     *  If the key is undefined it is not a model name, we need to return the value of the key value pair.
     */
    let result = [];
    let models = prepareModelsArray(data[0]);
    console.log('models:', models)
  }


  function prepareModelsArray( firstRow ){
    return Object.entries( firstRow ).reduce( (result, model) => {
      if( model[0] != 'null'){
        result.push(model[0])
      }
      return result;
    }, [])
  }

export default prepareGeneratedJSON;