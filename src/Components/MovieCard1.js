import './MovieCard1.css';
import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
// import{ Image  } from "react-bootstrap";

class MovieCard1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addTowatchListState : [],
    }
  }
  //continue form here
  addTowatchList = async (movie) => {
    const movieparam = {
      // movie_ID: movie.movie_ID,
      // title: movie.title,
      // overview: movie.overview,
      // email: this.props.auth0.user.email,
      // release_date: movie.release_date,
      // vote_average: movie.vote_average,
    }; try{
      console.log('try to send addTowatchListReq');
      const addTowatchListReq = await axios.post(
        `http://localhost:3010/movies`,
        movieparam
      );
      this.setState({
        addTowatchListState:addTowatchListReq.data,
      })
    } catch{
      console.log("Error in  addTowatchList Request");
    }
    

  };

  render() {
    return (
      <>
     <div className=''>
        {this.props.movie && (
       
<Card className = "movieCardContainer">
       
        
        <div class="container">
            
            
          <img src= {`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path} `}alt="Nature" />
          <div class="text-block">
              
              <h2>{this.props.movie.title}</h2>
            <h4>{this.props.movie.release_date}</h4>
            <p> votes avg :{this.props.movie.vote_average}/10</p>
          </div>
        </div>
        </Card>
       

        )}
        </div>
      </>
    );
  }
}
export default MovieCard1;
