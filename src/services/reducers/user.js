import { 
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED,
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
    loginRequestStatus: {
        request: false,
        failed: false,
    },
    logoutRequestStatus: {
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


        case USER_LOGIN_REQUEST: {
            return { ...state, loginRequestStatus: {request: true, failed: false} };
        }
        case USER_LOGIN_SUCCESS: {
            return { ...state, loginRequestStatus: {request: true, failed: false}, user: action.user, accessToken: action.access, refreshToken: action.refresh };
        }
        case USER_LOGIN_FAILED: {
            return { ...state, loginRequestStatus: {request: false, failed: true}, errorMessage: action.message };
        }     
        
        case USER_LOGOUT_REQUEST: {
            return { ...state, logoutRequestStatus: {request: true, failed: false} };
        }
        case USER_LOGOUT_SUCCESS: {
            return { ...state, logoutRequestStatus: {request: true, failed: false}, user: {...initialState.user}, accessToken: '', refreshToken: '' };
        }
        case USER_LOGOUT_FAILED: {
            return { ...state, logoutRequestStatus: {request: false, failed: true}, errorMessage: action.message };
        }          



        default: {
            return state;
        }
    }
}