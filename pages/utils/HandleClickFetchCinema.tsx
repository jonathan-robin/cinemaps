import { positions } from "../interfaces/interfaces"

function HandleClickFetchCinema(geo:positions | undefined, query:string, router:any) {
    // formatte l'url de la requête 
    var request:string = `${geo?.lng}%2C+${geo?.lat}%2C+${query}`;

    return (
        router.push({pathname:`/cinema/${request}`})
    )
}

export default HandleClickFetchCinema
