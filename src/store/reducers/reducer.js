import * as ACTION_TYPES from '../actions/types';

const initialState = {
  cropsList: [],
  isLoading: false,
  errorMessage: '',
  selectedcropsList: {},
  cropCategories: [],
  StrawberryVegNews: [],
  PestsNews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCHING_INPROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPES.FETCHING_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.GET_PESTS_NEWS:
      return {
        ...state,
        isLoading: false,
        PestsNews: action.payload,
      };
    case ACTION_TYPES.GET_STRAWBERRY_VEG_NEWS:
      return {
        ...state,
        isLoading: false,
        StrawberryVegNews: action.payload,
      };
    case ACTION_TYPES.GET_VIDEOS:
      return {
        ...state,
        isLoading: false,
        VideosList: action.payload,
      };
    case ACTION_TYPES.GET_CROP_DETAILS:
      return {
        ...state,
        isLoading: false,
        cropsList: action.payload,
      };
    // case 'CROPS_LISTS':
    //   return {
    //     ...state,
    //     cropsList: action.payload,
    //   };
    // case 'SELECTED_CROP':
    //   return {
    //     ...state,
    //     selectedcropsList: action.payload,
    //   };
    // case 'CROPS_CATEGORIES':
    //   return {
    //     ...state,
    //     cropCategories: action.payload,
    //   };
    // case 'CROPS_VIDEOS':
    //   return {
    //     ...state,
    //     cropsVideos: action.payload,
    //   };
    // case 'STRAWBERRY_VEG_NEWS':
    //   return {
    //     ...state,
    //     strawBerryVegNews: action.payload,
    //   };
    // case 'STRAWBERRY_VEG_NEWS':
    //   return {
    //     ...state,
    //     strawBerryVegNews: action.payload,
    //   };
    // case 'PEST_NEWS':
    //   return {
    //     ...state,
    //     pestNews: action.payload,
    //   };

    default:
      return state;
  }
};

export default reducer;
