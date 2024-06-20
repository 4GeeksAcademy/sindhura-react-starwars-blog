import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CharacterCard } from "../components/CharacterCard.jsx"
import { PlanetCard } from "../components/PlanetCard.jsx";
import Favorites from "../components/Favorites.jsx";

const url = "https://starwars-visualguide.com/assets/img/characters/";

export const Home = () => {

	return(
		<div>
			<Favorites></Favorites>
		<CharacterCard></CharacterCard>
		<PlanetCard></PlanetCard>
		</div>

	)
}; 