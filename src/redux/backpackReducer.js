const initialState = {
    backpack: []
}

const SET_BACKPACK = 'SET_BACKPACK'

export function SET_BACKPACK(backpack){
    return{
        type: SET_BACKPACK,
        payload: backpack
    }
}

export default function backpackReducer(state = initialState, action){
    switch(action.type){
        case SET_BACKPACK:
            return {...state, backpack: action.payload}
        default:
            return {...state}
    }
}