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
//    {        Content-Type: 'text/event-stream',
//         ache-Control: 'no-cache'
//             Connection: 'keep-alive'
//             X-Accel-Buffering: 'no',}
    })

    return instance;
}

export default useAxios
