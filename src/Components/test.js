import React from "react";

import { AiFillPlusCircle } from "react-icons/ai";
class Question extends React.Component {
  render() {
    return <h3 onClick={this.props.handleShow}>Review this title <AiFillPlusCircle /> </h3>

  }
}
export default Question;
