import planetUrl from "../assets/img/planet.jpg"


export default function Details({name,object,num='',url=''}){
 
    const keys = Object.keys(object);
   const values = Object.values(object);
   const planet = planetUrl;
    return (
        <div className="detailsContainer">
            <div className="row">
            <div className="col-4 pt-4 detailsImage"> <img src={url ? url + num + '.jpg' : planet} alt="..."/></div>
            <div className="col-8 pt-4 align-self-start">
                <h2>{name}</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></div>
            </div>  
            <div className="row border-top pt-3 heading">
                <div className="col-2">
                    Name
                </div>
                <div className="col-2">
                    {keys[0]}
                </div>
                <div className="col-2">
                    {keys[1]}
                </div>
                <div className="col-2">
                    {keys[2]}
                </div>
                <div className="col-2">
                    {keys[3]}
                </div>
                <div className="col-2">
                    {keys[4]}
                </div>
            </div>  
            <div className="row pt-3 pb-3">
                <div className="col-2">
                    {name}
                </div>
                <div className="col-2">
                    {values[0]}
                </div>
                <div className="col-2">
                    {values[1]}
                </div>
                <div className="col-2">
                    {values[2]}
                </div>
                <div className="col-2">
                    {values[3]}
                </div>
                <div className="col-2">
                    {values[4]}
                </div>
            </div>    
        </div>
    )
}