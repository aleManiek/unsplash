import { createSlice } from "@reduxjs/toolkit";

export const unsplashSlice = createSlice({
  name: "photos",
  initialState: {
    search: "",
    autocomplete: [],
    photos: [],
    current_photo: "",
    random_photo: "",
  },
  reducers: {
    SET_SEARCH: (state, action) => {
      state.search = action.payload;
    },
    CLEAR_AUTOCOMPLETE: (state) => {
      state.search = "";
      state.autocomplete = [];
    },
    SET_AUTOCOMPLETE: (state, action) => {
      state.autocomplete = action.payload;
    },
    SET_PHOTOS: (state, action) => {
      state.photos = action.payload;
    },
    SET_CURRENT_PHOTO: (state, action) => {
      state.current_photo = action.payload;
    },
    SET_RANDOM_PHOTO: (state, action) => {
      state.random_photo = action.payload;
    },
  },
});

export default unsplashSlice.reducer;

export const { SET_SEARCH, CLEAR_AUTOCOMPLETE, SET_AUTOCOMPLETE, SET_PHOTOS, SET_CURRENT_PHOTO, SET_RANDOM_PHOTO } = unsplashSlice.actions;

export const autocomplete = (query) => async (dispatch) => {
  const url = `/autocomplete/${query}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    data.sort((a, b) => a.priority > b.priority);
    const autocomplete = data.map((el) => el.query);
    dispatch(SET_AUTOCOMPLETE(autocomplete));
  } catch (err) {
    console.log(err);
  }
};

const fetchData = async (url) => {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

export const getPhotos = (query) => async (dispatch) => {
  const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=20`;
  const data = await fetchData(url);
  if (data) {
    dispatch(SET_PHOTOS(data.results));
    return true;
  }
  return false;
};

export const getPhoto = (id) => async (dispatch) => {
  const url = `https://api.unsplash.com/photos/${id}`;
  const data = await fetchData(url);
  if (data) {
    dispatch(SET_CURRENT_PHOTO(data));
    return true;
  }
  return false;
};

export const getRandomPhoto = () => async (dispatch) => {
  const url = `https://api.unsplash.com/photos/random`;
  const data = await fetchData(url);
  if (data) {
    dispatch(SET_RANDOM_PHOTO(data.urls.full));
    return true;
  }
  return false;
};
