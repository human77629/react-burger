import { sampleData } from "../utils/data";
const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';

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