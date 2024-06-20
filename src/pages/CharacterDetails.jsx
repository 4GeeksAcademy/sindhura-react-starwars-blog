import { useLocation, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Details from "../components/Details";

export default function CharacterDetails(){
    const {name}= useParams();
    const {store,dispatch} = useGlobalReducer();


        const url = "https://starwars-visualguide.com/assets/img/characters/";
        const person = store.people_data.find((person)=> person.properties.name == name);
        const num = person.uid;
        const {gender,birth_year,height,eye_color,hair_color} = person.properties;
        const character_properties = {
            Gender : gender,
            'Birth-Year' : birth_year,
            Height : height,
            'Eye-Color':  eye_color,
            'Hair-Color': hair_color
        }

    return (
        <Details name={name} object={character_properties} num={person.uid} url={url}></Details>
    )
} 