import React, { createContext, useReducer, PropsWithChildren } from 'react'
import { useReducerAsync } from 'use-reducer-async'
import { Action, Context, State } from './types'
const initialStoreContext: Context = {
    state: {
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
        default:
            return assertNever(action);
    }
}

const asyncActionHandler = {
    FETCHTAGS: ({ dispatch }) => async (action) => {
        console.log('FetchTags')
        const response = await fetch('http://localhost:3004/tags');
        const tags = await response.json();
        dispatch({ type: 'SET_TAGS', payload: tags });
    },
    FETCHTODOS: ({ dispatch }) => async (action) => {
        console.log('FetchTodos')
        const response = await fetch('http://localhost:3004/todos?_expand=tag');
        const todos = await response.json();
        dispatch({ type: 'SET_TODOS', payload: todos });

    },
    ADDTODO: ({ dispatch }) => async (action) => {
        console.log('Add Todo')
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.action.payload)

        };
        console.log(settings)
        try {
            const fetchResponse = await fetch('http://localhost:3004/todos', settings);
            const data = await fetchResponse.json();

            return data;
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