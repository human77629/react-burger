import { 
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED,
} from '../actions/user.js'

const initialState = {
    accessToken: '',
    refreshToken: '',
    user: {
        email: '',
        name: ''
    },
    signupRequestStatus: {
        request: false,
        failed: false,
    },
    errorMessage: ''
}






export const userReducer = (state = initialState, action) => {
    switch(action.type) {

        case USER_SIGNUP_REQUEST: {
            return { ...state, signupRequestStatus: {request: true, failed: false} };
        }
        case USER_SIGNUP_SUCCESS: {
            return { ...state, signupRequestStatus: {request: true, failed: false}, user: action.user, accessToken: action.access, refreshToken: action.refresh };
        }
        case USER_SIGNUP_FAILED: {
            return { ...state, signupRequestStatus: {request: false, failed: true}, errorMessage: action.message };
        }        

        default: {
            return state;
        }
    }
}