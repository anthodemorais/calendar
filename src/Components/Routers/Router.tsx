import * as React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from '../Common/Header';
import Home from '../Home';
import Login from '../Visitor/Login';
import Register from '../Visitor/Register';
import RouteClient from './RouteClient';
import RouteDoctor from './RouteDoctor';
import AvailabilitiesList from '../Doctor/AvailabilitiesList';
import Bookings from '../Client/Bookings';
import DoctorsList from '../Client/DoctorsList';
import Doctor from '../Client/Doctor';

export default function () {
    return (
        <Router>
            <div className="App">
                <Header></Header>
                <Switch>

                    <Route exact path="/">
                        <Home></Home>
                    </Route>

                    <Route exact path="/login">
                        <Login></Login>
                    </Route>

                    <Route exact path="/register">
                        <Register></Register>
                    </Route>

                    <Route path="/doctors">
                        <RouteClient>
                            <DoctorsList></DoctorsList>
                        </RouteClient>
                    </Route>

                    <Route path="/doctors/book/:id">
                        <RouteClient>
                            <Doctor></Doctor>
                        </RouteClient>
                    </Route>

                    <Route path="/client/bookings/">
                        <RouteClient>
                            <Bookings></Bookings>
                        </RouteClient>
                    </Route>

                    <Route path="/availabilities">
                        <RouteDoctor>
                            <AvailabilitiesList></AvailabilitiesList>
                        </RouteDoctor>
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    )
}