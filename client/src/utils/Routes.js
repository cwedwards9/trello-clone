import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import BoardSettings from "../pages/BoardSettings";


export default function Routes() {
    const user = sessionStorage.getItem("user");

    return (
        <Switch>
            <Route exact path="/" render={ () => <Home /> } />
            <Route exact path="/signup" render={(routeProps)=> <Signup routeProps={routeProps} />} />
            <Route exact path="/login" render={(routeProps)=> <Login routeProps={routeProps} />} />
            <Route exact path="/dashboard" render={ () => <Dashboard /> } />
            <ProtectedRoute exact path="/board/:id" component={Board} loggedIn={user} />
            <ProtectedRoute exact path="/board-settings" component={BoardSettings} loggedIn={user} />
            <Redirect to="/" />
        </Switch>
    );
}