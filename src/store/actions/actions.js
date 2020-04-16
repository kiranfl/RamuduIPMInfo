import {
  BASE_URL,
  CROPS,
  CATEGORIES,
  POSTS,
  VIDEOS,
  FEEDBACKS,
  STRAWBERRY_VEG_NEWS,
  PEST_NEWS,
} from '../constants/constants';
import * as ACTION_TYPES from './types';

export const fetchingInProgress = () => {
  return {
    type: ACTION_TYPES.FETCHING_INPROGRESS,
  };
};

export const fetchingFailure = error => {
  return {
    type: ACTION_TYPES.FETCHING_FAILURE,
    payload: error,
  };
};

export const fetchPestsNewsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_PESTS_NEWS,
    payload: json,
  };
};

export const fetchStrawberryVegNewsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_STRAWBERRY_VEG_NEWS,
    payload: json,
  };
};
export const fetchVideosSuccess = json => {
  return {
    type: ACTION_TYPES.GET_VIDEOS,
    payload: json,
  };
};

export const fetchCropsDetailsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_CROP_DETAILS,
    payload: json,
  };
};

export const fetchCropsDetails = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch('http://23.20.169.44/api/en-us/crops', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let formatdata = [];
        for (let i = 0; i < responseJson.length; i++) {
          let obj = responseJson[i];
          obj.selected = false;
          formatdata.push(obj);
        }
        dispatch(fetchCropsDetailsSuccess(formatdata));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchVideos = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(VIDEOS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchVideosSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchStrawberryVegNews = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(STRAWBERRY_VEG_NEWS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchStrawberryVegNewsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchPestsNews = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(PEST_NEWS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchPestsNewsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};
