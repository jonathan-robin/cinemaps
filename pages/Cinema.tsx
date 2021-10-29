import { useRouter } from 'next/router';
import React,{useState, useEffect,useRef, ChangeEvent, useCallback} from 'react'
import Header from './components/utils/Header'; 
import { positions, adresseInfos} from './interfaces/interfaces';
import HandleClickFetchCinema from './utils/HandleClickFetchCinema';

function Cinema() {
    const inputRef = useRef<HTMLInputElement>(null); 
    const [adresse, setAdresse] = useState<string>();
    const [displayAdress, setDisplayAdresse] = useState<boolean>(false);
    const [options, setOptions] = useState<adresseInfos[] | undefined>([]);
    const [geo, setGeo] = useState<positions>()
    const router= useRouter();
    // Rayon de la recherche de cinema en mètre
    var query:string='3000';

    useEffect(() => {
        inputRef.current?.focus();
    },[])

    const handleChangeInputValue = async (e: ChangeEvent<HTMLInputElement>) => { 
        let q = e.currentTarget.value
        setAdresse(e.currentTarget.value);
        // Recup les options pour le completion de l'adresse
        const p = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${q}&city=Paris`)
        const res = await p.json(); 
        var adresses: adresseInfos[] = [];
        const res_1 =
          (await res) &&
          // on push adresse complete avec lat/lng dans les options du completion
          res.features.map((item: any, index: any) => {
            adresses.push({
              adresse: item.properties.name,
              postcode: item.properties.postcode,
              city: item.properties.city,
              geo:{
                  lat:item.geometry.coordinates[0],
                  lng:item.geometry.coordinates[1]
              }
            });
          });
        (await res_1) && setOptions(adresses);
        options !== undefined && setDisplayAdresse(true); 
    }

    const handleClickButton = async () => { 
        HandleClickFetchCinema(geo, query, router);
    }

    const handleClickAdresse = (e:any) =>{ 
        setGeo({lat: e.currentTarget.id.split(' ')[0], lng: e.currentTarget.id.split(' ')[1]}); 
        setAdresse(e.currentTarget.innerHTML)
        setDisplayAdresse(false); 
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
      <input type="text" value={adresse} ref={inputRef} onChange={handleChangeInputValue}/>

      {displayAdress && (
        <div className="result-autocompletion--codePostal">
          {options?.map((v: any, i) => {
            return (
              <div
                id={`${v.geo.lat} ${v.geo.lng}`}
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
