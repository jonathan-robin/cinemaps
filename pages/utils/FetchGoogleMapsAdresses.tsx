import React from 'react'; 
import {positions, responseAdresses, } from '../interfaces/interfaces';
import { Loader } from "@googlemaps/js-api-loader"; 
import * as dotenv from 'dotenv';
dotenv.config();

export const loader = new Loader({
  apiKey:'AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw',
  version: "weekly",
});

function fetchGoogleMapsAdresses(response_adresses:responseAdresses[], zoom:number, type:string, itineraire:any) {
  let map: google.maps.Map;
  let markers:google.maps.Marker[];
  let flightPath:google.maps.Polyline;

  switch (type){
    case 'Adresse': 
    var positions:positions[]= response_adresses?.map((adress, index) => { 
      let position:positions={lat:0, lng:0};
      position.lat = adress.geometry.coordinates[1]; 
      position.lng = adress.geometry.coordinates[0];
      return position;
  })
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lng:positions[0].lng, lat: positions[0].lat },
        zoom
      });
      markers = positions.map((position, index) => {
          return new google.maps.Marker({
              position: position,
              map,
              title: `position ${index}`,
            }); 
      })
    });
    case 'itineraire':
      console.log('itineraire')
      loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lng:parseFloat(itineraire[0].lng), lat: parseFloat(itineraire[0].lat) },
          zoom
        });
        // const flightPlanCoordinates = [
        //     itineraire
        // ];
        flightPath = new google.maps.Polyline({
          path: itineraire,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        flightPath.setMap(map);
    });
  }
}

export default fetchGoogleMapsAdresses
