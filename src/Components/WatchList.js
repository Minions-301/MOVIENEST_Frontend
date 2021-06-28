import './MovieCard.css';
import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
class WatchedList extends React.Component {


  render() {
    return (
      <>
        <Link to={`movieProfile/${this.props.movie.movie_ID||0}`}>
          <div className='movieCardContainer'>
            {this.props.movie && (
              <Card className='mainMovieCard'>
                <Card.Img
                  className='cardImg'
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.moviePoster}`}
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
                      this.props.deleteMovieFromWatchList(this.props.movie._id);
                    }}
                  >
                    {" "}
                    DELETE
                  </Button>
                  <Button
                    class="btn btn-primary"
                    onClick={() => { this.props.moveFromWatchListToWatched(this.props.movie._id) }}
                  >
                    {" "}
                    AS Watched
                  </Button>
                </Card.Body>
              </Card>
            )}
          </div>
        </Link>
      </>
    );
  }
}
export default withAuth0(WatchedList);
