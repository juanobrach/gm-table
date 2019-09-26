import * as XLSX from "xlsx";
import * as dataJson from './../ficha-tecnica-equinox.json';



/**
 *  @input DataJson is created by gulp task (convertXls) from an XLS file (/src/ficha-tecnica-equinox.json) 
 *  @output Return a array wich contain each car object with their respective properties [{ carModel : '2EZ8CO', motor: [ { KMAT : 'X1LS415JNCS' }]}]
 */

function prepareGeneratedJSON(){
    let specs = ['MOTOR', 'TRANSMISIÓN', 'CHASIS', 'APARIENCIA EXTERIOR', 'APARIENCIA INTERIOR', 'SEGURIDAD', 'CONTROLES Y MEDIDORES', 'LUCES INDICADORAS', 'LUCES', 'COMODIDAD', 'PESOS Y CAPACIDADES'];
    let cars = [];

    let data = dataJson ;

    /**
     *  DATA[0] first row will return an array of object with key and value.
     *  If the key is undefined it is not a model name, we need to return the value of the key value pair.
     */
    let result = [];
    let models = prepareModelsArray(data[0]);
    let specsCategoriesObject = prepareSpecsCategoriesObject(data, specs, models);
    console.log('specsCategoriesObject:', specsCategoriesObject)
    let carsData = populateDataToCars( data, specs, models, specsCategoriesObject  );

  }


  function prepareModelsArray( firstRow ){
    return Object.entries( firstRow ).reduce( (result, model) => {
      if( model[0] != 'null'){
        result.push(model[0])
      }
      return result;
    }, [])
  }

  function prepareSpecsCategoriesObject( data, specs, models ){
    let specContent = [];
    let actualCategory = '';
    let categoryContent = [];
    Object.entries( data ).filter( ( row ) =>{
      let category = row[1].null;
      if( specs.indexOf(category) > -1 ){
        actualCategory = category
        specContent[actualCategory];
        categoryContent = [];
      }else{
        if( actualCategory != ''){
          categoryContent.push(row[1].null);
          specContent[actualCategory] = categoryContent ;
        }
      }
    })
    return specContent;
  }

  function populateDataToCars( data, specs ,models, specsCategories ){

      let actualSpec = '';
      let carsData = [];
      models.forEach( model  => {
        carsData[model] = [];
        let modelArrayOfSpecs = [];
        let specsArray = [];
         Object.entries( data ).filter( ( row ) =>{
          let specCategoriesWithData = {};
          let spec = row[1].null;
          if( specs.indexOf(spec) > -1 ){
            let modelArrayOfSpecs = [];
            actualSpec = spec
            specsArray = [];
            modelArrayOfSpecs[actualSpec] = [];
            
          }else{
            if( actualSpec != ''){
              
              let specValue = row[1][model];
              let actualSpecCategory = row[1].null
              // console.log('----------')
              // console.log('model:', model)
              // console.log('actualSpec:', actualSpec)
              // console.log('actualSpecCategory:', actualSpecCategory )
              // console.log('valor:', specValue )
              // console.log('----------')
              specCategoriesWithData[ actualSpecCategory ] = specValue;
              specsArray.push(specCategoriesWithData)
              modelArrayOfSpecs[actualSpec] = specsArray;
              carsData[model] = modelArrayOfSpecs; 
            }
          }
        })
      });
      console.log('modelArrayOfSpecs:', carsData)
  }

export default prepareGeneratedJSON;