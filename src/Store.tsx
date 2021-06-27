import React, { createContext, useReducer, PropsWithChildren } from 'react'
import { Action, Context, State } from './types'

const apiCall = async () => {
    const [state, dispatch] = useReducer(reducer, initialStoreContext.state);
    const response = await fetch('http://localhost:3004/todos');
    const todos = await response.json();
    console.log(todos)
    dispatch({ type: 'SET_TODOS', payload: todos })
    return todos;
}

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
            apiCall()
            console.log(1)
            return { ...state, isLoading: true, error: null }
        case 'SET_TODOS':
            console.log('SET_TODOS')
            return { ...state, isLoading: true, error: null, todos: action.payload }
        default:
            return assertNever(action);
    }
}
const storeContext = createContext(initialStoreContext);
const { Provider } = storeContext;

const StateProvider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(reducer, initialStoreContext.state);
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
export { storeContext, StateProvider }