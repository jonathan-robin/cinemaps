import { useRouter } from 'next/router';
import React,{useState, useEffect,useRef, ChangeEvent} from 'react'
import Background from '../components/utils/Background';
import Header from '../components/utils/Header'; 
import Loading from '../components/utils/Loading';
import { positions, adresseInfos} from '../interfaces/interfaces';
import HandleClickFetchCinema from '../utils/HandleClickFetchCinema';

function Cinema() {
    const inputRef = useRef<HTMLInputElement>(null); 
    const [adresse, setAdresse] = useState<string>();
    const [displayAdress, setDisplayAdresse] = useState<boolean>(false);
    const [options, setOptions] = useState<adresseInfos[] | undefined>([]);
    const [geo, setGeo] = useState<positions>({lat:0, lng:0})
    const router= useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    // Rayon de la recherche de cinema en mètre
    var query:string='3000';

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1800 )
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
      if (geo.lng !== 0 && geo.lat !== 0){
        document.getElementsByClassName('background__card')[0].classList.add('remove')
        setLoading(true);
        HandleClickFetchCinema(geo, query, router);
      } 
    }

    const handleClickAdresse = (e:any) =>{ 
        setGeo({lat: e.currentTarget.id.split(' ')[0], lng: e.currentTarget.id.split(' ')[1]}); 
        setAdresse(e.currentTarget.innerHTML)
        setDisplayAdresse(false); 
    }

    return (
        <div>
          <Header />
          {loading && <Loading />}
          <div className='background__card'>
          <Background/>
          <div className="card">
          <div className="card-body">
            <h5 className="card-title">Retrouvez les cinemas</h5>
            <p className="card-text">
                Rentrez votre adresse pour avoir accès au 10 cinemas les plus proches de chez vous.
                (Recherche uniquement à Paris)
            </p>
            <div>
              <input type="text" value={adresse} ref={inputRef} placeholder='Rentrez une adresse...' onChange={handleChangeInputValue}/>

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
            <button type="button" style={geo.lng !== 0 ? { pointerEvents:'all', cursor:'grab' } : {cursor:'no-drop'}} onClick={handleClickButton} className="btn button__rechercheCinema">
              Rechercher
            </button>
          </div>
        </div>
        </div>
      </div>
    )
}

export default Cinema
