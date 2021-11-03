import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, ...props }) {
        if (!isLoggedIn) {
            return <Redirect to="/sign-in" />
        }
        return <Route { ...props } />
}

export default ProtectedRoute;