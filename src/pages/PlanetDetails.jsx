import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Details from "../components/Details";

export default function PlanetDetails(){
    const {name}= useParams();
    const {store,dispatch} = useGlobalReducer();
    const planet = store.planets_data.find((planet)=> planet.properties.name == name);
    const {population,climate,terrain,diameter,orbital_period} = planet.properties;
    const object = {
        Population: population,
        Climate:climate,
        Terrain: terrain,
        Diameter:diameter,
        'Orbital-Period' : orbital_period
    }
    return (
        <Details name={name} object={object}></Details>
    )
}