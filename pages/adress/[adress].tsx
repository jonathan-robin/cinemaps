import React, { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import useAxios from '../hooks/useAxios';
import Header from '../components/Header';
import {responseAdresses} from '../interfaces/interfaces';
import fetchGoogleMapsAdresses from '../utils/FetchGoogleMapsAdresses';

function Adress({response_adress}:InferGetStaticPropsType<typeof getStaticProps>) {
    var response_adresses:responseAdresses[] = [];
    response_adress.features.map((feature:any, index:number) => { 
        response_adresses.push(feature);
    })

    useEffect(() => { 
        fetchGoogleMapsAdresses(response_adresses);
    },[])

    return (
        <body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <div>
            <Header />
                <div id="map"></div>
            <div className="container__adresses">
        {response_adresses.map((adress:any, index:any)=>{
          return (
            <div className="card text-white bg-primary mb-3" style={{maxWidth:'20rem'}}>
              <div className="card-header">{adress.properties.citycode}</div>
              <div className="card-body">
                <h4 className="card-title">{adress.properties.city}</h4>
                <p className="card-text">{adress.properties.label}</p>
                <p className="card-text">{adress.properties.context}</p>
                <p className="card-text">{adress.properties.type}</p>
                <p className="card-text">x: {adress.properties.x}</p>
                <p className="card-text">y: {adress.properties.y}</p>
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
    const instance = useAxios();
    console.log('gspaths', context)
    return ({ 
        paths:[
            { params: { adress : 'test'}}
        ], 
        fallback:'blocking'
    })
}

export const getStaticProps:GetStaticProps = async (context) => {
    let query = context?.params?.adress;
    const props = await fetch(`https://api-adresse.data.gouv.fr/search/${query}`)
    const data = await props.json()
    return {
        props:{ 
            response_adress: data
        }
    }
}


export default Adress
