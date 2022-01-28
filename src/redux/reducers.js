// @flow

import { combineReducers } from 'redux';
import Location from './location/reducers';
import Chart from './chart/reducers';

export default combineReducers({
    Location,
    Chart
});
