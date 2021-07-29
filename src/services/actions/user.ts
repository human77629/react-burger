import { loginRequest, logoutRequest, signupRequest, getUserInfo, ensureToken, patchUserInfo, passwordResetRequest, passwordResetConfirmationRequest } from '../api.js'
import {AppThunk, AppDispatch} from '../types'

export const USER_SIGNUP_REQUEST:'USER_SIGNUP_REQUEST' = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS:'USER_SIGNUP_SUCCESS' = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED:'USER_SIGNUP_FAILED' = 'USER_SIGNUP_FAILED';


export const USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED:'USER_LOGIN_FAILED' = 'USER_LOGIN_FAILED';

export const USER_UPDATE_TOKEN:'USER_UPDATE_TOKEN' = 'USER_UPDATE_TOKEN';


export const USER_LOGOUT_REQUEST:'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS:'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED:'USER_LOGOUT_FAILED' = 'USER_LOGOUT_FAILED';

export const USER_INFO_REQUEST:'USER_INFO_REQUEST' = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS:'USER_INFO_SUCCESS' = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED:'USER_INFO_FAILED' = 'USER_INFO_FAILED';

export const USER_UPDATE_REQUEST:'USER_UPDATE_REQUEST' = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS:'USER_UPDATE_SUCCESS' = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED:'USER_UPDATE_FAILED' = 'USER_UPDATE_FAILED';

export const PASSWORD_RESET_REQUEST:'PASSWORD_RESET_REQUEST' = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS:'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED:'PASSWORD_RESET_FAILED' = 'PASSWORD_RESET_FAILED';


export const CONFIRM_PASSWORD_RESET_REQUEST:'CONFIRM_PASSWORD_RESET_REQUEST' = 'CONFIRM_PASSWORD_RESET_REQUEST';
export const CONFIRM_PASSWORD_RESET_SUCCESS:'CONFIRM_PASSWORD_RESET_SUCCESS' = 'CONFIRM_PASSWORD_RESET_SUCCESS';
export const CONFIRM_PASSWORD_RESET_FAILED:'CONFIRM_PASSWORD_RESET_FAILED' = 'CONFIRM_PASSWORD_RESET_FAILED';


export const SET_PASSWORD_RESET_STAGE:'SET_PASSWORD_RESET_STAGE' = 'SET_PASSWORD_RESET_STAGE';


export interface IUserSignupRequest {
	readonly type: typeof USER_SIGNUP_REQUEST;
}

export interface IUserSignupSuccess {
	readonly type: typeof USER_SIGNUP_SUCCESS;
  user:{email:string, name:string};
  access:string;
  refresh:string;
}

export interface IUserSignupFailed {
	readonly type: typeof USER_SIGNUP_FAILED;
  message:string;
}

export interface IUserLoginRequest {
	readonly type: typeof USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccess {
	readonly type: typeof USER_LOGIN_SUCCESS;
  user:{email:string, name:string};
  access:string;
  refresh:string;
}

export interface IUserLoginFailed {
	readonly type: typeof USER_LOGIN_FAILED;
  message:string;
}

export interface IUserUpdateToken {
	readonly type: typeof USER_UPDATE_TOKEN;
  token:string;
}

export interface IUserLogoutRequest {
	readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccess {
	readonly type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailed {
	readonly type: typeof USER_LOGOUT_FAILED;
  message:string;
}

export interface IUserInfoRequest {
	readonly type: typeof USER_INFO_REQUEST;
}

export interface IUserInfoSuccess {
	readonly type: typeof USER_INFO_SUCCESS;
  user:{email:string, name:string};
}

export interface IUserInfoFailed {
	readonly type: typeof USER_INFO_FAILED;
  message:string;
}

export interface IUserUpdateRequest {
	readonly type: typeof USER_UPDATE_REQUEST;
}

export interface IUserUpdateSuccess {
	readonly type: typeof USER_UPDATE_SUCCESS;
  user:{email:string, name:string};
}

export interface IUserUpdateFailed {
	readonly type: typeof USER_UPDATE_FAILED;
  message:string;
}

export interface IPasswordResetRequest {
	readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IPasswordResetSuccess {
	readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface IPasswordResetFailed {
	readonly type: typeof PASSWORD_RESET_FAILED;
  message:string;
}

export interface IConfirmPasswordResetRequest {
	readonly type: typeof CONFIRM_PASSWORD_RESET_REQUEST;
}

export interface IConfirmPasswordResetSuccess {
	readonly type: typeof CONFIRM_PASSWORD_RESET_SUCCESS;
}

export interface IConfirmPasswordResetFailed {
	readonly type: typeof CONFIRM_PASSWORD_RESET_FAILED;
  message:string;
}

export interface ISetPasswordResetStage {
	readonly type: typeof SET_PASSWORD_RESET_STAGE;
  stage:string;
}



export type TUserActions =
	IUserSignupRequest |
	IUserSignupSuccess |
	IUserSignupFailed |
	IUserLoginRequest |
	IUserLoginSuccess |
	IUserLoginFailed |
	IUserUpdateToken |
	IUserLogoutRequest |
	IUserLogoutSuccess |
	IUserLogoutFailed |
	IUserInfoRequest |
	IUserInfoSuccess |
	IUserInfoFailed |
	IUserUpdateRequest |
	IUserUpdateSuccess |
	IUserUpdateFailed |
	IPasswordResetRequest |
	IPasswordResetSuccess |
	IPasswordResetFailed |
	IConfirmPasswordResetRequest |
	IConfirmPasswordResetSuccess |
	IConfirmPasswordResetFailed |
	ISetPasswordResetStage;



export const confirmPasswordReset:AppThunk = (password:string, token:string) => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: CONFIRM_PASSWORD_RESET_REQUEST
    });
    passwordResetConfirmationRequest(password, token).then(res => {
      if (res && res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }).then(res=>{
      if (res.success !== true) {
        return Promise.reject(res);
      }
     
      dispatch({
          type: CONFIRM_PASSWORD_RESET_SUCCESS,
        });
        dispatch({
          type: SET_PASSWORD_RESET_STAGE,
          stage: 'RECOVERY_PAGE',
        });               
        //setCookie('token', res.refreshToken);
        localStorage.setItem('token', res.refreshToken)
    }).catch((err) => {
        dispatch({
          type: CONFIRM_PASSWORD_RESET_FAILED,
          message: err
        });
      }
    );
  };
}


export const passwordReset:AppThunk = (email:string) => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST
    });
    passwordResetRequest(email).then(res => {
      if (res && res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }).then(res=>{
      if (res.success !== true) {
        return Promise.reject(res);
      }
      dispatch({
          type: PASSWORD_RESET_SUCCESS,
        });
        dispatch({
          type: SET_PASSWORD_RESET_STAGE,
          stage: 'RESET_PAGE'
        });        
        //setCookie('token', res.refreshToken);
        localStorage.setItem('token', res.refreshToken)
    }).catch((err) => {
        dispatch({
          type: PASSWORD_RESET_FAILED,
          message: err
        });
      }
    );
  };
}


