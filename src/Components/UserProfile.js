import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Row, Col } from 'react-bootstrap';
import WatchedList from './WatchedList';
import WatchList from './WatchList'
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchedList: [],
            watchList: [],

        };
    }
    // addMovieToWatchList=async(movie)=>{
    //     const  req= {
    //         movie_ID: movie.movie_ID,
    //         email: this.props.auth0.user.email,
    //         title:movie.title,
    //         overview:movie.overview, 
    //         release_date:movie.release_date,
    //         vote_average:movie.vote_average
    //     };
    //     try {
    //         const watchList = await axios.post(`${process.env.REACT_APP_SERVER}/movies`,req);
    //       this.setState({
    //           watchList:watchList
    //       })

    //     } catch(err) {
    //         console.log(err);
    //     }

    // }
    moveFromWatchListToWatched = async (id) => {
        console.log(id);
        const  query= {
            email: this.props.auth0.user.email,
            id:id
        };
        
        try {
            const watchList = await axios.put(`${process.env.REACT_APP_SERVER}/watchList`,query);
            console.log(process.env.REACT_APP_SERVER);

            console.log(watchList);
          this.getWatchedList();
          this.getWatchList();

        } catch(err) {
            console.log(err);
        }
    }
    deleteMovieFromWatchList=async(id)=>{
        console.log(id,this.props.auth0.user.email);
        const  query = {
            email: this.props.auth0.user.email
        };
        console.log(query);
        try {
            const watchList = await axios.delete(`${process.env.REACT_APP_SERVER}/watchList/${id}`,{ params:query});
           console.log(watchList);
           this.getWatchedList();
           this.getWatchList();
 
        } catch(err) {
            console.log(err);
        }
    }
   
   
    componentDidMount() {
    this.getWatchList();
    this.getWatchedList();
  

}

    getWatchedList = async () => {
        try {
            const watchedList = await axios.get(`${process.env.REACT_APP_SERVER}/watchedList?email=${this.props.auth0.user.email}`)
            console.log(watchedList.data);
            this.setState({
                watchedList: watchedList.data,
            })
        } catch {
            console.log("Error in reviews Request");
        }

    }
    getWatchList = async () => {
        try {
            const watchList = await axios.get(`${process.env.REACT_APP_SERVER}/watchList?email=${this.props.auth0.user.email}`)
            console.log(watchList.data);
            this.setState({
                watchList: watchList.data,
            })
        } catch {
            console.log("Error in reviews Request");
        }

    }

    render() {
        return (
            <>
                <div className="gap"></div>
                <h1>Watch List</h1>
                <Row className="justify-content-md-center">
                    {this.state.watchList.map((movie, index) => (
                        <Col md="auto">
                            <WatchList  
                            moveFromWatchListToWatched={this.moveFromWatchListToWatched}
                            deleteMovieFromWatchList={this.deleteMovieFromWatchList}
                             index={index} movie={movie} 
                             />
                        </Col>
                    ))}
                </Row>
                <div className="gap"></div>
                <h1>Watched List</h1>
                <Row className="justify-content-md-center">
                    {this.state.watchedList.map((movie, index) => (
                        <Col md="auto">
                            <WatchedList index={index} movie={movie} />
                        </Col>
                    ))}
                </Row>

            </>

        );
    }
}
export default withAuth0(UserProfile);


