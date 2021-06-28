import './MovieCard.css';
import axios from "axios";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTowatchListState: [],
    }
  }
  //continue form here
  addTowatchList = async (movie) => {
    console.log(movie);
    console.log(this.props.auth0.user.email);
    if (this.props.auth0.isAuthenticated) {
      const movieparam = {
        movie_ID: movie.id,
        title: movie.title,
        overview: movie.overview,
        moviePoster: movie.poster_path,
        email: this.props.auth0.user.email,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }; try {
        console.log(movieparam);
        const addTowatchListReq = await axios.post(`${process.env.REACT_APP_SERVER}/movies`, movieparam);
        this.setState({
          addTowatchListState: addTowatchListReq.data,
        })
      } catch {
        console.log("Error in  addTowatchList Request");
      }
    } else {
      console.log('please sign in');
    }


  }
  addMovieAsWatched = async (movie) => {
    if (this.props.auth0.isAuthenticated) {
      const movieparam = {
        movie_ID: movie.id,
        title: movie.title,
        overview: movie.overview,
        moviePoster: movie.poster_path,
        email: this.props.auth0.user.email,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }; try {
        console.log('try to send addTowatchListReq');
        const addTowatchListReq = await axios.post(`${process.env.REACT_APP_SERVER}/moviesWatched`, movieparam);
        this.setState({
          addTowatchListState: addTowatchListReq.data,
        })
      } catch {
        console.log("Error in  addTowatchList Request");
      }
    } else {
      console.log('please sign in');
    }


  }

  render() {
    return (
      <>
     
          <div to={`movie/${this.props.movie.id}`} className='movieCardContainer'>
            {this.props.movie && (
              <Card className='mainMovieCard'>
                   <Link to={`movieProfile/${this.props.movie.id}`}>
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
                </Link>
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
                      this.addMovieAsWatched(this.props.movie);
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
export default withAuth0(MovieCard);
