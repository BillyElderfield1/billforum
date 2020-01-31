export interface userState{
    userId: string | null;
    userName: string | null;
}

const initialState: userState = {
    userId: null,
    userName: null
}

const userReducer = (state = initialState, action: any) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, userId: action.payload.userId, userName: action.payload.userName}
        case "AUTH_SUCCESS":
            return {...state, userId: action.payload.userId, userName: action.payload.userName}
        case "LOGOUT_SUCCESS":
            return {...state, userId: null, userName: null}
        default:
            return state;
    }
}

export default userReducer;