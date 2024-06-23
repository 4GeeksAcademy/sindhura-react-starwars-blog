import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useState } from "react";
import Card from "./Card";
const added_favorites = [];
export const PlanetCard = ({name,population,terrain}) => {
    const [buttonColor,setButtonColor] = useState('black');
    const [isLoading,setIsLoading] = useState(false);
    const {store,dispatch} = useGlobalReducer();
    useEffect(() =>{
                        async function handleGetPlanetsData() {
                            setIsLoading(true);
                            const resp = await fetch('https://www.swapi.tech/api/planets/')

                            const data = await resp.json();
                            const characterPromises = data.results.map((person) => {
                                return person.url;
                            }).map(url => fetch(url))
                        Promise.all(characterPromises).then(req => {
                                return Promise.all(req.map(r => r.json()))
                            }).then((data) => {
                                const planetsData = data.map(obj => ({...obj.result, 'favorite':false}));
                                localStorage.setItem('planetsData',JSON.stringify(planetsData));					
                                dispatch({
                                    type:'planetsData/Loaded',
                                    payload:planetsData
                                })
                            })
                            setIsLoading(false);
                    }

                    handleGetPlanetsData();
    },[])

    function handlePlanetFavourites(name) {
    
        const updated_planetsData = store.planets_data.map((planet)=> planet.properties.name === name ? {...planet, favorite: ! planet.favorite} : planet);
        const planet_selected = updated_planetsData.find((planet)=>planet.properties.name == name);
        localStorage.removeItem('planetsData');

        
        localStorage.setItem('planetsData',JSON.stringify(updated_planetsData));
        dispatch({
            type:'planetsData/Loaded',
            payload:updated_planetsData

        })
        if(planet_selected.favorite){
            added_favorites.push({
                'link':`/planet/${name}`,name : name
        })
        localStorage.removeItem('favorites');
        localStorage.setItem('favorites',JSON.stringify(added_favorites));
        console.log(JSON.parse(localStorage.getItem("favorites") || "[]"))

            dispatch({
                type:'favorite/Added',
                payload:{
                    'link':`/planet/${name}`,name : name}
            })
        }
        else{
            dispatch({
                type :'favorite/Deleted',
                payload : name
            })
        }
    }
    

    return (

        	<div  className="main">
				<h1><p>Planets</p></h1>
              
     
     <div className={"text-center " + (isLoading ? 'visible' : 'invisible')} >
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
			<ul className="d-flex flex-row gap-5 overflow-x-scroll">
			{
				store.planets_data ? store.planets_data.map((planet) => {
					const {name,population,terrain,diameter} = planet.properties;
                    const id = planet.uid;
                    const isFav = planet.favorite;
                    const displayObject={
                        Population:population,
                        Terrain: terrain,
                        Diameter:diameter
                    }
				return 	<li className="list-group-item  shadow-sm p-3 mb-5 bg-body-tertiary rounded" key={id}><Card name={name} displayObject={displayObject}></Card>
                      <div className="d-flex justify-content-between mt-3">
                         <Link to={`/planet/${name}`}><button className="btn btn-dark">More Details</button></Link>
                        <button className="btn fav-btn" onClick={()=>handlePlanetFavourites(name)}><i className="fa-regular fa-heart" style={isFav ? { color: "red" } : {}}></i></button>
                        </div>
                </li>
				}) :''
			} 
			</ul>
      
			</div>
    )
}