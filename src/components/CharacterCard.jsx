import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import Card from "./Card";

const url = "https://starwars-visualguide.com/assets/img/characters/";

export const CharacterCard = ({name,gender,hairColor,eyeColor,img}) => {

      const {store, dispatch} =useGlobalReducer();

   useEffect(()=>{
		if(localStorage.getItem('peopleData')){
			const people_data = JSON.parse(localStorage.getItem("peopleData") || "[]");
			dispatch({
				type:'data/Loaded',
				payload: people_data
			})
		} else {
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


		function handleCharacterFavourites(name){
			dispatch({
				type:'favorite/Added',
				payload:{
					'link':`/character/${name}`,name : name}
			})
		}
    return (
        <div className="main">
			<h1>Characters</h1>
			<ul className="d-flex flex-row gap-5 overflow-x-scroll">
			{
				store.people_data ? store.people_data.map((person,index) => {
					const img_num = index+1 + ".jpg";
					const {name,gender,eye_color,hair_color} = person.properties;
					const uid= person.uid
                    const displayObject = {
                        Gender : gender,
                        'Hair-Color' : hair_color,
                        'Eye-Color': eye_color
                    }
                    const link = '/character/'
				return 	<li className="list-group-item shadow-sm p-3 mb-5 bg-body-tertiary rounded"  key={uid}><Card name={name} url={url + img_num} displayObject={displayObject} link={link}></Card>
							<div className="d-flex justify-content-between mt-3">
    							<Link to={`/character/${name}`}><button className="btn btn-dark">More Details</button></Link>
   								 <button className="btn fav-btn" onClick={()=>handleCharacterFavourites(name)}><i className="fa-regular fa-heart"></i></button>
    						</div>
						</li>
				}) : ''
			} 
			</ul>

			</div>
    )
}
