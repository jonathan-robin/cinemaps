import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import Header from "../../components/utils/Header";
import { positions } from "../../interfaces/interfaces";

function trajet(trajets: any) {
  console.log(trajets);

  return (
    <div>
      <Header />
      {trajets.trajets.journeys.map((trajet: any, index: number) => {
        return (
          <div className="trajet-container">
            <div className="trajet">
              Départ : Le {trajet.departure_date_time.split("T")[0]} à{" "}
              {trajet.departure_date_time.split("T")[1]} <br />
              Arrivée : Le {trajet.arrival_date_time.split("T")[0]} à{" "}
              {trajet.arrival_date_time.split("T")[1]}
            </div>
            <div className="sections">
                {trajet.sections.length - 1} changements : <br/>
                {trajet.sections.map((section:any, index:number)=> {
                    let display_info= { mode:'', 
                                        colorLine:'', 
                                        Line:'',
                                        direction:'',
                                        label:'',
                }
                if(section.display_informations){
                    switch (section.display_informations.commercial_mode){
                        case 'Bus': 
                        display_info.mode = "Bus"
                        display_info.colorLine = section.display_informations.color
                        display_info.Line = section.display_informations.label
                        display_info.direction = section.display_informations.direction
                        display_info.label = section.display_informations.name
                    }
                }
                    else if (section.mode = 'walking'){
                        display_info.mode = 'walking';
                    }
                    try{
                        return <div className="section" style={{display:'flex'}}>
                        Depuis {section.from.name} vers {section.to.name} - {display_info.mode} 
                        {display_info.mode === 'Bus' && 
                         <div className='trajetBus' style={{display:'flex'}}> Ligne <div className='colorLine' style={{backgroundColor:display_info.colorLine}}>{display_info.Line}</div> {display_info.label}
                         Direction {display_info.direction}
                         </div>
                        }
                    </div>
                    }
                    catch{}
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
