import { Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import Card from "./Card";

const url = "https://starwars-visualguide.com/assets/img/characters/";

export const CharacterCard = ({name,gender,hairColor,eyeColor,img}) => {

      const {store, dispatch} =useGlobalReducer();

	  //gettting data for characters using API
   useEffect(()=>{
			async function handleGetCharactersData() {
				const resp = await fetch('https://www.swapi.tech/api/people/')
				const data = await resp.json();
				const characterPromises = data.results.map((person) => {
					return person.url;
				}).map(url => fetch(url))
			Promise.all(characterPromises).then(req => {
					return Promise.all(req.map(r => r.json()))
				}).then((data) => {
					const characters_data = data.map(obj => ({...obj.result, 'favorite':false}));
					localStorage.setItem('charactersData',JSON.stringify(characters_data));					
					dispatch({
						type:'characterData/Loaded',
						payload:characters_data
					})
				})

			}
			handleGetCharactersData();

		},[])


		//function to add favorite when heart is clicked
		function handleCharacterFavourites(name){

			//toggle the favourite value for that name
			const updated_charData = store.characters_data.map((character)=> character.properties.name === name ? {...character, favorite: ! character.favorite} : character);
			
			const character = updated_charData.find((char)=>char.properties.name == name);
			localStorage.removeItem('charactersData');

			//update the localstorage data with the new data(after favourite is set)
			localStorage.setItem('charactersData',JSON.stringify(updated_charData));
			dispatch({
				type:'characterData/Loaded',
				payload:updated_charData

			})

			
			if(character.favorite){
				dispatch({
					type:'favorite/Added',
					payload:{
						'link':`/character/${name}`,name : name ,fav_type:'character'}
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
        <div className="main">
			<h1>Characters</h1>
			<ul className="d-flex flex-row gap-5 overflow-x-scroll">
			{
				store.characters_data ? store.characters_data.map((character,index) => {
					const img_num = index+1 + ".jpg";
					const {name,gender,eye_color,hair_color} = character.properties;
					const uid= character.uid
					const isFav = character.favorite;
					const displayObject = {
                        Gender : gender,
                        'Hair-Color' : hair_color,
                        'Eye-Color': eye_color
                    }
                    const link = '/character/'
				return 	<li className="list-group-item shadow-sm p-3 mb-5 bg-body-tertiary rounded"  key={uid}><Card name={name} url={url + img_num} displayObject={displayObject} link={link}></Card>
							<div className="d-flex justify-content-between mt-3">
    							<Link to={`/character/${name}`}><button className="btn btn-dark">More Details</button></Link>
								
   								 <button className="btn fav-btn" onClick={()=>handleCharacterFavourites(name)}><i className="fa-regular fa-heart" style={isFav ? { color: "red" } : {}}></i></button>
							</div>
						</li>
				}) : ''
			} 
			</ul>

			</div>
    )
}
