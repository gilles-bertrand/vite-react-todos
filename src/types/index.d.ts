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
    payload:any
}
interface AddTodo {
    type: 'ADDTODO',
    payload:{}
}
interface FetchTodos {
    type: 'FETCHTODOS',
    payload:any
}
interface FetchTags {
    type: 'FETCHTAGS',
    payload:any
}
interface SetTags {
    type: 'SET_TAGS',
    payload:Tag[],
    
}
interface SetTodos {
    type: 'SET_TODOS',
    payload:Todo[]
}
interface SetJwt {
    type: 'SET_JWT',
    payload:string
}
interface SetError {
    type: 'SET_ERROR',
    payload:string
}

interface SetTodo {
    type: 'SET_TODO',
    payload:Todo
}

interface Login {
    type: 'LOGIN',
    payload:any
}
