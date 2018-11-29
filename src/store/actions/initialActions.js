/*
These actions are from initial boilerplate, do not remove.
*/

import { INITIALIZE_SESSION, STORE_DATA } from './actionTypes';
import { fetchCircuits } from "../../api";

export const initializeSession = ( ) => ( {
    type: INITIALIZE_SESSION,
} );

const storeData = ( data ) => ( {
    type: STORE_DATA,
    data,
} );

export const fetchData = ( ) => ( dispatch ) =>
    fetchCircuits( ).then( res => dispatch( storeData( res ) ) ); 

