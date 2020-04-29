import {
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
export const fetchDiseseDetailsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_DISEASE_DETAILS_SUCCESS,
    payload: json,
  };
};

export const fetchPestDetailsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_PEST_DETAILS_SUCCESS,
    payload: json,
  };
};

export const fetchPestDetails = cropId => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(`${CROPS}/${cropId}/${CATEGORIES}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch(fetchPestDetailsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchDiseaseDetails = cropId => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(`${CROPS}/${cropId}/${CATEGORIES}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch(fetchDiseseDetailsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchCropsDetails = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(CROPS, {
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

export const postFeedback = payload => {
  fetch(FEEDBACKS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(responsejson => {
      this.props.navigation.navigate('Farm Crops');
    })
    .catch(error => {});
};

export function getPreviewDetails(id) {
  return fetch(`${POSTS}/${id}?type=plain`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(function(error) {
      console.log(error);
    });
}
