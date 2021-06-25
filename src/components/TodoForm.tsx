import React, { FC } from "react";
const TodoForm: FC = () => {
    return (
        <div className="flex justify-center items-center mt-8">
            <div className="flex items-end">
                <div>
                    <label htmlFor="todo" className="block text-center text-2xl font-medium text-gray-700">Add a new todo</label>
                    <div className="mt-1">
                        <input type="text" name="todo" id="todo"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Send email to ..." />
                    </div>
                </div>
                <button type="button"
                    className="ml-3 relative inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="ml-16">
                <label htmlFor="location" className="block text-2xl text-center font-medium text-gray-700">Category</label>
                <select id="location" name="location"
                    className="mt-1 block w-full pl-3 pr-32 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>House</option>
                    <option selected>Work</option>
                    <option>Sport</option>
                </select>
            </div>
        </div>
    );
}
export default TodoForm;