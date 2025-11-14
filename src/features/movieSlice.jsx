// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_KEY = '3a125f13';


// export const fetchMovies = createAsyncThunk(
//   'movies/fetchMovies',
//   async (query, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
//       if (response.data.Search) {
//         localStorage.setItem('movies', JSON.stringify(response.data.Search));
//         return response.data.Search;
//       } else {
//         return rejectWithValue('No movies found');
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const movieSlice = createSlice({
//   name: 'movies',
//   initialState: {
//     movies: JSON.parse(localStorage.getItem('movies')) || [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMovies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.movies = action.payload;
//       })
//       .addCase(fetchMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.movies = [];
//         state.error = action.payload;
//       });
//   },
// });

// export default movieSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ce36f814';


export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query, { rejectWithValue }) => {
    try {
      const searchRes = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);

      if (searchRes.data.Response !== 'True') {
        return rejectWithValue('No movies found');
      }

   
      const detailPromises = searchRes.data.Search.map((m) =>
        axios.get(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=${API_KEY}`)
      );

      const detailResults = await Promise.all(detailPromises);
      let allMovies = detailResults
        .filter((res) => res.data && res.data.Response === 'True')
        .map((res) => res.data);

      
      const uniqueMovies = allMovies.filter(
        (movie, index, self) =>
          index === self.findIndex(
            (m) => m.imdbID === movie.imdbID || m.Poster === movie.Poster
          )
      );

      return uniqueMovies;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    filteredMovies: [],
    loading: false,
    error: null,
    selectedGenre: 'All',
  },
  reducers: {
    setGenreFilter: (state, action) => {
      state.selectedGenre = action.payload;
      const genre = action.payload.toLowerCase();
      const allowedGenres = ['horror', 'crime', 'action', 'adventure'];

      if (genre === 'all') {
        state.filteredMovies = state.movies;
      } else if (allowedGenres.includes(genre)) {
        state.filteredMovies = state.movies.filter(
          (movie) =>
            movie.Genre && movie.Genre.toLowerCase().includes(genre)
        );
      } else {
        state.filteredMovies = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;

        
        if (state.selectedGenre === 'All') {
          state.filteredMovies = action.payload;
        } else {
          const genre = state.selectedGenre.toLowerCase();
          state.filteredMovies = action.payload.filter(
            (movie) =>
              movie.Genre && movie.Genre.toLowerCase().includes(genre)
          );
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.filteredMovies = [];
        state.error = action.payload;
      });
  },
});

export const { setGenreFilter } = movieSlice.actions;
export default movieSlice.reducer;
