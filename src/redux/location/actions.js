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
} from "./constants";

type LocationAction = { type: string, payload: {} | string };

export const getLocationList = (data:{}): LocationAction => ({
  type: LOCATION_LIST,
  payload: data,
});

export const getLocationListSuccess = (location: string): LocationAction => ({
  type: LOCATION_LIST_SUCCESS,
  payload: location,
});

export const getLocationListFailed = (error: string): LocationAction => ({
  type: LOCATION_LIST_FAILED,
  payload: error,
});
export const getLocationDetails = (data:{}): LocationAction => ({
  type: LOCATION_DETAILS,
  payload: data,
});

export const getLocationDetailsSuccess = (locationDetails: string): LocationAction => ({
  type: LOCATION_DETAILS_SUCCESS,
  payload: locationDetails,
});

export const getLocationDetailsFailed = (error: string): LocationAction => ({
  type: LOCATION_DETAILS_FAILED,
  payload: error,
});

export const getCountryList = (): LocationAction => ({
  type: COUNTRY_LIST,
  payload: {},
});

export const getCountryListSuccess = (country: string): LocationAction => ({
  type: COUNTRY_LIST_SUCCESS,
  payload: country,
});

export const getCountryListFailed = (error: string): LocationAction => ({
  type: COUNTRY_LIST_FAILED,
  payload: error,
});

export const getCityList = (data: {}): LocationAction => ({
  type: CITY_LIST,
  payload: data,
});

export const getCityListSuccess = (city: string): LocationAction => ({
  type: CITY_LIST_SUCCESS,
  payload: city,
});

export const getCityListFailed = (error: string): LocationAction => ({
  type: CITY_LIST_FAILED,
  payload: error,
});
