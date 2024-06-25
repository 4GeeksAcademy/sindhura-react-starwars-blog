import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react";

export default function Favorites(){
    const {store,dispatch} = useGlobalReducer();

    //function called when user clicks on the delete icon 
    function handleDeleteFavorite(name,fav_type){

        //to delete the item from favourite list
        dispatch({
            type :'favorite/Deleted',
            payload :name
        })

        //to set the favourite key of the  deleted favorite item back to false
        dispatch({
            type:'favorite/Updated',
            payload:{name:name,
                fav_type:fav_type}
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
                        <button className="btn" onClick={()=>handleDeleteFavorite(obj.name,obj.fav_type)}><i className="fa-solid fa-trash-can"></i></button>
                    </li>) :''
                }       
            </ul>
        </div>
    )
}