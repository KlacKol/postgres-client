import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Home from "./pages/Home";
import Layout from "./hoc/Layout";
import {Route, Router, Switch} from "react-router-dom";
import {PATH_ADD_MARKER, PATH_AUTH_LOGIN, PATH_AUTH_REGISTRATION, PATH_HOME} from "./routeList";
import CreateMarker from "./pages/CreateMarker";
import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Registration";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./pages/NotFound";
import {history} from "./helpers/history";

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
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Layout>
            </Router>
        </>
    )
};

export default App;
