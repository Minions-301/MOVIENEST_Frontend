import React from 'react';
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
// import './MovieCard.css';

//import 'bootstrap/dist/css/bootstrap.min.css';

class MovieCard extends React.Component {

  render() {
    return (
      <>


        {(this.props.movie) &&
         

          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`}  style={{width:100}}/>
            <Card.Body>
              <Card.Title> {this.props.movie.title}</Card.Title>
              <Card.Text>
              {this.props.movie.overview}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem> {this.props.movie.release_date}</ListGroupItem>
              <ListGroupItem>vote avg:{this.props.movie.vote_average}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button> <a href="#" class="btn btn-primary">ADD TO WATCH LIST</a></Button>
              <Button ><a href="#" class="btn btn-primary"> AS Watched</a></Button>
            </Card.Body>
          </Card>


     }

            </>

    );
  }
}
export default MovieCard;


