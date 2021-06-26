import React, { Dispatch } from 'react'

type Context = { state: State; dispatch: Dispatch<Action> }

interface State {
    todos: Todo[]
    isLoading: boolean,
    error: string | null,
}

interface Todo {
    title: string
}

// Discriminating Union
type Action =
    | Fetch
    | GetTodos
    | SetTodos
    | SucceedRequestAction
    | FailRequestAction

interface Fetch {
    type: 'FETCH'
}
interface GetTodos {
    type: 'GET_TODOS'
}
interface SetTodos {
    type: 'SET_TODOS'
    payload: Todo[]
}
interface SucceedRequestAction {
    type: 'SUCCEED_REQUEST'
    payload: Todo
}
interface FailRequestAction {
    type: 'FAIL_REQUEST'
    payload: string
}