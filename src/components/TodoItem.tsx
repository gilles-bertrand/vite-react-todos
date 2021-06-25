import React, { FC } from "react"
const TodoItem: FC = () => {
    return (
        <li className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <a href="edit_todo.html" className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-4 duration-200 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Drink beers with the dream team
                    <span className="text-xs rounded-lg bg-green-300 text-green-800 ml-4 px-3 py-1">Sport</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-blue-700 ml-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </li>
    );
}

export default TodoItem