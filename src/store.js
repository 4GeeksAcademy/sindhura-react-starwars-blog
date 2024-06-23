export const initialStore=()=>{
  return{
    characters_data: [],
    planets_data:[],
    favorites:[]
    }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    
      case 'characterData/Loaded' :
        const charactersData = action.payload;
       return  {
          ...store,
          characters_data:charactersData
        }

        case 'planetsData/Loaded' :
          const planetsData = action.payload;
          return {
            ...store,
            planets_data:planetsData
          }

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
        

        case 'favorite/Deleted':
          const name = action.payload;
          const filtered_favorites = store.favorites.filter((obj) => obj.name !=name);
          return {
            ...store,
            favorites:filtered_favorites
          }

    default:
      throw Error('Unknown action.');
  }    
}
