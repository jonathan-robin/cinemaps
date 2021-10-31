export interface responseAdresses{
    properties:responseAdressesProperties, 
    geometry:responseAdressesGeometry
}

export interface responseAdressesProperties{
    city:string, 
    citycode:string, 
    context: string
    housenumber: string
    id: string
    importance:number
    label: string
    name: string
    postcode:string
    score: number
    street:string
    type:string
    x:number
    y:number
}

export interface responseAdressesGeometry{
    type:string, 
    coordinates:number[]
}

export interface positions{ 
    lat:number, 
    lng:number
}

export interface adresseInfos{
    adresse:string, 
    postcode:string,
    city:string, 
    geo:{ 
        lat:number, 
        lng:number
    }
}


// display_informations renvoyé par l'api
export interface display_informations{
    // 20
    code: string
    // FF5A00
    color: string
    // mode de transport
    commercial_mode: string
    description: string
    direction: string
    equipments: [string]
    // direction
    headsign: string
    // 20
    label: string
    links: []
    // Ligne
    name: string
    // RATP
    network: string
    physical_mode: string
    // FFFFFF
    text_color: string
    // "PORTE DES LILAS"
    trip_short_name: string
}

// display_info utilisé pour afficher les infos
export interface display_info{
    mode:string, 
    colorLine:string, 
    Line:string,
    direction:string,
    label:string, 
    duration:number
}

// display_infos_walking renvoyé par l'API
export interface display_informations_walking{
    // "20211029T133900"
    arrival_date_time: string,
    co2_emission: {value: number, unit: string},
    //  "20211029T133306"
    departure_date_time: string,
    duration: number,
    from: any,
    // .coordinates[x]:[array(2number)] : coordinates[0][0] : lng / [1]:lat 
    geojson: {type: string, properties: [], coordinates: number[]},
    id: string,
    links: [],
    mode: string,
    path: any,
    to: any,
    // stree_network
    type: string,
}

// display_infos_walking pour afficher les infos
export interface display_infos_walking{
    mode:string, 
    duration:number,
    geojson:number[],
}