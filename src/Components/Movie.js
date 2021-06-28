import './Movie.css';
import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from './Modal'

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: [],
      mostWatched: [],
      value: "",
      direct: false,
      category: "",
      query: "",
    };
  }

  componentDidMount() {
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
    this.getMostWatched();
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
    const url = `https://api.themoviedb.org/3/search/movie?query=${event.target.query.value}&api_key=98b1f578c2970f8efbe6ac02bd6a0cd4`;
    try {
      const results = await axios.get(url);

      this.setState({
        searchResult: results.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  openMovieProfile = () => {
    console.log('open movie profile');
    
  }
  render() {
    return (
      <>
        <h1>Most 5 Movies Watched</h1>
        <Modal />
        <Row className="justify-content-md-center">
          {this.state.mostWatched.map((item, idx) => (
            <Col md="auto">
              <MovieCard movie={item} key={idx} />
            </Col>
          ))}
        </Row>
        <Form onSubmit={this.getApiQuery}>
          <input
            className="input"
            name="query"
            placeholder="Search a film..."
          />
          <button type="submit" icon="search">
            Search
          </button>
        </Form>
        <select onChange={this.getApicategory}>
          <option value="35">comedy</option>
          <option value="18">drama</option>
          <option value="28">action</option>
          <option value="16">animation</option>
          <option value="80">crime</option>
        </select>

        <Row className="justify-content-md-center">
          {this.state.searchResult.map((item, idx) => (
            <Col md="auto">
              <MovieCard openMovieProfile={this.openMovieProfile} movie={item} key={idx} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
export default Movie;
