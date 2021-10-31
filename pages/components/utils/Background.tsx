import React,{useState, useEffect} from 'react'

const Background = React.memo(function Background() {
 // Todos : export interface poster
 const [posters, setPosters] = useState<any>()
  
 //Récuperer poster pour le background  
 const fetchPoster = async (callback:any) => {
   var res:string[] = [];
   let idPosters = new Array(30).fill(null);
   // Pas de feature pour requêter plusieurs id en une requête
   idPosters.map(async (poster, index) => {
     let status = 401; 
     // On fetch pour récup poster tant que l'id passé dans la req ne renvoit pas de posters 
     while(status !== 200){
       var prom_1 = await fetch(`https://api.themoviedb.org/3/movie/${parseInt((Math.random() * 1000).toString())}?api_key=4f8dc8eb0cc920c1423e8b4171b47a81&language=en-US`); 
       status = prom_1.status;
       status === 200 && res.push(await prom_1.json());
     }
     // On retourne le callback quand on arrive a la fin du tableau
     if (index === idPosters.length - 1){
       return callback(res);
     } 
   })
 }
 
 useEffect(() => {
   fetchPoster(function(res:any){
     setPosters(res);
   })
 },[])


    return (
        <div className='background-poster'>
        {posters && posters.map((poster:any, index:number) => {
           return (
           <div className='poster' key={index}>
             <img src={(`https://image.tmdb.org/t/p/original/${poster.poster_path}`)} className='posterImg'/>
             </div>
             )
           })}
         </div>
    )
});

export default React.memo(Background);
