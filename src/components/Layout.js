import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../routes";
import Head from "./Head";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Head />
                <Switch>
                    {routes.map(route => <Route key={route.path} path={route.path} exact={route.exact} render={props => <route.component props={props} />} />)}
                </Switch>
            </div>
        );
    }
}

export default Layout;
