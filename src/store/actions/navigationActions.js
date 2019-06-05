import { ON_CHANGED_ROUTE } from './actionTypes';

export const onChangeRoute = (route) => {
    console.log(route);
    return {
        type: ON_CHANGED_ROUTE,
        payload: route
    }
};