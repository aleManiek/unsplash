import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./unsplashSlice";

export default configureStore({
  reducer: {
    photo: photoReducer,
  },
});
