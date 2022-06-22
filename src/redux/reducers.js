import { types } from "./action-types";
import * as action from "./actions";

const initialState = {
  countries: [],
  user: {},
  ads: {},
  regions: [],
  cities: [],
  categories: [],
  current_page: 1,
  links: [],
  auth: false,
  token: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_COUNTRIES_SUCCESS:
      return action.getCountries(state, payload);

    case types.GET_USER_SUCCESS:
      return action.getUser(state, payload);

    case types.SET_USER_SUCCESS:
      return action.setUser(state, payload);

    case types.LOG_IN_USER_SUCCESS:
      return action.authenticate(state, payload);

    case types.UPDATE_USER_PASSWORD_SUCCESS:
      return action.updateUserPassword(state, payload);

    case types.RESET_PASSWORD_SUCCESS:
      return action.resetPassword(state, payload);

    case types.GET_ADS_SUCCESS:
      return action.getAds(state, payload);

    case types.UPDATE_USER_PROFILE_SUCCESS:
      return action.updateUserProfile(state, payload);

    case types.GET_REGIONS_SUCCESS:
      return action.getRegions(state, payload);

    case types.GET_CITIES_SUCCESS:
      return action.getCities(state, payload);

    case types.GET_CATEGORIES_SUCCESS:
      return action.getCategories(state, payload);

    case types.POST_AD_TO_ARCHIVE_SUCCESS:
      return action.postAdToArchive(state, payload);

    case types.ACTIVATE_AD_SUCCESS:
      return action.activateAd(state, payload);

    case types.DEACTIVATE_AD_SUCCESS:
      return action.deactivateAd(state, payload);

    case types.DELETE_AD_SUCCESS:
      return action.deleteAd(state, payload);

    case types.CLEAR_AUTHENTICATE:
      return action.clearAuthenticate(state, initialState);

    case types.LOG_OUT:
      return action.logOut(state, initialState);

    default:
      return state;
  }
};
