import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movieSlice';
import themeReducer from '../features/themeSlice';



const store = configureStore({
  reducer: {
    movies: movieReducer,
    theme:themeReducer,
    


  },
});

export default store;
