import React,{useState, useEffect,useRef, ChangeEvent} from 'react'
import Header from './components/utils/Header'; 
import { positions,responseAdressesProperties, responseAdresses,responseAdressesGeometry} from './interfaces/interfaces';
// export interface responseAdresses{
//     properties:responseAdressesProperties, 
//     geometry:responseAdressesGeometry
// }

// export interface responseAdressesProperties{
//     city:string, 
//     citycode:string, 
//     context: string
//     housenumber: string
//     id: string
//     importance:number
//     label: string
//     name: string
//     postcode:string
//     score: number
//     street:string
//     type:string
//     x:number
//     y:number
// }

// export interface responseAdressesGeometry{
//     type:string, 
//     coordinates:number[]
// }

// export interface positions{ 
//     lat:number, 
//     lng:number
// }

function Cinema() {
    const inputRef = useRef<HTMLInputElement>(null); 
    const [inputValue, setInputValue] = useState<string>();
    const [displayAdress, setDisplayAdresse] = useState<boolean>(false);
    const [options, setOptions] = useState<string[] | undefined>([])

    useEffect(() => {
        inputRef.current?.focus();
    },[])

    const handleChangeInputValue = async (e: ChangeEvent<HTMLInputElement>) => { 
        // fetch api completion q = e.currentTarget.value 
        let q = e.currentTarget.value
        //  code insee = context.split(',')[0] - Recherche par code insee 75,
        setInputValue(e.currentTarget.value);
        const p = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${q}&city=paris`)
        const res = await p.json(); 
        var adresses: any = [];
        // todo: push uniquement une fois le meme postcode
        const res_1 =
          (await res) &&
          res.features.map((item: any, index: any) => {
            // on push le cp/ville/adresse dans les options du completion
            adresses.push({
              adresse: item.properties.name,
              postcode: item.properties.postcode,
              city: item.properties.city,
            });
          });
        (await res_1) && setOptions(adresses);
        options !== undefined && setDisplayAdresse(true); 
    }

    const handleClickButton = async () => { 
        // Récupérer responseAdresses de l'adresse
        // Extraire les coordinates de responseAdressesGeometry
        // coordinates[0] = positions.lat, coordinates[1] = positions.lng
        let pos:positions;
        // Faire une query avec la lat et la long
        let query='';
        const p = await fetch('https://data.iledefrance.fr/api/records/1.0/search/?dataset=les_salles_de_cinemas_en_ile-de-france&q=&facet=dep&facet=tranche_d_entrees&facet=ae&facet=multiplexe&facet=pdm_en_entrees_des_films_americains&facet=ecrans&facet=fauteuils&facet=geo&geofilter.distance=2.40%2C+48.88%2C+2500')
        const res = await p.json(); 
        console.log(res);
    }

    const handleClickAdresse = (e:any) =>{ 

    }

    return (
        <div>
        <Header />
        <div className="card">
          <img
            className="card-img-top"
            src="https://picsum.photos/200/200"
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Retrouvez les cinemas</h5>
            <p className="card-text">
                Rentrez votre adresse pour avoir accès au 10 cinemas les plus proches de chez vous.
                (Recherche uniquement à Paris)
            </p>

            <div>
      <input type="text" value={inputValue} ref={inputRef} onChange={handleChangeInputValue}/>

      {displayAdress && (
        <div className="result-autocompletion--codePostal">
          {options?.map((v: any, i) => {
            return (
              <div
                id={`${v.postcode} ${v.city}`}
                key={i}
                onClick={(event) => handleClickAdresse(event)}
                className="result-autocompletion--codePostal"
              >
                {v.adresse} - {v.postcode} - {v.city}
              </div>
            );
          })}
        </div>
      )}
    </div>
    
            <button type="button" onClick={handleClickButton} className="btn btn-fetch-data btn-primary">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    )
}

export default Cinema
