import React, { useContext, useEffect, useState } from 'react'
import { Router, Redirect } from '@reach/router';
import Login from './components/Login';
import TodoList from './components/TodoList'
import Error from './components/Error';
import { storeContext } from './Store';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { state, dispatch } = useContext(storeContext)
  useEffect(() => {
    state.jwt && setLoggedIn(true)
  }, [state])
  return (
    <div className="App">
      <Error />
      <Router>
        <Login path="/" />
        {
          loggedIn ?
            (
              <>
                <TodoList path="/todos" />
              </>
            )
            :
            <Redirect from="*" to="/" noThrow />
        }
      </Router>
    </div>
  )
}

export default App
