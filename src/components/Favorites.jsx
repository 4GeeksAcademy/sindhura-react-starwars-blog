import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"

export default function Favorites(){
    const {store,dispatch} = useGlobalReducer();

    function handleDeleteFavorite(name){

        dispatch({
            type :'favorite/Deleted',
            payload : name
        })

    }

    return (
        <div className="btn-group dropdown-center float-end me-4">
            <button type="button" className="btn btn-secondary btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
             Favourites
            </button>
            <ul className="dropdown-menu">
                {
                    store.favorites ? store.favorites.map((obj)=> 
                    <li className="d-flex justify-content-around">
                        <Link to={obj.link} className="dropdown-item">{obj.name}</Link>
                        <button className="btn" onClick={()=>handleDeleteFavorite(obj.name)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>) :''
                }       
            </ul>
        </div>
    )
}