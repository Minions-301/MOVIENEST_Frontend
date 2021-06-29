import './WatchedList.css';
import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
class WatchedList extends React.Component {


  render() {
    return (
      <>
      {console.log(this.props.movie.movie_ID)}
       
          <div className='movieCardContainer'>
            {this.props.movie && (
              <Card className='mainMovieCard'>
                 <Link to={`movieProfile/${this.props.movie.movie_ID}`}>
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
                </Card.Body>
                </Link>
              </Card>
            )}
          </div>
      
      </>
    );
  }
}
export default withAuth0(WatchedList);
