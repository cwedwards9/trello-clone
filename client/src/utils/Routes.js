import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import BoardSettings from "../pages/BoardSettings";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" render={ () => <Home /> } />
            <Route exact path="/signup" render={ () => <Signup /> } />
            <Route exact path="/login" render={ () => <Login /> } />
            <Route exact path="/dashboard" render={ () => <Dashboard /> } />
            <Route exact path="/board/:id" render={ () => <Board /> } />
            <Route exact path="/board-settings" render={ () => <BoardSettings /> } />
            <Redirect to="/" />
        </Switch>
    );
}