import React from "react";
import { Route, Redirect } from "react-router-dom";
import {PATH_AUTH_LOGIN} from "./routeList";
import {shallowEqual, useSelector} from "react-redux";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const token = useSelector(res => res.user.loggedIn, shallowEqual);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!token ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={PATH_AUTH_LOGIN} />
                )
            }
        />
    );
};

export default PrivateRoute;