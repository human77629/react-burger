import { loginRequest, logoutRequest, signupRequest, getUserInfo, ensureToken, patchUserInfo, passwordResetRequest, passwordResetConfirmationRequest } from '../api.js'

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';


export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_UPDATE_TOKEN = 'USER_UPDATE_TOKEN';


export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';


export const CONFIRM_PASSWORD_RESET_REQUEST = 'CONFIRM_PASSWORD_RESET_REQUEST';
export const CONFIRM_PASSWORD_RESET_SUCCESS = 'CONFIRM_PASSWORD_RESET_SUCCESS';
export const CONFIRM_PASSWORD_RESET_FAILED = 'CONFIRM_PASSWORD_RESET_FAILED';



export function confirmPasswordReset(password, token) {
  return function(dispatch) {
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


export function passwordReset(email) {
  return function(dispatch) {
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


export function userUpdate(params) {  
  return function(dispatch) {

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


export function userInfo(token) {  
  return function(dispatch) {
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






export function userLogout() {
    return function(dispatch) {
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


export function userLogin(req) {
    return function(dispatch) {
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

  


export function userSignup(req) {
  return function(dispatch) {
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

