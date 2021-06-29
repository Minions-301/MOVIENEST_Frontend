import './WatchList.css';
import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
class WatchedList extends React.Component {


  render() {
    return (
      <>
          <div className='movieCardContainer'>
            {this.props.movie && (
              <Card className='mainMovieCard'>
                        <Link to={`movieProfile/${this.props.movie.movie_ID}`}>
                <Card.Img
                  className='cardImg'
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.moviePoster}`}
                />
                <ListGroup className="list-group-flush">
                <ListGroupItem className ="date"><Card.Body>
                  <Card.Title> {this.props.movie.title}</Card.Title>
                  
                  </Card.Body>
                <br/><br/> <p className = "vote">   {this.props.movie.release_date}</p>

                <br/> <br/> <p className = "vot">⭐{this.props.movie.vote_average}/10</p>
                </ListGroupItem>
                
                  {/* <ListGroupItem>
                  </ListGroupItem> */}
                </ListGroup>
                </Link>
                <Card.Body>
                <div className = "buttonCard">
                  <Button
                    class="btn"
                    onClick={() => {
                      this.props.deleteMovieFromWatchList(this.props.movie._id);
                    }}
                  >
                    {" "}
                    DELETE
                  </Button>
                  <Button
                    class="btn "
                    onClick={() => { this.props.moveFromWatchListToWatched(this.props.movie._id) }}
                  >
                    {" "}
                    AS Watched
                  </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
      </>
    );
  }
}
export default withAuth0(WatchedList);
