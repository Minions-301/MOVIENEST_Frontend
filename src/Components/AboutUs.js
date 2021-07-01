

import { Component } from 'react';
import './AboutUs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row , Col} from 'react-bootstrap';


class AboutUs extends Component {


    render() {
        return (
            <>
            <p className = "title">ABOUT US</p>
            <div className = "Aboutuscontainer">
            <Row className="justify-content-start">
        <div className="col-4">
              <div className="card1">
          <img src='https://avatars.githubusercontent.com/u/35060587?v=4' alt= "" />
          <div className="card-body1">
            <h2>Ali Rahhal</h2>
            <p>I studied computer science , worked for 3 years as .NET developer,I'm software development student in ASAC.</p>
            <h5>Full Stack Developer</h5>
          </div>
        </div>
        </div>
        {/* </Row> */}

        {/* <Row className="justify-content-center"> */}
        <div className="col-4">
            <div className="card1">
          <img src='https://avatars.githubusercontent.com/u/81553101?v=4' alt= "" />
          <div className="card-body1">
            <h2>Dina Albarghouthi</h2>
            <p> I studied French language and literature, worked about 2 years in tourism field,I'm software development student in ASAC.</p>
            <h5>Full Stack Developer</h5>
          </div>
        </div>
        </div>
        {/* </Row> */}

        {/* <Row className="justify-content-end"> */}
        <Col md="auto">
          <div className="card1">
          <img src='https://avatars.githubusercontent.com/u/81415443?v=4' alt= "" />
          <div className="card-body1">
            <h2>Sara Zwairi</h2>
            <p>fresh software developer ,studied biology science and ex flight attendant...enjoying my life</p>
            <h5>Full Stack Developer</h5>
          </div>
        </div>
        </Col>
        </Row>

        <Row className="justify-content-around">
        <div className="col-4">
        <div className="card1">
          <img src='https://avatars.githubusercontent.com/u/81553723?v=4' alt= "" />
          <div className="card-body1">
            <h2>Abdalrhman Banyissa</h2>
            <p>Hello there, My name is Abdalrhman and I'm 27. I was graduated from TTU in 2019 as a Mechanical Engineer.</p>
            <h5>Full Stack Developer</h5>
          </div>
        </div>
        </div>
        {/* </Row> */}
        
        {/* <Row className="justify-content-around"> */}
        <div className="col-4">
        <div className="card1">
          <img src='https://avatars.githubusercontent.com/u/71585645?v=4' alt= "" />
          <div className="card-body1">
            <h2>Mahmoud Al mahmoud</h2>
            <p> I studied software engineer ,I'm software development student in ASAC..</p>
            <h5>Full Stack Developer</h5>
          </div>
        </div>
        </div>
        </Row>
        </div>
 </>
        );


    }

}


export default AboutUs;