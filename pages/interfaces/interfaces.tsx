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