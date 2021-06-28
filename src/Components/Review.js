import "./Review.css";
import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withAuth0 } from '@auth0/auth0-react';
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      newReview: "",
      changeReview: "",
      reviewsState: [],
    };
  }
  componentDidMount = async () => {
    this.getReviews();
  };

  addNewReview = async (event) => {
    event.preventDefault();
    console.log(this.state.newReview);
    const newReveiwData = {
      review: this.state.newReview,
      name: this.props.auth0.user.name,
      movie_ID: this.props.movie_ID,
      email: this.props.auth0.user.email
    };
    try {
      const addReviewReq = await axios.post(
        `${process.env.REACT_APP_SERVER}/reviews`,
        newReveiwData
      );
      this.setState({
        reviews: addReviewReq.data,
      });
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

  updateReview = async (event, id) => {
    event.preventDefault();
    console.log(id);
    const updateReveiwData = {
      review_text: this.state.changeReview,
      movie_ID: this.props.movie_ID,
      email: this.props.auth0.user.email
    };
    try {
      const updateReviewReq = await axios.put(`${process.env.REACT_APP_SERVER}/reviews/${id}`,updateReveiwData);
      this.setState({
        reviews: updateReviewReq.data,
      });
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
    console.log(id);
    try {
      const deleteReviewReq = await axios.delete(`${process.env.REACT_APP_SERVER}/reviews/${id}?movie_ID=${this.props.movie_ID}`);
      this.setState({
        reviews: deleteReviewReq.data,
      });
      console.log(deleteReviewReq.data);
    } catch {
      console.log("Error in delete Request");
    }
  };

  getReviews = async () => {
    console.log(this.props.movie_ID);
    try {
      const reviewsReq = await axios.get(`${process.env.REACT_APP_SERVER}/reviews?movie_ID=${this.props.movie_ID}`)
      console.log(reviewsReq);
      this.setState({
        reviews: reviewsReq.data,
      })
    } catch {
      console.log("Error in reviews Request");
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
                    <h3>A review by {item.name}</h3>
                    <h6>
                      Written by {item.email} on {item.date}
                    </h6>
                    <p>{item.review_text}</p>
                    <Button variant="primary" onClick={() => this.deleteReview(item._id)}>
                      Delete
                    </Button>
                    <Form onSubmit={(event) => { this.updateReview(event, item._id); }}>
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

export default withAuth0(Review);
