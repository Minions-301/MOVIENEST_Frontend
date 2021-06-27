import './App.css';
import Login from './login';
import Logout from './logout';
// import User from './user';

import MovieProfile from './MovieProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

import Movie from './Components/Movie';



function App() {
  return (
   <>

      <h1>
        Ready 
      </h1>
      <Login />
      <Logout />
      {/* <User /> */}



      <MovieProfile />

      

   </>
  );
}

export default App;
