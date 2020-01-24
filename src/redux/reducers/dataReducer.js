import {
    SET_SCREAMS,
    SET_SCREAM,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true 
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            // finding that scream which is == action screamId
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
                );
            state.screams[index] = action.payload;
            if (state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return {
                ...state
            };
        case DELETE_SCREAM:
            index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload
                );
            // splice() => removes element from an array, no. of element(here 1)
            state.screams.splice(index, 1)
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams : [
                    // new scream added
                    action.payload,
                    // other old screams
                    ...state.screams
                ]
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            };
        default:
            return state;
    }
};
  