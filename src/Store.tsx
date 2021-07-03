import { navigate } from '@reach/router'
import React, { createContext, useReducer, PropsWithChildren, Dispatch } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { Action, Context, State, Todo } from './types'
const initialStoreContext: Context = {
    state: {
        jwt:'',
        todos: [],
        tags: [],
        isLoading: false,
        error: null,
    },
    dispatch: (_a) => { },
}
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TODOS':
            console.log('SET_TODOS')
            return { ...state, isLoading: true, error: null, todos: action.payload }
        case 'SET_TAGS':
            console.log('SET_TAGS')
            return { ...state, isLoading: true, error: null, tags: action.payload }
        case 'SET_JWT':
                console.log('SET_JWT')
                navigate('/todos')
                return { ...state, isLoading: true, error: null, jwt: action.payload }
        case 'SET_ERROR':
                console.log('SET_ERROR')
                return { ...state, isLoading: true, error: action.payload }
        default:
            return state;
    }
}

const asyncActionHandler:any = {
    FETCHTAGS: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FetchTags')
        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${action.payload}`
            },
        };
        try{
            const response = await fetch('http://localhost:3004/tags',settings);
            const tags = await response.json();
            dispatch({ type: 'SET_TAGS', payload: tags });
        }catch(e){
            console.log(e)
        }
       
    },
    FETCHTODOS: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('FetchTodos')
        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${action.payload}`
            },
        };
        try{
            const response = await fetch('http://localhost:3004/todos?_expand=tag',settings);
            const todos = await response.json();
           dispatch({ type: 'SET_TODOS', payload: todos });
        }catch(e){
            console.log(e)
        }
       

    },
    ADDTODO: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('Add Todo')
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${action.payload.token}`
            },
            body: JSON.stringify(action.payload.values)
        };
        
        try {
            const settings_get = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${action.payload.token}`
                }
            };
            await fetch('http://localhost:3004/todos', settings);
            const response = await fetch('http://localhost:3004/todos?_expand=tag',settings_get);
            const todos = await response.json();
            dispatch({ type: 'SET_TODOS', payload: todos });
        } catch (e) {
            return e;
        }

    },
    DELETETODO: ({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('Delete Todo')
        const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${action.payload.token}`
            },

        };
        try {
            await fetch(`http://localhost:3004/todos/${action.payload.id}`, settings);
            const settings_get = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${action.payload.token}`
                },
    
            };
            const response = await fetch('http://localhost:3004/todos?_expand=tag', settings_get);
            const todos = await response.json();
            dispatch({ type: 'SET_TODOS', payload: todos });

        } catch (e) {
            return e;
        }

    },
    LOGIN:({dispatch} : {dispatch:({}:Action)=>{}}) => async (action:Action) => {
        console.log('LOGIN');
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload)
        };
        try {
            const response = await fetch('http://localhost:3004/login', settings);
            if(response.ok){
                const data = await response.json();
                const jwt = data.accessToken;
                dispatch({type:"SET_JWT", payload:jwt})
            } else {
                dispatch({type:"SET_ERROR", payload:"The login is incorrect"})
            }
           
        } catch (e) {
            return e;
        }
    }
}
const storeContext = createContext(initialStoreContext);
const { Provider } = storeContext;
const StateProvider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducerAsync(reducer, initialStoreContext.state, asyncActionHandler);
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
export { storeContext, StateProvider }