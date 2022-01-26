// @flow
import {
    COUNTRY_LIST,
    COUNTRY_LIST_SUCCESS,
    COUNTRY_LIST_FAILED,
    CITY_LIST,
    CITY_LIST_SUCCESS,
    CITY_LIST_FAILED,
    LOCATION_LIST,
    LOCATION_LIST_SUCCESS,
    LOCATION_LIST_FAILED,
    LOCATION_DETAILS,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAILED,

} from './constants';


const INIT_STATE = {
    loading: false,
};

type LocationAction = { type: string, payload: {} | string };
type State = {loading?: boolean, +value ?: boolean };

const Location = (state:State = INIT_STATE, action: LocationAction) => {

    switch (action.type) {
        case LOCATION_LIST:
            return { ...state, listloading: true };
        case LOCATION_LIST_SUCCESS:
            return { ...state, location: action.payload, listloading: false, error: null };
        case LOCATION_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case LOCATION_DETAILS:
            return { ...state, listloading: true };
        case LOCATION_DETAILS_SUCCESS:
            return { ...state, locationDetails: action.payload, listloading: false, error: null };
        case LOCATION_DETAILS_FAILED:
            return { ...state, error: action.payload, loading: false };
        case COUNTRY_LIST:
            return { ...state, listloading: true };
        case COUNTRY_LIST_SUCCESS:
            return { ...state, country: action.payload, listloading: false, error: null };
        case COUNTRY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
        case CITY_LIST:
            return { ...state, listloading: true };
        case CITY_LIST_SUCCESS:
            return { ...state, city: action.payload, listloading: false, error: null };
        case CITY_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
            
        default:
            return { ...state };
    }
};

export default Location;
