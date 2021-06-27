import "./Review.css";
import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      newReview: "",
      changeReview: "",
      reviewsState: [],
      addReviewState: [],
      updateReviewState: [],
      deleteReviewState: []
    };
  }

  componentDidMount = async () => {
    console.log("addReview");
    try {
      const reviewsReq = await axios.get(
        `http://localhost:3010/reviews?movie_ID=${this.props.movie_ID}`
      );
      this.setState({
        reviews: reviewsReq.data,
      });
    } catch {
      console.log("can not send the request");
    }
    this.getReviews();
  };

  addNewReview = async (event) => {
    event.preventDefault();
    console.log(this.state.newReview);
    const newReveiwData = {
      userReview: this.state.newReview,
      // name: this.props.auth0.user.name,
      // movie_ID: this.props.auth0.user.movie_ID,
      // userEmail: this.props.auth0.user.email
    };
    try {
      const addReviewReq = await axios.post(
        `http://localhost:3010/reviews`,
        newReveiwData
      );
      this.setState({
        reviewsState: addReviewReq.data,
      });
      console.log(this.state.reviewsState);
    } catch {
      console.log("Error in adding Request");
    }
  };

  changeReview = (event) => {
    this.setState({
      newReview: event.target.value,
    });
    console.log(this.state.newReview);
  };

  updateReview = async(event,id) => {
    event.preventDefault();
    const updateReveiwData = {
      updatedReview: this.state.changeReview,
      // movie_ID: this.props.auth0.user.movie_ID,
      // userEmail: this.props.auth0.user.email
    };
    try {
      const updateReviewReq = await axios.put(
        `http://localhost:3010/reviews/${id}`,
        updateReveiwData
      );
      this.setState({
        reviewsState: updateReviewReq.data,
      });
      console.log(this.state.reviewsState);
    } catch {
      console.log("Error in update Request");
    }
  };

  onChangeReview = (event) => {
    this.setState({
      changeReview: event.target.value,
    });
    console.log(this.state.changeReview);
  };

  deleteReview = async (id) => {
    try {
      const deleteReviewReq = await axios.delete(
        `http://localhost:3010/reviews/${id}`
      );
      this.setState({
        reviewsState: deleteReviewReq.data,
      });
    } catch {
      console.log("Error in update Request");
    }
  };

  getReviews = async() => {
    try{const reviewsReq = await axios.get(`http://localhost:3010/reviews?movie_ID=${this.props.movie_ID}`)
    this.setState({
      reviewsState: reviewsReq.data,
    })
  } catch{

  }
    
  }

  render() {
    return (
      <div className="addReviewContainer">
        <h2>Reviews</h2>
        <div className="addReview">
          <img
            className="addReviewImg"
            src="https://img.pngio.com/circle-png-images-download-76594-png-resources-with-transparent-circle-clipart-png-360_360.png"
            alt="img"
          />
          <div className="review">
            <div>
            {this.state.reviews.map((item) => {
              return (
                <>
                  <h3>A review by {item.user_name}</h3>
                  <h6>
                    Written by {item.user_name} on {item.date}
                  </h6>
                  <p>{item.review_text}</p>
                  <Form onSubmit={this.updateReview}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Add new review"
                    onChange={this.onChangeReview}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
              <Button variant="primary" onClick={this.deleteReview}>
                Delete
              </Button>
                </>
              );
            })}
            </div>
          </div>
        </div>
        <div className="addNewReview">
          <Form onSubmit={this.addNewReview}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Add new review"
                onChange={this.changeReview}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Review;
