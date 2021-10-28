function HandleClickFetchData(props:{adress:string, router:any}) {
    // formatte l'url de la requête 
    var adress_request:string = "?q=" + props.adress;

    return (
        props.router.push({pathname:`/adress/${adress_request}`})
    )
}

export default HandleClickFetchData
