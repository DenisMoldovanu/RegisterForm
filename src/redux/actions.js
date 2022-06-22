import Cookies from "js-cookie";
import update from "immutability-helper";

export const getCountries = (state, { data }) => {
  return update(state, { countries: { $set: data } });
};

export const getRegions = (state, { data }) => {
  return update(state, { regions: { $set: data } });
};

export const getCities = (state, { data }) => {
  return update(state, { cities: { $set: data } });
};

export const getUser = (state, { data }) => {
  return update(state, { user: { $set: data } });
};

export const updateUserPassword = (state, { data }) => {
  return update(state, { user: { $set: data } });
};

export const resetPassword = (state, { data }) => {
  return update(state, { user: { $set: data } });
};
export const getAds = (state, { data }) => {
  return update(state, {
    ads: { $set: data },
    current_page: { $set: data.current_page },
    links: { $set: data.links },
  });
};

export const updateUserProfile = (state, { data }) => {
  return update(state, { user: { $set: data } });
};

export const getCategories = (state, { data }) => {
  return update(state, { categories: { $set: data } });
};

export const postAdToArchive = (state, { data }) => {
  return state;
};

export const activateAd = (state, { data }) => {
  return state;
};

export const deactivateAd = (state, { data }) => {
  return state;
};

export const deleteAd = (state, { data }) => {
  return state;
};

export const setUser = (state, { data }) => {
  return update(state, { token: { $set: data.s_token } });
};

export const authenticate = (state, { data }) => {
  for (let i = 0; i < data.cookies.length; i++) {
    Cookies.set(data.cookies[i].name, data.cookies[i].value, { path: "/", expires: 30 });
  }

  return update(state, { user: { $set: data } });
};

export const clearAuthenticate = (state, initialState) => {
  let allCookie = Cookies.get();
  let cookies = Object.keys(allCookie);
  for (let i = 0; i < cookies.length; i++) {
    Cookies.remove(cookies[i]);
  }

  return { ...initialState };
};

export const logOut = (state, initialState) => {
  let allCookie = Cookies.get();
  let cookies = Object.keys(allCookie);
  for (let i = 0; i < cookies.length; i++) {
    Cookies.remove(cookies[i]);
  }

  const domain = window.location.origin;
  window.location.href = domain + "/benutzer/logout";
  return { ...initialState };
};
