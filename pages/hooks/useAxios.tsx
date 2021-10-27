import React from 'react'; 
import axios from 'axios';

function useAxios() {
    const instance = axios.create({
        baseURL:'https://api-adresse.data.gouv.fr/search/', 
        headers:{
            'Content-Type': 'text/event-stream', 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
    })

    return instance;
}

export default useAxios
