import React from "react";
import { FiTrash2,FiEdit } from "react-icons/fi";
class Question extends React.Component {
  render() {
    return (
      <div style={{display:'inline-flex',marginLeft:'87%'}}>
    <h1 onClick={() => this.props.handleUpdateShow()}> <FiTrash2 /> </h1>
   <h1 style={{marginLeft:'10px'}}
    onClick={() => this.props.handleUpdateShow()}>
      <FiEdit/>
      </h1>
     </div>
      )
  }
}
export default Question;
