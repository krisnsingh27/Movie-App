// import React, { useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/MovieSearch'
// import Login from './pages/LoginPage'; 
// import Signup from './pages/SignupPage';
// import ProtectedRoute from './components/ProtectedRoute'; 
// import Navbar from './components/Navbar';
// import MovieSearch from './pages/MovieSearch';
// import Profile from './pages/Profile';
// import HomePage from './pages/HomePage';
// import NotFound from './pages/NotFound';
// import MovieDetails from './pages/MovieDetails';
// import Footer from './pages/Footer';
// import { useSelector } from 'react-redux';
// // import { toggleTheme } from './features/themeSlice';


// function App() {

//   const theme=useSelector((state)=>state.theme.theme);
  
   
//   return (
//     <div className={`app-container ${theme}`}>
      
//       <Router>
//         <Navbar/>
         
//           <Routes>
//              <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<HomePage />} />
//             </Route>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="/movie/:movieId" element={<MovieDetails />} />

//               <Route element={<ProtectedRoute />}>
//               <Route path="/movie" element={<MovieSearch />} />
              
              
//             </Route>
//             <Route element={<ProtectedRoute />}>
//             <Route path="/profile" element={<Profile />} />
//             </Route>
//           </Routes>

//           <Footer/>
//         </Router>


        

//     </div>
//   )
// }

// export default App


import React, { useLayoutEffect } from 'react'; // useLayoutEffect is better than useEffect for DOM updates
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import MovieSearch from './pages/MovieSearch';
import Profile from './pages/Profile';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const theme = useSelector((state) => state.theme.theme);

  
  useLayoutEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/movie" element={<MovieSearch />} />
            
        </Route>
        <Route element={<ProtectedRoute />}>
          
          <Route path="/profile" element={<Profile />} />
        </Route>
        
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
