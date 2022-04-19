export const  initialState = null;

export const reducer = (state, action) => {

    if(action.type === "USER"){
        return action.payload;
    }
    return state;














    // switch (action.type) {
    //     case "SET_USER":
    //     return {
    //         ...state,
    //         user: action.payload,
    //     };
    //     case "SET_ERROR":
    //     return {
    //         ...state,
    //         error: action.payload,
    //     };
    //     case "SET_LOADING":
    //     return {
    //         ...state,
    //         loading: action.payload,
    //     };
    //     case "SET_LOGOUT":
    //     return {
    //         ...state,
    //         user: action.payload,
    //     };
    //     default:
    //     return state;
    // }
    };


























