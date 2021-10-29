import { GetStaticPaths, GetStaticProps } from 'next';
import React,{useEffect} from 'react'
import { positions, responseAdresses } from '../../interfaces/interfaces';
import Header from '../../components/utils/Header';
import fetchGoogleMapsAdresses from '../../utils/FetchGoogleMapsAdresses';
import GoogleMap from '../../GoogleMap';

function itineraire({itineraire}:any) {
    const zoom = 16;
    let sections:string[] = itineraire.toString().split(','); 
    let lesSections:positions[]=[];
    let response_adresse:responseAdresses[];

    sections.map((section:any, index:number) => {
        if (index === 0 || index%2 === 0){
            return lesSections.push({lng:parseFloat(section.toString()), lat:parseFloat(sections[index+1].toString())})
        }
        return
    })

    console.log(lesSections)

    useEffect(() => {
        fetchGoogleMapsAdresses(response_adresse, zoom, 'itineraire', lesSections);
    },[])

    return (
            <body>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
   
            <div>
                <Header />
                <GoogleMap />
                {/* <div className="mapItineraire"></div> */}
                <div className="container__adresses">
            {/* {response_adresses.map((adress:any, index:any)=>{
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
            })} */}
            </div>
            </div>
            <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw&callback=initMap&v=weekly"
          async
        ></script>
            </body>
    )
}

export default itineraire

export const getStaticPaths: GetStaticPaths = async (context) => {
    return {
      paths: [{ params: { itineraire: "test" } }],
      fallback: "blocking",
    };
  };
  
  export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props:{
            itineraire:context?.params?.itineraire
        }
    }
  };