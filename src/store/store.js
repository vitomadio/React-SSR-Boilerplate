import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import sessionReducer from "./reducers/sessionReducer";
import dataReducer from "./reducers/dataReducer";
import navReducer from "./reducers/navReducer";
import authReducer from "./reducers/authReducer";
import uiReducer from "./reducers/uiReducer";

const reducer = combineReducers({
    loggedIn: sessionReducer,
    data: dataReducer,
    navigation: navReducer,
    auth: authReducer,
    ui: uiReducer
});

const configureStore = () => {
    return createStore(reducer, applyMiddleware(thunkMiddleware));
};

export default configureStore;

