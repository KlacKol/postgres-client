import React from "react";
import { Route, Redirect } from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";

const AdminPrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const user = useSelector(res => res.user, shallowEqual);
    console.log(user)
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !!user.loggedIn && user.isAdmin ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to='not found' />
                )
            }
        />
    );
};

export default AdminPrivateRoute;