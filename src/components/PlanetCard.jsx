import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useState } from "react";
import Card from "./Card";

export const PlanetCard = ({name,population,terrain}) => {
    const [buttonColor,setButtonColor] = useState('black');

    const {store,dispatch} = useGlobalReducer();
    useEffect(() =>{
        if(localStorage.getItem('planetsData')){
            			const planets_data = JSON.parse(localStorage.getItem("planetsData") || "[]");
            			dispatch({
            				type:'planets/Loaded',
            				payload: planets_data
            			})
            
            		}
                    else {
                        async function handleGetPeopleData() {
                            const resp = await fetch('https://www.swapi.tech/api/people/')
                            const data = await resp.json();
                            const characterPromises = data.results.map((person) => {
                                return person.url;
                            }).map(url => fetch(url))
                        Promise.all(characterPromises).then(req => {
                                return Promise.all(req.map(r => r.json()))
                            }).then((data) => {
                                const peopleData = data.map(obj => obj.result);
                                localStorage.setItem('peopleData',JSON.stringify(peopleData));					
                                dispatch({
                                    type:'data/Loaded',
                                    payload:peopleData
                                })
                            })
            
                        }
                        handleGetPeopleData();
                    }
    },[])
    function handlePlanetFavourites(name) {
    
            dispatch({
                type:'favorite/Added',
                payload:{
                    'link':`/planet/${name}`,name : name}
            })
        
       
    }

    return (

        	<div  className="main">
				<h1><p>Planets</p></h1>
			<ul className="d-flex flex-row gap-5 overflow-x-scroll">
			{
				store.planets_data ? store.planets_data.map((planet) => {
					const {name,population,terrain,diameter} = planet.properties;
                    const id = planet.uid;
                    const displayObject={
                        Population:population,
                        Terrain: terrain,
                        Diameter:diameter
                    }
				return 	<li className="list-group-item  shadow-sm p-3 mb-5 bg-body-tertiary rounded" key={id}><Card name={name} displayObject={displayObject}></Card>
                      <div className="d-flex justify-content-between mt-3">
                         <Link to={`/planet/${name}`}><button className="btn btn-dark">More Details</button></Link>
                        <button className="btn fav-btn" onClick={()=>handlePlanetFavourites(name)}><i className="fa-regular fa-heart"></i></button>
                        </div>
                </li>
				}) : ''
			} 
			</ul>
      
			</div>
    )
}