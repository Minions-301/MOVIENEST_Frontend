import './MovieCard.css';
import axios from "axios";
import React from "react";
// import MovieProfile from './MovieProfile';
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

class MovieCard extends React.Component {
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
      <div className='movieCardContainer'>
        {this.props.movie && (
          <Card onClick={this.props.openMovieProfile} className='mainMovieCard'>
            <Card.Img
              className='cardImg'
              variant="top"
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`}
            />
            <Card.Body>
              <Card.Title> {this.props.movie.title}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem> {this.props.movie.release_date}</ListGroupItem>
              <ListGroupItem>
                vote avg:{this.props.movie.vote_average}
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button
                class="btn btn-primary"
                onClick={() => {
                  this.addTowatchList(this.props.movie);
                }}
              >
                {" "}
                ADD TO WATCH LIST
              </Button>
              <Button
                class="btn btn-primary"
                onClick={() => {
                  this.addTowatchList(this.props.movie);
                }}
              >
                {" "}
                AS Watched
              </Button>
            </Card.Body>
          </Card>
        )}
        </div>
      </>
    );
  }
}
export default MovieCard;