export const userUpdate:AppThunk = (params) => {  
  return function(dispatch:AppDispatch) {

    dispatch({
      type: USER_UPDATE_REQUEST
    });
    ensureToken(patchUserInfo, params).then(res => {
      dispatch({
          type: USER_UPDATE_SUCCESS,
          user: res.user
        });

        if (res.accessToken) dispatch({type: USER_UPDATE_TOKEN, token: res.accessToken})
        if (res.refreshToken) localStorage.setItem('token', res.refreshToken)
    }).catch((err) => {
        dispatch({
          type: USER_UPDATE_FAILED,
          message: err
        });
      }
    );
  }
}


export const userInfo:AppThunk = (token:string) => {  
  return function(dispatch:AppDispatch) {
    dispatch({
      type: USER_INFO_REQUEST
    });
    ensureToken(getUserInfo,{token: token}).then(res => {
      dispatch({
          type: USER_INFO_SUCCESS,
          user: res.user
        });
        if (res.accessToken) dispatch({type: USER_UPDATE_TOKEN, token: res.accessToken})
        if (res.refreshToken) localStorage.setItem('token', res.refreshToken)
    }).catch((err) => {
        dispatch({
          type: USER_INFO_FAILED,
          message: err
        });
      }
    );
  }
}






export const userLogout:AppThunk = () => {
    return function(dispatch:AppDispatch) {
      dispatch({
        type: USER_LOGOUT_REQUEST
      });
      logoutRequest(localStorage.getItem('token')).then(res => {
        if (res && res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }).then(res=>{
        if (res.success !== true) {
          return Promise.reject(res);
        }
        dispatch({
            type: USER_LOGOUT_SUCCESS
          });
          localStorage.removeItem('token')
      }).catch((err) => {
          dispatch({
            type: USER_LOGOUT_FAILED,
            message: err
          });
        }
      );
    };
  }  


export const userLogin:AppThunk = (req) => {
    return function(dispatch:AppDispatch) {
      dispatch({
        type: USER_LOGIN_REQUEST
      });
      loginRequest(req).then(res => {
        if (res && res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      }).then(res=>{
        if (res.success !== true) {
          return Promise.reject(res);
        }
        dispatch({
            type: USER_LOGIN_SUCCESS,
            user: res.user,
            access: res.accessToken,
            refresh: res.refreshToken
          });
          //setCookie('token', res.refreshToken);
          localStorage.setItem('token', res.refreshToken)
      }).catch((err) => {
          dispatch({
            type: USER_LOGIN_FAILED,
            message: err
          });
        }
      );
    };
  }

  


export const userSignup:AppThunk = (req) => {
  return function(dispatch:AppDispatch) {
    dispatch({
      type: USER_SIGNUP_REQUEST
    });
    signupRequest(req).then(res => {
      if (res && res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }).then(res=>{
      if (res.success !== true) {
        return Promise.reject(res);
      }
      dispatch({
          type: USER_SIGNUP_SUCCESS,
          user: res.user,
          access: res.accessToken,
          refresh: res.refreshToken
        });
        //setCookie('token', res.refreshToken);
        localStorage.setItem('token', res.refreshToken);
    }).catch((err) => {
        dispatch({
          type: USER_SIGNUP_FAILED,
          message: err
        });
      }
    );
  };
}

