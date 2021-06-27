import React from 'react';
import {Card,ListGroup,ListGroupItem,Button} from 'react-bootstrap';


class MovieCard extends React.Component {


  //continue form here
  addTowatchList=async(movie)=> {
    const movieparam = {
      movie_ID: movie.movie_ID,
      title: movie.title,
      overview: movie.overview,
      email: this.props.auth0.user.email,
      release_date:movie.release_date,
      vote_average:movie.vote_average
    };

  }


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
              <Button class="btn btn-primary" onClick={()=>{this.addTowatchList(this.props.movie)}}> ADD TO WATCH LIST</Button>
              <Button  class="btn btn-primary" onClick={()=>{this.addTowatchList(this.props.movie)}}> AS Watched</Button>
            </Card.Body>
          </Card>


     }

            </>

    );
  }
}
export default MovieCard;


