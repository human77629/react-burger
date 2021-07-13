import { sampleData } from "../utils/data";
const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';
const LOGIN_API_URL = 'https://norma.nomoreparties.space/api/auth/login';
const SIGNUP_API_URL = 'https://norma.nomoreparties.space/api/auth/register'
const LOGOUT_API_URL = 'https://norma.nomoreparties.space/api/auth/logout'
const TOKEN_API_URL = 'https://norma.nomoreparties.space/api/auth/token'


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
            data: sampleData,
          })}, 1500)
          ); 
}

export const makeOrderRequest = async (ingredients) => {
  return await fetch(ORDER_API_URL, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ingredients: ingredients})
  })
}