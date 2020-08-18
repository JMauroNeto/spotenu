import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';


function Router(){
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {token && 
                        <Home />
                    }
                    {!token && 
                        <Redirect to='/login' />
                    }
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;