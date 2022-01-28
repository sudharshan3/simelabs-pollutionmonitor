// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CHART_LIST} from "./constants";

import {
  getChartListSuccess,
  getChartListFailed,

} from "./actions";

const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* ChartList({payload:data}) {
  const value = data
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    url: endpoints.locationURL+`/averages?parameter=${value.parameter}&temporal=hour&limit=10000&date_from=${value.date}T00:00:00.000Z&date_to=${value.date}T23:59:59.999Z&location=${value.location}&spatial=location`,
  };

  try {
    const response = yield call(ApiCall, options);
    yield put(getChartListSuccess(response.data));
  } catch (error) {
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        WarnFields(message);
        break;
      case 401:
        message = "Invalid credentials";
        WarnFields(message);
        break;
      case 400:
        message = error.response.data && error.response.data.error;
        WarnFields(message);
        break;
      default:
        message = error;
    }
    yield put(getChartListFailed(message));
  }
}


export function* watchChartList(): any {
  yield takeEvery(CHART_LIST, ChartList);
}


function* chartSaga(): any {
  yield all([
    fork(watchChartList)
  ]);
}

export default chartSaga;
