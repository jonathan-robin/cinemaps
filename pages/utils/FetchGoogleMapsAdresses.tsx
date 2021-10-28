import React from 'react'; 
import {positions, responseAdresses, } from '../interfaces/interfaces';
import { Loader } from "@googlemaps/js-api-loader"; 
import * as dotenv from 'dotenv';
dotenv.config();

function fetchGoogleMapsAdresses(response_adresses:responseAdresses[], zoom:number) {

    var positions:positions[] = response_adresses.map((adress, index) => { 
        let position:positions={lat:0, lng:0};
        position.lat = adress.geometry.coordinates[1]; 
        position.lng = adress.geometry.coordinates[0];
        return position;
    })

    const loader = new Loader({
        apiKey:process.env.API_KEY_GOOGLEMAPS?process.env.API_KEY_GOOGLEMAPS:'',
        version: "weekly",
      });

      let map: google.maps.Map;
      let markers:google.maps.Marker[];
      
      console.log(positions[0].lng, positions[0].lat)

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

}

export default fetchGoogleMapsAdresses
