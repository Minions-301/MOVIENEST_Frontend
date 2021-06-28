import './MovieCard.css';
import axios from "axios";
import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
// import{ Image  } from "react-bootstrap";

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
          <Card className='mainMovieCard'>
            <Card.Img
              className='cardImg'
              variant="top"
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.props.movie.poster_path}`}
            />
            
            <ListGroup className="list-group-flush">
              <ListGroupItem className ="date"><Card.Body>
              <Card.Title> {this.props.movie.title}</Card.Title>
            </Card.Body>
            <br/><br/> <p> {this.props.movie.release_date}</p>
            <br/> <p className = "vot">votes avg :{this.props.movie.vote_average}/10</p></ListGroupItem>
              {/* <ListGroupItem className = "vote">
                vote avg:{this.props.movie.vote_average}
              </ListGroupItem> */}
            </ListGroup>
            <Card.Body >
              <div className = "buttonCard">
              <Button
                class="btn"
                onClick={() => {
                  this.addTowatchList(this.props.movie);
                }}
              >
                {" "}
                
                ADD TO WATCH LIST
              </Button>
              <Button
                class="btn"
                onClick={() => {
                  this.addTowatchList(this.props.movie);
                }}
              >
                {" "}
                AS Watched
              </Button>
              </div>
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
export default MovieCard;
