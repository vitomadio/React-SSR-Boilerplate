import { ON_MESSAGE_SET } from './actionTypes';

export const setMessage = (message) => {
    return {
        type: ON_MESSAGE_SET,
        payload: message
    }
}