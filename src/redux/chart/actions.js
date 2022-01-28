// @flow
import {
  CHART_LIST,
  CHART_LIST_SUCCESS,
  CHART_LIST_FAILED,
} from "./constants";

type ChartAction = { type: string, payload: {} | string };

export const getChartList = (data:{}): ChartAction => ({
  type: CHART_LIST,
  payload: data,
});

export const getChartListSuccess = (chart: string): ChartAction => ({
  type: CHART_LIST_SUCCESS,
  payload: chart,
});

export const getChartListFailed = (error: string): ChartAction => ({
  type: CHART_LIST_FAILED,
  payload: error,
});