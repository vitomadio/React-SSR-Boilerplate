import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Head from "./Head";
import routes from "../routes";


class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to React SSR!",
        };
    }

    render() {
        return (
            <div>
                <h1>{ this.state.title }</h1>
                <Head />
                <Header />
                <Switch>
                    { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                </Switch>
                
            </div>
        );
    }
}

export default Layout;
