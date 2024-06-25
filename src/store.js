export const initialStore=()=>{
  return{
    characters_data: [],
    planets_data:[],
    favorites:[]
    }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

      // add characters data
      case 'characterData/Loaded' :
        const charactersData = action.payload;
       return  {
          ...store,
          characters_data:charactersData
        }

        //add planets data
        case 'planetsData/Loaded' :
          const planetsData = action.payload;
          return {
            ...store,
            planets_data:planetsData
          }

        //add the favourite.  to favourites list
        case 'favorite/Added':
        const new_obj = action.payload;
          const exists = store.favorites.length ? store.favorites.filter((obj) => obj.name == new_obj.name): '';
         if(exists && exists.length>0){
          return {
            ...store,
            favorites:store.favorites
          }
         }else{
          return {
            ...store,
            favorites:[...store.favorites,new_obj]
          }
        }

        //delete a favourite after delete button is clicked or heart is clicked
        case 'favorite/Deleted':
          console.log('deleted called');
          const name = action.payload;
          console.log('store_fav',store.favorites)
          const filtered_favorites = store.favorites.filter((fav) => fav.name != name);
         console.log('filtered',filtered_favorites)
            return {
              ...store,
              favorites:filtered_favorites,
            }
         
            
          //update the favourite key of the deleted item to false
          case 'favorite/Updated':
            console.log('update called')
            const del_fav = action.payload
            if(del_fav.fav_type === 'character'){
              const updated_charData = store.characters_data.map((character)=> character.properties.name === del_fav.name ? {...character, favorite: ! character.favorite} : character);
              return {
                ...store,
                characters_data:updated_charData
              }
            }
            else {
              const updated_planetsData = store.planets_data.map((planet)=> planet.properties.name === del_fav.name? {...planet, favorite: ! planet.favorite} : planet);
              return {
                ...store,
                planets_data:updated_planetsData
              }
            }
          

    default:
      throw Error('Unknown action.');
  }    
}
