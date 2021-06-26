import React, { createContext, useReducer, PropsWithChildren } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { Action, Context, State } from './types'
const initialStoreContext: Context = {
    state: {
        todos: [],
        isLoading: false,
        error: null,
    },
    dispatch: (_a) => { },
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'GET_TODOS':
            console.log('GET_TODOS')
            return { ...state, isLoading: true, error: null }
        case 'SET_TODOS':
            console.log('SET_TODOS')
            return { ...state, isLoading: true, error: null, todos: action.payload }
        default:
            return assertNever(action);
    }
}

const asyncActionHandler = {
    FETCH :({dispatch}) =>async (action) =>{
        console.log('FETCH')
        const response = await fetch('http://localhost:3004/todos');
        const todos = await response.json();
        dispatch({type:'SET_TODOS',payload:todos});
        
    }
}
const storeContext = createContext(initialStoreContext);
const { Provider } = storeContext;

const StateProvider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducerAsync(reducer, initialStoreContext.state,asyncActionHandler);
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
export { storeContext, StateProvider }