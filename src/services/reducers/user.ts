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
    USER_INFO_FAILED,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_UPDATE_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_TOKEN,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    CONFIRM_PASSWORD_RESET_FAILED,
    CONFIRM_PASSWORD_RESET_REQUEST,
    CONFIRM_PASSWORD_RESET_SUCCESS,
    SET_PASSWORD_RESET_STAGE,
    
    TUserActions
} from '../actions/user'

export const initialState:TUserState = {
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
    infoRequestStatus: {
        request: false,
        failed: false,
    },        
    userUpdateStatus: {
        request: false,
        failed: false,
    },      
    passwordResetStatus: {
        request: false,
        failed: false,
        success: false
    },
    passwordResetConfirmationStatus: {
        request: false,
        failed: false,
        success: false
    },      
    errorMessage: '',
    passwordResetStage: 'RECOVERY_PAGE',
}

export type TUserState = {
    accessToken:string,
    refreshToken:string,
    user:{
        email:string,
        name:string,
    },
    signupRequestStatus:{
        request:boolean,
        failed:boolean,
    },    
    loginRequestStatus:{
        request:boolean,
        failed:boolean,
    },
    logoutRequestStatus:{
        request:boolean,
        failed:boolean,
    },
    infoRequestStatus:{
        request:boolean,
        failed:boolean,
    },
    userUpdateStatus:{
        request:boolean,
        failed:boolean,
    },
    passwordResetStatus:{
        request:boolean,
        failed:boolean,
        success:boolean,
    },
    passwordResetConfirmationStatus:{
        request:boolean,
        failed:boolean,
        success:boolean,
    },
    errorMessage:string,
    passwordResetStage:string,
}



export const userReducer = (state:TUserState = initialState, action:TUserActions) => {
    switch(action.type) {

        case SET_PASSWORD_RESET_STAGE: {
            return { ...state, passwordResetStage: action.stage }
        }

        case CONFIRM_PASSWORD_RESET_REQUEST: {
            return { ...state, passwordResetConfirmationStatus: {request: true, failed: false, success: false} };
        }
        case CONFIRM_PASSWORD_RESET_SUCCESS: {
            return { ...state, passwordResetConfirmationStatus: {request: true, failed: false, success: true} };
        }
        case CONFIRM_PASSWORD_RESET_FAILED: {
            return { ...state, passwordResetConfirmationStatus: {request: false, failed: true, success: false}, errorMessage: action.message };
        }            

        case PASSWORD_RESET_REQUEST: {
            return { ...state, passwordResetStatus: {request: true, failed: false, success: false} };
        }
        case PASSWORD_RESET_SUCCESS: {
            return { ...state, passwordResetStatus: {request: true, failed: false, success: true} };
        }
        case PASSWORD_RESET_FAILED: {
            return { ...state, passwordResetStatus: {request: false, failed: true, success: false}, errorMessage: action.message };
        }              

        case USER_UPDATE_REQUEST: {
            return { ...state, userUpdateStatus: {request: true, failed: false} };
        }
        case USER_UPDATE_SUCCESS: {
            return { ...state, userUpdateStatus: {request: true, failed: false}, user: action.user };
        }
        case USER_UPDATE_FAILED: {
            return { ...state, userUpdateStatus: {request: false, failed: true}, errorMessage: action.message };
        }          

        case USER_INFO_REQUEST: {
            return { ...state, infoRequestStatus: {request: true, failed: false} };
        }
        case USER_INFO_SUCCESS: {
            return { ...state, infoRequestStatus: {request: true, failed: false}, user: action.user };
        }
        case USER_INFO_FAILED: {
            return { ...state, infoRequestStatus: {request: false, failed: true}, errorMessage: action.message };
        }               

        case USER_SIGNUP_REQUEST: {
            return { ...state, signupRequestStatus: {request: true, failed: false} };
        }
        case USER_SIGNUP_SUCCESS: {
            return { ...state, signupRequestStatus: {request: true, failed: false}, user: action.user, accessToken: action.access, refreshToken: action.refresh };
        }
        case USER_SIGNUP_FAILED: {
            return { ...state, signupRequestStatus: {request: false, failed: true}, errorMessage: action.message };
        }        

        case USER_UPDATE_TOKEN: {
            return { ...state, accessToken: action.token, tokenTime: new Date() };
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