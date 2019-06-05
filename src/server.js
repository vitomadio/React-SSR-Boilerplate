import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
import bodyParser from 'body-parser';
import flash from 'connect-flash';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import { initializeSession } from "./store/actions/index";
import createStore from "./store/store";

const auth = require('./routes/auth');
const charts = require('./routes/charts');
const currency = require('./routes/currency-pairs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/authentication', auth);
app.use('/charts', charts);
app.use('/currency-pairs', currency);
app.get('/*', (req, res) => {
    const context = {};
    const store = createStore();

    store.dispatch(initializeSession());

    const dataRequirements =
        routes
            .filter(route => matchPath(req.url, route)) // filter matching paths
            .map(route => route.component) // map to components
            .filter(comp => comp.serverFetch) // check if components have data requirement
            .map(comp => store.dispatch(comp.serverFetch())); // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
        const jsx = (
            <ReduxProvider store={store}>
                <StaticRouter context={context} location={req.path}>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString(jsx);
        const reduxState = store.getState();
        const helmetData = Helmet.renderStatic();

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlTemplate(reactDom, reduxState, helmetData));
    });
});



app.listen(port, () => {
    console.log("Server connected on port: " + port);
});

function htmlTemplate(reactDom, reduxState, helmetData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            ${ helmetData.title.toString()}
            ${ helmetData.meta.toString()}
            ${ helmetData.link.toString()}
        </head>
        
        <body>
            <div id='app'>${ reactDom}</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify(reduxState)}
            </script>
            <script src='app.bundle.js'></script>
           
        </body>
        </html>
    `;
}
