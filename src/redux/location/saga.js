// @flow
import { Cookies } from "react-cookie";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { ApiCall } from "../../services/index";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOCATION_LIST,LOCATION_DETAILS, COUNTRY_LIST, CITY_LIST } from "./constants";

import {
  getLocationListSuccess,
  getLocationListFailed,
  getLocationDetailsSuccess,
  getLocationDetailsFailed,
  getCountryListSuccess,
  getCountryListFailed,
  getCityListSuccess,
  getCityListFailed,
} from "./actions";

const WarnFields = (msg) => toast.error(msg, { transition: Zoom });
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* LocationList({payload:data}) {
  const value = data
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    url: endpoints.locationURL+`/locations?metadata=true&sort=asc&limit=200&city=${value.data}`,
  };

  try {
    const response = yield call(ApiCall, options);
    yield put(getLocationListSuccess(response.data));
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
    yield put(getLocationListFailed(message));
  }
}
function* LocationDetails({payload:data}) {
  const value = data
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    url: endpoints.locationURL+`/latest/${value.data}`,
  };

  try {
    const response = yield call(ApiCall, options);
    yield put(getLocationDetailsSuccess(response.data));
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
    yield put(getLocationDetailsFailed(message));
  }
}
function* CountryList() {
 
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    url: endpoints.locationURL+"/countries",
  };

  try {

    const response = yield call(ApiCall, options);
    yield put(getCountryListSuccess(response.data));
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
    yield put(getCountryListFailed(message));
  }
}
function* CityList({payload:data}) {
  let value = data
  let options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    url: endpoints.locationURL+`/cities?metadata=true&country=${value.data}&sort=asc&limit=200`,
  };

  try {
  
    const response = yield call(ApiCall, options);
    yield put(getCityListSuccess(response.data));
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
    yield put(getCityListFailed(message));
  }
}

export function* watchLocationList(): any {
  yield takeEvery(LOCATION_LIST, LocationList);
}
export function* watchLocationDetails(): any {
  yield takeEvery(LOCATION_DETAILS, LocationDetails);
}
export function* watchCountryList(): any {
  yield takeEvery(COUNTRY_LIST, CountryList);
}
export function* watchCityList(): any {
  yield takeEvery(CITY_LIST, CityList);
}

function* locationSaga(): any {
  yield all([
    fork(watchLocationList),
    fork(watchLocationDetails),
    fork(watchCountryList),
    fork(watchCityList),
  ]);
}

export default locationSaga;
