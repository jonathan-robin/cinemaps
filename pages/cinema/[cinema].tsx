import React, { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import useAxios from '../hooks/useAxios';
import Header from '../components/utils/Header';
import fetchGoogleMapsAdresses from '../utils/FetchGoogleMapsAdresses';

function Cinema({response_adress}:InferGetStaticPropsType<typeof getStaticProps>) {
    var response_cinemas:any = [];
    // zoom de googleMaps
    const zoom = 12;
    response_adress.records.map((feature:any, index:number) => { 
        response_cinemas.push(feature);
    })
    
    useEffect(() => { 
        fetchGoogleMapsAdresses(response_cinemas, zoom);
    },[])

    return (
        <body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <div>
            <Header />
                <div id="map"></div>
            <div className="container__adresses">
        {response_cinemas.map((cinema:any, index:any)=>{
          return (
            <div className="card text-white bg-primary mb-3" style={{maxWidth:'20rem'}}>
              <div className="card-header">{cinema.fields.adresse}</div>
              <div className="card-body">
                <h4 className="card-title">{cinema.fields.commune}</h4>
                <p className="card-text">{cinema.fields.nom}</p>
                <p className="card-text">Distance : {cinema.fields.dist}</p>
                <p className="card-text">{cinema.fields.tranche_d_entrees}</p>
                <p className="card-text">{cinema.fields.fauteuils} fauteuils</p>
                <p className="card-text">{cinema.fields.ecrans} écrans</p>
              </div>
            </div>
          )
        })}
        </div>
        </div>
        <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw&callback=initMap&v=weekly"
      async
    ></script>
        </body>
    )
}

export const getStaticPaths:GetStaticPaths = async (context) => {
    return ({ 
        paths:[
            { params: { cinema : 'test'}}
        ], 
        fallback:'blocking'
    })
}

export const getStaticProps:GetStaticProps = async (context) => {
    // Query = lat+lng de l'adresse select + distance du rayon de recherche
    let query = context?.params?.cinema;
    const props = await fetch(`https://data.iledefrance.fr/api/records/1.0/search/?dataset=les_salles_de_cinemas_en_ile-de-france&q=&facet=dep&facet=tranche_d_entrees&facet=ae&facet=multiplexe&facet=pdm_en_entrees_des_films_americains&facet=ecrans&facet=fauteuils&facet=geo&geofilter.distance=${query}`)
    const data = await props.json()
    return {
        props:{ 
            response_adress: data
        }
    }
}


export default Cinema
