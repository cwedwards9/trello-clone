import React from "react";
import { Route, Redirect } from "react-router-dom";


export default function ProtectedRoute({ loggedIn, component: Component, ...rest }) {
    return (
      <Route 
        {...rest} 
        render={(props) => {
          if(loggedIn) {
            return <Component {...props} />
          } else {
            return <Redirect to={{ pathname: "/login", state: {from: props.location } }} />
          }
        }} 
      />
    );
}