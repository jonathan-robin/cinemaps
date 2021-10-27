import React from 'react'; 
import {positions, responseAdresses, } from '../interfaces/interfaces';
import { Loader } from "@googlemaps/js-api-loader"

function fetchGoogleMapsAdresses(response_adresses:responseAdresses[]) {

    var positions:positions[] = response_adresses.map((adress, index) => { 
        let position:positions={lat:0, lng:0};
        position.lat = adress.geometry.coordinates[1]; 
        position.lng = adress.geometry.coordinates[0];
        return position;
    })

    const loader = new Loader({
        apiKey: "AIzaSyBSDVQSUseV6HHZF6YLG4YfmsBPA0sA4qw",
        version: "weekly",
      });

      let map: google.maps.Map;
      let markers:google.maps.Marker[];
      

      loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lng:positions[0].lng, lat: positions[0].lat },
          zoom: 8,
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