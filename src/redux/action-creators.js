import { types } from "./action-types";
import { routes } from "./routes";
import Cookies from "js-cookie";

export const getCountries = () => {
  return {
    type: types.GET_COUNTRIES,
    payload: {
      request: {
        url: routes.GET_COUNTRIES,
        method: "GET",
      },
    },
  };
};

export const getUser = () => {
  const userId = Cookies.get("userId");
  return {
    type: types.GET_USER,
    payload: {
      request: {
        url: routes.GET_USER + `/${userId}`,
        method: "GET",
      },
    },
  };
};

export const updateUserPassword = data => {
  const userId = Cookies.get("userId");
  return {
    type: types.UPDATE_USER_PASSWORD,
    payload: {
      request: {
        url: routes.POST_USER + `/${userId}/password`,
        method: "POST",
        data,
      },
    },
  };
};

export const updateUserProfile = data => {
  const userId = Cookies.get("userId");
  return {
    type: types.UPDATE_USER_PROFILE,
    payload: {
      request: {
        url: routes.PUT_USER + `/${userId}`,
        method: "PUT",
        data,
      },
    },
  };
};

export const getAds = params => {
  return {
    type: types.GET_ADS,
    payload: {
      request: {
        url: routes.GET_ADS,
        method: "GET",
        params: params,
      },
    },
  };
};

export const getRegions = countryCode => {
  return {
    type: types.GET_REGIONS,
    payload: {
      request: {
        url: routes.GET_REGIONS + `/${countryCode}`,
        method: "GET",
      },
    },
  };
};

export const getCities = regionId => {
  return {
    type: types.GET_CITIES,
    payload: {
      request: {
        url: routes.GET_CITIES + `/${regionId}`,
        metod: "GET",
      },
    },
  };
};

export const getCategories = () => {
  return {
    type: types.GET_CATEGORIES,
    payload: {
      request: {
        url: routes.GET_CATEGORIES,
        method: "GET",
      },
    },
  };
};

export const archiveAd = (id, data) => {
  return {
    type: types.POST_AD_TO_ARCHIVE,
    payload: {
      request: {
        url: routes.POST_ADS + `/${id}` + "/archive",
        method: "POST",
        data,
      },
    },
  };
};

export const activateAd = (id, data) => {
  return {
    type: types.ACTIVATE_AD,
    payload: {
      request: {
        url: routes.POST_ADS + `/${id}` + "/activate",
        method: "POST",
        data,
      },
    },
  };
};

export const deactivateAd = (id, data) => {
  return {
    type: types.DEACTIVATE_AD,
    payload: {
      request: {
        url: routes.POST_ADS + `/${id}` + "/deactivate",
        method: "POST",
        data,
      },
    },
  };
};

export const deleteAd = id => {
  return {
    type: types.DELETE_AD,
    payload: {
      request: {
        url: routes.DELETE_ADS + `/${id}`,
        method: "DELETE",
      },
    },
  };
};

export const clearAuhenticate = () => {
  return {
    type: types.CLEAR_AUTHENTICATE,
    payload: {},
  };
};

export const logOut = () => {
  return {
    type: types.LOG_OUT,
    payload: {},
  };
};

export const setUser = data => {
  return {
    type: types.SET_USER,
    payload: {
      request: {
        url: routes.SET_USER_LINK,
        method: "POST",
        data,
      },
    },
  };
};

export const authenticate = data => {
  return {
    type: types.LOG_IN_USER,
    payload: {
      request: {
        url: routes.SET_LOGIN_USER_LINK,
        method: "POST",
        data,
      },
    },
  };
};

export const sendResetEmail = data => {
  return {
    type: types.SEND_RESET_EMAIL,
    payload: {
      request: {
        url: routes.SEND_RESET_EMAIL_LINK,
        method: "POST",
        data,
      },
    },
  };
};

export const resetPassword = (token, data) => {
  return {
    type: types.RESET_PASSWORD,
    payload: {
      request: {
        url: routes.RESET_PASSWORD_LINK + `/${token}`,
        method: "POST",
        data,
      },
    },
  };
};
