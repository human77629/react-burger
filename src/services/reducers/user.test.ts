import { userReducer as reducer } from "./user";
import * as types from '../actions/user';

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

describe('user reducer', ()=>{ 
    //it('should return initial state', ()=>{
   

    it('should handle SET_PASSWORD_RESET_STAGE', ()=>{
        expect(reducer(initialState, {
            type: types.SET_PASSWORD_RESET_STAGE,
            stage: 'RESET_STAGE'
        })).toEqual({
            ...initialState,
            passwordResetStage: 'RESET_STAGE'
        })
    })

    it('should handle CONFIRM_PASSWORD_RESET_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.CONFIRM_PASSWORD_RESET_REQUEST,
        })).toEqual({
            ...initialState,
            passwordResetConfirmationStatus: {request: true, failed: false, success: false}
        })
    })  

    it('should handle CONFIRM_PASSWORD_RESET_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.CONFIRM_PASSWORD_RESET_SUCCESS,
        })).toEqual({...initialState,
            passwordResetConfirmationStatus: {request: true, failed: false, success: true}
        })
    })  


    it('should handle CONFIRM_PASSWORD_RESET_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.CONFIRM_PASSWORD_RESET_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            passwordResetConfirmationStatus: {request: false, failed: true, success: false},
            errorMessage: 'the horror!'
        })
    })  


    it('should handle PASSWORD_RESET_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.PASSWORD_RESET_REQUEST,
        })).toEqual({...initialState,
            passwordResetStatus: {request: true, failed: false, success: false}
        })
    })  

    it('should handle PASSWORD_RESET_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.PASSWORD_RESET_SUCCESS,
        })).toEqual({...initialState,
            passwordResetStatus: {request: true, failed: false, success: true}
        })
    })  


    it('should handle PASSWORD_RESET_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.PASSWORD_RESET_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            passwordResetStatus: {request: false, failed: true, success: false},
            errorMessage: 'the horror!'
        })
    })      


    it('should handle USER_UPDATE_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.USER_UPDATE_REQUEST,
        })).toEqual({...initialState,
            userUpdateStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_UPDATE_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.USER_UPDATE_SUCCESS,
            user: {email: 'e', name: 'n'}
        })).toEqual({...initialState,
            user: {...initialState.user, email: 'e', name: 'n'},
            userUpdateStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_UPDATE_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.USER_UPDATE_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            userUpdateStatus: {request: false, failed: true},
            errorMessage: 'the horror!'
        })
    })          



    it('should handle USER_INFO_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.USER_INFO_REQUEST,
        })).toEqual({...initialState,
            infoRequestStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_INFO_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.USER_INFO_SUCCESS,
            user: {name: 'n', email: 'e'}
        })).toEqual({...initialState,
            user: {...initialState.user, name: 'n', email: 'e'},
            infoRequestStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_INFO_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.USER_INFO_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            infoRequestStatus: {request: false, failed: true},
            errorMessage: 'the horror!'
        })
    })          
    
    
    it('should handle USER_SIGNUP_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.USER_SIGNUP_REQUEST,
        })).toEqual({...initialState,
            signupRequestStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_SIGNUP_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.USER_SIGNUP_SUCCESS,
            user: {
                email: 'u@d.z',
                name: 'test user'
            },
            access: '12341234',
            refresh: '43214321',
        })).toEqual({...initialState,
            signupRequestStatus: {request: true, failed: false},
            user: {
                email: 'u@d.z',
                name: 'test user'
            },
            accessToken: '12341234',
            refreshToken: '43214321',
        })
    })  

    it('should handle USER_SIGNUP_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.USER_SIGNUP_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            signupRequestStatus: {request: false, failed: true},
            errorMessage: 'the horror!'
        })
    })        


    it('should handle USER_LOGIN_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGIN_REQUEST,
        })).toEqual({...initialState,
            loginRequestStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_LOGIN_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGIN_SUCCESS,
            user: {
                email: 'u@d.z',
                name: 'test user'
            },
            access: '12341234',
            refresh: '43214321',
        })).toEqual({...initialState,
            loginRequestStatus: {request: true, failed: false},
            user: {
                email: 'u@d.z',
                name: 'test user'
            },
            accessToken: '12341234',
            refreshToken: '43214321',
        })
    })  

    it('should handle USER_LOGIN_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGIN_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            loginRequestStatus: {request: false, failed: true},
            errorMessage: 'the horror!'
        })
    })         


    it('should handle USER_LOGOUT_REQUEST', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGOUT_REQUEST,
        })).toEqual({...initialState,
            logoutRequestStatus: {request: true, failed: false}
        })
    })  

    it('should handle USER_LOGOUT_SUCCESS', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGOUT_SUCCESS,

        })).toEqual({...initialState,
            logoutRequestStatus: {request: true, failed: false},
            user: {
                email: '',
                name: ''
            },
            accessToken: '',
            refreshToken: '',
        })
    })  

    it('should handle USER_LOGOUT_FAILED', ()=>{
        expect(reducer(initialState,{
            type: types.USER_LOGOUT_FAILED,
            message: 'the horror!',
        })).toEqual({...initialState,
            logoutRequestStatus: {request: false, failed: true},
            errorMessage: 'the horror!'
        })
    })         
    
    

}) // describe user reducer