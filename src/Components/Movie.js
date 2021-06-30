import './Movie.css';
import React from "react";
import axios from "axios";
// import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import MovieCard1 from "./MovieCard";
import { withAuth0 } from '@auth0/auth0-react';


class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: [],
      mostWatched: [],
      value: "",
      direct: false,
      category: "",
      query: '',
      addTowatchListState: [],
      movieList: [],
    };
  }
  addTowatchList = async (movie) => {


    const isExist = this.state.movieList.find(item => item.movie_ID === JSON.stringify(movie.id));


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


  addMovieAsWatched = async (movie) => {

    const isExist = this.state.movieList.find(item => item.movie_ID === JSON.stringify(movie.id));


    if (this.props.auth0.isAuthenticated) {

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

  getMovieList = async () => {
    try {
      const movieList = await axios.get(`${process.env.REACT_APP_SERVER}/list?email=${this.props.auth0.user.email}`)
      await this.setState({
        movieList: movieList.data,
      })
    } catch {
      console.log("Error in reviews Request");
    }
  }
  componentDidMount() {
    if (this.props.auth0.isAuthenticated) { this.getMovieList(); }
    const url = ` https://api.themoviedb.org/3/movie/top_rated?api_key=98b1f578c2970f8efbe6ac02bd6a0cd4&language=en-US&page=1`;
    console.log(url);
    axios
      .get(url)
      .then((info) => {
        this.setState({
          searchResult: info.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // this.getMostWatched();
  }
  getMostWatched = async () => {
    try {
      const mostWatched = await axios.get(
        `${process.env.REACT_APP_SERVER}/mostWatched`
      );
      this.setState({
        mostWatched: mostWatched,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getApicategory = async (event) => {
    event.preventDefault();
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=98b1f578c2970f8efbe6ac02bd6a0cd4&with_genres=${event.target.value}`;
    try {
      const results = await axios.get(url);

      this.setState({
        searchResult: results.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getApiQuery = async (event) => {
    event.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?query=${this.state.query}&api_key=98b1f578c2970f8efbe6ac02bd6a0cd4`;
    try {
      const results = await axios.get(url);

      this.setState({
        searchResult: results.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
  searchtext = (e) => {
    this.setState({
      query: e.target.value
    })


  }
  render() {
    if (this.props.auth0.isAuthenticated) {
      this.getMovieList();
    }
    return (
      <>
        <div id="search" className="Search">
          <input onKeyUp={this.getApiQuery} onChange={this.searchtext} type="search" placeholder="Search for a title..." value={this.state.searchTerm} />
        </div>

        <select className="choose" onChange={this.getApicategory}>

          <option value="" disabled selected>SELECT OPTION</option>
          <option value="35">COMEDY</option>
          <option value="18">DRAMA</option>
          <option value="28">ACTION</option>
          <option value="16">ANIMATION</option>
          <option value="80">CRIME</option>

        </select>

        <Row className="justify-content-md-center">
          {this.state.mostWatched.map((item, idx) => (
            <Col md="auto">
              <MovieCard1 movie={item} key={idx} />
            </Col>
          ))}
        </Row>
        <Form onSubmit={this.getApiQuery}>


          <Row className="justify-content-md-center">
            {this.state.searchResult.map((item, idx) => (
              <Col md="auto">
                <MovieCard1 addMovieAsWatched={this.addMovieAsWatched}addTowatchList={this.addTowatchList} movieList={this.state.movieList} movie={item} key={idx} />
              </Col>
            ))}
          </Row>
        </Form>
      </>
    );
  }
}
export default withAuth0(Movie);
