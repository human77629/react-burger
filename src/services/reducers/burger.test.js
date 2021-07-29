import { burgerReducer as reducer } from "./burger";
import * as types from '../actions/burger';

describe('burger reducer', ()=>{ 
    it('should return initial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            viewedIngredient: {
                image_large: '',
                name: '',
                calories: 0,
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                _id: '',
                image: '',
                price: 0,
                type: '',
            },
        
            order: {
                number: '',
                status: '',
                generatedBurgerName: '',
                ingredientIds: []
            },
            orderRequest: false,
            orderFailed: false,
        
            ingredients: [],
            ingredientsRequest: false,
            ingredientsFailed: false,
        
            orders: [],
            ordersRequest: false,
            ordersFailed: false,    
        
            viewedOrder: {
                status: '',
                name: '',
                number: 0,
                price: 0,
                _id: '',
                createdAt: '',
                ingredients: [],
            },
        
            totalOrderCount: 0,
            todayOrderCount: 0,
        
            orderSocketStatus: 'disconnected',
            
            selectedIngredients: {bunId: '', toppingIds: []},            
        })
    })

    it('should handle VIEW_INGREDIENT when no ingredient is selected', ()=>{
        expect(reducer({}, {
            type: types.VIEW_INGREDIENT,
            ingredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
             }            
        })).toEqual({
            viewedIngredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
             }
        })
    })

    it('should handle VIEW_INGREDIENT when another ingredient is already selected', ()=>{
        expect(reducer({
            viewedIngredient: {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
                "type":"main",
                "proteins":800,
                "fat":800,
                "carbohydrates":300,
                "calories":2674,
                "price":3000,
                "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v":0
             }
        }, {
            type: types.VIEW_INGREDIENT,
            ingredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
             }            
        })).toEqual({
            viewedIngredient: {
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
                "type":"bun",
                "proteins":80,
                "fat":24,
                "carbohydrates":53,
                "calories":420,
                "price":1255,
                "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v":0
             }
        })
    }) 


    it('should handle VIEW_ORDER when no order is selected', ()=>{
        expect(reducer({},{
            type: types.VIEW_ORDER,
            order: {
                status: 'done',
                name: 'Экспериментальный бургер',
                number: 111,
                price: 2222,
            }
        })).toEqual({
            viewedOrder: {
                status: 'done',
                name: 'Экспериментальный бургер',
                number: 111,
                price: 2222,
            }
        })
    })

    it('should handle VIEW_ORDER when another order is already selected', ()=>{
        expect(reducer({
            viewedOrder: {
                status: 'cancelled',
                name: 'Неизвестный бургер',
                number: 33333,
                price: 44,
            } 
        },{
            type: types.VIEW_ORDER,
            order: {
                status: 'done',
                name: 'Экспериментальный бургер',
                number: 111,
                price: 2222,
            }
        })).toEqual({
            viewedOrder: {
                status: 'done',
                name: 'Экспериментальный бургер',
                number: 111,
                price: 2222,
            }
        })
    })   
    
    it('should handle GET_ORDERS_REQUEST', ()=>{
        expect(reducer({},{
            type: types.GET_ORDERS_REQUEST
        })).toEqual({
            ordersRequest: true,
            ordersFailed: false
        })
    })

    it('should handle GET_ORDERS_SUCCESS', ()=>{
        expect(reducer({},{
            type: types.GET_ORDERS_SUCCESS,
            orders: [
                {
                   "ingredients": [
                      "60d3b41abdacab0026a733d3",
                      "60d3b41abdacab0026a733d1",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c7",
                      "60d3b41abdacab0026a733c7"
                    ],
                   "_id": "60efbf7a294c38001b6c1ec5",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-14T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "done",
                   "name": "Био-марсианский антарианский минеральный space фалленианский экзо-плантаго флюоресцентный бургер",
                   "createdAt": "2021-07-15T04:54:18.362Z",
                   "updatedAt": "2021-07-15T04:54:18.393Z",
                   "number": 862,
                   "price": 8142
                 },
             
                 {
                   "ingredients": [
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733cc",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c6",
                      "60d3b41abdacab0026a733c6"
                    ],
                   "_id": "60efc052294c38001b6c1ec6",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-10T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "pending",
                   "name": "Био-марсианский бургер",
                   "createdAt": "2021-07-10T04:57:54.342Z",
                   "updatedAt": "2021-07-15T04:57:54.381Z",
                   "number": 863,
                   "price": 6536
                 }
                ]
        })).toEqual({
            ordersRequest: false,
            ordersFailed: false,
            orders: [
                {
                   "ingredients": [
                      "60d3b41abdacab0026a733d3",
                      "60d3b41abdacab0026a733d1",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c7",
                      "60d3b41abdacab0026a733c7"
                    ],
                   "_id": "60efbf7a294c38001b6c1ec5",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-14T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "done",
                   "name": "Био-марсианский антарианский минеральный space фалленианский экзо-плантаго флюоресцентный бургер",
                   "createdAt": "2021-07-15T04:54:18.362Z",
                   "updatedAt": "2021-07-15T04:54:18.393Z",
                   "number": 862,
                   "price": 8142
                },
             
                {
                   "ingredients": [
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733cc",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c6",
                      "60d3b41abdacab0026a733c6"
                    ],
                   "_id": "60efc052294c38001b6c1ec6",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-10T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "pending",
                   "name": "Био-марсианский бургер",
                   "createdAt": "2021-07-10T04:57:54.342Z",
                   "updatedAt": "2021-07-15T04:57:54.381Z",
                   "number": 863,
                   "price": 6536
                }
            ]
        })
    }) // should handle GET_ORDERS_SUCCESS

    it('should handle GET_ORDERS_FAILED', ()=>{
        expect(reducer({}, {
            type: types.GET_ORDERS_FAILED
        })).toEqual({
            ordersRequest: false,
            ordersFailed: true,
            orders: []
        })
    })

    it('should handle WS_GET_ORDERS', ()=>{
        expect(reducer({},{
            type: types.WS_GET_ORDERS,
            message: {
                total: 3000,
                totalToday: 300,

                orders: [
                    {
                    "ingredients": [
                        "60d3b41abdacab0026a733d3",
                        "60d3b41abdacab0026a733d1",
                        "60d3b41abdacab0026a733cb",
                        "60d3b41abdacab0026a733d0",
                        "60d3b41abdacab0026a733cf",
                        "60d3b41abdacab0026a733cd",
                        "60d3b41abdacab0026a733c7",
                        "60d3b41abdacab0026a733c7"
                        ],
                    "_id": "60efbf7a294c38001b6c1ec5",
                    "owner": {
                        "name": "qweasdzxc",
                        "email": "qweasdzxc@qweasdzxc.com",
                        "createdAt": "2021-07-14T00:03:11.841Z",
                        "updatedAt": "2021-07-14T19:34:29.885Z"
                    },
                    "status": "done",
                    "name": "Био-марсианский антарианский минеральный space фалленианский экзо-плантаго флюоресцентный бургер",
                    "createdAt": "2021-07-15T04:54:18.362Z",
                    "updatedAt": "2021-07-15T04:54:18.393Z",
                    "number": 862,
                    "price": 8142
                    },
                
                    {
                    "ingredients": [
                        "60d3b41abdacab0026a733c8",
                        "60d3b41abdacab0026a733c8",
                        "60d3b41abdacab0026a733c8",
                        "60d3b41abdacab0026a733cc",
                        "60d3b41abdacab0026a733cd",
                        "60d3b41abdacab0026a733cb",
                        "60d3b41abdacab0026a733d0",
                        "60d3b41abdacab0026a733cf",
                        "60d3b41abdacab0026a733cd",
                        "60d3b41abdacab0026a733c6",
                        "60d3b41abdacab0026a733c6"
                        ],
                    "_id": "60efc052294c38001b6c1ec6",
                    "owner": {
                        "name": "qweasdzxc",
                        "email": "qweasdzxc@qweasdzxc.com",
                        "createdAt": "2021-07-10T00:03:11.841Z",
                        "updatedAt": "2021-07-14T19:34:29.885Z"
                    },
                    "status": "pending",
                    "name": "Био-марсианский бургер",
                    "createdAt": "2021-07-10T04:57:54.342Z",
                    "updatedAt": "2021-07-15T04:57:54.381Z",
                    "number": 863,
                    "price": 6536
                    }
                ]
            }
        })).toEqual({
            totalOrderCount: 3000,
            todayOrderCount: 300,
            orders: [
                {
                   "ingredients": [
                      "60d3b41abdacab0026a733d3",
                      "60d3b41abdacab0026a733d1",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c7",
                      "60d3b41abdacab0026a733c7"
                    ],
                   "_id": "60efbf7a294c38001b6c1ec5",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-14T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "done",
                   "name": "Био-марсианский антарианский минеральный space фалленианский экзо-плантаго флюоресцентный бургер",
                   "createdAt": "2021-07-15T04:54:18.362Z",
                   "updatedAt": "2021-07-15T04:54:18.393Z",
                   "number": 862,
                   "price": 8142
                },
             
                {
                   "ingredients": [
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733c8",
                      "60d3b41abdacab0026a733cc",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733cb",
                      "60d3b41abdacab0026a733d0",
                      "60d3b41abdacab0026a733cf",
                      "60d3b41abdacab0026a733cd",
                      "60d3b41abdacab0026a733c6",
                      "60d3b41abdacab0026a733c6"
                    ],
                   "_id": "60efc052294c38001b6c1ec6",
                   "owner": {
                     "name": "qweasdzxc",
                     "email": "qweasdzxc@qweasdzxc.com",
                     "createdAt": "2021-07-10T00:03:11.841Z",
                     "updatedAt": "2021-07-14T19:34:29.885Z"
                   },
                   "status": "pending",
                   "name": "Био-марсианский бургер",
                   "createdAt": "2021-07-10T04:57:54.342Z",
                   "updatedAt": "2021-07-15T04:57:54.381Z",
                   "number": 863,
                   "price": 6536
                }
            ]
        })
    }) // should handle WS_GET_ORDERS    

    it('should handle WS_CONNECTION_CLOSED', ()=>{
        expect(reducer({},{
            type: types.WS_CONNECTION_CLOSED,
        })).toEqual({
            orderSocketStatus: 'disconnected'
        })
    })

    it('should handle WS_CONNECTION_ERROR', ()=>{
        expect(reducer({},{
            type: types.WS_CONNECTION_ERROR,
        })).toEqual({
            orderSocketStatus: 'error'
        })
    })
    
    it('should handle WS_CONNECTION_SUCCESS', ()=>{
        expect(reducer({},{
            type: types.WS_CONNECTION_SUCCESS,
        })).toEqual({
            orderSocketStatus: 'connected'
        })
    })
    
    it('should handle WS_CONNECTION_START', ()=>{
        expect(reducer({},{
            type: types.WS_CONNECTION_START,
        })).toEqual({
            orderSocketStatus: 'connecting'
        })
    })    

    it('should handle GET_INGREDIENTS_REQUEST', ()=>{
        expect(reducer({},{
            type: types.GET_INGREDIENTS_REQUEST,
        })).toEqual({
            ingredientsRequest: true,
            ingredientsFailed: false
        })
    })      

    it('should handle GET_INGREDIENTS_SUCCESS', ()=>{
        expect(reducer({},{
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b9",
                    "name":"Соус традиционный галактический",
                    "type":"sauce",
                    "proteins":42,
                    "fat":24,
                    "carbohydrates":42,
                    "calories":99,
                    "price":15,
                    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b8",
                    "name":"Соус фирменный Space Sauce",
                    "type":"sauce",
                    "proteins":50,
                    "fat":22,
                    "carbohydrates":11,
                    "calories":14,
                    "price":80,
                    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9bc",
                    "name":"Плоды Фалленианского дерева",
                    "type":"main",
                    "proteins":20,
                    "fat":5,
                    "carbohydrates":55,
                    "calories":77,
                    "price":874,
                    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9bb",
                    "name":"Хрустящие минеральные кольца",
                    "type":"main",
                    "proteins":808,
                    "fat":689,
                    "carbohydrates":609,
                    "calories":986,
                    "price":300,
                    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
                    "__v":0
                 },
            ]
        })).toEqual({
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b9",
                    "name":"Соус традиционный галактический",
                    "type":"sauce",
                    "proteins":42,
                    "fat":24,
                    "carbohydrates":42,
                    "calories":99,
                    "price":15,
                    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9b8",
                    "name":"Соус фирменный Space Sauce",
                    "type":"sauce",
                    "proteins":50,
                    "fat":22,
                    "carbohydrates":11,
                    "calories":14,
                    "price":80,
                    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9bc",
                    "name":"Плоды Фалленианского дерева",
                    "type":"main",
                    "proteins":20,
                    "fat":5,
                    "carbohydrates":55,
                    "calories":77,
                    "price":874,
                    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
                    "__v":0
                 },
                 {
                    "_id":"60666c42cc7b410027a1a9bb",
                    "name":"Хрустящие минеральные кольца",
                    "type":"main",
                    "proteins":808,
                    "fat":689,
                    "carbohydrates":609,
                    "calories":986,
                    "price":300,
                    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
                    "__v":0
                 },
            ]
        }) 
    }) // should handle GET_INGREDIENTS_SUCCESS


    it('should handle GET_INGREDIENTS_FAILED', ()=>{
        expect(reducer({}, {
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual({
            ingredientsRequest: false,
            ingredientsFailed: true,
            ingredients: []
        })
    })

    it('should handle MAKE_ORDER_REQUEST', ()=>{
        expect(reducer({}, {
            type: types.MAKE_ORDER_REQUEST
        })).toEqual({
            orderRequest: true,
            orderFailed: false,
        })
    })    

    it('should handle MAKE_ORDER_FAILED', ()=>{
        expect(reducer({}, {
            type: types.MAKE_ORDER_FAILED
        })).toEqual({
            orderRequest: false,
            orderFailed: true,
            order: {
                number: '',
                status: '',
                generatedBurgerName: '',
                ingredientIds: []
            }
        })
    })  
    
    it('should handle MAKE_ORDER_SUCCESS', ()=>{
        expect(reducer({}, {
            type: types.MAKE_ORDER_SUCCESS,
            data: {
                name: 'Экспериментальный бургер',
                order: {
                    status: 'done',
                    
                    number: 111,
                    price: 2222,
                }
            }
        })).toEqual({
            orderRequest: false,
            orderFailed: false,
            
            order: {
                generatedBurgerName: 'Экспериментальный бургер',
                number: 111,
            },

            selectedIngredients: {
                bunId: '',
                toppingIds: []
            }
        })
    })


    it('should handle ADD_TOPPING', ()=>{
        expect(reducer({
            selectedIngredients: {
                bunId: '',
                toppingIds: []
            }
        },{
            type: types.ADD_TOPPING,
            id: '1'
        })).toEqual({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1'] 
            }
        })
    })
    
    it('should handle SET_BUN', ()=>{
        expect(reducer({
            selectedIngredients: {
                bunId: '',
                toppingIds: []
            }
        },{
            type: types.SET_BUN,
            id: '1'
        })).toEqual({
            selectedIngredients: {
                bunId: '1',
                toppingIds: [] 
            }
        })
    })    


    it('should handle REMOVE_TOPPING', ()=>{
        expect(reducer({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','2','3']
            }
        },{
            type: types.REMOVE_TOPPING,
            index: 1
        })).toEqual({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','3'] 
            }
        })
    })        

    it('should be able to move a topping up the list (MOVE_TOPPING)', ()=>{
        expect(reducer({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','2','3','4','5']
            }
        },{
            type: types.MOVE_TOPPING,
            currentIndex: 3,
            targetIndex: 1
        })).toEqual({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','4','2','3','5']
            }
        })
    })    
    
    
    it('should be able to move a topping down the list (MOVE_TOPPING)', ()=>{
        expect(reducer({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','2','3','4','5']
            }
        },{
            type: types.MOVE_TOPPING,
            currentIndex: 1,
            targetIndex: 3
        })).toEqual({
            selectedIngredients: {
                bunId: '',
                toppingIds: ['1','3','4','2','5']
            }
        })
    })      
    
    
}) // describe