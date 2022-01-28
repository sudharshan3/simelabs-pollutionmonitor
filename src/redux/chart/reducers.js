// @flow
import {
    CHART_LIST,
    CHART_LIST_SUCCESS,
    CHART_LIST_FAILED,

} from './constants';


const INIT_STATE = {
    loading: false,
};

type ChartAction = { type: string, payload: {} | string };
type State = {loading?: boolean, +value ?: boolean };

const Chart = (state:State = INIT_STATE, action: ChartAction) => {

    switch (action.type) {
        case CHART_LIST:
            return { ...state, listloading: true };
        case CHART_LIST_SUCCESS:
            return { ...state, chart: action.payload, listloading: false, error: null };
        case CHART_LIST_FAILED:
            return { ...state, error: action.payload, loading: false };
       
        default:
            return { ...state };
    }
};

export default Chart;
