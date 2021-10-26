import useAxios from '../hooks/useAxios'; 
import { AxiosResponse } from 'axios';


function HandleClickFetchData(props:{adress:string, router:any}) {
    const instance = useAxios();
    // formatte l'url de la requête 
    var adress_request:string = "?q=" + props.adress;

    return (
    instance.get(`${adress_request}`, { 
    })
    .then((res:AxiosResponse<any, string>) => {console.log(res.data.features); props.router.push({pathname:'results', query:{res:res.data}})})
    )
}

export default HandleClickFetchData
