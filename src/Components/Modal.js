// import "./Modal.css";
// import Modal from "react-bootstrap/Modal";
// import { Button } from "react-bootstrap";
// import MovieProfile from "./MovieProfile";

// import React, { Component } from "react";

// class POPUP extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       show: false,
//       setShow: false,
//       bookName: "",
//       bookDescribtion: "",
//       bookStatus: "",
//     };
//   }

//   handleShow = () => {
//     this.setState({
//       show: true,
//       setShow: true,
//     });
//   };

//   handleClose = () => {
//     this.setState({
//       show: false,
//       setShow: false,
//     });
//   };

//   render() {
//     return (
//       <div>
//           <button
//           style={{ alignItems: "center" }}
//           variant="primary"
//           onClick={this.handleShow}
//         >
//           Add new book
//         </button>
        
//         <Modal className='modal'  show={this.state.show} animation={true} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add new book</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//               <MovieProfile />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={this.handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={this.handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default POPUP;


import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import "./Modal.css";
import MovieProfile from "./MovieProfile";


function App() {
  const { modalProps, getTriggerProps } = useModal();

  return (
    <div>
      <button {...getTriggerProps()}>Show modal</button>
      
      <Modal {...modalProps}><MovieProfile /></Modal>
    </div>
  );
}
export default App;