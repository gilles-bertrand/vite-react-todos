import React, { Dispatch } from 'react'

type Context = { state: State; dispatch: Dispatch<Action> }

interface State {
    jwt:string,
    tags: Tag[],
    todos: Todo[],
    isLoading: boolean,
    error: string | null,
}

interface Todo {
    id: any,
    title: string,
    tag: { name: string }
}
interface Tag {
    id: any,
    name: string
}

interface User {
    id: any,
    email: string
}

// Discriminating Union
type Action =
    | FetchTodos
    | SetTodos
    | SetTodo
    | SetJwt
    | SetError
    | AddTodo
    | DeleteTodo
    | SetTags
    | FetchTags
    | Login

interface DeleteTodo {
    type: 'DELETETODO',
    action: { payload: any }
}
interface AddTodo {
    type: 'ADDTODO',
    action: { payload: any }
}
interface FetchTodos {
    type: 'FETCHTODOS',
    action:{payload:any}
}
interface FetchTags {
    type: 'FETCHTAGS',
    action:{payload:any}
}
interface SetTags {
    type: 'SET_TAGS'
}
interface SetTodos {
    type: 'SET_TODOS',
    action:{payload:any}
}
interface SetJwt {
    type: 'SET_JWT',
    action:{payload:any}
}
interface SetError {
    type: 'SET_ERROR',
    action:{payload:any}
}

interface SetTodo {
    type: 'SET_TODO'
}

interface Login {
    type: 'LOGIN',
    action:{payload:any}
}
