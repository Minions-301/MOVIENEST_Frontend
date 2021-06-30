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
      movieList: [],
      isExist:false,
    }
  }

  getIsExist=(movie)=>{
    console.log(movie);
    console.log("movie list",this.state.movieList);
    const isExist = this.state.movieList.find(item => item.movie_ID == movie.id);
    console.log(typeof isExist);

    if (typeof isExist == 'undefined') {
      this.setState({isExist:true})
    
    }

  }
  //continue form here
  addTowatchList = async (movie) => {
    console.log(movie.id);
    const isExist = this.state.movieList.find(item => item.movie_ID == movie.id);
    console.log(typeof isExist);

    if (this.props.auth0.isAuthenticated) {
      //console.log(typeof isExist == 'undefined');
      if (typeof isExist == 'undefined') {
        

        const movieparam = {
          movie_ID: movie.id,
          title: movie.title,
          overview: movie.overview,
          moviePoster: movie.poster_path,
          email: this.props.auth0.user.email,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        }; try {

          const addTowatchListReq = await axios.post(`${process.env.REACT_APP_SERVER}/movies`, movieparam);
          this.setState({
            addTowatchListState: addTowatchListReq.data,
          })
        } catch {
          console.log("Error in  addTowatchList Request");
        }
      }
      else { console.log('is alredy Added'); }
    } else {
      console.log('please sign in');
    }

    this.getMovieList();
  }
  componentDidMount() { if (this.props.auth0.isAuthenticated) {this.getMovieList();}
  
 }

  getMovieList = async () => {
    try {
      const movieList = await axios.get(`${process.env.REACT_APP_SERVER}/list?email=${this.props.auth0.user.email}`)
      this.setState({
        movieList: movieList.data,
      })
    } catch {
      console.log("Error in reviews Request");
    }
    this.getIsExist(this.props.movie);
  }

  addMovieAsWatched = async (movie) => {
    console.log(movie.id);
    const isExist = this.state.movieList.find(item => item.movie_ID == movie.id);
    console.log(typeof isExist);

    if (this.props.auth0.isAuthenticated) {
      //console.log(typeof isExist == 'undefined');
      if (typeof isExist == 'undefined') {
   
      const movieparam = {
        movie_ID: movie.id,
        title: movie.title,
        overview: movie.overview,
        moviePoster: movie.poster_path,
        email: this.props.auth0.user.email,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      }; try {
        
        const addTowatchListReq = await axios.post(`${process.env.REACT_APP_SERVER}/moviesWatched`, movieparam);
        this.setState({
          addTowatchListState: addTowatchListReq.data,
        })
      } catch {
        console.log("Error in  addTowatchList Request");
      }
    }
    else { console.log('is alredy Added'); }
  } else {
    console.log('please sign in');
  }
  this.getMovieList();

  }

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
            <br/><br/> <p className = "vote"> {this.props.movie.release_date}</p>
           <br/> <br/> <p className = "vot">⭐{this.props.movie.vote_average}/10</p></ListGroupItem>
              {/* <ListGroupItem className = "vote">
                vote avg:{this.props.movie.vote_average}
              </ListGroupItem> */}
            </ListGroup>
            <Card.Body >
             
                {console.log(this.state.isExist)}
                {this.state.isExist?
                  
                  <div className = "buttonCard">
              <Button
                class="btn"
                onClick={() => {
                  this.addTowatchList(this.props.movie);
                }}
              >
                {" "}
                
               ➕  WATCH  
              </Button>
              <Button
                class="btn"
                onClick={() => {
                  this.addMovieAsWatched(this.props.movie);
                }}
              >
                {" "}
                AS Watched
              </Button>
              </div>:
                      <>
                      <Button
                      
                        class="btndis"
                        onClick={() => {
                          this.addTowatchList(this.props.movie);
                        }}
                      >
                        {" "}
                        
                       ➕  WATCH  
                      </Button>
                      <Button
                     
                        class="btn1"
                        onClick={() => {
                          this.addMovieAsWatched(this.props.movie);
                        }}
                      >
                        {" "}
                        AS Watched
                      </Button>
                      </>}
              
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
