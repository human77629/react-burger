import { sampleIngredients, sampleOrders } from "../utils/data";
const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';
const LOGIN_API_URL = 'https://norma.nomoreparties.space/api/auth/login';
const SIGNUP_API_URL = 'https://norma.nomoreparties.space/api/auth/register'
const LOGOUT_API_URL = 'https://norma.nomoreparties.space/api/auth/logout'
const TOKEN_API_URL = 'https://norma.nomoreparties.space/api/auth/token'
const USER_INFO_URL = 'https://norma.nomoreparties.space/api/auth/user'
const PASSWORD_RESET_URL = 'https://norma.nomoreparties.space/api/password-reset'
const PASSWORD_RESET_CONFIRM_URL = 'https://norma.nomoreparties.space/api/password-reset/reset'


export const passwordResetConfirmationRequest = (password, token) => {
  return fetch(PASSWORD_RESET_CONFIRM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      token: token
    })    
  })
}

export const ensureToken = async (request, param) => {
  const initialResponse = await request(param)

  if (!initialResponse) return Promise.reject('?')
  if (initialResponse.ok) return initialResponse.json()
  if (initialResponse.status===401 || initialResponse.status===403) {
    const refreshResponse = await refreshTokenRequest(localStorage.getItem('token'))
    if (!refreshResponse) return Promise.reject('refresh error')
    if (!refreshResponse.ok) return Promise.reject(refreshResponse.status)
    const refreshObject = await refreshResponse.json()
    if (!refreshObject || !refreshObject.success) return Promise.reject('refresh error')
    const newResponse = await request({...param, token: refreshObject.accessToken})
    if (!newResponse) return Promise.reject()
    if (!newResponse.ok) return Promise.reject(newResponse.status)
    const responseObject = await newResponse.json()
    if (!responseObject) return Promise.reject()
    if (!responseObject.success) return Promise.reject(responseObject.message)
    return {...responseObject, ...{accessToken: refreshObject.accessToken, refreshToken: refreshObject.refreshToken}}
  }
  return Promise.reject(initialResponse.status)
}

export const getUserInfo = ({token}) => {
  return fetch(USER_INFO_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
  })
}


export const patchUserInfo = (params) => {

  const {token, user} = params

  return fetch(USER_INFO_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(user)  
  })
}

export const signupRequest = ({email, password, username}) => {
  return fetch(SIGNUP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: username
    })    
  })
}

export const loginRequest = ({email, password}) => {
  return fetch(LOGIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })    
  })
}


export const passwordResetRequest = (email) => {
  return fetch(PASSWORD_RESET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
    })    
  })
}

export const refreshTokenRequest = (token) => {
  return fetch(TOKEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token
    })    
  })
}

export const logoutRequest = (token) => {
  return fetch(LOGOUT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token
    })    
  })
}

export const getIngredientsRequest = async () => {
    return await fetch(INGREDIENTS_API_URL)
}

export const fakeGetIngredientsRequest = async () => {
    return await new Promise(resolve =>
        setTimeout(() => {
          resolve({
            success: true,
            data: sampleIngredients,
          })}, 1500)
          ); 
}

export const fakeGetOrdersRequest = async () => {
  return await new Promise(resolve =>
      setTimeout(() => {
        resolve({
          success: true,
          data: sampleOrders,
        })}, 1500)
        ); 
}


export const makeOrderRequest = async ({token, ingredients}) => {
  return await fetch(ORDER_API_URL, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({ingredients: ingredients})
  })
}