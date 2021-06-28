import React, { Dispatch } from 'react'

type Context = { state: State; dispatch: Dispatch<Action> }

interface State {
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

// Discriminating Union
type Action =
    | FetchTodos
    | SetTodos
    | AddTodo
    | SetTags
    | FetchTags

interface AddTodo {
    type: 'ADDTODO',
    action: { payload: any }
}
interface FetchTodos {
    type: 'FETCHTODOS'
}
interface FetchTags {
    type: 'FETCHTAGS'
}
interface SetTags {
    type: 'SET_TAGS'
}
interface SetTodos {
    type: 'SET_TODOS'
}

