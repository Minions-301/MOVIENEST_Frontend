import "./MovieProfile.css";
import React, { Component } from "react";
import axios from "axios";
import Review from "./Review";

class MovieProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      test: [],
      cast: [],
      trailer: "",
    };
  }
  componentDidMount = async () => {
    try {
      const dataReq = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=98b1f578c2970f8efbe6ac02bd6a0cd4&language=en-US`
      );
      const castReq = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=98b1f578c2970f8efbe6ac02bd6a0cd4`
      );
      const trailerReq = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=98b1f578c2970f8efbe6ac02bd6a0cd4&language=en-US`
      );
      this.setState({
        data: dataReq.data,
        test: dataReq.data.genres,
        cast: castReq.data.cast.slice(0, 3),
        trailer: trailerReq.data.results[0].key,
      });
      console.log(this.state.test);
    } catch {
      console.log("can not send the request");
    }
  };

  render() {
   
    return (
      <div style={{position:'relative',padding:'30px'}}>
       
        <div className="container">
          <div className="movieProfileCard">
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${this.state.data.poster_path}`}
              alt="poster"
            />
            
            <div className='movieProfileInformation' >
              <div style={{display:'flex',gap:'10px',fontSize:'35px'}}>
            <h1>{this.state.data.title}</h1>
            <h2>({this.state.data.release_date})</h2>
            </div>
              <div className='type'>
              
              <p>Type: </p>
              {this.state.test.map((item) => {
                return <p>{item.name}</p>;
              })}
              </div>
              <p >Overview: {this.state.data.overview}</p>
              <p>Vote: {this.state.data.vote_average} %</p>
              <div className="cast">
                <p>Cast: </p>
                {this.state.cast.map((item) => {
                  return (
                    <>
                      <p> {item.name} </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Review movie_ID={this.props.match.params.id} title={this.state.data.title} release_date={this.state.data.release_date}/>
      </div>
    );
  }
}

export default MovieProfile;
