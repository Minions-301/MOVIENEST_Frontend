import './MovieCard.css';
import axios from "axios";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import Movie from './Movie';
class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTowatchListState: [],
      movieList: [],
      isExist: true,
    }
  }

  
  //continue form here

  componentDidMount=()=> {
    if (this.props.auth0.isAuthenticated) {  this.getIsExist(this.props.movie); }

  }

  getIsExist = (movie) => {
    const isExist = this.props.movieList.find(item => item.movie_ID === JSON.stringify(movie.id));
   
    if (typeof isExist == 'undefined') {
      this.setState({ isExist: true })

    }

  }

  

  render() {
    // if (this.props.auth0.isAuthenticated) {
    //   this.getMovieList();
    // }
    return (
      <>


        <div className='movieCardContainer'>
          {this.props.movie && (
            <Card className='mainMovieCard'>
              <Link to={`movieProfile/${this.props.movie.id}`}>
              <Card.Img
                className='cardImg'
                variant="top"
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`}
              />

              <ListGroup className="list-group-flush">
                <ListGroupItem className="date"><Card.Body>
                  <Card.Title> {this.props.movie.title}</Card.Title>
                </Card.Body>
                  <br /><br /> <p className="vote"> {this.props.movie.release_date}</p>
                  <br /> <br /> <p className="vot">⭐{this.props.movie.vote_average}/10</p></ListGroupItem>
                {/* <ListGroupItem className = "vote">
                vote avg:{this.props.movie.vote_average}
              </ListGroupItem> */}
              </ListGroup>
              </Link>
              <Card.Body >

                
                {this.state.isExist&&this.props.auth0.isAuthenticated?

                  <div className="buttonCard">
                    <Button
                      class="btn"
                      onClick={() => {
                        this.props.addTowatchList(this.props.movie);
                      }}
                    >
                      {" "}

                      ➕  WATCH
                    </Button>
                    <Button
                      class="btn"
                      onClick={() => {
                        this.props.addMovieAsWatched(this.props.movie);
                      }}
                    >
                      {" "}
                      AS Watched
                    </Button>
                  </div> :
                  <div className="buttonCardDis">
                   { this.props.auth0.isAuthenticated && <h1 id='addedItem'>ADDED ITEM</h1>}
                  </div>}

              </Card.Body>
            </Card>
            //           <Image src={require(`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`)} style={{width: '100%', height: '100%'}}>
            //    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            //      <Text>Centered text</Text>
            //    </View>
            // </Image>
          )}


        </div>

      </>
    );
  }
}
export default withAuth0(MovieCard);
