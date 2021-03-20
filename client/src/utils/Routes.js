import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import BoardSettings from "../pages/BoardSettings";


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" render={ () => <Home /> } />
            <Route exact path="/dashboard" render={ () => <Dashboard /> } />
            <Route exact path="/board/:id" render={ () => <Board /> } />
            <Route exact path="/board-settings" render={ () => <BoardSettings /> } />
            <Redirect to="/" />
        </Switch>
    );
}