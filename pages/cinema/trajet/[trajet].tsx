import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Header from "../../components/utils/Header";
import { positions } from "../../interfaces/interfaces";
import GetCommercialMode from "../../utils/GetCommercialMode";
import { display_info, display_infos_walking } from "../../interfaces/interfaces";
import { useRouter } from "next/router";

function trajet(trajets: any) {
  const router = useRouter();

  // sections: array des sections -> sections.geojson.coordinates : array des coordonnées
  const HandleOnClickItineraire = (sections:any) => {
    let itineraire:any[]=[];
    sections.map((section:any, index:number) => {
      itineraire.push([section.geojson.coordinates]);
    })
    console.log(itineraire);
    router.push({pathname:`/cinema/itineraire/${itineraire}`})
  }

  return (
    <div>
      <Header />
      Choisissez un trajet pour accéder aux détails
      {trajets.trajets.journeys.map((trajet: any, index: number) => {
        // Formate l'arrivé en 00h00
        var horaire_depart:string= `${trajet.departure_date_time.split("T")[1].slice(0,2)}h${trajet.departure_date_time.split("T")[1].slice(2,4)}`;
        var horaire_arrivee:string= `${trajet.arrival_date_time.split("T")[1].slice(0,2)}h${trajet.arrival_date_time.split("T")[1].slice(2,4)}`; 

// Passe trajet.sections = [section] -> [section].map((section) => section.geojson.coordinates : [])

        return (
          <div className="trajet-container" onClick={() => HandleOnClickItineraire(trajet.sections)}>
            <div className="trajet-horaire">
              Départ à {horaire_depart} - Arrivée à {horaire_arrivee} <small>~{parseInt((trajet.duration / 60).toString())} minutes</small>
            </div>
            <div className="sections">
                {/* {trajet.sections.length - 1} changements : <br/> */}
                {trajet.sections.map((section:any, index:number)=> {
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
                  <div className="section" style={{display:'flex'}}>
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
                else if (section.mode = 'walking'){
                  // todos: quand type=waiting pour attendre un transport, mode=walking
                  try{
                  display_infos_walking.mode = 'A pied';
                  display_infos_walking.duration = parseInt((section.duration / 60 ).toString()); 
                  try{display_infos_walking.geojson = section.geojson.coordinates}catch{console.log('error geojson walking:' + section)};
                  return (
                    <div className="section" style={{display:'flex'}}>
                   - <b>{display_infos_walking.mode}</b> - Depuis <code>{section.from.name}</code> vers <code>{section.to.name}</code> <small> ~{display_infos_walking.duration}minutes</small>
                </div>
                )
                  }catch{console.log(section)}
              }
                })}
            </div> 
          </div>
        );
      })}
    </div>
  );
}

export default trajet;

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [{ params: { trajet: "test" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {

  let trajet: any = context?.params?.trajet;
  let user = trajet.split("+")[0];
  let cinema = trajet.split("+")[1];
  let userGeo: positions = { lat: user.split(",")[0], lng: user.split(",")[1] };
  let cinemaGeo: positions = {
    lat: cinema.split(",")[0],
    lng: cinema.split(",")[1],
  };

  const p = await fetch(
    `https://api.navitia.io/v1/journeys?from=${cinemaGeo.lat};${cinemaGeo.lng}&to=${userGeo.lat};${userGeo.lng}`,
    {
      headers: {
        Authorization: "Basic " + btoa("0fbd3e70-5d3c-4d75-adfd-dbc6c821d560:"),
      },
    }
  );
  const res = await p.json();

  return {
    props: {
      trajets: res,
    },
  };
};
