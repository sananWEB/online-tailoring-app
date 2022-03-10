export  const initialState = null

export const reducer = (state,action)=>{
    switch(action.type){
        case "USER":
            {
                return action.payload;
            }
        case "CLEAR":{
             return null
        }
        default:{
            return state;
        }
    }

    // if(action.payload === "USER"){
    //     return action.payload

    // }else{
    //     return state
    // }

}