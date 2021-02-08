import { createSlice } from "@reduxjs/toolkit";

export const unsplashSlice = createSlice({
  name: "photos",
  initialState: {
    search: "",
    autocomplete: [],
    photos: [],
    current_photo: "",
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
  },
});

export default unsplashSlice.reducer;

export const { SET_SEARCH, CLEAR_AUTOCOMPLETE, SET_AUTOCOMPLETE, SET_PHOTOS, SET_CURRENT_PHOTO } = unsplashSlice.actions;

export const autocomplete = (query) => async (dispatch) => {
  const url = `http://localhost:5000/autocomplete/${query}`;
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

export const getPhotos = (query) => async (dispatch) => {
  const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=20`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      dispatch(SET_PHOTOS(data.results));
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};

export const getPhoto = (id) => async (dispatch) => {
  const url = `https://api.unsplash.com/photos/${id}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      dispatch(SET_CURRENT_PHOTO(data));
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
