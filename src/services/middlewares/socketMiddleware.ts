import {Middleware} from 'redux'
import {PureStateType} from '../types'

type TSocketMiddlewareGenerator =  (wsUrl:string, wsActions:{[key:string]:string}) => Middleware<{}, PureStateType>


export const socketMiddleware:TSocketMiddlewareGenerator = (wsUrl:string, wsActions:{[key:string]:string}) =>  
     store => { 
        let socket:WebSocket | null = null;


        return next => action => {
            
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            
            if (type === wsInit) {
                if (payload && payload.token) socket = new WebSocket(`${wsUrl}?token=${payload.token}`);
                else socket = new WebSocket(`${wsUrl}/all`);
            }

            if (socket) {
            
              socket.onopen = event => {
                dispatch({ type: onOpen, payload: event });
              };
      
              socket.onerror = event => {
                dispatch({ type: onError, payload: event });
              };

              socket.onmessage = event => {
                  
                const parsedData = JSON.parse(event.data);
                const { success, ...message } = parsedData;
                dispatch({ type: onMessage, message: message });
              };

              socket.onclose = event => {
                dispatch({ type: onClose, payload: event });
              };

              if (type === wsSendMessage) {
                const message = { payload };
                socket.send(JSON.stringify(message));
              }              
            }

            next(action)
        }
    
}