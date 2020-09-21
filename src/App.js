import React from 'react';
import {Route, Router, Switch} from "react-router-dom";

import './App.css';
import 'fontsource-roboto';
import Home from "./pages/Home";
import Layout from "./hoc/Layout";
import {
    PATH_ADD_MARKER,
    PATH_ADMIN_PANEL,
    PATH_AUTH_LOGIN,
    PATH_AUTH_REGISTRATION,
    PATH_HOME,
    PATH_PROFILE_PAGE
} from "./routeList";
import CreateMarker from "./pages/CreateMarker";
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Registration";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./pages/NotFound";
import {history} from "./helpers/history";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    return (
        <>
            <Router history={history}>
                <Layout>
                    <Switch>
                        <Route exact path={PATH_AUTH_LOGIN} component={SignIn}/>
                        <Route path={PATH_AUTH_REGISTRATION} component={SignUp}/>
                        <PrivateRoute path={PATH_HOME} component={Home}/>
                        <PrivateRoute path={PATH_ADD_MARKER} component={CreateMarker}/>
                        <PrivateRoute path={PATH_PROFILE_PAGE} component={ProfilePage}/>
                        <AdminPrivateRoute path={PATH_ADMIN_PANEL} component={AdminPanel}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Layout>
            </Router>
        </>
    )
};

export default App;
