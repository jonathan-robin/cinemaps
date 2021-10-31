import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Header from '../../components/utils/Header';
import fetchGoogleMapsAdresses from '../../utils/FetchGoogleMapsAdresses';
import { positions } from '../../interfaces/interfaces';
import { useRouter } from 'next/router';
import GoogleMap from '../../utils/GoogleMap';
import Loading from '../../components/utils/Loading';

function Cinema({response_adress, userAdress}:InferGetStaticPropsType<typeof getStaticProps>) {
    var response_cinemas:any = [];
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    // zoom de googleMaps
    const zoom = 12;
    response_adress.records.map((feature:any, index:number) => { 
        response_cinemas.push(feature);
    })
    useEffect(() => { 
        fetchGoogleMapsAdresses(response_cinemas, zoom, 'Adresse', null);
    },[])

    // on push [trajet] avec coordonnées du user et du cinema cliqué
    const handleOnClick = async (cinemaAdress:number[], userAdress:positions) => {
        setLoading(true);
        router.push({pathname:`/cinema/trajet/${cinemaAdress}%2C+${userAdress.lng},${userAdress.lat}`})
    }

    return (
        <body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <div>
            <Header />
            {loading ? <Loading /> : 
            <>
               <h3 className='CardClic'>Cliquez sur une card pour avoir accès à l'itinéraire</h3>
            <GoogleMap />
            <div className="container__adresses">
        {response_cinemas.map((cinema:any, index:any)=>{
          return (
            //   OnClick renvoit l'itinéraire
            <div className="text-white mb-3 cardCinema" style={{maxWidth:'20rem'}} key={index}
            onClick={() => handleOnClick(cinema.geometry.coordinates, userAdress)}>
              <div className="card-header">{cinema.fields.adresse}</div>
              <div className="card-body">
                <h4 className="card-title">{cinema.fields.commune}</h4>
                <p className="card-text">{cinema.fields.nom}</p>
                <p className="card-text">Distance : {parseInt(cinema.fields.dist)} mètres</p>
                <p className="card-text">{cinema.fields.tranche_d_entrees}</p>
                <p className="card-text">{cinema.fields.fauteuils} fauteuils</p>
                <p className="card-text">{cinema.fields.ecrans} écrans</p>
              </div>
            </div>
          )
        })}
        </div></>
}
        </div>
        <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw&v=weekly"
      async
    ></script>
        </body>
    )
}

export const getStaticPaths:GetStaticPaths = async (context) => {
  console.log(`Building slug: ${context}`)
    return ({ 
        paths:[
            { params: { cinema : "48.60,+2.48"}}
        ], 
        fallback:'blocking'
    })
}

export const getStaticProps:GetStaticProps = async (context) => {
    // Query = lat+lng de l'adresse select + distance du rayon de recherche
    let query = context?.params?.cinema;
    let queryToString:string=query? query.toString() : '0';
    let userAdress:positions={lat:queryToString ? parseFloat(queryToString.split(',+')[0]) : 0 ,
                                lng:queryToString ? parseFloat(queryToString.split(',+')[1]) : 0};
    const props = await fetch(`https://data.iledefrance.fr/api/records/1.0/search/?dataset=les_salles_de_cinemas_en_ile-de-france&q=&facet=dep&facet=tranche_d_entrees&facet=ae&facet=multiplexe&facet=pdm_en_entrees_des_films_americains&facet=ecrans&facet=fauteuils&facet=geo&geofilter.distance=${query}`)
    const data = await props.json()
    return {
        props:{ 
            response_adress: data, 
            userAdress
        }
    }
}


export default Cinema
