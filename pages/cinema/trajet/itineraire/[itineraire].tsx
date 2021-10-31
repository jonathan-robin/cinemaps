import { GetStaticPaths, GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import { positions, responseAdresses, display_info, display_infos_walking } from "../../../../interfaces/interfaces";
import fetchGoogleMapsAdresses from "../../../../utils/FetchGoogleMapsAdresses";
import GoogleMap from "../../../../utils/GoogleMap";
import GetCommercialMode from "../../../../utils/GetCommercialMode";
import {AppContext} from '../../../../context/sectionsContext';
import Header from "../../../../components/utils/Header";

function itineraire({ itineraire}: any) {
  const [sectionsState, setSectionsState] = useContext(AppContext);
  const zoom = 16;
  let sections: string[] = itineraire.toString().split(",");
  let lesSections: positions[] = [];
  let response_adresse: responseAdresses[];

  useEffect(() => {
    if (localStorage.getItem('sections') !== null){
      let v = (localStorage.getItem('sections'))
      v !== null && setSectionsState(JSON.parse(v));
    }
  },[])

  sections.map((section: any, index: number) => {
    if (index === 0 || index % 2 === 0) {
      return lesSections.push({
        lng: parseFloat(section.toString()),
        lat: parseFloat(sections[index + 1].toString()),
      });
    }
    return;
  });

  useEffect(() => {
    fetchGoogleMapsAdresses(response_adresse, zoom, "itineraire", lesSections);
  }, []);

  return (
    <div className="trajets--modal" >
      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
      <div>
        <Header />
        <GoogleMap />
        <div className="trajet-container">
            <div className="sections">
                {sectionsState?.map((section:any, index:number)=> {
                    let display_info:display_info= { mode:'', 
                    colorLine:'', 
                    Line:'',
                    direction:'',
                    label:'',
                    duration:0
}
          let display_infos_walking:display_infos_walking={mode:'', duration:0, geojson:[0]}
                // Si il y a un mode de transport 
                // Todos : catch train,rer au cas ou
                if (section.display_informations){
                  display_info = GetCommercialMode(section.display_informations, section.duration);
                  return (
                  <div className="section" style={{display:'flex'}} key={index}>
                  - <b>{display_info.mode}</b> - Depuis {section.from.name} vers {section.to.name} <small>{" "}~{display_info.duration} min</small>
                   <div className='trajet_commercialMode' style={{display:'flex'}}>
                      <div className='colorLine' style={{backgroundColor:display_info.colorLine}}>
                        {display_info.Line}
                      </div> 
                      <code>{display_info.label}</code>{" - "} Direction : <code>{display_info.direction}</code>
                   </div>
              </div>
              )
                }
                // Si c'est à pied
                else if (section.mode === 'walking' && section.type !== "waiting"){
                  display_infos_walking.mode = 'A pied';
                  display_infos_walking.duration = parseInt((section.duration / 60 ).toString()); 
                  display_infos_walking.geojson = section.geojson.coordinates;
                  return (
                    <div className="section" style={{display:'flex'}} key={index}>
                   - <b>{display_infos_walking.mode}</b> - Depuis <code>{section.from.name}</code> vers <code>{section.to.name}</code> <small> ~{display_infos_walking.duration}minutes</small>
                </div>
                )
              }
              return;
                })}
            </div> 
          </div>
      </div> 
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw&v=weekly"
        async
      ></script>
    </div>
  );
}

export default itineraire;

export const getStaticPaths: GetStaticPaths = async (context) => {
  console.log(`Building slug: ${context}`)
  return {
    paths: [{ params: { itineraire: "[[2.4022658594,48.8766155286],[2.402506,48.876062],[2.402538,48.875985],[2.402538,48.875985]]" }, 
                       }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      itineraire: context?.params?.itineraire,
    },
  };
};
