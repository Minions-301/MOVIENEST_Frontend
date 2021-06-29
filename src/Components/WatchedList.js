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

    
          {this.props.movie && (
            <Card className='mainMovie'>
              <Link to={`movieProfile/${this.props.movie.movie_ID}`}>
                <Card.Img
                  className='cardIm'
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.moviePoster}`}
                />
                <ListGroup className="list-group-flus">
                  <ListGroupItem className="date"><Card.Body>
                  <Card.Title> {this.props.movie.title}</Card.Title>
                   
                     
                    </Card.Body>

                    <br /><br /> <p className="vote1">    {this.props.movie.release_date}</p>
                    <br /> <br /> <p className="vot1">⭐{this.props.movie.vote_average}/10</p></ListGroupItem>
                 
                </ListGroup>
             
                
                </Link>
              </Card>
            )}
         
      
      </>
        );
  }
}
        export default withAuth0(WatchedList);
