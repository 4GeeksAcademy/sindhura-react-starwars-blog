import { Link } from "react-router-dom";
import blankImageUrl from "../assets/img/blank.jpg"
export default function Card({name,url,displayObject,link}){

    const keys = Object.keys(displayObject);
    const values = Object.values(displayObject);
    return (
        <div className="card" style={{"width": "18rem"}}>
        <img src={url ? url : blankImageUrl} className="card-img-top" alt="..."/>
           <div className="card-body">
       <h5 className="card-title">{name}</h5>
    <p className="card-text">{keys[0]} : {values[0]}</p>
    <p className="card-text">{keys[1]} : {values[1]}</p>
    <p className="card-text">{keys[2]} : {values[2]}</p>
  

  </div>
</div>
    )
}