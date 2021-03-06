import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Row, Col } from 'react-bootstrap';
import WatchedList from './WatchedList';
import WatchList from './WatchList'
import './UserProfile.css';
import { FaGithub, FaFacebook, FaTwitter, FaBehance } from "react-icons/fa";
import './ProfileCard.css';
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props.auth0;
        this.state = {
            watchedList: [],
            watchList: [],
            user:user,
            email: user.email,
        };
    }

    moveFromWatchListToWatched = async (id) => {
      
        const  query= {
            email: this.props.auth0.user.email,
            id:id
        };
        
        try {
            const watchList = await axios.put(`${process.env.REACT_APP_SERVER}/watchList`,query);
         

            
          this.getWatchedList();
          this.getWatchList();

        } catch(err) {
            console.log(err);
        }
    }
    deleteMovieFromWatchList=async(id)=>{
     
        const  query = {
            email: this.props.auth0.user.email
        };
       
        try {
            const watchList = await axios.delete(`${process.env.REACT_APP_SERVER}/watchList/${id}`,{ params:query});
      
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
              <aside class="profile-card">
          <header>
            <a target="_blank" rel="noopener noreferrer" href={() => false}>
              <img
                src={this.state.user.picture}
                class="hoverZoomLink"
                alt="dd"
              />
            </a>

            <h1 style={{ color: "#fff",fontSize:"1rem" }}>{this.state.user.name}</h1>

            <h2 style={{ color: "#fff",fontSize:"1rem" }}>{this.state.user.email}</h2>
          </header>

          <ul class="profile-social-links">
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/creativedonut">
                <FaFacebook size={70} />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/dropyourbass">
                <FaTwitter size={70} />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" target="_blank" href="https://github.com/vipulsaxena">
                <FaGithub size={70} />
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://www.behance.net/vipulsaxena">
                <FaBehance size={70} />
              </a>
            </li>
          </ul>
        </aside>
        <div className="gapProfile"></div>
                <div className="gap"></div>
                <h1 className = "watch">Watch List</h1>
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
                <h1 className= "watch">Watched Movies</h1>
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


